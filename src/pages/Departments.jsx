
import styled from 'styled-components'
import Header from '../components/Header'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Navbar from '../components/Navbar'
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from 'react-toastify';
const theme = createTheme({
     palette: {
          neutral: {
               main: '#61c668',
               contrastText: '#fff',
          },
          red: {
               main: '#d13f3f',
               contrastText: '#fff',
          },
          blue: {
               main: '#9306f1',
               contrastText: '#fff',
          },
          green: {
               main: '#0a9941',
               contrastText: '#fff',
          },
     },
});
const Container = styled.div`
    background-color: #f0f2f9;
    height: 100vh;
    width: 1500px;
    padding: 50px 100px 100px 100px;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Main = styled.div`
     width: 1400px;
    height: 750px;
`
const Card = styled.div`
    background-color: white;
    height: 750px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
`
const FormContainer = styled.div`
     margin-bottom: 20px;
     
`
const EditDeleteContainer = styled.div`
    display: flex;
    justify-content: right;
`
const ButtonContainer = styled.div`
     display: flex;
     justify-content: space-between;
`
const SearchContainer = styled.div`
     display: flex;
     padding-bottom: 30px;
`

/**GET REQUESTS */
const columns = [
     { field: 'department_id', headerName: 'Department ID', width: 150, sortable: false },
     { field: 'department_name', headerName: 'Department', width: 300 },
     { field: 'description', headerName: 'Description', width: 300, sortable: false },
     { field: 'other_info', headerName: 'Other Info', width: 300, sortable: false }
];

const Departments = (props) => {


     /**POST REQUESTS */
     const [department_name, setDepartment_name] = useState('')
     const [description, setDescription] = useState('')
     const [error, setError] = useState('')
     const [query, setQuery] = useState('')
     const [id, setId] = useState('')
     const [departmentid, setdepartmentid] = useState('')
     const [otherinfo, setotherinfo] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openAdd, setOpenAdd] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);
     const [refresher, setRefresher] = useState(0)

     /**DIALOG */
     const handleOpenAdd = () => {
          setOpenAdd(true);
          setDepartment_name('');
          setDescription('')
          setdepartmentid('')
          setotherinfo('')
     };
     const handleCloseAdd = () => {
          setOpenAdd(false);
     };
     const handleCloseWarning = () => {
          setOpenWarning(false);
     };

     const handleOpenDelete = () => {
          if (id == "") {
               setOpenWarning(true)
          }
          else {
               setOpenDelete(true);
          }

     };
     const handleCloseDelete = () => {
          setOpenDelete(false);
     };
     const handleOpenEdit = () => {
          if (id == "") {
               errorToast('Please select an item to edit first')
          }
          else {
               setOpenEdit(true);
          }

     };
     const handleCloseEdit = () => {
          setOpenEdit(false);
     };
     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
     };
     const handleRefresher = () => {
          setRefresher(Math.random())
     };


     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

     const { user } = useAuthContext()

     /**POST NEW DEPARTMENT */
     const handleAdd = async (e) => {
          e.preventDefault()

          const departments = {
               department_id: departmentid,
               department_name: department_name,
               description: description,
               other_info: otherinfo
          }

          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               departmentid === "" ||
               department_name === ""

          ) {
               errorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/departments', {
                    method: 'POST',
                    body: JSON.stringify(departments),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    setDepartment_name('')
                    setDescription('')
                    setdepartmentid('')
                    setotherinfo('')
                    setOpenAdd(false)
                    successToast('Added Successfully')
                    handleRefresher();
               }
          }



     }

     /**EDIT DATA */
     const handlePatch = async (e) => {
          e.preventDefault()
          const departments = {
               department_id: departmentid,
               department_name: department_name,
               description: description,
               other_info: otherinfo
          }
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               departmentid === "" ||
               department_name === ""

          ) {
               errorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/departments/' + id, {
                    method: 'PATCH',
                    body: JSON.stringify(departments),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    setDepartment_name('')
                    setDescription('')
                    setdepartmentid('')
                    setotherinfo('')
                    setOpenEdit(false)
                    handleRefresher();
                    successToast('Updated Successfully')
               }
          }

     }


     const [departments, setDepartment] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/departments', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setDepartment(json)
               }
          }
          if (user) {
               fetchDepartment();
          }


     }, [user, refresher])

     const handleRowClick = (params) => {
          setId(params.row._id);
          setdepartmentid(params.row.department_id);
          setotherinfo(params.row.other_info);
          setDepartment_name(params.row.department_name)
          setDescription(params.row.description)

          console.log(otherinfo)
     };
     if (!user) {
          console.log('You must be logged in first')
          window.location.replace('http://localhost:3000/login');
          return

     }
     const handleDelete = async () => {
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/departments/' + id, {
               method: 'DELETE',
               headers: {
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()
          if (response.ok) {
               console.log('deleted', json)
               successToast('Deleted Successfully')
               setOpenDelete(false)
               handleRefresher();
          }

     }



     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   <SearchContainer>
                                        <TextField
                                             required
                                             id="search"
                                             label="Search"
                                             fullWidth
                                             onChange={(e) => setQuery(e.target.value)}
                                        />

                                   </SearchContainer>
                                   <div style={{ height: 475, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={departments.filter((department) =>
                                                  department.department_name.toLowerCase().includes(query))}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[5]}
                                             onRowClick={handleRowClick}

                                        />
                                        <ButtonContainer>
                                             <ThemeProvider theme={theme}>
                                                  <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleOpenAdd}>
                                                       Add New
                                                  </Button>
                                             </ThemeProvider>
                                             <EditDeleteContainer>

                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="blue" onClick={handleOpenEdit}>
                                                            Edit
                                                       </Button>
                                                       <Button style={{ marginTop: "20px" }} variant="outlined" color="red" onClick={handleOpenDelete}>
                                                            Delete
                                                       </Button>
                                                  </ThemeProvider>
                                                  {console.log(department_name + " " + description)}
                                             </EditDeleteContainer>
                                        </ButtonContainer>
                                        <Dialog
                                             open={openDelete}
                                             onClose={handleCloseDelete}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                        >
                                             <DialogTitle id="alert-dialog-title">
                                                  <h2>{"Are you sure to delete selected item?"}</h2>
                                             </DialogTitle>
                                             <DialogContent>
                                                  <DialogContentText id="alert-dialog-description">
                                                       Deleted item can't be undone. Confirm by clicking "Delete"
                                                  </DialogContentText>
                                             </DialogContent>
                                             <DialogActions>
                                                  <Button onClick={handleDelete}>Delete</Button>
                                                  <Button onClick={handleCloseDelete} autoFocus>
                                                       Cancel
                                                  </Button>
                                             </DialogActions>
                                        </Dialog>

                                        <Dialog
                                             fullScreen={fullScreen}
                                             open={openEdit}
                                             onClose={handleCloseEdit}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                        >
                                             <DialogTitle id="alert-dialog-title">

                                                  Editing Department
                                             </DialogTitle>
                                             <DialogContent style={{ height: '600px', paddingTop: '20px' }}>
                                                  <FormContainer>
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Department Number"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setdepartmentid(e.target.value)}
                                                            value={departmentid}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Department"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setDepartment_name(e.target.value)}
                                                            value={department_name}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Department Description"
                                                            fullWidth
                                                            style={{ marginBottom: "20px" }}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            value={description}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Other Info"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setotherinfo(e.target.value)}
                                                            value={otherinfo}
                                                       />
                                                  </FormContainer>
                                             </DialogContent>
                                             <DialogActions>
                                                  <Button onClick={handlePatch}>Update</Button>
                                                  <Button onClick={handleCloseEdit} autoFocus>
                                                       Cancel
                                                  </Button>
                                             </DialogActions>
                                        </Dialog>
                                        <Dialog
                                             fullScreen={fullScreen}
                                             open={openAdd}
                                             onClose={handleCloseAdd}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                        >
                                             <DialogTitle id="alert-dialog-title">

                                                  Adding New Department
                                             </DialogTitle>
                                             <DialogContent style={{ height: '600px', paddingTop: '20px' }}>
                                                  <FormContainer>
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Department Number"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setdepartmentid(e.target.value)}
                                                            value={departmentid}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Department"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setDepartment_name(e.target.value)}
                                                            value={department_name}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Department Description"
                                                            fullWidth
                                                            style={{ marginBottom: "20px" }}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            value={description}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Other Info"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setotherinfo(e.target.value)}
                                                            value={otherinfo}
                                                       />
                                                  </FormContainer>
                                             </DialogContent>
                                             <DialogActions>
                                                  <Button onClick={handleAdd}>Add</Button>
                                                  <Button onClick={handleCloseAdd} autoFocus>
                                                       Cancel
                                                  </Button>
                                             </DialogActions>
                                        </Dialog>
                                        <Dialog
                                             open={openWarning}
                                             onClose={handleCloseWarning}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                        >
                                             <DialogTitle id="alert-dialog-title">

                                                  <h2>{"No data has been selected"}</h2>
                                             </DialogTitle>
                                             <DialogContent>
                                                  <DialogContentText id="alert-dialog-description">
                                                       You need to select a data first before deleting/editing
                                                  </DialogContentText>
                                             </DialogContent>
                                             <DialogActions>
                                                  <Button onClick={handleCloseWarning} autoFocus>
                                                       Okay
                                                  </Button>
                                             </DialogActions>
                                        </Dialog>
                                   </div>
                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div>
     )

}

export default Departments