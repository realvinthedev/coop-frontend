
import styled from 'styled-components'
import Header from '../components/Header'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    width: 1020px;
    height: 650px;
`
const Card = styled.div`
    background-color: white;
    height: 680px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
`
const FormContainer = styled.div`
     display: flex;
     justify-content: space-between;
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
     { field: 'department_name', headerName: 'Department', width: 500 },
     { field: 'description', headerName: 'Description', width: 300, sortable: false },
];

const Departments = (props) => {


     /**POST REQUESTS */
     const [department_name, setDepartment_name] = useState('')
     const [description, setDescription] = useState('')
     const [error, setError] = useState('')
     const [query, setQuery] = useState('')
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openAdd, setOpenAdd] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);
   
     /**DIALOG */
     const handleOpenAdd = () => {
          setOpenAdd(true);
          setDepartment_name('');
          setDescription('')
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
               setOpenWarning(true)
          }
          else {
               setOpenEdit(true);
          }
         
     };
     const handleCloseEdit = () => {
          setOpenEdit(false);
     };


     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


     /**POST NEW DEPARTMENT */
     const handleAdd = async (e) => {
          e.preventDefault()
          const departments = {
               department_name: department_name,
               description: description
          }

          const response = await fetch('https://coop-backend-v1.herokuapp.com/api/departments', {
               method: 'POST',
               body: JSON.stringify(departments),
               headers: {
                    'Content-Type': 'application/json'
               }
          })
          const json = await response.json()
          if (!response.ok) {
               setError(json.error)
          }
          else {
               setDepartment_name('')
               setDescription('')
               console.log('New department added', json)
          }
          window.location.reload();
     }

     /**EDIT DATA */
     const handlePatch = async (e) => {
          e.preventDefault()
          const departments = {
               department_name: department_name,
               description: description
          }

          const response = await fetch('https://coop-backend-v1.herokuapp.com/api/departments/' + id, {
               method: 'PATCH',
               body: JSON.stringify(departments),
               headers: {
                    'Content-Type': 'application/json'
               }
          })
          const json = await response.json()
          if (!response.ok) {
               setError(json.error)
          }
          else {
               setDepartment_name('')
               setDescription('')
               console.log('Edited Department', json)
          }
          window.location.reload();
     }


     const [departments, setDepartment] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/departments')
               const json = await response.json()

               if (response.ok) {
                    setDepartment(json)
               }
          }
          fetchDepartment();

     }, [])

     const handleRowClick = (params) => {
          setId(params.row._id);
          setDepartment_name(params.row.department_name)
          setDescription(params.row.description)
     };

     const handleDelete = async () => {
          const response = await fetch('https://coop-backend-v1.herokuapp.com/api/departments/' + id, {
               method: 'DELETE'
          })
          const json = await response.json()
          if (response.ok) {
               console.log('deleted', json)
          }
          window.location.reload();
     }



     return (
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
                                        <DialogContent style={{ height: '150px', paddingTop: '20px' }}>
                                             <FormContainer>
                                                  <TextField
                                                       required
                                                       id="outlined-required"
                                                       label="Department"
                                                       style={{ paddingRight: "20px" }}
                                                       fullWidth
                                                       onChange={(e) => setDepartment_name(e.target.value)}
                                                       value={department_name}
                                                  />
                                                  <TextField
                                                       required
                                                       id="outlined-required"
                                                       label="Department Description"
                                                       fullWidth
                                                       style={{ paddingRight: "20px" }}
                                                       onChange={(e) => setDescription(e.target.value)}
                                                       value={description}
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
                                        <DialogContent style={{ height: '150px', paddingTop: '20px' }}>
                                             <FormContainer>
                                                  <TextField
                                                       required
                                                       id="outlined-required"
                                                       label="Department"
                                                       style={{ paddingRight: "20px" }}
                                                       fullWidth
                                                       onChange={(e) => setDepartment_name(e.target.value)}
                                                       value={department_name}
                                                  />
                                                  <TextField
                                                       required
                                                       id="outlined-required"
                                                       label="Department Description"
                                                       fullWidth
                                                       style={{ paddingRight: "20px" }}
                                                       onChange={(e) => setDescription(e.target.value)}
                                                       value={description}
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

     )
}

export default Departments