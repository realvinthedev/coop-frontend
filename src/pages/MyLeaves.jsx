
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MenuItem from '@mui/material/MenuItem';
import { Alert } from '@mui/material';
import { Try } from '@mui/icons-material';
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
    height: 400px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
    margin-bottom: 30px;
`
const CardRecord = styled.div`
    background-color: white;
    height: 350px;
    max-width: 300px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
`
const CardFileLeave = styled.div`
    background-color: white;
    height: 350px;
    max-width: 680px;
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
const CardLeaveContainer = styled.div`
     display: flex;
     justify-content: space-between;
`
const CardTitle = styled.h1`
    color: #f8951d;
    padding-bottom: 30px;
    `
const CardTitleHistory = styled.h1`
    color: #f8951d;
    `
const CardDescription = styled.p`
    color: #6d6d6d;
    padding-bottom: 10px;
`
/**GET REQUESTS */


const columns = [
     { field: 'employee_id', headerName: 'Employee ID', width: 100 },
     { field: 'employee_fullname', headerName: 'Name', width: 200, sortable: false },
     { field: 'leave_type', headerName: 'Type', width: 100, sortable: true },
     { field: 'date', headerName: 'Date', width: 110, sortable: true },
     { field: 'duration', headerName: 'Duration', width: 100, sortable: false },
     { field: 'status', headerName: 'Status', width: 100, sortable: true },
     { field: 'approver', headerName: 'Approver', width: 200, sortable: false }
];

const MyLeaves = (props) => {
     const [currentEmployee, setCurrentEmployee] = useState([])
     const { user } = useAuthContext()
     const currentUser = user.username
     const [type, setType] = useState('')
     const [date, setDate] = useState('')
     const [query, setQuery] = useState('')
     const [error, setError] = useState('')
     const [duration, setDuration] = useState('')
     const [firstname, setFirstname] = useState()
     const [reqBody, setReqBody] = useState('')
     const [lastname, setLastname] = useState()
     const [fullname, setFullname] = useState()
     const [sick, setSick] = useState()
     const [vacation, setVacation] = useState()
     const [emergency, setEmergency] = useState()
     const [random, setRandom] = useState(0)

     const [openError, setOpenError] = useState(false);
     const handleOnError = () => {
          setOpenError(true);
     };

     const randomGenerator = () => {
          let num = Math.floor(Math.random() * 90000) + 10000;
          setRandom(num)
     }

     const handleOffError = () => {
          setOpenError(false);
     };

     const handleAdd = async (e) => {
          e.preventDefault()


          console.log(reqBody)
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          const leaves = {
               employee_id: currentUser,
               employee_fullname: currentEmployee.length && currentEmployee[0].firstname + " " + currentEmployee[0].lastname,
               leave_type: type,
               date: date,
               duration: duration,
               status: "Pending",
          }

          const response = await fetch('https://coop-back-zqr6.onrender.com/api/leaves', {
               method: 'POST',
               body: JSON.stringify(leaves),
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
               handleOnError();
               setType('')
               setDate(null)
               setDuration('')
          }
          handlePatch()
     }
     const handlePatch = async () => {
          let heresthebody = {}

          if (!user) {
               console.log('You must be logged in first')
               return
          }


          if (type === "Vacation") {
               heresthebody = { vacation_leave: vacation - 1 }
          }
          else if (type === "Sick") {
               heresthebody = { sick_leave: sick - 1 }
          }
          else {
               heresthebody = { emergency_leave: emergency - 1 }
          }


          const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee/leave/' + currentUser, {
               method: 'PATCH',
               body: JSON.stringify(heresthebody),
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

          }
          console.log(sick, vacation, emergency)

     }
     const [leaveHistory, setLeaveHistory] = useState([])
     useEffect(() => {
          if (currentUser) {

               const fetchEmployee = async () => {
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
                         headers: {

                              'Authorization': `Bearer ${user.token}`
                         }
                    })
                    const json = await response.json()

                    if (response.ok) {
                         setCurrentEmployee(json.filter(employee => {
                              return employee.employee_id === currentUser
                         }))
                         setVacation(currentEmployee.length && currentEmployee[0].vacation_leave)
                         setSick(currentEmployee.length && currentEmployee[0].sick_leave)
                         setEmergency(currentEmployee.length && currentEmployee[0].emergency_leave)
                    }
               }
               fetchEmployee();
          }
          else {
               return
          }
          console.log(random)
     }, [random])

     useEffect(() => {
          const fetchLeaves = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/leaves', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setLeaveHistory(json.filter(leave => {
                         return leave.employee_id === currentUser
                    }))
               }
          }
          if (user) {
               fetchLeaves();
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
                                   <CardTitleHistory>Leaves History</CardTitleHistory>
                                   <div style={{ height: 300, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={leaveHistory.filter((leave) =>
                                                  leave.employee_id.toLowerCase().includes(query))}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[5]}

                                        />
                                   </div>
                              </Card>
                              <CardLeaveContainer>
                                   <CardRecord>

                                        <CardTitle>Available Leaves</CardTitle>
                                        {/* <CardDescription>Vacation Leave: {currentEmployee.length && currentEmployee[0].vacation_leave}</CardDescription> */}
                                        <CardDescription>Vacation Leave: {vacation}</CardDescription>
                                        <CardDescription>Sick Leave: {sick}</CardDescription>
                                        <CardDescription>Emergency Leave: {emergency}</CardDescription>
                                        <ThemeProvider theme={theme}>

                                             <Button style={{ marginTop: "10px", marginRight: "5px" }} variant="outlined" color="green" onClick={randomGenerator}>
                                                  Refresh
                                             </Button>

                                        </ThemeProvider>
                                   </CardRecord>
                                   <CardFileLeave>
                                        <CardTitle>File a Leaves</CardTitle>
                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Type"
                                             fullWidth
                                             select
                                             style={{ paddingBottom: "10px" }}
                                             onChange={(e) => setType(e.target.value)}
                                             value={type}
                                        >
                                             <MenuItem value={"Vacation"}>Vacation Leave</MenuItem>
                                             <MenuItem value={"Sick"}>Sick Leave</MenuItem>
                                             <MenuItem value={"Emergency"}>Emergency Leave</MenuItem>
                                        </TextField>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                             <DatePicker
                                                  label="Date"
                                                  value={date}
                                                  onChange={(newValue) => { setDate(newValue) }}
                                                  renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "10px" }}{...params} error={false} />}
                                             />
                                        </LocalizationProvider>
                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Duration"
                                             select
                                             style={{ paddingBottom: "10px" }}
                                             fullWidth
                                             onChange={(e) => setDuration(e.target.value)}
                                             value={duration}
                                        >
                                             <MenuItem value={"Wholeday"}>Wholeday</MenuItem>
                                             <MenuItem value={"Halfday"}>Halfday</MenuItem>
                                        </TextField>
                                        <ThemeProvider theme={theme}>
                                             {openError ? <Alert onClose={handleOffError} severity="success">Successfully Added</Alert> : ""}
                                             <Button style={{ marginTop: "10px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleAdd}>
                                                  Add New
                                             </Button>

                                        </ThemeProvider>
                                   </CardFileLeave>
                              </CardLeaveContainer>
                         </Main>
                    </Wrapper>
               </Container>
          </div>
     )

}

export default MyLeaves