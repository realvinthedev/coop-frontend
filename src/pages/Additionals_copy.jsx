
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
import { toast } from 'react-toastify';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import { isElement } from 'react-dom/test-utils';
import { ElevatorSharp } from '@mui/icons-material';
import { useRef } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Autocomplete from '@mui/material/Autocomplete';
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
    height: 750px;
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
     // const [date, setDate] = useState(() => {
     //      const date = new Date();

     //      let day = date.getDate().toString().padStart(2, '0');;
     //      let month = (date.getMonth() + 1).toString().padStart(2, '0');;
     //      let year = date.getFullYear();

     //      let currentDate = `${month}-${day}-${year}`;
     //      return currentDate
     // })

     const [date, setDate] = useState(() => {

     })
     const [period, setPeriod] = useState('first');
     const handleMonthChange = (e) => {
          setMonth(e.target.value)



     }
     const handlePeriodChange = (e) => {
          setPeriod(e.target.value)
     }



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



     const handleScroll = (event) => {
          event.preventDefault();
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
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
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
     // const convertDateToStringFrom = (date) => {
     //      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
     //      const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
     //      setdate_from(dateString)
     // };
     // const convertDateToStringTo = (date) => {
     //      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
     //      const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
     //      setdate_to(dateString)
     // };

     const [month, setMonth] = useState('january');
     const [start_date, setStartDate] = useState("");
     const [end_date, setEndDate] = useState("");

     useEffect(() => {
          handleDates();
     }, [month, name, end_date, start_date, period])


     const handleDates = () => {
          if (month == "january" && period == "first") {
               setStartDate(`01-01-2023`)
               setEndDate(`01-15-2023`)
               setDate(`01-01-2023`)
          }
          if (month == "january" && period == "second") {
               setStartDate(`01-16-2023`)
               setEndDate(`01-31-2023`)
               setDate(`01-16-2023`)
          }

          if (month == "february" && period == "first") {
               setStartDate(`02-01-2023`)
               setEndDate(`02-15-2023`)
               setDate(`02-01-2023`)
          }
          if (month == "february" && period == "second") {
               setStartDate(`02-16-2023`)
               setEndDate(`02-29-2023`)
               setDate(`02-16-2023`)
          }

          if (month == "march" && period == "first") {
               setStartDate(`03-01-2023`)
               setEndDate(`03-15-2023`)
               setDate(`03-01-2023`)
          }
          if (month == "march" && period == "second") {
               setStartDate(`03-16-2023`)
               setEndDate(`03-31-2023`)
               setDate(`03-16-2023`)
          }

          if (month == "april" && period == "first") {
               setStartDate(`04-01-2023`)
               setEndDate(`04-15-2023`)
               setDate(`04-01-2023`)
          }
          if (month == "april" && period == "second") {
               setStartDate(`04-16-2023`)
               setEndDate(`04-30-2023`)
               setDate(`04-16-2023`)
          }

          if (month == "may" && period == "first") {
               setStartDate(`05-01-2023`)
               setEndDate(`05-15-2023`)
               setDate(`05-01-2023`)
          }
          if (month == "may" && period == "second") {
               setStartDate(`05-16-2023`)
               setEndDate(`05-31-2023`)
               setDate(`05-16-2023`)
          }

          if (month == "june" && period == "first") {
               setStartDate(`06-01-2023`)
               setEndDate(`06-15-2023`)
               setDate(`06-01-2023`)
          }
          if (month == "june" && period == "second") {
               setStartDate(`06-16-2023`)
               setEndDate(`06-30-2023`)
               setDate(`06-16-2023`)
          }

          if (month == "july" && period == "first") {
               setStartDate(`07-01-2023`)
               setEndDate(`07-15-2023`)
               setDate(`07-01-2023`)
          }
          if (month == "july" && period == "second") {
               setStartDate(`07-16-2023`)
               setEndDate(`07-31-2023`)
               setDate(`07-16-2023`)
          }

          if (month == "august" && period == "first") {
               setStartDate(`08-01-2023`)
               setEndDate(`08-15-2023`)
               setDate(`08-01-2023`)
          }
          if (month == "august" && period == "second") {
               setStartDate(`08-16-2023`)
               setEndDate(`08-31-2023`)
               setDate(`08-16-2023`)
          }

          if (month == "september" && period == "first") {
               setStartDate(`09-01-2023`)
               setEndDate(`09-15-2023`)
               setDate(`09-01-2023`)
          }
          if (month == "september" && period == "second") {
               setStartDate(`09-16-2023`)
               setEndDate(`09-30-2023`)
               setDate(`09-16-2023`)
          }

          if (month == "october" && period == "first") {
               setStartDate(`10-01-2023`)
               setEndDate(`10-15-2023`)
               setDate(`10-01-2023`)
          }
          if (month == "october" && period == "second") {
               setStartDate(`10-16-2023`)
               setEndDate(`10-31-2023`)
               setDate(`10-16-2023`)
          }

          if (month == "november" && period == "first") {
               setStartDate(`11-01-2023`)
               setEndDate(`11-15-2023`)
               setDate(`11-01-2023`)
          }
          if (month == "november" && period == "second") {
               setStartDate(`11-16-2023`)
               setEndDate(`11-30-2023`)
               setDate(`11-16-2023`)
          }

          if (month == "december" && period == "first") {
               setStartDate(`12-01-2023`)
               setEndDate(`12-15-2023`)
               setDate(`12-01-2023`)
          }
          if (month == "december" && period == "second") {
               setStartDate(`12-16-2023`)
               setEndDate(`12-31-2023`)
               setDate(`12-16-2023`)
          }
     }

     const [additionals, setAdditionals] = useState([])
     useEffect(() => {
          const fetchAdditionals = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/additional', {
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
                              return date >= start_date && date <= end_date
                         }
                         else {
                              return date >= start_date && date <= end_date && employee_id == employeeId
                         }
                    });
                    setAdditionals(filteredData)
              
                    // setEmployee_dtr(json)

                    // const filteredData = json.filter(item => {
                    //      const date = item.date_covered
                    //      const employee_id = item.employee_id
                    //      if (name == "all") {
                    //           return date >= date_from && date <= date_to
                    //      }
                    //      else {
                    //           return date >= date_from && date <= date_to && employee_id == employeeId
                    //      }


                    // });


               }
          }
          if (user) {
               fetchAdditionals();
          }

     }, [start_date, end_date, name, refresher])



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
     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
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
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setsss(value);
     }
     const handlepagibig = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setpagibig(value);
     }
     const handlephilhealth = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setphilhealth(value);
     }
     const handlewtax = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setwtax(value);
     }
     const handlelodging = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setlodging(value);
     }
     const handlewater_electricity = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setwater_electricity(value);
     }
     const handlehmo = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          sethmo(value);
     }
     const handleshare_capital = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setshare_capital(value);
     }
     const handlehhhc_savings = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          sethhhc_savings(value);
     }
     const handlehhhc_membership_fee = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          sethhhc_membership_fee(value);
     }
     const handlecash_advances = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setcash_advances(value);
     }
     const handlepay_adjustment_deduction = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setpay_adjustment_deduction(value);
     }
     const handleother_deduction = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setother_deduction(value);
     }
     const handlepay_adjustment_earnings = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setpay_adjustment_earnings(value);
     }
     const handleother_earnings = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
          setother_earnings(value);
     }
     const handleallowance = (event) => {
          const value = event.target.value.replace(/[^0-9.]/g, '');
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
          if (name === "" || employeeId === "") {
               errorToast('Fill up the required fields completely')
          }
          else {
               if (!user) {
                    errorToast('You must log in again first.')
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
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/additional', {
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
                    successToast('Added Successfully')
                    handleCloseAddAdditionals();
                    handleRefresher()
               }



          }

     }



     const handleDelete = async () => {
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/additional/' + id, {
               method: 'DELETE',
               headers: {
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()
          if (response.ok) {
               console.log('deleted', json)
          }
          successToast('Deleted Successfully')
          handleCloseDelete()
          handleRefresher()
     }


     useEffect(() => {
          handleCalculateTotalCollections();
     }, [sss, philhealth, pagibig, wtax, lodging, water_electricity, hmo, share_capital, hhhc_membership_fee, hhhc_savings, cash_advances, pay_adjustment_deduction, other_deduction, allowance, pay_adjustment_earnings, other_earnings])

     const handleChange = (event, newValue) => {
          settabvalue(newValue);
     };
     const [tabvalue, settabvalue] = React.useState('1');
     const handleGoToSummary = () => {
          // setbuttonReceiptDisabled(true)
          settabvalue('2')
     }
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
                                                       <Tab label="All Employees" value="1" />
                                                       <Tab label="Summary" value="2" onClick={handleGoToSummary} disabled />
                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">


                                                  <div style={{ height: 400, width: '100%' }}>
                                                       <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Month"
                                                                 fullWidth
                                                                 select
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={handleMonthChange}
                                                                 value={month}
                                                            >
                                                                 <MenuItem value={'january'}>January 2023</MenuItem>
                                                                 <MenuItem value={'february'}>February 2023</MenuItem>
                                                                 <MenuItem value={'march'}>March 2023</MenuItem>
                                                                 <MenuItem value={'april'}>April 2023</MenuItem>
                                                                 <MenuItem value={'may'}>May 2023</MenuItem>
                                                                 <MenuItem value={'june'}>June 2023</MenuItem>
                                                                 <MenuItem value={'july'}>July 2023</MenuItem>
                                                                 <MenuItem value={'august'}>August 2023</MenuItem>
                                                                 <MenuItem value={'september'}>September 2023</MenuItem>
                                                                 <MenuItem value={'october'}>October 2023</MenuItem>
                                                                 <MenuItem value={'november'}>November 2023</MenuItem>
                                                                 <MenuItem value={'december'}>December 2023</MenuItem>

                                                            </TextField>
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Period"
                                                                 fullWidth
                                                                 select
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={handlePeriodChange}
                                                                 value={period}
                                                            >
                                                                 <MenuItem value={'first'}>First Half</MenuItem>
                                                                 <MenuItem value={'second'}>Second Half</MenuItem>
                                                            </TextField>
                                                            <Autocomplete
                                                                 value={name}
                                                                
                                                                 onSelect={handleName}
                                                                 options={emp.map((data) => data.employee_id + " - " + data.firstname + " " + data.lastname)}
                                                                 renderInput={(params) => (
                                                                      <TextField
                                                                           {...params}
                                                                           required
                                                                           label="Search Employee"
                                                                           fullWidth
                                                                           style={{ paddingBottom: "20px", width: "500px" }}
                                                                      />
                                                                 )}
                                                            />
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

                                                                 <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                      <TextField
                                                                           required
                                                                           id="outlined-required"
                                                                           label="Month"
                                                                           fullWidth
                                                                           select
                                                                           style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                           onChange={handleMonthChange}
                                                                           value={month}
                                                                      >
                                                                           <MenuItem value={'january'}>January 2023</MenuItem>
                                                                           <MenuItem value={'february'}>February 2023</MenuItem>
                                                                           <MenuItem value={'march'}>March 2023</MenuItem>
                                                                           <MenuItem value={'april'}>April 2023</MenuItem>
                                                                           <MenuItem value={'may'}>May 2023</MenuItem>
                                                                           <MenuItem value={'june'}>June 2023</MenuItem>
                                                                           <MenuItem value={'july'}>July 2023</MenuItem>
                                                                           <MenuItem value={'august'}>August 2023</MenuItem>
                                                                           <MenuItem value={'september'}>September 2023</MenuItem>
                                                                           <MenuItem value={'october'}>October 2023</MenuItem>
                                                                           <MenuItem value={'november'}>November 2023</MenuItem>
                                                                           <MenuItem value={'december'}>December 2023</MenuItem>

                                                                      </TextField>
                                                                      <TextField
                                                                           required
                                                                           id="outlined-required"
                                                                           label="Period"
                                                                           fullWidth
                                                                           select
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={handlePeriodChange}
                                                                           value={period}
                                                                      >
                                                                           <MenuItem value={'first'}>First Half</MenuItem>
                                                                           <MenuItem value={'second'}>Second Half</MenuItem>
                                                                      </TextField>
                                                                 </div>
                                                                 {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up the form completely. Remember that, unused fields should be "0"</Alert> : ""}
                                                                 {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Successfully Saved</Alert> : ""}
                                                                 <Autocomplete
                                                                      value={name}
                                                                      
                                                                      onSelect={handleName}
                                                                      options={emp.map((data) => data.employee_id + " - " + data.firstname + " " + data.lastname)}
                                                                      renderInput={(params) => (
                                                                           <TextField
                                                                                {...params}
                                                                                required
                                                                                label="Search Employee"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                           />
                                                                      )}
                                                                 />

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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
                                                                    
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
                                                                 />
                                                                 <TotalsContainer>
                                                                      <TextField
                                                                           required
                                                                           id="outlined-required"
                                                                           label="Total Deduction"
                                                                           fullWidth
                                                                           style={{ marginBottom: "20px" }}
                                                                           value={total_deduction}
                                                                           InputProps={{
                                                                                readOnly: true,
                                                                           }}
                                                                      />

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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
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
                                                                      inputProps={{
                                                                           inputMode: 'decimal',
                                                                           step: '0.01',
                                                                      }}
                                                                 />
                                                                 <TotalsContainer>
                                                                      <TextField
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Total Earnings"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           value={total_earnings}
                                                                      />

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
                                             </TabPanel>
                                             <TabPanel value="2">
                                                                   //sample
                                             </TabPanel>
                                        </TabContext>
                                   </Box>
                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div>
     )
}

export default Additionals