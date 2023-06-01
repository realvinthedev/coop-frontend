
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
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EarbudsOutlined, TableRows } from '@mui/icons-material';
import PayslipPrinter from '../components/PayslipPrinter';


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
const TotalsContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Main = styled.div`
    width: 1400px;
    height: 800px;
    
`
const Others = styled.div`
    
`
const CheckContainer = styled.div`
     display: flex;
     flex-direction: column;
`
const TimeContainer = styled.div`
     display: flex;
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
const ButtonContainer = styled.div`
     display: flex;
     justify-content: space-between;
`
const EditDeleteContainer = styled.div`
    display: flex;
    justify-content: right;
`
const DateContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const TablesContainer = styled.div`
     display: flex;
     justify-content: space-between;

`
const NameIDContainer = styled.div`
     display: flex;
     justify-content: space-between;
     margin-top: 20px;
`
const columns = [
     { field: 'name', headerName: 'Name', width: 100 },
];

function createData(name, calories, fat, carbs, protein) {
     return { name, calories, fat, carbs, protein };
}


const Payroll = (props) => {
     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
     const [query, setQuery] = useState('')
     const { user } = useAuthContext()
     const [openAdd, setOpenAdd] = useState(false);
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);


     const [current_date, setCurrent_date] = useState('January');
     const [payroll, setPayroll] = useState([]);
     const [name, setName] = useState("");
     const [employeeId, setEmployeeId] = useState('')
     const [start_date, setStartDate] = useState("");
     const [end_date, setEndDate] = useState("");
     const [month, setMonth] = useState('January');

     const [period, setPeriod] = useState('First Half');

     const handleMonthChange = (e) => {
          setMonth(e.target.value)

     }
     useEffect(() => {
          handleDates();
     }, [month])

     useEffect(() => {
          handleDates();
     }, [period])
     // useEffect(() => {
     //      calculateGrossPay()
     // }, [user, month, period, name, employeeId])
     const handleDates = () => {
          if (month == "january" && period == "first") {
               setStartDate(`01-01-2023`)
               setEndDate(`01-15-2023`)
          }
          if (month == "january" && period == "second") {
               setStartDate(`01-16-2023`)
               setEndDate(`01-31-2023`)
          }

          if (month == "february" && period == "first") {
               setStartDate(`02-01-2023`)
               setEndDate(`02-15-2023`)
          }
          if (month == "february" && period == "second") {
               setStartDate(`02-16-2023`)
               setEndDate(`02-29-2023`)
          }

          if (month == "march" && period == "first") {
               setStartDate(`03-01-2023`)
               setEndDate(`03-15-2023`)
          }
          if (month == "march" && period == "second") {
               setStartDate(`03-16-2023`)
               setEndDate(`03-31-2023`)
          }

          if (month == "april" && period == "first") {
               setStartDate(`04-01-2023`)
               setEndDate(`04-15-2023`)
          }
          if (month == "april" && period == "second") {
               setStartDate(`04-16-2023`)
               setEndDate(`04-30-2023`)
          }

          if (month == "may" && period == "first") {
               setStartDate(`05-01-2023`)
               setEndDate(`05-15-2023`)
          }
          if (month == "may" && period == "second") {
               setStartDate(`05-16-2023`)
               setEndDate(`05-31-2023`)
          }

          if (month == "june" && period == "first") {
               setStartDate(`06-01-2023`)
               setEndDate(`06-15-2023`)
          }
          if (month == "june" && period == "second") {
               setStartDate(`06-16-2023`)
               setEndDate(`06-30-2023`)
          }

          if (month == "july" && period == "first") {
               setStartDate(`07-01-2023`)
               setEndDate(`07-15-2023`)
          }
          if (month == "july" && period == "second") {
               setStartDate(`07-16-2023`)
               setEndDate(`07-31-2023`)
          }

          if (month == "august" && period == "first") {
               setStartDate(`08-01-2023`)
               setEndDate(`08-15-2023`)
          }
          if (month == "august" && period == "second") {
               setStartDate(`08-16-2023`)
               setEndDate(`08-31-2023`)
          }

          if (month == "september" && period == "first") {
               setStartDate(`09-01-2023`)
               setEndDate(`09-15-2023`)
          }
          if (month == "september" && period == "second") {
               setStartDate(`09-16-2023`)
               setEndDate(`09-30-2023`)
          }

          if (month == "october" && period == "first") {
               setStartDate(`10-01-2023`)
               setEndDate(`10-15-2023`)
          }
          if (month == "october" && period == "second") {
               setStartDate(`10-16-2023`)
               setEndDate(`10-31-2023`)
          }

          if (month == "november" && period == "first") {
               setStartDate(`11-01-2023`)
               setEndDate(`11-15-2023`)
          }
          if (month == "november" && period == "second") {
               setStartDate(`11-16-2023`)
               setEndDate(`11-30-2023`)
          }

          if (month == "december" && period == "first") {
               setStartDate(`12-01-2023`)
               setEndDate(`12-15-2023`)
          }
          if (month == "december" && period == "second") {
               setStartDate(`12-16-2023`)
               setEndDate(`12-31-2023`)
          }
     }



     const handlePeriodChange = (e) => {
          setPeriod(e.target.value)
     }
     const [date, setDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const convertDateToString = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setDate(dateString)
          setCurrent_date(dateString)
     };

     const handleOpenAdd = () => {
          setOpenAdd(true);
     };
     const handleCloseAdd = () => {
          setOpenAdd(false);
     };

     const handleOpenEdit = () => {
          if (id == "") {
               setOpenWarning(true)
          }
          else {
               setOpenEdit(true);
          }

     };
     const handleOpenDelete = () => {
          if (id == "") {
               setOpenWarning(true)
          }
          else {
               setOpenDelete(true);
          }

     };

     const handleAdd = () => {

     }
     const handleName = (event) => {
          const name = event.target.value;
          setName(name)
          const firstWord = name.split(" ")[0];
          setEmployeeId(firstWord)

     }

     const [filtered_employee_dtr, setFiltered_employee_dtr] = useState([])


     const [employee_dtr, setEmployee_dtr] = useState([])
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch(`https://inquisitive-red-sun-hat.cyclic.app/api/dtr/employee/${employeeId}`, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const date = item.date
                         return date >= start_date && date <= end_date

                    });
                    setFiltered_employee_dtr(filteredData)
                    console.log(filtered_employee_dtr)
                    setEmployee_dtr(json)

               }
          }
          if (user) {

               fetchEmp();
          }
     }, [employeeId, start_date, end_date, period])






     const [filtered_additional, setFiltered_Additional] = useState([]);
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/additional/' + employeeId, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const date = item.date_covered
                         return date >= start_date && date <= end_date

                    });
                    setFiltered_Additional(filteredData)
               }
          }
          if (user) {
               fetchEmp();
               console.log(filtered_additional)
          }
     }, [employeeId, start_date, end_date, period, name])






     const [emp, setEmp] = useState([])
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/employee', {
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
     }, [employeeId])


     const [full_emp, setFullEmp] = useState([])
     const [default_base, setdefault_base] = useState(0)
     const [default_bimonthly, setdefault_bimonthly] = useState(0)
     const [default_daily, setdefault_daily] = useState(0)
     const [default_hourly, setdefault_hourly] = useState(0)
     const [default_minute, setdefault_minute] = useState(0)
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/employee/' + employeeId, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setdefault_base(json.base_salary ? json.base_salary : 0)
                    setdefault_bimonthly(json.bimonthly_salary ? json.bimonthly_salary : 0)
                    setdefault_daily(json.daily_salary ? json.daily_salary : 0)
                    setdefault_hourly(json.hourly_salary ? json.hourly_salary : 0)
                    setdefault_minute(json.minute_salary ? json.minute_salary : 0)
                    // setdefault_base(json.base_salary ? json.base_salary.toLocaleString() : 0)
                    // setdefault_bimonthly(json.bimonthly_salary ? json.bimonthly_salary.toLocaleString() : 0)
                    // setdefault_daily(json.daily_salary ? json.daily_salary.toLocaleString() : 0)
                    // setdefault_hourly(json.hourly_salary ? json.hourly_salary.toLocaleString() : 0)
                    // setdefault_minute(json.minute_salary ? json.minute_salary.toLocaleString() : 0)
                    setFullEmp(json)
               }
          }
          if (user) {
               fetchEmp();
          }
     }, [employeeId])
















     //code for accumulating total


     const [total, setTotal] = useState({
          total_working_hour: 0,
          regular_ot_hours: 0,
          restday_ot_hours: 0,
          special_ot_hours: 0,
          legal_ot_hours: 0,

          total_tardiness_min: 0,
          is_tardiness: 0,

          vl_hours: 0,
          sl_hours: 0,
          el_hours: 0,
          vl_nopay_hours: 0,
          sl_nopay_hours: 0,
          el_nopay_hours: 0,

          absent_hours: 0,


     });





     useEffect(() => {
          let
               total_working_hour = 0,
               regular_ot_hours = 0,
               restday_ot_hours = 0,
               special_ot_hours = 0,
               legal_ot_hours = 0,

               total_tardiness_min = 0,
               is_tardiness = 0,

               vl_hours = 0,
               sl_hours = 0,
               el_hours = 0,
               vl_nopay_hours = 0,
               sl_nopay_hours = 0,
               el_nopay_hours = 0,

               absent_hours = 0



          filtered_employee_dtr.forEach((item) => {
               total_working_hour += item.total_working_hour
               regular_ot_hours += item.regular_ot_hours
               restday_ot_hours += item.restday_ot_hours
               special_ot_hours += item.special_ot_hours
               legal_ot_hours += item.legal_ot_hours

               total_tardiness_min += item.total_tardiness_min
               is_tardiness += item.is_tardiness

               vl_hours += item.vl_hours
               sl_hours += item.sl_hours
               el_hours += item.el_hours
               vl_nopay_hours += item.vl_nopay_hours
               sl_nopay_hours += item.sl_nopay_hours
               el_nopay_hours += item.el_nopay_hours

               absent_hours += item.absent_hours
          });


          setTotal({
               total_working_hour: total_working_hour,
               regular_ot_hours: regular_ot_hours,
               restday_ot_hours: restday_ot_hours,
               special_ot_hours: special_ot_hours,
               legal_ot_hours: legal_ot_hours,

               total_tardiness_min: total_tardiness_min,
               is_tardiness: is_tardiness,

               vl_hours: vl_hours,
               sl_hours: sl_hours,
               el_hours: el_hours,
               vl_nopay_hours: vl_nopay_hours,
               sl_nopay_hours: sl_nopay_hours,
               el_nopay_hours: el_nopay_hours,

               absent_hours: absent_hours,


          });
     }, [filtered_employee_dtr]);




     const [final_gross_pay, setfinal_gross_pay] = useState(0);
     const [final_deduction, setfinal_deduction] = useState(0);
     const [final_earnings, setfinal_earnings] = useState(0);
     const [final_net_pay, setfinal_net_pay] = useState(0);
     const [grosspay_without_earnings, setgrosspay_without_earnings] = useState(0);



     const calculateGrossPay = () => {

          let total_working_hour = total.total_working_hour

          let regular_ot_hours = total.regular_ot_hours
          let restday_ot_hours = total.restday_ot_hours
          let special_ot_hours = total.special_ot_hours
          let legal_ot_hours = total.legal_ot_hours
          let total_tardiness_min = total.total_tardiness_min
          let vl_hours = total.vl_hours
          let sl_hours = total.sl_hours
          let el_hours = total.el_hours
          let vl_nopay_hours = total.vl_nopay_hours
          let sl_nopay_hours = total.sl_nopay_hours
          let el_nopay_hours = total.el_nopay_hours
          let absent_hours = total.absent_hours
          let final_bimonthly_pay = default_bimonthly;
          let final_total_working_hour = total_working_hour * default_hourly;
          let final_regular_ot_hours = (regular_ot_hours * default_hourly) + (regular_ot_hours * .25)
          let final_special_ot_hours = (special_ot_hours * default_hourly) + (special_ot_hours * .30)
          let final_legal_ot_hours = (restday_ot_hours * default_hourly) + (restday_ot_hours * .30)
          let final_total_tardiness_min = total_tardiness_min * default_minute;
          let final_vl_hours = vl_hours * default_hourly;
          let final_sl_hours = sl_hours * default_hourly;
          let final_el_hours = el_hours * default_hourly;
          let final_vl_nopay_hours = vl_nopay_hours * default_hourly
          let final_sl_nopay_hours = sl_nopay_hours * default_hourly
          let final_el_nopay_hours = el_nopay_hours * default_hourly
          let final_absent_hours = absent_hours * default_hourly

          let final_absent_deduction = final_vl_nopay_hours + final_sl_nopay_hours + final_el_nopay_hours + final_absent_hours + final_total_tardiness_min
          let grosspay = (final_bimonthly_pay + final_regular_ot_hours + final_special_ot_hours + final_legal_ot_hours + final_vl_hours + final_sl_hours + final_el_hours) - final_absent_deduction
          // let final_earnings = filtered_additional && filtered_additional[0]?.total_earnings
          // let final_deduction = filtered_additional && filtered_additional[0]?.total_deduction
          let final_earnings = filtered_additional && filtered_additional[0]?.total_earnings
          let final_deduction = filtered_additional && filtered_additional[0]?.total_deduction



         
          setfinal_earnings(final_earnings)
          //setfinal_gross_pay(grosspay )
          setfinal_gross_pay(grosspay + final_earnings)
          setgrosspay_without_earnings(grosspay)
          setfinal_deduction(final_deduction)
          setfinal_net_pay((grosspay - final_deduction) + final_earnings)
      
     }
     return (

          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateContainer>
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
                                        </DateContainer>
                                   </LocalizationProvider>
                                   {/* <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={payroll}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[10]}
                                             style={{ marginBottom: "20px" }}
                                        />
                                   </div> */}
                                   <NameIDContainer>
                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Search Employee"
                                             fullWidth
                                             style={{ marginRight: "10px" }}
                                             select
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
                                             style={{ paddingBottom: "40px" }}
                                             value={employeeId}

                                             InputProps={{
                                                  readOnly: true,
                                             }}
                                        />
                                   </NameIDContainer>
                                   <TableContainer component={Paper}
                                        style={{ width: "100%", marginBottom: "40px" }} >
                                        <Table sx={{ width: 1300 }} aria-label="simple table">
                                             <TableHead>
                                                  <TableRow  >
                                                       <TableCell >Employee ID</TableCell>
                                                       <TableCell>Name</TableCell>
                                                       <TableCell>Base Salary</TableCell>
                                                       <TableCell>Bimonthly Salary</TableCell>
                                                       <TableCell>Daily Rate</TableCell>
                                                       <TableCell>Hourly Rate</TableCell>
                                                       <TableCell>Minute Rate</TableCell>
                                                  </TableRow>
                                             </TableHead>
                                             <TableBody>
                                                  <TableRow >
                                                       <TableCell>{employeeId}</TableCell>
                                                       <TableCell>{name}</TableCell>
                                                       <TableCell>{default_base.toLocaleString()}</TableCell>
                                                       <TableCell>{default_bimonthly.toLocaleString()}</TableCell>
                                                       <TableCell>{default_daily.toLocaleString()}</TableCell>
                                                       <TableCell>{default_hourly.toLocaleString()}</TableCell>
                                                       <TableCell>{default_minute.toLocaleString()}</TableCell>
                                                  </TableRow>
                                             </TableBody>
                                        </Table>
                                   </TableContainer>
                                   <TablesContainer>
                                        <TableContainer component={Paper}
                                             style={{ width: "400px" }} >
                                             <Table sx={{ width: 400 }} aria-label="simple table">
                                                  <TableHead>
                                                       <TableCell style={{ backgroundColor: 'orange' }}>Summary</TableCell>
                                                       <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                  </TableHead>
                                                  <TableBody>
                                                       <TableRow >
                                                            <TableCell>Total Working in Hour</TableCell>
                                                            <TableCell>{total.total_working_hour}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Regular Overtime - in Hours</TableCell>
                                                            <TableCell>{total.regular_ot_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Restday Overtime - in Hours</TableCell>
                                                            <TableCell>{total.restday_ot_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Special Holiday Overtime - in Hours</TableCell>
                                                            <TableCell>{total.special_ot_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Legal Holiday Overtime - in Hours</TableCell>
                                                            <TableCell>{total.legal_ot_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Total Tardiness - in Mins</TableCell>
                                                            <TableCell>{total.total_tardiness_min}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Tardiness Count</TableCell>
                                                            <TableCell>{total.is_tardiness}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Paid VL Availed - in Hours</TableCell>
                                                            <TableCell>{total.vl_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Paid SL Availed - in Hours</TableCell>
                                                            <TableCell>{total.sl_hours}</TableCell>
                                                       </TableRow> <TableRow >
                                                            <TableCell>Paid EL Availed - in Hours</TableCell>
                                                            <TableCell>{total.el_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>NoPay VL Availed - in Hours</TableCell>
                                                            <TableCell>{total.vl_nopay_hours}</TableCell>
                                                       </TableRow> <TableRow >
                                                            <TableCell>NoPay SL Availed - in Hours</TableCell>
                                                            <TableCell>{total.sl_nopay_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>NoPay EL Availed - in Hours</TableCell>
                                                            <TableCell>{total.el_nopay_hours}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Total Absent - in Hours</TableCell>
                                                            <TableCell>{total.absent_hours}</TableCell>
                                                       </TableRow>
                                                  </TableBody>
                                             </Table>
                                        </TableContainer>

                                        <TableContainer component={Paper}
                                             style={{ width: "400px" }} >
                                             <Table sx={{ width: 400, marginBottom: "20px" }} aria-label="simple table">
                                                  <TableHead>
                                                       <TableCell style={{ backgroundColor: 'orange' }}>Earnings</TableCell>
                                                       <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                  </TableHead>
                                                  <TableBody>
                                                       <TableRow >
                                                            <TableCell>Allowances</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.allowance}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Pay Adjustment - (Earnings)</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.pay_adjustment_earnings}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Other Earnings</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.other_earnings}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell style={{ backgroundColor: '#e7e7e7' }}>Total Earnings</TableCell>
                                                            <TableCell style={{ backgroundColor: '#e7e7e7' }}>{filtered_additional && filtered_additional[0]?.total_earnings}</TableCell>
                                                       </TableRow>


                                                  </TableBody>
                                             </Table>
                                             <Table sx={{ width: 400 }} aria-label="simple table">
                                                  <TableHead>
                                                       <TableCell style={{ backgroundColor: 'orange' }}>Deduction</TableCell>
                                                       <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                  </TableHead>
                                                  <TableBody>
                                                       <TableRow >
                                                            <TableCell>SSS Contribution</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.sss}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>PhilHealth</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.philhealth}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>WTAX</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.wtax}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>PAGIBIG</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.pagibig}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Lodging</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.lodging}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Water/Electricity</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.water_electricity}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>HMO</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.hmo}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>HHHC Savings</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.hhhc_savings}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>HHHC Membership Fee</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.hhhc_membership_fee}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Cash Advances</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.cash_advances}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Pay Adjustment - (Deduction)</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.pay_adjustment_deduction}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Other Deductions</TableCell>
                                                            <TableCell>{filtered_additional && filtered_additional[0]?.other_deduction}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell style={{ backgroundColor: '#e7e7e7' }}>Total Deduction</TableCell>
                                                            <TableCell style={{ backgroundColor: '#e7e7e7' }}>{filtered_additional && filtered_additional[0]?.total_deduction}</TableCell>
                                                       </TableRow>
                                                  </TableBody>
                                             </Table>

                                        </TableContainer>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                             <TableContainer component={Paper}
                                                  style={{ width: "400px", height: "400px" }} >
                                                  <Table sx={{ width: 400 }} aria-label="simple table">
                                                       <TableHead>
                                                            <TableCell style={{ backgroundColor: 'orange' }}>Final Computation</TableCell>
                                                            <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                       </TableHead>
                                                       <TableBody>
                                                            {/* <TableRow >

                                                            <TableCell>Additional Earnings</TableCell>
                                                            <TableCell>{final_earnings ? final_earnings.toLocaleString() : 0}</TableCell>
                                                       </TableRow> */}
                                                            <TableRow >
                                                                 <TableCell>Gross Pay</TableCell>
                                                                 <TableCell>{final_gross_pay ? final_gross_pay.toLocaleString() : 0}</TableCell>
                                                            </TableRow>
                                                            <TableRow >
                                                                 <TableCell>Deductions</TableCell>
                                                                 <TableCell>{final_deduction ? final_deduction.toLocaleString() : 0}</TableCell>
                                                            </TableRow>
                                                            <TableRow >
                                                                 <TableCell>Net Pay</TableCell>
                                                                 <TableCell>{final_net_pay ? final_net_pay.toLocaleString() : 0}</TableCell>
                                                            </TableRow>


                                                            <TableRow >
                                                                 <p style={{ fontStyle: "italic", fontSize: "12px", marginTop: "30px" }}>
                                                                      Important: Please input all absences, leaves without pay, and other deductions before clicking Calculate
                                                                      to prevent incorrect Gross Pay Calculations. The reason for this is because the current gross pay calculation is:
                                                                 </p>
                                                                 <p>
                                                                      <span style={{ color: "red", fontSize: "12px" }}>Gross Pay = (Bimonthly salary - absences(etc)) +  Allowances</span>
                                                                 </p>

                                                            </TableRow>
                                                       </TableBody>

                                                  </Table>
                                             </TableContainer>
                                             <ThemeProvider theme={theme}>
                                                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", width: "100%" }}>
                                                       <Button style={{ marginRight: "10px" }} variant="outlined" color="green" onClick={calculateGrossPay}>
                                                            Calculate
                                                       </Button>
                                                       <Button style={{ width: "100%" }} variant="contained" color="green">
                                                            {filtered_additional.length > 0 ? (
                                                                 <PDFDownloadLink fileName="savings_summary" document={
                                                                      < PayslipPrinter
                                                                           month={month}
                                                                           period={period}
                                                                           employeeId={employeeId}
                                                                           name={name}
                                                                           grosspay_without_earnings={grosspay_without_earnings}
                                                                           filtered_additional={filtered_additional}
                                                                           filtered_employee_dtr={filtered_employee_dtr}
                                                                           default_base={default_base}
                                                                           default_bimonthly={default_bimonthly}
                                                                           default_daily={default_daily}
                                                                           default_hourly={default_hourly}
                                                                           default_minute={default_minute}
                                                                           final_gross_pay={final_gross_pay}
                                                                           final_deduction={final_deduction}
                                                                           final_earnings={final_earnings}
                                                                           final_net_pay={final_net_pay}
                                                                      />} >
                                                                      {({ loading }) => (loading ? 'Loading document...' : 'Download Payslip')}
                                                                 </PDFDownloadLink>
                                                            ) : (
                                                                 <p>Waiting for data...</p>
                                                            )}
                                                       </Button>
                                                  </div>
                                             </ThemeProvider>
                                        </div>
                                   </TablesContainer>


                                   <ButtonContainer>

                                        <EditDeleteContainer>
                                             <ThemeProvider theme={theme}>
                                             </ThemeProvider>
                                        </EditDeleteContainer>
                                   </ButtonContainer>

                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )
}

export default Payroll