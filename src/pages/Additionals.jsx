
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
import Navbar from '../components/Navbar';
import { useSignup } from '../hooks/useSignup';
import { Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuthContext } from '../hooks/useAuthContext'
import MenuItem from '@mui/material/MenuItem';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import { isElement } from 'react-dom/test-utils';
import { ElevatorSharp } from '@mui/icons-material';
import { useRef } from 'react';


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
const Others = styled.div`
    
`

const OthersWithPayLeaves = styled.div`
     
`
const OthersNoPayLeaves = styled.div`
     
`
const OthersOT = styled.div`
     
`
const TotalsContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
`
const CheckContainer = styled.div`
     display: flex;
     flex-direction: column;
`
const TimeContainer = styled.div`
     display: flex;
     justify-content: space-between;
`
const Card = styled.div`
    background-color: white;
    height: 680px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
    overflow: scroll;
`
const FormContainer = styled.div`
     display: flex;
     justify-content: space-between;
     margin-bottom: 20px;
`
const ButtonContainer2 = styled.div`
     display: flex;
     justify-content: center;
`
const ButtonContainer = styled.div`
     display: flex;
     justify-content: space-between;
`
const EditDeleteContainer = styled.div`
    display: flex;
    justify-content: right;
`

const Warnings = styled.h1`
     color: red;
     font-size: 12px;
     justify-content: left;
     margin-bottom: 20px;
`


const columns_additionals = [
     { field: 'date_covered', headerName: 'Date', width: 100 },
     { field: 'employee_id', headerName: 'Emp ID', width: 100 },
     { field: 'name', headerName: 'Name', width: 300 },
     { field: 'sss', headerName: 'SSS', width: 100 },
     { field: 'wtax', headerName: 'WTAX', width: 100 },
     { field: 'philhealth', headerName: 'Philhealth', width: 100 },
     { field: 'pagibig', headerName: 'Pagibig', width: 100 },
     { field: 'lodging', headerName: 'Lodging', width: 100 },
     { field: 'water_electricity', headerName: 'Water / Electricty', width: 100 },
     { field: 'hmo', headerName: 'HMO', width: 100 },
     { field: 'share_capital', headerName: 'Share Capital', width: 100 },
     { field: 'hhhc_savings', headerName: 'HHHC Savings', width: 100 },
     { field: 'hhhc_membership_fee', headerName: 'HHHC Membership Fee', width: 100 },
     { field: 'cash_advances', headerName: 'Cash Advances', width: 100 },
     { field: 'pay_adjustment_deduction', headerName: 'Pay Adj. Deduction', width: 100 },
     { field: 'other_deduction', headerName: 'Other Deduction', width: 100 },
     { field: 'total_deduction', headerName: 'Total Deduction', width: 100 },
     { field: 'allowance', headerName: 'Allowance', width: 100 },
     { field: 'pay_adjustment_earnings', headerName: 'Pay Adj. Earnings', width: 100 },
     { field: 'other_earnings', headerName: 'Other Earnings', width: 100 },
     { field: 'total_earnings', headerName: 'Total Earnings', width: 100 },
];



/**GET REQUESTS */
const Additionals = (props) => {
     const [query, setQuery] = useState('')
     const { user } = useAuthContext()
     const [dtr, setDtr] = useState([])
     const dialogRef = useRef(null);


     const [employeeId, setEmployeeId] = useState('')
     const [name, setName] = useState('all')
     const [date, setDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })





     const [refresher, setRefresher] = useState(0)
     const handleRefresher = () => {
          setRefresher(Math.random())
     };



     const [openAdd, setOpenAdd] = useState(false);
     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);

     const [openWarning, setOpenWarning] = useState(false);
     const [openAddAdditionals, setOpenAddAdditionals] = useState(false);







     const handleOpenAddAdditionals = () => {
          setOpenAddAdditionals(true);
     };
     const handleCloseAddAdditionals = () => {
          setOpenAddAdditionals(false);
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







     const handleName = (event) => {
          const name = event.target.value;
          setName(name)
          const firstWord = name.split(" ")[0];
          setEmployeeId(firstWord)
          console.log(name)
          console.log(sss)
          console.log(total_deduction)
          console.log(total_earnings)

     }

     const [emp, setEmp] = useState([])

     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/employee', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setEmp(json)
               }
          }
          if (user) {

               fetchEmp();
          }
     }, [user])

     const time = [
          { id: '1', time: '' },
     ];

     const [date_from, setdate_from] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const [date_to, setdate_to] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const convertDateToStringFrom = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setdate_from(dateString)
     };
     const convertDateToStringTo = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setdate_to(dateString)
     };

     const [additionals, setAdditionals] = useState([])
     useEffect(() => {
          const fetchAdditionals = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/additional', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const date = item.date_covered
                         const employee_id = item.employee_id
                         if (name == "all") {
                              return date >= date_from && date <= date_to
                         }
                         else {
                              return date >= date_from && date <= date_to && employee_id == employeeId
                         }


                    });

                    setAdditionals(filteredData)
               }
          }
          if (user) {
               fetchAdditionals();
          }

     }, [date_to, date_from, employeeId])



     const [currentDate, setCurrentDate] = useState();



     const convertDateToString = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setDate(dateString)
          setCurrentDate(dateString)
     };

     //handleError
     const handleOnError = () => {
          setOpenError(true);
          setTimeout(() => {
               setOpenError(false);
          }, 2000);
     };

     const handleOffError = () => {
          setOpenError(false)
     };

     //handleSuccess
     const handleOnSuccess = () => {
          setOpenSuccess(true);
          setTimeout(() => {
               setOpenSuccess(false);
          }, 2000);

     };

     const handleOffSuccess = () => {
          setOpenSuccess(false);
     };
     const [openError, setOpenError] = useState(false)
     const [openSuccess, setOpenSuccess] = useState(false)


     const [sss, setsss] = useState(0)
     const [wtax, setwtax] = useState(0)
     const [philhealth, setphilhealth] = useState(0)
     const [pagibig, setpagibig] = useState(0)
     const [lodging, setlodging] = useState(0)
     const [water_electricity, setwater_electricity] = useState(0)
     const [hmo, sethmo] = useState(0)
     const [share_capital, setshare_capital] = useState(0)
     const [hhhc_savings, sethhhc_savings] = useState(0)
     const [hhhc_membership_fee, sethhhc_membership_fee] = useState(0)
     const [cash_advances, setcash_advances] = useState(0)
     const [pay_adjustment_deduction, setpay_adjustment_deduction] = useState(0)
     const [other_deduction, setother_deduction] = useState(0)
     const [total_deduction, settotal_deduction] = useState(0)
     const [pay_adjustment_earnings, setpay_adjustment_earnings] = useState(0)
     const [other_earnings, setother_earnings] = useState(0)
     const [total_earnings, settotal_earnings] = useState(0)
     const [allowance, setallowance] = useState(0)
     const [error, setError] = useState("")
     const [tferror, setTferror] = useState(false)


     const handleRowClick = (params) => {
          setId(params.row._id);
     };

     const handlesss = (event) => {
          const value = parseInt(event.target.value);
          setsss(value);
     }
     const handlepagibig = (event) => {
          const value = parseInt(event.target.value);
          setpagibig(value);
     }
     const handlephilhealth = (event) => {
          const value = parseInt(event.target.value);
          setphilhealth(value);
     }
     const handlewtax = (event) => {
          const value = parseInt(event.target.value);
          setwtax(value);
     }
     const handlelodging = (event) => {
          const value = parseInt(event.target.value);
          setlodging(value);
     }
     const handlewater_electricity = (event) => {
          const value = parseInt(event.target.value);
          setwater_electricity(value);
     }
     const handlehmo = (event) => {
          const value = parseInt(event.target.value);
          sethmo(value);
     }
     const handleshare_capital = (event) => {
          const value = parseInt(event.target.value);
          setshare_capital(value);
     }
     const handlehhhc_savings = (event) => {
          const value = parseInt(event.target.value);
          sethhhc_savings(value);
     }
     const handlehhhc_membership_fee = (event) => {
          const value = parseInt(event.target.value);
          sethhhc_membership_fee(value);
     }
     const handlecash_advances = (event) => {
          const value = parseInt(event.target.value);
          setcash_advances(value);
     }
     const handlepay_adjustment_deduction = (event) => {
          const value = parseInt(event.target.value);
          setpay_adjustment_deduction(value);
     }
     const handleother_deduction = (event) => {
          const value = parseInt(event.target.value);
          setother_deduction(value);
     }
     const handlepay_adjustment_earnings = (event) => {
          const value = parseInt(event.target.value);
          setpay_adjustment_earnings(value);
     }
     const handleother_earnings = (event) => {
          const value = parseInt(event.target.value);
          setother_earnings(value);
     }
     const handleallowance = (event) => {
          const value = parseInt(event.target.value);
          setallowance(value);
     }


     const handleCalculateTotalCollections = () => {

          let totalDeduction = Number(sss) + Number(wtax) + Number(philhealth) + Number(pagibig) + Number(lodging) + Number(water_electricity) + Number(hmo) + Number(share_capital) +
               Number(hhhc_savings) + Number(hhhc_membership_fee) + Number(cash_advances) + Number(pay_adjustment_deduction) + Number(other_deduction);
          settotal_deduction(totalDeduction)
          let totalEarnings = Number(pay_adjustment_earnings) + Number(other_earnings) + Number(allowance)
          settotal_earnings(totalEarnings)
     }

     const handleAddAdditional = async (e) => {
          e.preventDefault()
          if (name === "") {
               handleOnError();
          }
          else {
               if (!user) {
                    console.log('You must be logged in first')
                    return
               }
               else {
                    const additional = {
                         date_covered: date,
                         employee_id: employeeId,
                         name: name,
                         sss: sss,
                         wtax: wtax,
                         philhealth: philhealth,
                         pagibig: pagibig,
                         lodging: lodging,
                         water_electricity: water_electricity,
                         hmo: hmo,
                         share_capital: share_capital,
                         hhhc_savings: hhhc_savings,
                         hhhc_membership_fee: hhhc_membership_fee,
                         cash_advances: cash_advances,
                         pay_adjustment_deduction: pay_adjustment_deduction,
                         other_deduction: other_deduction,
                         total_deduction: total_deduction,
                         allowance: allowance,
                         pay_adjustment_earnings: pay_adjustment_earnings,
                         other_earnings: other_earnings,
                         total_earnings: total_earnings
                    }
                    const response = await fetch('https://coop-backend-v1.herokuapp.com/api/additional', {
                         method: 'POST',
                         body: JSON.stringify(additional),
                         headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${user.token}`
                         }
                    })
                    const json = await response.json()
                    if (!response.ok) {
                         setError(json.error)
                         console.log(json.error)
                         console.log(error)
                    }
                    else {
                         console.log(error)
                    }
                    handleOnSuccess();
                    setTimeout(() => {
                         handleRefresher()
                    }, 1000);
               }



          }

     }



     const handleDelete = async () => {
          const response = await fetch('https://coop-backend-v1.herokuapp.com/api/additional/' + id, {
               method: 'DELETE',
               headers: {
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()
          if (response.ok) {
               console.log('deleted', json)
          }
          window.location.reload();
     }




     return (

          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>


                                   <div style={{ height: 500, width: '100%' }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                  <DatePicker
                                                       label="Date From"
                                                       value={date_from}
                                                       inputFormat="MM-DD-YYYY"
                                                       onChange={convertDateToStringFrom}
                                                       renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                  />
                                             </LocalizationProvider>
                                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                  <DatePicker
                                                       label="Date To"
                                                       value={date_to}
                                                       inputFormat="MM-DD-YYYY"
                                                       onChange={convertDateToStringTo}
                                                       renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                  />
                                             </LocalizationProvider>
                                        </div>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={additionals}
                                             columns={columns_additionals}
                                             pageSize={7}
                                             rowsPerPageOptions={[10]}
                                             style={{ marginBottom: "20px" }}
                                             onRowClick={handleRowClick}
                                        />
                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Search Employee"
                                             fullWidth
                                             select
                                             style={{ paddingBottom: "20px" }}
                                             onChange={handleName}
                                             value={name}
                                        >
                                             <MenuItem value={'all'}>All</MenuItem>
                                             {emp.map((data) => {
                                                  // return <MenuItem key={data._id} value={data.firstname + " " + data.lastname}>{data.employee_id + " - " + data.firstname + " " + data.lastname}</MenuItem>
                                                  return <MenuItem key={data._id} value={data.employee_id + " - " + data.firstname + " " + data.lastname}>{data.employee_id + " - " + data.firstname + " " + data.lastname}</MenuItem>
                                             })}
                                        </TextField>


                                        <ButtonContainer>
                                             <div>
                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleOpenAddAdditionals}>
                                                            Add New Deduction / Earnings
                                                       </Button>
                                                  </ThemeProvider>
                                             </div>
                                             <EditDeleteContainer>

                                                  <ThemeProvider theme={theme}>
                                                       {/* <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="blue" onClick={handleOpenEdit}>
                                                            Edit
                                                       </Button> */}
                                                       <Button style={{ marginTop: "20px" }} variant="outlined" color="red" onClick={handleOpenDelete}>
                                                            Delete
                                                       </Button>
                                                  </ThemeProvider>
                                             </EditDeleteContainer>
                                        </ButtonContainer>

                                        <Dialog
                                             fullScreen={fullScreen}
                                             open={openAddAdditionals}
                                             onClose={handleCloseAddAdditionals}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                        >
                                             <DialogTitle id="alert-dialog-title">
                                                  Add Earnings / Deduction
                                             </DialogTitle>
                                             <DialogContent style={{ height: '900px', paddingTop: '20px' }}>
                                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                       <DatePicker
                                                            label="Date"
                                                            value={date}
                                                            inputFormat="MM-DD-YYYY"
                                                            onChange={convertDateToString}
                                                            renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                       />
                                                  </LocalizationProvider>
                                                  {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up the form completely. Remember that, unused fields should be "0"</Alert> : ""}
                                                  {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Successfully Saved</Alert> : ""}
                                                  <TextField
                                                       required
                                                       id="outlined-required"
                                                       label="Search Employee"
                                                       fullWidth
                                                       select
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handleName}
                                                       value={name}
                                                  >
                                                       {emp.map((data) => {
                                                            // return <MenuItem key={data._id} value={data.firstname + " " + data.lastname}>{data.employee_id + " - " + data.firstname + " " + data.lastname}</MenuItem>
                                                            return <MenuItem key={data._id} value={data.employee_id + " - " + data.firstname + " " + data.lastname}>{data.employee_id + " - " + data.firstname + " " + data.lastname}</MenuItem>
                                                       })}
                                                  </TextField>

                                                  <TextField
                                                       required
                                                       id="outlined-required"
                                                       label="Employee_id"
                                                       fullWidth
                                                       style={{ paddingBottom: "80px" }}
                                                       value={employeeId}
                                                       InputProps={{
                                                            readOnly: true,
                                                       }}
                                                  />

                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="SSS"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlesss}
                                                       value={sss}
                                                  />

                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Philhealth"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlephilhealth}
                                                       value={philhealth}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="WTAX"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlewtax}
                                                       value={wtax}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Pagibig"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlepagibig}
                                                       value={pagibig}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Lodging"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlelodging}
                                                       value={lodging}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Water and Electricity"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlewater_electricity}
                                                       value={water_electricity}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="HMO"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlehmo}
                                                       value={hmo}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Share Capital"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handleshare_capital}
                                                       value={share_capital}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="HHHC Savings"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlehhhc_savings}
                                                       value={hhhc_savings}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="HHHC Membership Fee"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlehhhc_membership_fee}
                                                       value={hhhc_membership_fee}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Cash Advances"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlecash_advances}
                                                       value={cash_advances}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Pay Adjustment - (Deduction)"
                                                       style={{ paddingBottom: "20px" }}
                                                       o onChange={handlepay_adjustment_deduction}
                                                       value={pay_adjustment_deduction}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Other Deduction"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handleother_deduction}
                                                       value={other_deduction}
                                                  />
                                                  <TotalsContainer>
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Total Deduction"
                                                            fullWidth
                                                            style={{ marginBottom: "20px", paddingRight: "10px" }}
                                                            value={total_deduction}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <ThemeProvider theme={theme}>
                                                            <Button variant="outlined" color="green" onClick={handleCalculateTotalCollections}>
                                                                 Calculate
                                                            </Button>
                                                       </ThemeProvider>
                                                  </TotalsContainer>
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Allowance"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handleallowance}
                                                       value={allowance}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Pay Adjustment - (Earnings)"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handlepay_adjustment_earnings}
                                                       value={pay_adjustment_earnings}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Other Earnings"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={handleother_earnings}
                                                       value={other_earnings}
                                                  />
                                                  <TotalsContainer>
                                                       <TextField
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            id="outlined-required"
                                                            label="Total Earnings"
                                                            style={{ paddingBottom: "20px", marginRight: "10px" }}
                                                            value={total_earnings}
                                                       />
                                                       <ThemeProvider theme={theme}>
                                                            <Button variant="outlined" color="green" onClick={handleCalculateTotalCollections}>
                                                                 Calculate
                                                            </Button>
                                                       </ThemeProvider>
                                                       {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up the form completely. Remember that, unused fields should be "0"</Alert> : ""}
                                                       {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Successfully Saved</Alert> : ""}
                                                  </TotalsContainer>




                                             </DialogContent>
                                             <DialogActions>
                                                  {/* <Button onClick={handleAdd}>Add</Button> */}
                                                  <Button onClick={handleCloseAddAdditionals} autoFocus>
                                                       Cancel
                                                  </Button>
                                                  <Button onClick={handleAddAdditional}>Add</Button>
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

export default Additionals