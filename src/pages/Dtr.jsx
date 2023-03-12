
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
const CheckContainer = styled.div`
     display: flex;
     flex-direction: column;
`
const TimeContainer = styled.div`
     display: flex;
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
const ButtonContainer = styled.div`
     display: flex;
     justify-content: space-between;
`
const EditDeleteContainer = styled.div`
    display: flex;
    justify-content: right;
`
const columns = [
     { field: 'date', headerName: 'Date', width: 100 },
     { field: 'employee_id', headerName: 'Employee ID', width: 100 },
     { field: 'name', headerName: 'Fullname', width: 200 },
     { field: 'am_in_hour', headerName: 'AM IN', width: 80 },
     { field: 'am_in_min', headerName: '', width: 80 },
     { field: 'am_out_hour', headerName: 'AM OUT', width: 80 },
     { field: 'am_out_min', headerName: '', width: 80 },
     { field: 'pm_in_hour', headerName: 'PM IN', width: 80 },
     { field: 'pm_in_min', headerName: '', width: 80 },
     { field: 'pm_out_hour', headerName: 'PM OUT', width: 80 },
     { field: 'pm_out_min', headerName: '', width: 80 },
     { field: 'ot_in_hour', headerName: 'OT IN', width: 80 },
     { field: 'ot_in_min', headerName: '', width: 80 },
     { field: 'ot_out_hour', headerName: 'OT OUT', width: 80 },
     { field: 'ot_out_min', headerName: '', width: 80 },
     { field: 'total_working_hour', headerName: 'Total Working Hour', width: 140 },
     { field: 'total_ot_hour', headerName: 'Total OT Hour', width: 140 },
     { field: 'ot_type', headerName: 'OT Type', width: 140 },
     { field: 'total_tardiness_min', headerName: 'Tardiness in Minutes', width: 140 },
     { field: 'is_tardiness', headerName: 'Is Tardiness?', width: 80 },

];



/**GET REQUESTS */
const Dtr = (props) => {
     const [query, setQuery] = useState('')
     const { user } = useAuthContext()
     const [dtr, setDtr] = useState([])



     const [error, setError] = useState([])
     const [employeeId, setEmployeeId] = useState('')
     const [name, setName] = useState('')
     const [date, setDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })

     const [total_ot_hour, setTotal_ot_hour] = useState(0)




     const [initialDate, setInitialDate] = useState('')
     const [am_in_hour, setAm_in_hour] = useState(0)
     const [am_in_min, setAm_in_min] = useState(0)
     const [am_out_hour, setAm_out_hour] = useState(0)
     const [am_out_min, setAm_out_min] = useState(0)
     const [pm_in_hour, setPm_in_hour] = useState(0)
     const [pm_in_min, setPm_in_min] = useState(0)
     const [pm_out_hour, setPm_out_hour] = useState(0)
     const [pm_out_min, setPm_out_min] = useState(0)
     const [ot_in_hour, setOt_in_hour] = useState(0)
     const [ot_in_min, setOt_in_min] = useState(0)
     const [ot_out_hour, setOt_out_hour] = useState(0)
     const [ot_out_min, setOt_out_min] = useState(0)
     const [total_working_hour, setTotal_working_hour] = useState('')
     const [total_tardiness_min, setTotal_tardiness_min] = useState(0)
     const [ot_type, setOt_type] = useState("none")
     const [is_tardiness, setIs_tardiness] = useState(false)





     const [openAdd, setOpenAdd] = useState(false);
     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);

     const handleOpenAdd = () => {
          setOpenAdd(true);
     };
     const handleCloseAdd = () => {
          setOpenAdd(false);
     };

     // function DataList({ date }) {
     //      const [data, setData] = useState([]);

     //      useEffect(() => {
     //        async function fetchData() {
     //          const response = await fetch(`https://coop-backend-v1.herokuapp.com/api/dtr/${date}`);
     //          const data = await response.json();
     //          setData(data);
     //        }
     //        fetchData();
     //        console.log(data)
     //      }, [date]);

     //      return (
     //        <ul>
     //          {data.map((item) => (
     //            <li key={item._id}>{item.name}</li>
     //          ))}
     //        </ul>

     //      );

     //    }


     useEffect(() => {

          const fetchDtr = async () => {
               const response = await fetch(`https://coop-backend-v1.herokuapp.com/api/dtr/${date}`, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    console.log("*******************", json)
                    console.log("*******************", date)
                    setDtr(json)

               }
          }
          if (user && date) {
               fetchDtr();
          }
     }, [date])
     const [official_am_timein, setOfficial_am_timein] = useState(0);
     const [official_pm_timein, setOfficial_pm_timein] = useState(0);

     const [leaveType, setLeaveType] = useState('none');
     const [hide, setHide] = useState(false);
     const handleSelectChange = (event) => {
          const type = event.target.value
          setLeaveType(event.target.value);
          if (type == "none") {
               setHide(false)
               setLeaveHours(0)
          }
          else if (type == "vl_halfday" || type == "sl_halfday" || type == "el_halfday") {
               setLeaveHours(4)
               setHide(false)
          }
          else {
               setHide(true)
               setLeaveHours(8)
          }
     };



     //Textfields Events












     const [leaveHours, setLeaveHours] = useState(0);
     const handleLeaveHours = (event) => {

          const hour = event.target.value
          setLeaveHours(hour)
     }

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
     const GetCurrentDate = () => {

     }
     const CalculateTotalHours = () => {
          let convertedAmMins = am_in_min / 60;
          let convertedPmMins = pm_in_min / 60;
          let convertedOtMins = ot_in_min / 60;
          let convertedOtOutMins = ot_out_min / 60;

          let amTotal = am_out_hour - am_in_hour
          let pmTotal = pm_out_hour - pm_in_hour
          let otTotal = ot_out_hour - ot_in_hour

          let totalHoursRendered = ((amTotal + pmTotal) - (convertedAmMins + convertedPmMins));
          setTotal_working_hour(totalHoursRendered)
          calculateTardiness()
          if (total_tardiness_min > 0) {
               setIs_tardiness(true)
          } else {
               setIs_tardiness(false)
          }
     }

     const CalculateTotalOtHours = () => {
          let convertedOtMins = ot_in_min / 60;
          let convertedOtMins2 = ot_out_min / 60

          let otTotal = ot_out_hour - ot_in_hour


          let totalOtHoursRendered = (convertedOtMins2 - convertedOtMins) + otTotal;
          setTotal_ot_hour(totalOtHoursRendered)
          calculateTardiness()
          if (total_tardiness_min > 0) {
               setIs_tardiness(true)
          } else {
               setIs_tardiness(false)
          }
     }
     const calculateTardiness = () => {
          const amStartHour = official_am_timein
          const amStartMin = 0;
          let hourDiff = am_in_hour - amStartHour;
          let minDiff = am_in_min - amStartMin;
          let totalHourDiff = hourDiff //1
          let convertedTotalHourDiff = totalHourDiff * 60;
          let totalMinDiff = convertedTotalHourDiff + minDiff //10
          if (totalMinDiff > 0) {
               setTotal_tardiness_min(totalMinDiff)

          } else {
               setTotal_tardiness_min(0)
          }



     }
     const [selectedText, setSelectedText] = useState("")
     const handleRecalculate = () => {
          calculateTardiness();
          CalculateTotalHours();
          CalculateTotalOtHours();
     }
     const handleName = (event) => {
          const name = event.target.value;
          setName(name)
          const firstWord = name.split(" ")[0];
          setEmployeeId(firstWord)


     }
     const [disabled, setDisabled] = useState(true);

     const handleOvertime = (event) => {
          const type = event.target.value
          if (type == "none") {
               setDisabled(true);
          }
          else {
               setDisabled(false)
          }
          setOt_type(type)

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

     const [currentDate, setCurrentDate] = useState();



     const convertDateToString = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setDate(dateString)
          setCurrentDate(dateString)
     };

     const handleAdd = async (e) => {
          e.preventDefault()


          if (!user) {
               console.log('You must be logged in first')
               return
          }
          const dtr = {
               employee_id: employeeId,
               name: name,
               date: date,
               am_in_hour: am_in_hour,
               am_in_min: am_in_min,
               am_out_hour: am_out_hour,
               am_out_min: am_out_min,
               pm_in_hour: pm_in_hour,
               pm_in_min: pm_in_min,
               pm_out_hour: pm_out_hour,
               pm_out_min: pm_out_min,
               ot_in_hour: ot_in_hour,
               ot_in_min: ot_in_min,
               ot_out_hour: ot_out_hour,
               ot_out_min: ot_out_min,
               total_working_hour: total_working_hour,
               total_tardiness_min: total_tardiness_min,
               total_ot_hour: total_ot_hour,
               ot_type: ot_type,
               is_tardiness: is_tardiness,
               leave_hours: leaveHours,
               official_am_timein: official_am_timein,
          }
          const response = await fetch('https://coop-backend-v1.herokuapp.com/api/dtr', {
               method: 'POST',
               body: JSON.stringify(dtr),
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()
          if (!response.ok) {
               setError(json.error)
               console.log(json)
          }
          else {
               console.log(json)
          }
          //window.location.reload();
     }



     return (

          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>

                                   <div style={{ height: 475, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={dtr}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[10]}
                                             style={{ marginBottom: "20px" }}
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                             <DatePicker
                                                  label="Current Date"
                                                  value={currentDate}
                                                  inputFormat="MM-DD-YYYY"
                                                  onChange={convertDateToString}
                                                  renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                             />
                                        </LocalizationProvider>
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
                                             </EditDeleteContainer>
                                        </ButtonContainer>
                                        <Dialog
                                             fullScreen={fullScreen}
                                             open={openAdd}
                                             onClose={handleCloseAdd}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                        >
                                             <DialogTitle id="alert-dialog-title">
                                                  Add Daily Time Record
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
                                                  <TimeContainer>
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Employee_id"
                                                            fullWidth
                                                            style={{ paddingBottom: "80px", paddingRight: "10px" }}
                                                            value={employeeId}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Choose Leave Type"
                                                            fullWidth
                                                            select
                                                            style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                            onChange={handleSelectChange}
                                                            value={leaveType}
                                                       >

                                                            <MenuItem value={'none'}>None</MenuItem>
                                                            <MenuItem value={'vl_wholeday'}>VL - Wholeday</MenuItem>
                                                            <MenuItem value={'vl_halfday'}>VL - Halfday</MenuItem>
                                                            <MenuItem value={'sl_wholeday'}>SL - Wholeday</MenuItem>
                                                            <MenuItem value={'sl_halfday'}>SL - Halfday</MenuItem>
                                                            <MenuItem value={'el_wholeday'}>EL - Wholeday</MenuItem>
                                                            <MenuItem value={'el_halfday'}>EL - Halfday</MenuItem>

                                                       </TextField>
                                                       <TextField
                                                            type="number"
                                                            required
                                                            id="outlined-required"
                                                            label="Leave Hours"
                                                            fullWidth
                                                            onChange={handleLeaveHours}
                                                            value={leaveHours}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                  </TimeContainer>
                                                  {hide === true ? null : <Others id="others">
                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Official AM Timein"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setOfficial_am_timein(e.target.value)}
                                                                 value={official_am_timein}
                                                            />
                                                       </TimeContainer>
                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Time in (hour)"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setAm_in_hour(e.target.value)}
                                                                 value={am_in_hour}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Time in (mins)"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setAm_in_min(e.target.value)}
                                                                 value={am_in_min}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                       </TimeContainer>
                                                       <TimeContainer style={{ paddingBottom: "40px" }}>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="AM-OUT Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setAm_out_hour(e.target.value)}
                                                                 value={am_out_hour}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="AM-OUT Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setAm_out_min(e.target.value)}
                                                                 value={am_out_min}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                       </TimeContainer >
                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Official PM Timein"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setOfficial_pm_timein(e.target.value)}
                                                                 value={official_pm_timein}
                                                            />
                                                       </TimeContainer>
                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="PM-IN Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setPm_in_hour(e.target.value)}
                                                                 value={pm_in_hour}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="PM-IN Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setPm_in_min(e.target.value)}
                                                                 value={pm_in_min}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                       </TimeContainer>
                                                       <TimeContainer style={{ paddingBottom: "40px" }}>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="PM-OUT Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setPm_out_hour(e.target.value)}
                                                                 value={pm_out_hour}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 id="outlined-required"
                                                                 label="PM-OUT Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setPm_out_min(e.target.value)}
                                                                 value={pm_out_min}
                                                                 onMouseLeave={CalculateTotalHours}
                                                            />
                                                       </TimeContainer>
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Overtime Type"
                                                            fullWidth
                                                            select
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={handleOvertime}
                                                            value={ot_type}
                                                       >
                                                            <MenuItem value={'none'}>None</MenuItem>
                                                            <MenuItem value={'regular'}>Regular</MenuItem>
                                                            <MenuItem value={'restday'}>Rest Day</MenuItem>
                                                            <MenuItem value={'special'}>Special Holiday</MenuItem>
                                                            <MenuItem value={'legal'}>Legal Holiday</MenuItem>

                                                       </TextField>
                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 disabled={disabled}
                                                                 id="outlined-required"
                                                                 label="OT-IN Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setOt_in_hour(e.target.value)}
                                                                 value={ot_in_hour}
                                                                 onMouseLeave={CalculateTotalOtHours}
                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 disabled={disabled}
                                                                 id="outlined-required"
                                                                 label="OT-IN Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setOt_in_min(e.target.value)}
                                                                 value={ot_in_min}
                                                                 onMouseLeave={CalculateTotalOtHours}
                                                            />
                                                       </TimeContainer>
                                                       <TimeContainer style={{ paddingBottom: "40px" }}>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 disabled={disabled}
                                                                 id="outlined-required"
                                                                 label="OT-OUT Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setOt_out_hour(e.target.value)}
                                                                 value={ot_out_hour}
                                                                 onMouseLeave={CalculateTotalOtHours}
                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 disabled={disabled}
                                                                 id="outlined-required"
                                                                 label="OT-OUT Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setOt_out_min(e.target.value)}
                                                                 value={ot_out_min}
                                                                 onMouseLeave={CalculateTotalOtHours}
                                                            />
                                                       </TimeContainer>
                                                       <ThemeProvider theme={theme}>

                                                            <Button style={{ marginBottom: "70px" }} variant="outlined" color="green" onClick={handleRecalculate}>
                                                                 Recalculate
                                                            </Button>
                                                       </ThemeProvider>
                                                       <TextField
                                                            type="number"
                                                            required
                                                            id="outlined-required"
                                                            label="Total Work Hour"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setTotal_working_hour(e.target.value)}
                                                            value={total_working_hour}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            type="number"
                                                            required
                                                            id="outlined-required"
                                                            label="Total OT Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setTotal_ot_hour(e.target.value)}
                                                            value={total_ot_hour}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />

                                                       <TextField
                                                            type="number"
                                                            required
                                                            id="outlined-required"
                                                            label="Tardiness in minutes"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setTotal_tardiness_min(e.target.value)}
                                                            value={total_tardiness_min}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Is Tardiness?"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setIs_tardiness(e.target.value)}
                                                            value={is_tardiness}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                  </Others>}
                                             </DialogContent>
                                             <DialogActions>
                                                  {/* <Button onClick={handleAdd}>Add</Button> */}
                                                  <Button onClick={handleCloseAdd} autoFocus>
                                                       Cancel
                                                  </Button>
                                                  <Button onClick={handleAdd}>Add</Button>
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

export default Dtr