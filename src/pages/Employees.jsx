import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { allGridColumnsFieldsSelector, DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../components/Navbar'
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuthContext } from '../hooks/useAuthContext'
import { useSignup } from '../hooks/useSignup';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableRowsOutlined } from '@mui/icons-material';
import EmployeePrinter from '../components/EmployeePrinter';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
     Tooltip,
} from 'react-tippy';
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
          orange: {
               main: '#c97618',
               contrastText: '#fff',
          }
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
    overflow: scroll;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
`
const FormContainer = styled.div`
     display: flex;
     padding-left: 20px;
     padding-right: 20px;
     flex-direction: column;
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
const FormSeparator = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding-bottom: 10px;
     padding-top: 50px;
     color: #000;
`
const IDFormSeparator = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding-bottom: 20px;
     
     color: #000;
`

const IDGeneratorContainer = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
`


const Employees = (props) => {
     const [employee_id, setEmployee_id] = useState('')
     const [firstname, setFirstname] = useState('')
     const [middlename, setMiddleName] = useState('')
     const [lastname, setLastname] = useState('')
     const [age, setAge] = useState('')
     const [birthday, setBirthday] = useState(null)
     const [address, setAddress] = useState('')
     const [email, setEmail] = useState('')
     const [contact_number, setContact_number] = useState('')
     const [membership_date, setmembership_date] = useState('')
     const [incase_of_emergency, setIncase_of_emergency] = useState('')
     const [job_title, setJob_title] = useState('')
     const [tabvalue, settabvalue] = React.useState('1');
     const [base_salary, setBase_salary] = useState(0)
     const [start_date, setStart_date] = useState('')
     const [end_date, setEnd_date] = useState('')
     const [contract, setContract] = useState('')
     const [department, setDepartment] = useState('')
     const [is_active, setIs_active] = useState(true)
     const [sss, setSss] = useState('')
     const [pagibig, setPagibig] = useState('')
     const [tin, setTin] = useState('')
     const [philhealth, setPhilhealth] = useState('')
     const [bank_name, setBank_name] = useState('')
     const [bank_account_number, setBank_account_number] = useState('')
     const [sick_leave, setSick_leave] = useState('')
     const [vacation_leave, setVacation_leave] = useState('')
     const [emergency_leave, setEmergencty_leave] = useState('')

     const [openError, setOpenError] = useState(false);
     const { user } = useAuthContext()
     const [refresher, setRefresher] = useState(0)

     const [errors, setError] = useState('')
     const [query, setQuery] = useState('')
     const [departmentfilter, setdepartmentfilter] = useState('all')
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openAdd, setOpenAdd] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);

     const [regular_ot, setregular_ot] = useState(0)
     const [restday_ot, setrestday_ot] = useState(0)
     const [special_ot, setspecial_ot] = useState(0)
     const [legal_ot, setlegal_ot] = useState(0)

     const [restday_first_eight_ot, setrestday_first_eight_ot] = useState(0)
     const [special_first_eight_ot, setspecial_first_eight_ot] = useState(0)
     const [legal_first_eight_ot, setlegal_first_eight_ot] = useState(0)



     const [employmentStatus, setemploymentStatus] = useState('regular')

     const { signup, error, isLoading } = useSignup()
     const handleRefresher = () => {
          setRefresher(Math.random())
     };
     const handleChange = (event, newValue) => {
          handleRefresher()
          settabvalue(newValue);
     };
     const handleClearInputs = () => {
          setEmployee_id('')
          setFirstname('')
          setMiddleName('')
          setLastname('')
          setAge('')
          setBirthday('')
          setAddress('')
          setEmail('')
          setContact_number('')
          setIncase_of_emergency('')
          setJob_title('')
          setBase_salary(0)
          setStart_date('')
          setEnd_date('')
          setContract('')
          setDepartment('')
          setIs_active(true)
          setSss('')
          setPagibig('')
          setTin('')
          setPhilhealth('')
          setBank_name('')
          setBank_account_number('')
          setSick_leave('')
          setVacation_leave('')
          setEmergencty_leave('')
          setregular_ot('')
          setrestday_ot('')
          setspecial_ot('')
          setlegal_ot('')
          setemploymentStatus('')

          setrestday_first_eight_ot('')
          setspecial_first_eight_ot('')
          setlegal_first_eight_ot('')

     }
     const handleOpenAdd = () => {
          handleClearInputs()
          setOpenAdd(true);
          // setDepartment_name('');
          // setDescription('')
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
               errorToast("Please select an item to edit")
          }
          else {
               setOpenEdit(true);
          }

     };
     const handleCloseEdit = () => {
          setOpenEdit(false);
     };

     const handleOnError = () => {
          setOpenError(true);
     };

     const handleOffError = () => {
          setOpenError(false);
     };

     const handleEmployeeId = () => {
          if (firstname === "" || lastname === "") {
               errorToast('Please provide firstname and lastname first.')
          }
          else {
               let num = Math.floor(Math.random() * 90000) + 10000;
               const value = firstname.charAt(0) + lastname.charAt(0) + num
               setEmployee_id(value)
          }

     }

     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
     };

     const [dept, setDept] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/departments', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setDept(json)
               }
          }
          if (user) {
               fetchDepartment();
          }


     }, [user])

     const columns = [
          { field: 'employee_id', headerName: 'Employee ID', width: 100 },
          { field: 'firstname', headerName: 'Firstname', width: 300, sortable: false },
          { field: 'middlename', headerName: 'Middlename', width: 300, sortable: false },
          { field: 'lastname', headerName: 'Lastname', width: 300, sortable: false },
          { field: 'age', headerName: 'Age', width: 300, sortable: false },
          { field: 'birthday', headerName: 'Birthday', width: 300, sortable: false },
          { field: 'address', headerName: 'City', width: 300, sortable: false },
          { field: 'email', headerName: 'Email', width: 300, sortable: false },
          { field: 'contact_number', headerName: 'Contact Number', width: 300, sortable: false },
          { field: 'incase_of_emergency', headerName: 'Incase of Emergency', width: 300, sortable: false },
          { field: 'job_title', headerName: 'Job Title', width: 300, sortable: false },
          { field: 'base_salary', headerName: 'Base Salary', width: 300, sortable: false },
          { field: 'bimonthly_salary', headerName: 'Bimonthly Salary', width: 300, sortable: false },
          { field: 'daily_salary', headerName: 'Daily Salary', width: 300, sortable: false },
          { field: 'hourly_salary', headerName: 'Hourly Salary', width: 300, sortable: false },
          { field: 'minute_salary', headerName: 'Minute Salary', width: 300, sortable: false },
          { field: 'start_date', headerName: 'Hired Date', width: 300, sortable: false },
          { field: 'end_date', headerName: 'End Date', width: 300, sortable: false },
          { field: 'employment_status', headerName: 'Employment Status', width: 300, sortable: false },
          { field: 'contract', headerName: 'Contract', width: 300, sortable: false },
          { field: 'department', headerName: 'Department', width: 300, sortable: false },
          { field: 'is_active', headerName: 'Is Active', width: 300, sortable: false },
          { field: 'sss', headerName: 'SSS', width: 300, sortable: false },
          { field: 'pagibig', headerName: 'Pagibig', width: 300, sortable: false },
          { field: 'tin', headerName: 'TIN', width: 300, sortable: false },
          { field: 'philhealth', headerName: 'Philhealth', width: 300, sortable: false },
          { field: 'bank_name', headerName: 'Bank Name', width: 300, sortable: false },
          { field: 'bank_account_number', headerName: 'Account Number', width: 300, sortable: false },
          { field: 'sick_leave', headerName: 'Sick Leave', width: 300, sortable: false },
          { field: 'vacation_leave', headerName: 'Vacation Leave', width: 300, sortable: false },
          { field: 'emergency_leave', headerName: 'Service Incentive Leave', width: 300, sortable: false },
          { field: 'regular_ot', headerName: 'Regular OT %', width: 300, sortable: false },
          { field: 'restday_ot', headerName: 'Restday OT %', width: 300, sortable: false },
          { field: 'special_ot', headerName: 'Special OT %', width: 300, sortable: false },
          { field: 'legal_ot', headerName: 'Legal OT %', width: 300, sortable: false },

          { field: 'restday_first_eight_ot', headerName: 'Restday First 8 Hours - OT%', width: 300, sortable: false },
          { field: 'special_first_eight_ot', headerName: 'Special First 8 Hours - OT%', width: 300, sortable: false },
          { field: 'legal_first_eight_ot', headerName: 'Legal First 8 Hours - OT%', width: 300, sortable: false },
     ];

     const handleAdd = async (e) => {
          e.preventDefault()
          const employees = {
               employee_id: employee_id,
               firstname: firstname,
               middlename: middlename,
               lastname: lastname,
               age: age,
               birthday: birthday,
               address: address,
               email: email,
               contact_number: contact_number,
               incase_of_emergency: incase_of_emergency,
               job_title: job_title,
               base_salary: base_salary,
               bimonthly_salary: employmentStatus != "daily" ? (base_salary / 2).toFixed(2) : base_salary,
               daily_salary: employmentStatus != "daily" ? (base_salary * 12 / 365).toFixed(2) : base_salary,
               hourly_salary: employmentStatus != "daily" ? ((base_salary * 12 / 365) / 8).toFixed(2) : (base_salary / 8).toFixed(2),
               minute_salary: employmentStatus != "daily" ? (((base_salary * 12 / 365) / 8) / 60).toFixed(2) : ((base_salary / 8) / 60).toFixed(2),
               start_date: start_date,
               end_date: end_date,
               employment_status: employmentStatus,
               contract: contract,
               department: department,
               is_active: is_active,
               sss: sss,
               pagibig: pagibig,
               tin: tin,
               philhealth: philhealth,
               bank_name: bank_name,
               bank_account_number: bank_account_number,
               sick_leave: sick_leave,
               vacation_leave: vacation_leave,
               emergency_leave: emergency_leave,
               regular_ot: regular_ot,
               restday_ot: restday_ot,
               special_ot: special_ot,
               legal_ot: legal_ot,

               restday_first_eight_ot: restday_first_eight_ot,
               special_first_eight_ot: special_first_eight_ot,
               legal_first_eight_ot: legal_first_eight_ot,

          }

          if (
               firstname === "" ||
               lastname === "" ||
               base_salary === "" ||
               employee_id === ""
          ) {
               errorToast('Fill up the required fields completely')
          }
          else {
               handleOffError()
               if (!user) {
                    console.log('You must be logged in first')
                    return
               }
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
                    method: 'POST',
                    body: JSON.stringify(employees),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })


               const member = {
                    member_id: employee_id,
                    firstname: firstname,
                    middlename: middlename,
                    lastname: lastname,
               }
               const res = await fetch('https://coop-back-zqr6.onrender.com/api/member/', {
                    method: 'POST',
                    body: JSON.stringify(member),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }

               })
               if (!res.ok) {
                    const errorResponse = await res.json();
                    console.error('Error response:', errorResponse);

               }



               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    setEmployee_id('')
                    setFirstname('')
                    setMiddleName('')
                    setLastname('')
                    setAge('')
                    setBirthday('')
                    setAddress('')
                    setEmail('')
                    setContact_number('')
                    setIncase_of_emergency('')
                    setJob_title('')
                    setBase_salary(0)
                    setStart_date('')
                    setEnd_date('')
                    setContract('')
                    setDepartment('')
                    setIs_active(true)
                    setSss('')
                    setPagibig('')
                    setTin('')
                    setemploymentStatus('')
                    setPhilhealth('')
                    setBank_name('')
                    setBank_account_number('')
                    setSick_leave('')
                    setVacation_leave('')
                    setEmergencty_leave('')
                    setlegal_ot('')
                    setspecial_ot('')
                    setrestday_ot('')
                    setregular_ot('')
                    setrestday_first_eight_ot('')
                    setspecial_first_eight_ot('')
                    setlegal_first_eight_ot('')

                    successToast('Added Successfully')
                    handleRefresher();
                    handleCloseAdd();
               }
          }


     }
     const handleAddMember = async (e) => {
          e.preventDefault()

          const member = {
               member_id: employee_id,
               firstname: firstname,
               middlename: middlename,
               lastname: lastname,
          }
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/member/', {
               method: 'POST',
               body: JSON.stringify(member),
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
               }

          })
          if (!response.ok) {
               const errorResponse = await response.json();
               console.error('Error response:', errorResponse);

          }

     }









     const handlePatch = async (e) => {
          e.preventDefault()
          const employees = {

               firstname: firstname,
               middlename: middlename,
               lastname: lastname,
               age: age,
               birthday: birthday,
               address: address,
               email: email,
               contact_number: contact_number,
               incase_of_emergency: incase_of_emergency,
               job_title: job_title,
               base_salary: base_salary,
               bimonthly_salary: employmentStatus != "daily" ? (base_salary / 2).toFixed(2) : base_salary,
               daily_salary: employmentStatus != "daily" ? (base_salary * 12 / 365).toFixed(2) : base_salary,
               hourly_salary: employmentStatus != "daily" ? ((base_salary * 12 / 365) / 8).toFixed(2) : (base_salary / 8).toFixed(2),
               minute_salary: employmentStatus != "daily" ? (((base_salary * 12 / 365) / 8) / 60).toFixed(2) : ((base_salary / 8) / 60).toFixed(2),
               start_date: start_date,
               end_date: end_date,
               employment_status: employmentStatus,
               contract: contract,
               department: department,
               is_active: is_active,
               sss: sss,
               pagibig: pagibig,
               tin: tin,
               philhealth: philhealth,
               bank_name: bank_name,
               bank_account_number: bank_account_number,
               sick_leave: sick_leave,
               vacation_leave: vacation_leave,
               emergency_leave: emergency_leave,
               regular_ot: regular_ot,
               restday_ot: restday_ot,
               special_ot: special_ot,
               legal_ot: legal_ot,
               restday_first_eight_ot: restday_first_eight_ot,
               special_first_eight_ot: special_first_eight_ot,
               legal_first_eight_ot: legal_first_eight_ot,


          }

          if (
               firstname === "" ||
               lastname === "" ||
               base_salary === "" ||
               employee_id === ""
          ) {
               errorToast('Fill up the required fields completely')
          }
          else {

               if (!user) {
                    console.log('You must be logged in first')
                    return
               }
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee/' + id, {
                    method: 'PATCH',
                    body: JSON.stringify(employees),
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
                    // setFirstname('')
                    // setMiddleName('')
                    // setLastname('')
                    // setAge('')
                    // setBirthday('')
                    // setAddress('')
                    // setEmail('')
                    // setContact_number('')
                    // setIncase_of_emergency('')
                    // setJob_title('')
                    // setBase_salary(0)
                    // setStart_date('')
                    // setEnd_date('')
                    // setContract('')
                    // setDepartment('')
                    // setIs_active('')
                    // setSss('')
                    // setPagibig('')
                    // setTin('')
                    // setPhilhealth('')
                    // setBank_name('')
                    // setBank_account_number('')
                    // setSick_leave('')
                    // setVacation_leave('')
                    // setEmergencty_leave('')
                    // setlegal_ot('')
                    // setspecial_ot('')
                    // setrestday_ot('')
                    // setregular_ot('')
                    // setrestday_first_eight_ot('')
                    // setspecial_first_eight_ot('')
                    // setlegal_first_eight_ot('')



                    successToast('Updated Successfully')
                    handleRefresher();
                    handleCloseEdit();
               }

          }

     }

     /**DELETE */
     const handleDelete = async () => {
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee/' + id, {
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
          handleRefresher();
          handleCloseDelete();
     }
     const [employees, setEmployee] = useState([])
     useEffect(() => {
          const fetchEmployees = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    if (departmentfilter === "all") {
                         setEmployee(json)
                    }
                    else {
                         const filteredData = json.filter(item => {
                              const department = item.department
                              return department === departmentfilter
                         });
                         setEmployee(filteredData)
                    }

               }
          }
          if (user) {
               fetchEmployees();
          }

     }, [user, refresher, departmentfilter])


     const handleRowClick = async (params) => {
          setEmployee_id(params.row.employee_id)
          setId(params.row._id);
          setFirstname(params.row.firstname)
          setMiddleName(params.row.middlename)
          setLastname(params.row.lastname)
          setAge(params.row.age)
          setBirthday(params.row.birthday)
          setAddress(params.row.address)
          setEmail(params.row.email)
          setContact_number(params.row.contact_number)
          setIncase_of_emergency(params.row.incase_of_emergency)
          setJob_title(params.row.job_title)
          setBase_salary(params.row.base_salary)
          setStart_date(params.row.start_date)
          setEnd_date(params.row.end_date)
          setemploymentStatus(params.row.employment_status)
          setContract(params.row.contract)
          setDepartment(params.row.department)
          setIs_active(params.row.is_active)
          setSss(params.row.sss)
          setPagibig(params.row.pagibig)
          setTin(params.row.tin)
          setPhilhealth(params.row.philhealth)
          setBank_name(params.row.bank_name)
          setBank_account_number(params.row.bank_account_number)
          setSick_leave(params.row.sick_leave)
          setVacation_leave(params.row.vacation_leave)
          setEmergencty_leave(params.row.emergency_leave)
          setlegal_ot(params.row.legal_ot)
          setspecial_ot(params.row.special_ot)
          setrestday_ot(params.row.restday_ot)
          setregular_ot(params.row.regular_ot)

          setrestday_first_eight_ot(params.row.restday_first_eight_ot)
          setspecial_first_eight_ot(params.row.special_first_eight_ot)
          setlegal_first_eight_ot(params.row.legal_first_eight_ot)


          console.log(is_active)

     };
     const handleGoToSavings = () => {
          // setbuttonReceiptDisabled(true)
          if (id === "") {
               errorToast("Select an employee first")
          }
          else {
               handleRefresher();
               settabvalue('2')
          }

     }
     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


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
                                                       <Tab label="Profile" value="2" onClick={handleGoToSavings} disabled />

                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
                                                  <SearchContainer>

                                                       <TextField
                                                            style={{ marginRight: "10px" }}
                                                            required
                                                            id="search"
                                                            label="Search"
                                                            fullWidth
                                                            onChange={(e) => setQuery(e.target.value)}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Filter by department"
                                                            fullWidth
                                                            select
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setdepartmentfilter(e.target.value)}
                                                            value={departmentfilter}
                                                       >
                                                            <MenuItem value="all">All Department</MenuItem>
                                                            {dept.map((data) => {
                                                                 return <MenuItem key={data._id} value={data.department_name}>{data.department_name}</MenuItem>
                                                            })}
                                                       </TextField>
                                                  </SearchContainer>
                                                  <div style={{ height: 385, width: '100%' }}>
                                                       <DataGrid
                                                            getRowId={(row) => row._id}
                                                            rows={employees.filter((employee) =>
                                                                 employee.firstname.toLowerCase().includes(query))}
                                                            columns={columns}
                                                            rowsPerPageOptions={[5]}
                                                            onRowClick={handleRowClick}
                                                       />
                                                       <ButtonContainer>
                                                            <ThemeProvider theme={theme}>
                                                                 <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleGoToSavings}>
                                                                      View Employee
                                                                 </Button>
                                                            </ThemeProvider>
                                                            <EditDeleteContainer>
                                                                 <ThemeProvider theme={theme}>
                                                                      <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleOpenAdd}>
                                                                           Add New
                                                                      </Button>
                                                                      <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="blue" onClick={handleOpenEdit}>
                                                                           Edit
                                                                      </Button>
                                                                      <Button style={{ marginTop: "20px" }} variant="outlined" color="red" onClick={handleOpenDelete}>
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
                                                                 {"Are you sure to delete selected item?"}
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
                                                            fullWidth
                                                            maxWidth="sm"
                                                       >
                                                            <DialogTitle id="alert-dialog-title">
                                                                 Editing Employee
                                                            </DialogTitle>
                                                            <DialogContent style={{ height: '700px', paddingTop: '20px' }}>
                                                                 {openError ? <Alert onClose={handleOffError} severity="error">Please fill up the form completely</Alert> : ""}
                                                                 <FormSeparator>
                                                                      Personal Details
                                                                      <span style={{ fontStyle: "italic", color: "#d13f3f", fontSize: "12px" }}>*required</span>
                                                                 </FormSeparator>

                                                                 <TextField
                                                                      disabled
                                                                      id="outlined-required"
                                                                      label="Employee ID"
                                                                      fullWidth
                                                                      value={employee_id}
                                                                      style={{ paddingBottom: "20px" }}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                                 <TextField
                                                                      // error={firstname === ""}
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Firstname"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setFirstname(e.target.value)}
                                                                      value={firstname}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Middlename"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setMiddleName(e.target.value)}
                                                                      value={middlename}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Lastname"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setLastname(e.target.value)}
                                                                      value={lastname}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Age"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setAge(e.target.value)}
                                                                      value={age}
                                                                 />
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="Birthday"
                                                                           value={birthday}
                                                                           onChange={(newValue) => { setBirthday(newValue) }}
                                                                           renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Email"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setEmail(e.target.value)}
                                                                      value={email}
                                                                 />
                                                                 <TextField
                                                                      type="number"
                                                                      id="outlined-required"
                                                                      label="Contact Number"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setContact_number(e.target.value)}
                                                                      value={contact_number}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Address"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setAddress(e.target.value)}
                                                                      value={address}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Incase of Emergency"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setIncase_of_emergency(e.target.value)}
                                                                      value={incase_of_emergency}
                                                                 />
                                                                 <FormSeparator>
                                                                      Job Details
                                                                      <span style={{ fontStyle: "italic", color: "#d13f3f", fontSize: "12px" }}>*required</span>
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Job Title"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setJob_title(e.target.value)}
                                                                      value={job_title}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Contract"
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setContract(e.target.value)}
                                                                      value={contract}
                                                                 >
                                                                      <MenuItem value={"Contractual"}>Contractual</MenuItem>
                                                                      <MenuItem value={"Permanent"}>Permanent</MenuItem>
                                                                      <MenuItem value={"Provisionary"}>Provisionary</MenuItem>
                                                                      <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                                                                 </TextField>
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Department"
                                                                      fullWidth
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setDepartment(e.target.value)}
                                                                      value={department}
                                                                 >
                                                                      {dept.map((data) => {
                                                                           return <MenuItem key={data._id} value={data.department_name}>{data.department_name}</MenuItem>
                                                                      })}
                                                                 </TextField>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Is Active?"
                                                                      fullWidth
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setIs_active(e.target.value)}
                                                                      value={is_active}
                                                                 >
                                                                      <MenuItem value={true}>Yes</MenuItem>
                                                                      <MenuItem value={false}>Not anymore</MenuItem>
                                                                 </TextField>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Employment Status"
                                                                      fullWidth
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setemploymentStatus(e.target.value)}
                                                                      value={employmentStatus}
                                                                 >
                                                                      <MenuItem value={"regular"}>Regular Employee</MenuItem>
                                                                      <MenuItem value={"daily"}>Daily Employee</MenuItem>
                                                                 </TextField>
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Base Salary"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => {
                                                                           setBase_salary(e.target.value)
                                                                      }}
                                                                      value={base_salary}

                                                                 />

                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="Date Hired"
                                                                           value={start_date}
                                                                           onChange={(newValue) => { setStart_date(newValue) }}
                                                                           renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="End Date"
                                                                           value={end_date}
                                                                           onChange={(newValue) => { setEnd_date(newValue) }}
                                                                           renderInput={(params) => <TextField fullWidth style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>

                                                                 <div style={{ display: 'flex', justifyContent: "center" }}>
                                                                      <div style={{ width: "100%", marginRight: "10px" }}>
                                                                           <FormSeparator>
                                                                                First 8 Hours

                                                                           </FormSeparator>
                                                                           <div style={{ marginBottom: "30px" }}>
                                                                                <Tooltip
                                                                                     html={(
                                                                                          <div style={{ fontSize: "12px", backgroundColor: "black", padding: "20px", color: "white", borderRadius: "20px", width: "400px" }}>
                                                                                               <p>
                                                                                                    Sample Scenario<br />
                                                                                                    <br />
                                                                                                    Day type: Special non working holiday<br />
                                                                                                    Daily Rate: P420.00 <br />
                                                                                                    Percentage Set: 30<br />
                                                                                                    <br />
                                                                                                    Calculation:
                                                                                                    P420 X .30 X 1day = P126.00
                                                                                               </p>
                                                                                          </div>
                                                                                     )}
                                                                                >
                                                                                     <div style={{ fontSize: "12px", color: "red" }}>Show Calculation</div>
                                                                                </Tooltip>
                                                                           </div>
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Restday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setrestday_first_eight_ot(e.target.value)}
                                                                                value={restday_first_eight_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Special Non Working"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setspecial_first_eight_ot(e.target.value)}
                                                                                value={special_first_eight_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Legal Holiday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setlegal_first_eight_ot(e.target.value)}
                                                                                value={legal_first_eight_ot}
                                                                           />
                                                                      </div>
                                                                      <div style={{ width: "100%" }}>
                                                                           <FormSeparator>
                                                                                Excess Hours %

                                                                           </FormSeparator>
                                                                           <div style={{ marginBottom: "30px" }}>
                                                                                <Tooltip
                                                                                     html={(
                                                                                          <div style={{ fontSize: "12px", backgroundColor: "black", padding: "20px", color: "white", borderRadius: "20px", width: "400px" }}>
                                                                                               <p>
                                                                                                    Sample Scenario<br />
                                                                                                    <br />
                                                                                                    Day type: Special non working holiday<br />
                                                                                                    Hourly Rate: P52.50 <br />
                                                                                                    Percentage Set: 30<br />
                                                                                                    Excess Hours: 2 hours <br />
                                                                                                    <br />
                                                                                                    Calculation:
                                                                                                    (P52.50  X .30) + P52.50 = P68.25
                                                                                               </p>
                                                                                          </div>
                                                                                     )}
                                                                                >
                                                                                     <div style={{ fontSize: "12px", color: "red" }}>Show Calculation</div>
                                                                                </Tooltip>
                                                                           </div>
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Regular Day"
                                                                                style={{ paddingBottom: "20px" }}
                                                                                fullWidth
                                                                                onChange={(e) => setregular_ot(e.target.value)}
                                                                                value={regular_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Restday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setrestday_ot(e.target.value)}
                                                                                value={restday_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Special Non Working"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setspecial_ot(e.target.value)}
                                                                                value={special_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Legal Holiday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setlegal_ot(e.target.value)}
                                                                                value={legal_ot}
                                                                           />
                                                                      </div>
                                                                 </div>

                                                                 <FormSeparator>
                                                                      Government Taxes
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="SSS"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setSss(e.target.value)}
                                                                      value={sss}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Pagibig"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setPagibig(e.target.value)}
                                                                      value={pagibig}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="TIN"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setTin(e.target.value)}
                                                                      value={tin}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Philhealth"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setPhilhealth(e.target.value)}
                                                                      value={philhealth}
                                                                 />
                                                                 <FormSeparator>
                                                                      Bank Details
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Bank Name"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setBank_name(e.target.value)}
                                                                      value={bank_name}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Account Number"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setBank_account_number(e.target.value)}
                                                                      value={bank_account_number}
                                                                 />
                                                                 <FormSeparator>
                                                                      Leave Credits
                                                                      <span style={{ fontStyle: "italic", color: "#d13f3f", fontSize: "12px" }}>*required</span>
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Vacation Leave"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setVacation_leave(e.target.value)}
                                                                      value={vacation_leave}
                                                                 />
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Sick Leave"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setSick_leave(e.target.value)}
                                                                      value={sick_leave}
                                                                 />
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Service Incentive Leave"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setEmergencty_leave(e.target.value)}
                                                                      value={emergency_leave}
                                                                 />




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
                                                            fullWidth
                                                            maxWidth="sm"
                                                       >
                                                            <DialogTitle id="alert-dialog-title">
                                                                 Adding New Employee
                                                            </DialogTitle>
                                                            <DialogContent style={{ height: '700px', paddingTop: '20px' }}>
                                                                 {openError ? <Alert onClose={handleOffError} severity="error">Please fill up the form completely</Alert> : ""}
                                                                 <FormSeparator>
                                                                      Personal Details
                                                                      <span style={{ fontStyle: "italic", color: "#d13f3f", fontSize: "12px" }}>*required</span>
                                                                 </FormSeparator>

                                                                 <TextField
                                                                      // error={firstname === ""}
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Firstname"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setFirstname(e.target.value)}
                                                                      value={firstname}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Middlename"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setMiddleName(e.target.value)}
                                                                      value={middlename}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Lastname"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setLastname(e.target.value)}
                                                                      value={lastname}
                                                                 />

                                                                 <IDGeneratorContainer>
                                                                      <TextField
                                                                           required
                                                                           id="outlined-required"
                                                                           label="Permanent Employee ID"
                                                                           fullWidth
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setEmployee_id(e.target.value)}
                                                                           value={employee_id}
                                                                           InputProps={{
                                                                                readOnly: true,
                                                                           }}
                                                                      />
                                                                      <ThemeProvider theme={theme}>
                                                                           <Button style={{ padding: "15px", marginLeft: "5px", marginBottom: "20px" }} variant="outlined" color="green" onClick={handleEmployeeId}>
                                                                                Generate
                                                                           </Button>
                                                                      </ThemeProvider>
                                                                 </IDGeneratorContainer>
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Age"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setAge(e.target.value)}
                                                                      value={age}
                                                                 />
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="Birthday"
                                                                           value={birthday}
                                                                           onChange={(newValue) => { setBirthday(newValue) }}
                                                                           renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Email"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setEmail(e.target.value)}
                                                                      value={email}
                                                                 />
                                                                 <TextField
                                                                      type="number"
                                                                      id="outlined-required"
                                                                      label="Contact Number"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setContact_number(e.target.value)}
                                                                      value={contact_number}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Address"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setAddress(e.target.value)}
                                                                      value={address}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Incase of Emergency"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setIncase_of_emergency(e.target.value)}
                                                                      value={incase_of_emergency}
                                                                 />
                                                                 <FormSeparator>
                                                                      Job Details
                                                                      <span style={{ fontStyle: "italic", color: "#d13f3f", fontSize: "12px" }}>*required</span>
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Job Title"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setJob_title(e.target.value)}
                                                                      value={job_title}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Contract"
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setContract(e.target.value)}
                                                                      value={contract}
                                                                 >
                                                                      <MenuItem value={"Contractual"}>Contractual</MenuItem>
                                                                      <MenuItem value={"Permanent"}>Permanent</MenuItem>
                                                                      <MenuItem value={"Provisionary"}>Provisionary</MenuItem>
                                                                      <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                                                                 </TextField>
                                                                 <TextField
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Department"
                                                                      fullWidth
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setDepartment(e.target.value)}
                                                                      value={department}
                                                                 >
                                                                      {dept.map((data) => {
                                                                           return <MenuItem key={data._id} value={data.department_name}>{data.department_name}</MenuItem>
                                                                      })}
                                                                 </TextField>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Is Active?"
                                                                      fullWidth
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setIs_active(e.target.value)}
                                                                      value={is_active}
                                                                 >
                                                                      <MenuItem value={true}>Yes</MenuItem>
                                                                      <MenuItem value={false}>Not anymore</MenuItem>
                                                                 </TextField>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Employment Status"
                                                                      fullWidth
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setemploymentStatus(e.target.value)}
                                                                      value={employmentStatus}
                                                                 >
                                                                      <MenuItem value={"regular"}>Regular Employee</MenuItem>
                                                                      <MenuItem value={"daily"}>Daily Employee</MenuItem>
                                                                 </TextField>
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Base Salary"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => {
                                                                           setBase_salary(e.target.value)
                                                                      }}
                                                                      value={base_salary}

                                                                 />

                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="Date Hired"
                                                                           value={start_date}
                                                                           onChange={(newValue) => { setStart_date(newValue) }}
                                                                           renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="End Date"
                                                                           value={end_date}
                                                                           onChange={(newValue) => { setEnd_date(newValue) }}
                                                                           renderInput={(params) => <TextField fullWidth style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>

                                                                 <div style={{ display: 'flex', justifyContent: "center" }}>
                                                                      <div style={{ width: "100%", marginRight: "10px" }}>
                                                                           <FormSeparator>
                                                                                First 8 Hours

                                                                           </FormSeparator>
                                                                           <div style={{ marginBottom: "30px" }}>
                                                                                <Tooltip
                                                                                     html={(
                                                                                          <div style={{ fontSize: "12px", backgroundColor: "black", padding: "20px", color: "white", borderRadius: "20px", width: "400px" }}>
                                                                                               <p>
                                                                                                    Sample Scenario<br />
                                                                                                    <br />
                                                                                                    Day type: Special non working holiday<br />
                                                                                                    Daily Rate: P420.00 <br />
                                                                                                    Percentage Set: 30<br />
                                                                                                    <br />
                                                                                                    Calculation:
                                                                                                    P420 X .30 X 1day = P126.00
                                                                                               </p>
                                                                                          </div>
                                                                                     )}
                                                                                >
                                                                                     <div style={{ fontSize: "12px", color: "red" }}>Show Calculation</div>
                                                                                </Tooltip>
                                                                           </div>
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Restday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setrestday_first_eight_ot(e.target.value)}
                                                                                value={restday_first_eight_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Special Non Working"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setspecial_first_eight_ot(e.target.value)}
                                                                                value={special_first_eight_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Legal Holiday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setlegal_first_eight_ot(e.target.value)}
                                                                                value={legal_first_eight_ot}
                                                                           />
                                                                      </div>
                                                                      <div style={{ width: "100%" }}>
                                                                           <FormSeparator>
                                                                                Excess Hours %

                                                                           </FormSeparator>
                                                                           <div style={{ marginBottom: "30px" }}>
                                                                                <Tooltip
                                                                                     html={(
                                                                                          <div style={{ fontSize: "12px", backgroundColor: "black", padding: "20px", color: "white", borderRadius: "20px", width: "400px" }}>
                                                                                               <p>
                                                                                                    Sample Scenario<br />
                                                                                                    <br />
                                                                                                    Day type: Special non working holiday<br />
                                                                                                    Hourly Rate: P52.50 <br />
                                                                                                    Percentage Set: 30<br />
                                                                                                    Excess Hours: 2 hours <br />
                                                                                                    <br />
                                                                                                    Calculation:
                                                                                                    (P52.50  X .30) + P52.50 = P68.25
                                                                                               </p>
                                                                                          </div>
                                                                                     )}
                                                                                >
                                                                                     <div style={{ fontSize: "12px", color: "red" }}>Show Calculation</div>
                                                                                </Tooltip>
                                                                           </div>
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Regular Day"
                                                                                style={{ paddingBottom: "20px" }}
                                                                                fullWidth
                                                                                onChange={(e) => setregular_ot(e.target.value)}
                                                                                value={regular_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Restday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setrestday_ot(e.target.value)}
                                                                                value={restday_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Special Non Working"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setspecial_ot(e.target.value)}
                                                                                value={special_ot}
                                                                           />
                                                                           <TextField
                                                                                type="number"
                                                                                id="outlined-required"
                                                                                label="Legal Holiday"
                                                                                fullWidth
                                                                                style={{ paddingBottom: "20px" }}
                                                                                onChange={(e) => setlegal_ot(e.target.value)}
                                                                                value={legal_ot}
                                                                           />
                                                                      </div>
                                                                 </div>

                                                                 <FormSeparator>
                                                                      Government Taxes
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="SSS"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setSss(e.target.value)}
                                                                      value={sss}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Pagibig"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setPagibig(e.target.value)}
                                                                      value={pagibig}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="TIN"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setTin(e.target.value)}
                                                                      value={tin}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Philhealth"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setPhilhealth(e.target.value)}
                                                                      value={philhealth}
                                                                 />
                                                                 <FormSeparator>
                                                                      Bank Details
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Bank Name"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setBank_name(e.target.value)}
                                                                      value={bank_name}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Account Number"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setBank_account_number(e.target.value)}
                                                                      value={bank_account_number}
                                                                 />
                                                                 <FormSeparator>
                                                                      Leave Credits
                                                                      <span style={{ fontStyle: "italic", color: "#d13f3f", fontSize: "12px" }}>*required</span>
                                                                 </FormSeparator>
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Vacation Leave"
                                                                      style={{ paddingBottom: "20px" }}
                                                                      fullWidth
                                                                      onChange={(e) => setVacation_leave(e.target.value)}
                                                                      value={vacation_leave}
                                                                 />
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Sick Leave"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setSick_leave(e.target.value)}
                                                                      value={sick_leave}
                                                                 />
                                                                 <TextField
                                                                      type="number"
                                                                      required
                                                                      id="outlined-required"
                                                                      label="Service Incentive Leave"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setEmergencty_leave(e.target.value)}
                                                                      value={emergency_leave}
                                                                 />




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
                                             {/* kevin */}
                                             <TabPanel value="2">
                                                  <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                       <h3>Profile</h3>
                                                  </div>
                                                  <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                                                       <Table aria-label="simple table">
                                                            <TableBody>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Name</TableCell><TableCell>{firstname + " " + middlename + " " + lastname}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Age</TableCell><TableCell>{age}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Birthday</TableCell><TableCell>{birthday}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Email</TableCell><TableCell>{email}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Contact Number</TableCell><TableCell>{contact_number}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Address</TableCell><TableCell>{address}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Incase of Emergency</TableCell><TableCell>{incase_of_emergency}</TableCell></TableRow>
                                                            </TableBody>
                                                       </Table>
                                                  </TableContainer>
                                                  <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                       <h3>Job Details</h3>
                                                  </div>
                                                  <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                                                       <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableBody>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Job Title</TableCell><TableCell align="left">{job_title}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Contract</TableCell><TableCell align="left">{contract}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Department</TableCell><TableCell align="left">{department}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Is Active</TableCell><TableCell align="left">{is_active.toString()}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Base Salary</TableCell><TableCell align="left">{base_salary}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Hired Date</TableCell><TableCell align="left">{start_date}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>End Date</TableCell><TableCell align="left">{end_date}</TableCell></TableRow>
                                                            </TableBody>
                                                       </Table>
                                                  </TableContainer>




                                                  <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                       <h3>Overtime Percentage</h3>
                                                  </div>
                                                  <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                                                       <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                 <TableBody>

                                                                      <TableRow><TableCell sx={{ width: 300 }}>Restday - First 8 hours</TableCell><TableCell align="left">{restday_first_eight_ot}%</TableCell></TableRow>
                                                                      <TableRow><TableCell sx={{ width: 300 }}>Special Holiday - First 8 hours</TableCell><TableCell align="left">{special_first_eight_ot}%</TableCell></TableRow>
                                                                      <TableRow><TableCell sx={{ width: 300 }}>Legal Holiday - First 8 hours</TableCell><TableCell align="left">{legal_first_eight_ot}%</TableCell></TableRow>
                                                                 </TableBody>
                                                                 <TableBody>
                                                                      <TableRow><TableCell sx={{ width: 300 }}>Regular OT Percentage</TableCell><TableCell align="left">{regular_ot}%</TableCell></TableRow>
                                                                      <TableRow><TableCell sx={{ width: 300 }}>Restday OT Percentage</TableCell><TableCell align="left">{restday_ot}%</TableCell></TableRow>
                                                                      <TableRow><TableCell sx={{ width: 300 }}>Special OT Percentage</TableCell><TableCell align="left">{special_ot}%</TableCell></TableRow>
                                                                      <TableRow><TableCell sx={{ width: 300 }}>Legal OT Percentage</TableCell><TableCell align="left">{legal_ot}%</TableCell></TableRow>
                                                                 </TableBody>
                                                            </div>
                                                       </Table>
                                                  </TableContainer>


                                                  <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                       <h3>Governement Taxes</h3>
                                                  </div>
                                                  <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                                                       <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableBody>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>SSS Number</TableCell><TableCell align="left">{sss}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>PAGIBIG Number</TableCell><TableCell align="left">{pagibig}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>TIN Number</TableCell><TableCell align="left">{tin}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Philhealth Number</TableCell><TableCell align="left">{philhealth}</TableCell></TableRow>
                                                            </TableBody>
                                                       </Table>
                                                  </TableContainer>
                                                  <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                       <h3>Bank Details</h3>
                                                  </div>
                                                  <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                                                       <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableBody>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Account Name</TableCell><TableCell align="left">{bank_name}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Account Number</TableCell><TableCell align="left">{bank_account_number}</TableCell></TableRow>
                                                            </TableBody>
                                                       </Table>
                                                  </TableContainer>
                                                  <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                       <h3>Leave Credits</h3>
                                                  </div>
                                                  <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                                                       <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableBody>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Vacation Leave</TableCell><TableCell align="left">{vacation_leave}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Sick Leave</TableCell><TableCell align="left">{sick_leave}</TableCell></TableRow>
                                                                 <TableRow><TableCell sx={{ width: 300 }}>Service Incentive Leave</TableCell><TableCell align="left">{emergency_leave}</TableCell></TableRow>
                                                            </TableBody>
                                                       </Table>
                                                  </TableContainer>
                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ width: "100%", padding: "10px" }} variant="contained" color="orange">
                                                            <PDFDownloadLink fileName="employee_profile" document={
                                                                 < EmployeePrinter
                                                                      name={firstname + " " + middlename + " " + lastname}
                                                                      age={age}
                                                                      birthday={birthday}
                                                                      email={email}
                                                                      contact_number={contact_number}
                                                                      address={address}
                                                                      incase_of_emergency={incase_of_emergency}
                                                                      job_title={job_title}
                                                                      contract={contract}
                                                                      department={department}
                                                                      is_active={is_active.toString()}
                                                                      base_salary={base_salary}
                                                                      start_date={start_date}
                                                                      end_date={end_date}
                                                                      sss={sss}
                                                                      pagibig={pagibig}
                                                                      tin={tin}
                                                                      philhealth={philhealth}
                                                                      bank_name={bank_name}
                                                                      bank_account_number={bank_account_number}
                                                                      vacation_leave={vacation_leave}
                                                                      sick_leave={sick_leave}
                                                                      emergency_leave={emergency_leave}
                                                                      regular_ot={regular_ot}
                                                                      restday_ot={restday_ot}
                                                                      special_ot={special_ot}
                                                                      legal_ot={legal_ot}

                                                                      restday_first_eight_ot={restday_first_eight_ot}
                                                                      special_first_eight_ot={special_first_eight_ot}
                                                                      legal_first_eight_ot={legal_first_eight_ot}
                                                                 />} >
                                                                 {({ loading }) => (loading ? 'Loading document...' : 'Download Employee Summary')}
                                                            </PDFDownloadLink>
                                                       </Button>

                                                  </ThemeProvider>
                                             </TabPanel>
                                        </TabContext>
                                   </Box>


                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )
}

export default Employees