
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
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
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

const columns2 = [
     { field: 'pos_date', headerName: 'Datetime', width: 150, sortable: false },
     { field: 'pos_credit_sales', headerName: 'Credit Amount', width: 150, sortable: false },
]
const columns3 = [
     { field: 'date', headerName: 'Datetime', width: 150, sortable: false },
     { field: 'transaction_id', headerName: 'Transaction ID', width: 150, sortable: false },
     { field: 'amount', headerName: 'Amount', width: 150, sortable: false },
]


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


     const [payment_transactionid, setpayment_transactionid] = useState('')
     const [payment_customerid, setpayment_customerid] = useState('')
     const [payment_amount, setpayment_amount] = useState(0)

     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let year = date.getFullYear();

          let hours = date.getHours().toString().padStart(2, '0');
          let minutes = date.getMinutes().toString().padStart(2, '0');

          let currentDateTime = `${month}-${day}-${year} ${hours}:${minutes}`;
          return currentDateTime;
     })
     const [openAddPayment, setopenAddPayment] = useState(false);



     /**DIALOG */
     const handleOpenAdd = () => {

          setOpenAdd(true);
          setcustomer_id('');
          setcustomer_name('')
          setcustomer_address('')
          setcustomer_contact('')
          setcustomer_email('')
     };


     const handleOpenAddPayment = () => {
          handleTransactionId();
          setopenAddPayment(true);

     };

     const handleCloseAddPayment = () => {
          setopenAddPayment(false);
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
     const [opendelete, setopendelete] = useState(false)
     const handleOpenPaymentDelete = () => {
          if (id == "") {
               errorToast("Select an entry first.")
          }
          else {
               setopendelete(true);
          }

     };


     const handleClosePaymentDelete = () => {

          setopendelete(false);


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
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/customer', {
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

     const handleAddPayment = async (e) => {
          e.preventDefault()

          const payment = {
               date: currentDate,
               transaction_id: payment_transactionid,
               customer_id: payment_customerid,
               amount: payment_amount,
          }

          if (!user) {
               errorToast('You must be logged in first')
               return
          }
          if (
               payment_amount === ""

          ) {
               errorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/credit', {
                    method: 'POST',
                    body: JSON.stringify(payment),
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
                    setpayment_amount(0)
                    setpayment_customerid(0)
                    setpayment_transactionid(0)
                    setopenAddPayment(false)
                    successToast('Added Successfully')
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
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/customer/' + id, {
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
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/customer', {
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
          setcustomer_id(params.row.customer_id)
          setcustomer_name(params.row.customer_name);
          setcustomer_address(params.row.customer_address);
          setcustomer_contact(params.row.customer_contact);
          setcustomer_email(params.row.customer_email);

     };

     const [paymentid, setpaymentid] = useState("")
     const handleRowClickPayment = (params) => {
          setpaymentid(params.row._id);
     
     };

   
     //!important
     // if (!user) {
     //      console.log('You must be logged in first')
     //      window.location.replace('http://localhost:3000/login');
     //      return

     // }
     const handleDelete = async () => {
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/customer/' + id, {
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
     const handlePaymentDelete = async () => {
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/credit/' + paymentid, {
               method: 'DELETE',
               headers: {
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()
          if (response.ok) {
               successToast('Deleted Successfully')
               handleClosePaymentDelete()
          }

     }
     const handleChange = (event, newValue) => {
          settabvalue(newValue);
     };
     const [tabvalue, settabvalue] = React.useState('1');
     const handleGoToCustomer = () => {
          // setbuttonReceiptDisabled(true)
          settabvalue('1')
     }
     const handleGoToPerCredit = () => {
          if(totalposcreditsales == 0){
               errorToast("This user don't have any credit")
          }
          settabvalue('2')
     }
     const handleGoToAllCredits = () => {
          // setbuttonReceiptDisabled(true)
          settabvalue('3')
     }
     const handleTransactionId = () => {
          let num = Math.floor(Math.random() * 90000) + 10000;
          const value = "P-" + num
          setpayment_transactionid(value)
     }
     const handleGoTo = () => {
          // setbuttonReceiptDisabled(true)
          if (id === "") {
               errorToast("Select an customer first")
          }
          else {
               handleRefresher();
               settabvalue('2')
          }

     }

     // useEffect(() => {
     //      const fetchCustomer = async () => {
     //           const response = await fetch('https://coop-back-zqr6.onrender.com/api/pos', {
     //                headers: {
     //                     'Authorization': `Bearer ${user.token}`
     //                }
     //           })
     //           const json = await response.json()
     //           console.log(json, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
     //           if (response.ok) {
     //                setcustomer(json)
     //           }
     //      }
     //      if (user) {
     //           fetchCustomer();
     //      }

     // }, [user, customer_id])


     // const filteredCustomerData = customer?.filter(item => {
     //      const id = item.pos_customer_name.split('-')[0].trim();
     //      return id === params.row.customer_id;
     // }) || [];
     const [customer, setcustomer] = useState([])
     const [totalposcreditsales, settotalposcreditsales] = useState(0)
     const [payment_customername, setpayment_customername] = useState(0)
     const [totalpayment, settotalpayment] = useState(0)

     useEffect(() => {
          const fetchCustomer = async () => {
               if (user) {
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/pos', {
                         headers: {
                              'Authorization': `Bearer ${user.token}`
                         }
                    });
                    const json = await response.json();

                    if (response.ok) {
                         const filteredData = json?.filter(item => {
                              const id = item.pos_customer_name.split(' ')[0].trim().substring(0, 6);
                              return id === customer_id && item.pos_credit_sales > 0;
                         }) || []


                         // Calculate total pos_credit_sales
                         const totalPosCreditSales = filteredData.reduce((acc, item) => acc + item.pos_credit_sales, 0);
                         const customerName = filteredData.length > 0 ? filteredData[0].pos_customer_name : '';
                         const id = customerName.split(' ')[0].trim().substring(0, 6);

                         setpayment_customername(customerName)
                         setpayment_customerid(id)
                         setcustomer(filteredData)
                         settotalposcreditsales(totalPosCreditSales);
                    }
               }
          };
          fetchCustomer();
     }, [user, customer_id]); // Add customer to the dependency array

     const [credit, setcredit] = useState([])
     useEffect(() => {
          const fetchCustomer = async () => {
               if (user) {
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/credit' + customer_id, {
                         headers: {
                              'Authorization': `Bearer ${user.token}`
                         }
                    });
                    const json = await response.json()

                    if (response.ok) {
                         setcredit(json)
                         const totalPayment = json.reduce((acc, item) => acc + item.amount, 0);
                         settotalpayment(totalPayment)
                    }
               }
               if (user) {
                    fetchCustomer();
               }
          };
          fetchCustomer();
     }, [user]);


     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   <Box>
                                        <TabContext value={tabvalue}>
                                             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                       <Tab label="Customers" value="1" />
                                                       <Tab label="Customer Credit" value="2" onClick={handleGoToPerCredit} />
                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
                                                  <SearchContainer>
                                                       <TextField
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
                                                                      <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="contained" color="blue" onClick={handleGoToPerCredit}>
                                                                           View Credit Page
                                                                      </Button>
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

                                                                 Adding New Customer
                                                            </DialogTitle>
                                                            <DialogContent style={{ height: '600px', paddingTop: '20px' }}>
                                                                 <FormContainer>
                                                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Customer ID"
                                                                                style={{ marginRight: "10px" }}
                                                                                fullWidth
                                                                                value={customer_id}
                                                                                InputProps={{
                                                                                     readOnly: true,
                                                                                }}
                                                                           />
                                                                           <ThemeProvider theme={theme}>
                                                                                <Button style={{ padding: "15px" }} variant="contained" color="green" onClick={handleCustomerId}>
                                                                                     Generate
                                                                                </Button>
                                                                           </ThemeProvider>
                                                                      </div>
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
                                             </TabPanel>
                                             <TabPanel value="2">
                                                  <div style={{ height: 475, width: '100%' }}>
                                                       <div style={{ marginBottom: "20px" }}>Customer: {payment_customername}</div>
                                                       <div style={{ display: "flex", height: 400 }}>

                                                            <div style={{ marginRight: "20px", width: '100%' }}>
                                                                 <DataGrid
                                                                      getRowId={(row) => row._id}
                                                                      rows={customer}
                                                                      pageSize={7}
                                                                      columns={columns2}
                                                                      rowsPerPageOptions={[5]}

                                                                 />
                                                            </div>
                                                            <div style={{ width: '100%' }}>
                                                                 <DataGrid
                                                                      getRowId={(row) => row._id}
                                                                      rows={credit}
                                                                      pageSize={7}
                                                                      columns={columns3}
                                                                      rowsPerPageOptions={[5]}
                                                                      onRowClick={handleRowClickPayment}
                                                                 />
                                                            </div>
                                                       </div>
                                                       <div> Total Credit: {totalposcreditsales}</div>
                                                       <div> Total Payment: {totalpayment}</div>
                                                       <div> Balance: {totalposcreditsales - totalpayment}</div>
                                                       <ButtonContainer>
                                                            <ThemeProvider theme={theme}>
                                                                 <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="contained" color="green" onClick={handleOpenAdd}>
                                                                      Add New
                                                                 </Button>
                                                            </ThemeProvider>
                                                            <EditDeleteContainer>

                                                                 <ThemeProvider theme={theme}>
                                                                      <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="contained" color="blue" onClick={handleOpenAddPayment}>
                                                                           Add payment
                                                                      </Button>
                                                                      <Button style={{ marginTop: "20px" }} variant="contained" color="red" onClick={handleOpenPaymentDelete}>
                                                                           Delete
                                                                      </Button>
                                                                 </ThemeProvider>
                                                            </EditDeleteContainer>
                                                       </ButtonContainer>


                                                       <Dialog
                                                            open={opendelete}
                                                            onClose={handleClosePaymentDelete}
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
                                                                 <Button onClick={handlePaymentDelete}>Delete</Button>
                                                                 <Button onClick={handleClosePaymentDelete} autoFocus>
                                                                      Cancel
                                                                 </Button>
                                                            </DialogActions>
                                                       </Dialog>


















                                                       <Dialog
                                                            fullScreen={fullScreen}
                                                            open={openAddPayment}
                                                            onClose={handleCloseAddPayment}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                       >
                                                            <DialogTitle id="alert-dialog-title">
                                                                 Add Payment
                                                            </DialogTitle>
                                                            <DialogContent style={{ height: '600px', paddingTop: '20px' }}>
                                                                 <FormContainer>
                                                                      <TextField
                                                                           required
                                                                           id="outlined-required"
                                                                           label="Customer ID"
                                                                           style={{ marginBottom: "20px" }}
                                                                           fullWidth
                                                                           InputProps={{
                                                                                readOnly: true,
                                                                           }}
                                                                           onChange={(e) => setpayment_customerid(e.target.value)}
                                                                           value={payment_customerid}
                                                                      />
                                                                      <TextField
                                                                           required
                                                                           id="outlined-required"
                                                                           label="Transaction ID"
                                                                           style={{ marginBottom: "20px" }}
                                                                           fullWidth
                                                                           InputProps={{
                                                                                readOnly: true,
                                                                           }}
                                                                           onChange={(e) => setpayment_transactionid(e.target.value)}
                                                                           value={payment_transactionid}
                                                                      />
                                                                      <TextField
                                                                           required
                                                                           id="outlined-required"
                                                                           label="Amount"
                                                                           style={{ marginBottom: "20px" }}
                                                                           fullWidth
                                                                           onChange={(e) => setpayment_amount(e.target.value)}
                                                                           value={payment_amount}
                                                                      />
                                                                 </FormContainer>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                 <Button onClick={handleAddPayment}>Add Payment</Button>
                                                                 <Button onClick={handleCloseAddPayment} autoFocus>
                                                                      Cancel
                                                                 </Button>
                                                            </DialogActions>
                                                       </Dialog>














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
                                                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Customer ID"
                                                                                style={{ marginRight: "10px" }}
                                                                                fullWidth
                                                                                value={customer_id}
                                                                                InputProps={{
                                                                                     readOnly: true,
                                                                                }}
                                                                           />
                                                                           <ThemeProvider theme={theme}>
                                                                                <Button style={{ padding: "15px" }} variant="contained" color="green" onClick={handleCustomerId}>
                                                                                     Generate
                                                                                </Button>
                                                                           </ThemeProvider>
                                                                      </div>
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
                                             </TabPanel>


                                        </TabContext>
                                   </Box>
                              </Card>
                         </Main>
                    </Wrapper>
               </Container >
          </div >
     )

}

export default Customer