
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
     const [year, setYear] = useState('2023');
     const [period, setPeriod] = useState('First Half');

     const handleMonthChange = (e) => {
          setMonth(e.target.value)
         
     }
     useEffect(() => {
          handleDates();
     }, [month])
     useEffect(() => {
          handleDates();
     }, [year])
     useEffect(() => {
          handleDates();
     }, [period])
     const handleDates = () => {
          if(month == "january" && period=="first"){
               setStartDate(`01-01-${year}`)
               setEndDate(`01-15-${year}`)
          }
          if(month == "january" && period=="second"){
               setStartDate(`01-16-${year}`)
               setEndDate(`01-31-${year}`)
          }

          if(month == "february" && period=="first"){
               setStartDate(`02-01-${year}`)
               setEndDate(`02-15-${year}`)
          }
          if(month == "february" && period=="second"){
               setStartDate(`02-16-${year}`)
               setEndDate(`02-29-${year}`)
          }

          if(month == "march" && period=="first"){
               setStartDate(`03-01-${year}`)
               setEndDate(`03-15-${year}`)
          }
          if(month == "march" && period=="second"){
               setStartDate(`03-16-${year}`)
               setEndDate(`03-31-${year}`)
          }

          if(month == "april" && period=="first"){
               setStartDate(`04-01-${year}`)
               setEndDate(`04-15-${year}`)
          }
          if(month == "april" && period=="second"){
               setStartDate(`04-16-${year}`)
               setEndDate(`04-30-${year}`)
          }

          if(month == "may" && period=="first"){
               setStartDate(`05-01-${year}`)
               setEndDate(`05-15-${year}`)
          }
          if(month == "may" && period=="second"){
               setStartDate(`05-16-${year}`)
               setEndDate(`05-31-${year}`)
          }
          
          if(month == "june" && period=="first"){
               setStartDate(`06-01-${year}`)
               setEndDate(`06-15-${year}`)
          }
          if(month == "june" && period=="second"){
               setStartDate(`06-16-${year}`)
               setEndDate(`06-30-${year}`)
          }

          if(month == "july" && period=="first"){
               setStartDate(`07-01-${year}`)
               setEndDate(`07-15-${year}`)
          }
          if(month == "july" && period=="second"){
               setStartDate(`07-16-${year}`)
               setEndDate(`07-31-${year}`)
          }

          if(month == "august" && period=="first"){
               setStartDate(`08-01-${year}`)
               setEndDate(`08-15-${year}`)
          }
          if(month == "august" && period=="second"){
               setStartDate(`08-16-${year}`)
               setEndDate(`08-31-${year}`)
          }

          if(month == "september" && period=="first"){
               setStartDate(`09-01-${year}`)
               setEndDate(`09-15-${year}`)
          }
          if(month == "september" && period=="second"){
               setStartDate(`09-16-${year}`)
               setEndDate(`09-30-${year}`)
          }

          if(month == "october" && period=="first"){
               setStartDate(`10-01-${year}`)
               setEndDate(`10-15-${year}`)
          }
          if(month == "october" && period=="second"){
               setStartDate(`10-16-${year}`)
               setEndDate(`10-31-${year}`)
          }

          if(month == "november" && period=="first"){
               setStartDate(`11-01-${year}`)
               setEndDate(`11-15-${year}`)
          }
          if(month == "november" && period=="second"){
               setStartDate(`11-16-${year}`)
               setEndDate(`11-30-${year}`)
          }

          if(month == "december" && period=="first"){
               setStartDate(`12-01-${year}`)
               setEndDate(`12-15-${year}`)
          }
          if(month == "december" && period=="second"){
               setStartDate(`12-16-${year}`)
               setEndDate(`12-31-${year}`)
          }
     }
   

     const handleYearChange = (e) => {
          setYear(e.target.value)
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

          //there's bug in these lines
          //handleGetEmployeeData()
        

     }

     const [filtered_employee_dtr, setFiltered_employee_dtr] = useState([])


     const [employee_dtr, setEmployee_dtr] = useState([])
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch(`https://coop-backend-v1.herokuapp.com/api/dtr/employee/${employeeId}`, {
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
     }, [employeeId])

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

     //code for accumulating total


     const [total, setTotal] = useState({
         
          total_working_hour: 0,
          total_ot_hour: 0,
          total_tardiness_min: 0,
          leave_hours: 0,
     });

     useEffect(() => {
          let total_working_hour = 0,
               total_ot_hour = 0,
               total_tardiness_min = 0,
               leave_hours = 0;

          filtered_employee_dtr.forEach((item) => {
               total_working_hour += item.total_working_hour
               total_ot_hour += item.total_ot_hour
               total_tardiness_min += item.total_tardiness_min
               leave_hours += item.leave_hours
          });


          setTotal({
               total_working_hour: total_working_hour,
               total_ot_hour: total_ot_hour,
               total_tardiness_min: total_tardiness_min,
               leave_hours: leave_hours
          });
     }, [filtered_employee_dtr]);

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
                                                  <MenuItem value={'january'}>January</MenuItem>
                                                  <MenuItem value={'february'}>February</MenuItem>
                                                  <MenuItem value={'march'}>March</MenuItem>
                                                  <MenuItem value={'april'}>April</MenuItem>
                                                  <MenuItem value={'may'}>May</MenuItem>
                                                  <MenuItem value={'june'}>June</MenuItem>
                                                  <MenuItem value={'july'}>July</MenuItem>
                                                  <MenuItem value={'august'}>August</MenuItem>
                                                  <MenuItem value={'september'}>September</MenuItem>
                                                  <MenuItem value={'october'}>October</MenuItem>
                                                  <MenuItem value={'november'}>November</MenuItem>
                                                  <MenuItem value={'december'}>December</MenuItem>

                                             </TextField>
                                             <TextField
                                                  required
                                                  id="outlined-required"
                                                  label="Year"
                                                  fullWidth
                                                  select
                                                  style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                  onChange={handleYearChange}
                                                  value={year}
                                             >
                                                  <MenuItem value={'23'}>2023</MenuItem>
                                                  <MenuItem value={'24'}>2024</MenuItem>
                                                  <MenuItem value={'25'}>2025</MenuItem>
                                                  <MenuItem value={'26'}>2026</MenuItem>
                                                  <MenuItem value={'27'}>2027</MenuItem>
                                                  <MenuItem value={'28'}>2028</MenuItem>
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
                                   <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={payroll}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[10]}
                                             style={{ marginBottom: "20px" }}
                                        />
                                   </div>
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
                                        style={{ paddingBottom: "80px", paddingRight: "10px" }}
                                        value={employeeId}
                                        
                                        InputProps={{
                                             readOnly: true,
                                        }}
                                   />
                                   <TablesContainer>
                                        <TableContainer component={Paper}
                                             style={{ width: "500px", margin: "10px" }} >

                                             <Table sx={{ width: 400 }} aria-label="simple table">
                                                  <TableHead>
                                                       <TableRow>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Data</TableCell>
                                                       </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                       {/* {filtered_employee_dtr.map((item, index) => (
                                                       <React.Fragment key={`employee-${index}`}> */}


                                                       <TableRow >
                                                            <TableCell>Employee ID</TableCell>
                                                            <TableCell>{employeeId}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>{name}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Total Working in Hour</TableCell>
                                                            <TableCell>{total.total_working_hour}</TableCell>
                                                       </TableRow>
                                                       <TableRow >
                                                            <TableCell>Total Overtime in Hour</TableCell>
                                                            <TableCell>{total.total_ot_hour}</TableCell>
                                                       </TableRow>

                                                       <TableRow >
                                                            <TableCell>Total Tardiness in min</TableCell>
                                                            <TableCell>{total.total_tardiness_min}</TableCell>
                                                       </TableRow>

                                                       <TableRow>
                                                            <TableCell>Total Leave in hour</TableCell>
                                                            <TableCell>{total.leave_hours}</TableCell>
                                                       </TableRow>


                                                       {/* //in overtime, make a overtime type complete and add them here */}
                                                       {/* 


                                                       </React.Fragment>
                                                  ))} */}
                                                  </TableBody>
                                             </Table>


                                        </TableContainer>
                                        <TableContainer component={Paper}
                                             style={{ width: "500px", margin: "10px" }} >

                                             <Table sx={{ width: 400 }} aria-label="simple table">
                                                  <TableHead>
                                                       <TableRow>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Data</TableCell>
                                                       </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                       {filtered_employee_dtr.map((item, index) => (
                                                            <React.Fragment key={`employee-${index}`}>
                                                                 <TableRow key={`${item.employee_id}-title`}>
                                                                      <TableCell>Name</TableCell>
                                                                      <TableCell>{item.employee_id}</TableCell>
                                                                 </TableRow>
                                                                 <TableRow key={`${item.name}-title`}>
                                                                      <TableCell>Age</TableCell>
                                                                      <TableCell>{item.name}</TableCell>
                                                                 </TableRow>
                                                                 <TableRow key={`${item.am_in_hour}-title`}>
                                                                      <TableCell>Age</TableCell>
                                                                      <TableCell>{item.am_in_hour}</TableCell>
                                                                 </TableRow>
                                                            </React.Fragment>
                                                       ))}
                                                  </TableBody>
                                             </Table>


                                        </TableContainer>
                                   </TablesContainer>


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


                                        </DialogContent>
                                        <DialogActions>
                                             {/* <Button onClick={handleAdd}>Add</Button> */}
                                             <Button onClick={handleCloseAdd} autoFocus>
                                                  Cancel
                                             </Button>
                                             <Button onClick={handleAdd}>Add</Button>
                                        </DialogActions>
                                   </Dialog>

                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )
}

export default Payroll