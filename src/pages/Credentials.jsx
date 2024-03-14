
import styled from 'styled-components'
import Header from '../components/Header'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react"
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext } from '../hooks/useAuthContext'
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
     { field: 'employee_id', headerName: 'Employee ID', width: 100 },
     { field: 'firstname', headerName: 'Firstname', width: 200, sortable: false },
     { field: 'lastname', headerName: 'Lastname', width: 200, sortable: false },
     { field: 'username', headerName: 'Username', width: 200, sortable: false },
     { field: 'password', headerName: 'Current Password', width: 200, sortable: false },
];

const Credentials = (props) => {


     /**POST REQUESTS */
     const [employee_id, setEmployee_id] = useState('')
     const [firstname, setFirstname] = useState('')
     const [lastname, setLastname] = useState('')
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const [fullname, setFullname] = useState(firstname + " " + lastname)


     const [error, setError] = useState('')
     const [query, setQuery] = useState('')
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openAdd, setOpenAdd] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);
     const { user } = useAuthContext()

     /**DIALOG */
     const handleOpenAdd = () => {
          setOpenAdd(true);

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


     /**EDIT DATA */
     const handleSaveCredentials = async (e) => {
          e.preventDefault()

          const credentials = {
               password: password
               //search for this employee and minus its leaves.
          }

          if(!user){
               console.log('You must be logged in first')
              return
          }
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee/' + id, {
          //const response = await fetch('https://coop-backend-v1.herokuapp.com/api/employee/' + id, {
               method: 'PATCH',
               body: JSON.stringify(credentials),
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
               //SHOW ALERT HERE (OPEN ALERT)
               window.location.reload();
          }
     }

     const handleRowClick = (params) => {
          setId(params.row._id);
          setEmployee_id(params.row.employee_id)
          setUsername(params.row.username)
          setPassword(params.row.password)
          setFirstname(params.row.firstname)
          setLastname(params.row.lastname)

     };

     const [employee, setEmployee] = useState([])
     useEffect(() => {
          const fetchEmployee = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setEmployee(json)
               }
          }
          if(user){
               fetchEmployee();
          }
         

     }, [user])


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
                                             rows={employee.filter((emp) =>
                                                  emp.firstname.toLowerCase().includes(query))}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[5]}
                                             onRowClick={handleRowClick}
                                        />
                                        <ButtonContainer>

                                             <EditDeleteContainer>
                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleOpenEdit}>
                                                            Update Selected
                                                       </Button>
                                                  </ThemeProvider>
                                             </EditDeleteContainer>
                                        </ButtonContainer>

                                        <Dialog
                                             open={openEdit}
                                             onClose={handleCloseEdit}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                             fullWidth
                                             maxWidth="sm"
                                        >
                                             <DialogTitle id="alert-dialog-title">

                                                  {<h2>Leave Approval Confirmation</h2>}
                                             </DialogTitle>
                                             <DialogContent>
                                                  <DialogContentText id="alert-dialog-description">
                                                       {`Please confirm to approve ${fullname}`}
                                                  </DialogContentText>
                                             </DialogContent>
                                             <DialogActions>
                                                  <Button autoFocus>
                                                       {<span style={{ color: "#0a9941" }}>sdfsdfsdfsdf</span>}
                                                  </Button>
                                                  <Button autoFocus>
                                                       {<span style={{ color: "#d13f3f" }}>Decline</span>}
                                                  </Button>
                                             </DialogActions>
                                        </Dialog>
                                        <Dialog
                                             fullScreen={fullScreen}
                                             open={openEdit}
                                             onClose={handleCloseEdit}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                             fullWidth
                                             maxWidth="sm"
                                        >
                                             <DialogTitle id="alert-dialog-title">
                                                  Update Password
                                             </DialogTitle>
                                             <DialogContent style={{ height: '450px', paddingTop: '20px' }}>

                                                  <TextField
                                                       disabled
                                                       InputLabelProps={{ shrink: true }}
                                                       required
                                                       id="outlined-required"
                                                       label="Employee ID"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       value={employee_id}
                                                  />
                                                  <TextField
                                                       disabled
                                                       InputLabelProps={{ shrink: true }}
                                                       required
                                                       id="outlined-required"
                                                       label="Firstname"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       value={firstname}
                                                  />
                                                  <TextField
                                                       disabled
                                                       InputLabelProps={{ shrink: true }}
                                                       required
                                                       id="outlined-required"
                                                       label="Lastname"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       value={lastname}
                                                  />
                                                  <TextField
                                                       disabled
                                                       InputLabelProps={{ shrink: true }}
                                                       required
                                                       id="outlined-required"
                                                       label="Username"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       value={username}
                                                  />
                                                  <TextField
                                                       required
                                                       id="outlined-required"
                                                       label="Password"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setPassword(e.target.value)}
                                                       value={password}
                                                  />

                                             </DialogContent>
                                             <DialogActions>
                                                  <Button onClick={handleSaveCredentials}>Update</Button>
                                                  <Button onClick={handleCloseEdit} autoFocus>
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
                                                       You need to select a data first before editing
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

export default Credentials