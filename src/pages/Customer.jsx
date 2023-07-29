
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
     { field: 'customer_id', headerName: 'Customer ID', width: 150, sortable: false },
     { field: 'customer_name', headerName: 'Name', width: 400 },
     { field: 'customer_address', headerName: 'Address', width: 400, sortable: false },
     { field: 'customer_contact', headerName: 'Contact', width: 150, sortable: false },
     { field: 'customer_email', headerName: 'Email', width: 150, sortable: false }
];

const Customer = (props) => {


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

     const [customer_id, setcustomer_id] = useState('')
     const [customer_name, setcustomer_name] = useState('')
     const [customer_address, setcustomer_address] = useState('')
     const [customer_contact, setcustomer_contact] = useState('')
     const [customer_email, setcustomer_email] = useState('')



     /**DIALOG */
     const handleOpenAdd = () => {
          handleCustomerId()
          setOpenAdd(true);
          setcustomer_id('');
          setcustomer_name('')
          setcustomer_address('')
          setcustomer_contact('')
          setcustomer_email('')
     };

     const handleCustomerId = () => {
          let num = Math.floor(Math.random() * 9000) + 1000;
          const value = "C-" + num
          setcustomer_id(value)
     }


     const handleCloseAdd = () => {
          setOpenAdd(false);
     };
     const handleCloseWarning = () => {
          setOpenWarning(false);
     };

     const handleOpenDelete = () => {
          if (id == "") {
               errorToast("Select a customer on the list first.")
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
               errorToast("Select a customer on the list first.")
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

          const customer = {
               customer_id: customer_id,
               customer_name: customer_name,
               customer_address: customer_address,
               customer_contact: customer_contact,
               customer_email: customer_email
          }

          if (!user) {
               errorToast('You must be logged in first')
               return
          }
          if (
               customer_id === "" ||
               customer_name === ""

          ) {
               errorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/customer', {
                    method: 'POST',
                    body: JSON.stringify(customer),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    errorToast("There is an error when saving.")
               }
               else {
                    setcustomer_id('');
                    setcustomer_name('')
                    setcustomer_address('')
                    setcustomer_contact('')
                    setcustomer_email('')
                    setOpenAdd(false)
                    successToast('Added Successfully')
                    handleRefresher();
               }
          }



     }

     /**EDIT DATA */
     const handlePatch = async (e) => {
          e.preventDefault()

          const customer = {
               customer_name: customer_name,
               customer_address: customer_address,
               customer_contact: customer_contact,
               customer_email: customer_email
          }

          if (!user) {
               errorToast('You must be logged in first')
               return
          }
          if (
               customer_name === ""

          ) {
               errorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/customer/' + id, {
                    method: 'PATCH',
                    body: JSON.stringify(customer),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    errorToast("There is an error when saving.")
               }
               else {
                    setcustomer_id('');
                    setcustomer_name('')
                    setcustomer_address('')
                    setcustomer_contact('')
                    setcustomer_email('')
                    setOpenEdit(false)
                    successToast('Updated Successfully')
                    handleRefresher();
               }
          }

     }


     const [departments, setDepartment] = useState([])
     const [customers, setcustomers] = useState([])
     useEffect(() => {
          const fetchCustomer = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/customer', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setcustomers(json)
               }
          }
          if (user) {
               fetchCustomer();
          }


     }, [user, refresher])
     //
     const handleRowClick = (params) => {
          setId(params.row._id);
          setcustomer_name(params.row.customer_name);
          setcustomer_address(params.row.customer_address);
          setcustomer_contact(params.row.customer_contact);
          setcustomer_email(params.row.customer_email);

     };

     //!important
     // if (!user) {
     //      console.log('You must be logged in first')
     //      window.location.replace('http://localhost:3000/login');
     //      return

     // }
     const handleDelete = async () => {
          const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/customer/' + id, {
               method: 'DELETE',
               headers: {
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()
          if (response.ok) {
               successToast('Deleted Successfully')
               setcustomer_id('');
               setcustomer_name('')
               setcustomer_address('')
               setcustomer_contact('')
               setcustomer_email('')
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
                                             rows={customers.filter((customer) =>
                                                  customer.customer_name.toLowerCase().includes(query))}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[5]}
                                             onRowClick={handleRowClick}

                                        />
                                        <ButtonContainer>
                                             <ThemeProvider theme={theme}>
                                                  <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="contained" color="green" onClick={handleOpenAdd}>
                                                       Add New
                                                  </Button>
                                             </ThemeProvider>
                                             <EditDeleteContainer>

                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="contained" color="blue" onClick={handleOpenEdit}>
                                                            Edit
                                                       </Button>
                                                       <Button style={{ marginTop: "20px" }} variant="contained" color="red" onClick={handleOpenDelete}>
                                                            Delete
                                                       </Button>
                                                  </ThemeProvider>
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
                                                            label="Customer ID"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            value={customer_id}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Name"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_name(e.target.value)}
                                                            value={customer_name}
                                                       />
                                                           <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Address"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_address(e.target.value)}
                                                            value={customer_address}
                                                       />
                                                           <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Contact Number"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_contact(e.target.value)}
                                                            value={customer_contact}
                                                       />
                                                           <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Email Address"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_email(e.target.value)}
                                                            value={customer_email}
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
                                                            label="Customer ID"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_id(e.target.value)}
                                                            value={customer_id}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Name"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_name(e.target.value)}
                                                            value={customer_name}
                                                       />
                                                           <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Address"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_address(e.target.value)}
                                                            value={customer_address}
                                                       />
                                                           <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Contact Number"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_contact(e.target.value)}
                                                            value={customer_contact}
                                                       />
                                                           <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Email Address"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            onChange={(e) => setcustomer_email(e.target.value)}
                                                            value={customer_email}
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

export default Customer