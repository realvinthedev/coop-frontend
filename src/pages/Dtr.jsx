
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
const columns = [
     { field: 'date', headerName: 'Date', width: 100 },
     { field: 'employee_id', headerName: 'Employee ID', width: 100 },
     { field: 'name', headerName: 'Fullname', width: 200 },
     { field: 'department', headerName: 'Department', width: 200 },
     { field: 'am_in_hour', headerName: 'AM IN', width: 80 },
     { field: 'am_in_min', headerName: '', width: 80 },
     { field: 'am_out_hour', headerName: 'AM OUT', width: 80 },
     { field: 'am_out_min', headerName: '', width: 80 },
     { field: 'pm_in_hour', headerName: 'PM IN', width: 80 },
     { field: 'pm_in_min', headerName: '', width: 80 },
     { field: 'pm_out_hour', headerName: 'PM OUT', width: 80 },
     { field: 'pm_out_min', headerName: '', width: 80 },
     { field: 'total_working_hour', headerName: 'Total Working Hour', width: 140 },
     { field: 'ot_type', headerName: 'OT Type', width: 140 },
     { field: 'total_tardiness_min', headerName: 'Tardiness in Minutes', width: 140 },
     { field: 'is_tardiness', headerName: 'Is Tardiness?', width: 80 },
     { field: 'vl_hours', headerName: 'VL Hours', width: 80 },
     { field: 'sl_hours', headerName: 'SL Hours', width: 80 },
     { field: 'el_hours', headerName: 'EL Hours', width: 80 },
     { field: 'leave_type', headerName: 'Leave Type', width: 80 },
     { field: 'absent_hours', headerName: 'Absent Hours', width: 80 },
     { field: 'vl_nopay_hours', headerName: 'VL No Pay Hours', width: 80 },
     { field: 'sl_nopay_hours', headerName: 'SL No Pay Hours', width: 80 },
     { field: 'el_nopay_hours', headerName: 'EL No Pay Hours', width: 80 },
     { field: 'regular_ot_hours', headerName: 'Regular OT Hours', width: 80 },
     { field: 'restday_ot_hours', headerName: 'Restday OT Hours', width: 80 },
     { field: 'special_ot_hours', headerName: 'Special OT Hours', width: 80 },
     { field: 'legal_ot_hours', headerName: 'Legal OT Hours', width: 80 },
];



/**GET REQUESTS */
const Dtr = (props) => {
     const [query, setQuery] = useState('')
     const { user } = useAuthContext()
     const [dtr, setDtr] = useState([])
     const dialogRef = useRef(null);


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
     const [total_working_hour, setTotal_working_hour] = useState(0)
     const [total_tardiness_min, setTotal_tardiness_min] = useState(0)
     const [ot_type, setOt_type] = useState("none")
     const [is_tardiness, setIs_tardiness] = useState(0)


     const [isAdd, setIsAdd] = useState(false)
     const [refresher, setRefresher] = useState(0)
     const handleRefresher = () => {
          setRefresher(Math.random())
     };

     // const isEdit_True = () => {
     //      setIsEdit(true)
     // };
     // const isEdit_False = () => {
     //      setIsEdit(false)
     // };
     const isAdd_True = () => {
          setIsAdd(true)
     };
     const isAdd_False = () => {
          setIsAdd(false)
     };

     const [openAdd, setOpenAdd] = useState(false);
     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);
     const [openAddAdditionals, setOpenAddAdditionals] = useState(false);
     const [day_type, setDay_type] = useState("regday")

     const handleOpenAdd = () => {
          setOpenAdd(true);
     };
     const handleOpenEdit = () => {
          isAdd_False();
          if (id == "") {
               setOpenWarning(true)
          }
          else {
               setOpenAdd(true);
          }
     };

     const handleCloseAdd = () => {
          setOpenAdd(false);
     };

     const handleOpenAddAdditionals = () => {
          setOpenAddAdditionals(true);
     };
     const handleCloseAddAdditionals = () => {
          setOpenAddAdditionals(false);
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

                    setDtr(json)

               }
          }
          if (user && date) {
               fetchDtr();
          }
     }, [date, refresher])
     const [official_am_timein, setOfficial_am_timein] = useState(0);
     const [official_pm_timein, setOfficial_pm_timein] = useState(0);

     const [leave_type, setLeaveType] = useState('none');
     const [hide, setHide] = useState(false);
     const [hideWithPayLeaves, setHideWithPayLeaves] = useState(true)
     const [hideNoPayLeaves, setHideNoPayLeaves] = useState(true)


     //Run every time fields changes
     useEffect(() => {
          if (am_in_hour.length === 1 || am_in_hour.length === 2) {
               CalculateTotalHours();

          }
          if (ot_in_hour.length === 1 || ot_in_hour.length === 2) {
               CalculateTotalOtHours();
          }
     }, [
          day_type,
          leave_type,
          official_am_timein,
          am_in_hour,
          am_in_min,
          am_out_hour,
          am_out_min,
          pm_in_hour,
          pm_in_min,
          pm_out_hour,
          pm_out_min,
          ot_type,
          ot_in_hour,
          ot_in_min,
          ot_out_hour,
          ot_out_min
     ])


     const [vl_wpay_hours, setVl_wpay_hours] = useState(0);
     const [sl_wpay_hours, setSl_wpay_hours] = useState(0);
     const [el_wpay_hours, setEl_wpay_hours] = useState(0);

     const [vl_nopay_hours, setVl_nopay_hours] = useState(0);
     const [sl_nopay_hours, setSl_nopay_hours] = useState(0);
     const [el_nopay_hours, setEl_nopay_hours] = useState(0);

     const handleCloseWarning = () => {
          setOpenWarning(false);
     };

     const handleSelectChange = (event) => {
          const type = event.target.value
          setLeaveType(event.target.value);
          if (type == "none") {
               setHide(false)
               setAbsent_hours(0)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(true)
          }
          else if (type == "vl_halfday" || type == "sl_halfday" || type == "el_halfday") {
               if (type == "vl_halfday") {
                    setVl_wpay_hours(4)
                    setSl_wpay_hours(0)
                    setEl_wpay_hours(0)
               }
               else if (type == "sl_halfday") {
                    setVl_wpay_hours(0)
                    setSl_wpay_hours(4)
                    setEl_wpay_hours(0)
               }
               else {
                    setVl_wpay_hours(0)
                    setSl_wpay_hours(0)
                    setEl_wpay_hours(4)
               }
               setHide(true)
               setAbsent_hours(0)
               setHideWithPayLeaves(false)
               setHideNoPayLeaves(true)
          }
          else if (type == "vl_wholeday" || type == "sl_wholeday" || type == "el_wholeday") {
               if (type == "vl_wholeday") {
                    setVl_wpay_hours(8)
                    setSl_wpay_hours(0)
                    setEl_wpay_hours(0)
               }
               else if (type == "sl_wholeday") {
                    setVl_wpay_hours(0)
                    setSl_wpay_hours(8)
                    setEl_wpay_hours(0)
               }
               else {
                    setVl_wpay_hours(0)
                    setSl_wpay_hours(0)
                    setEl_wpay_hours(8)
               }
               setHide(true)
               setAbsent_hours(0)
               setHideWithPayLeaves(false)
               setHideNoPayLeaves(true)
          }
          else if (type == "vl_nopay_halfday" || type == "sl_nopay_halfday" || type == "el_nopay_halfday") {
               if (type == "vl_nopay_halfday") {
                    setVl_nopay_hours(4)
                    setSl_nopay_hours(0)
                    setEl_nopay_hours(0)
               }
               else if (type == "sl_nopay_halfday") {
                    setVl_nopay_hours(0)
                    setSl_nopay_hours(4)
                    setEl_nopay_hours(0)
               }
               else {
                    setVl_nopay_hours(0)
                    setSl_nopay_hours(0)
                    setEl_nopay_hours(4)
               }
               setHide(true)
               setAbsent_hours(0)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(false)
          }
          else if (type == "vl_nopay_wholeday" || type == "sl_nopay_wholeday" || type == "el_nopay_wholeday") {
               if (type == "vl_nopay_wholeday") {
                    setVl_nopay_hours(8)
                    setSl_nopay_hours(0)
                    setEl_nopay_hours(0)
               }
               else if (type == "sl_nopay_wholeday") {
                    setVl_nopay_hours(0)
                    setSl_nopay_hours(8)
                    setEl_nopay_hours(0)
               }
               else {
                    setVl_nopay_hours(0)
                    setSl_nopay_hours(0)
                    setEl_nopay_hours(8)
               }
               setHide(true)
               setAbsent_hours(0)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(false)
          }
          else {
               setAbsent_hours(8)
               setHide(false)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(true)
          }
     };



     //Textfields Events












     const [leaveHours, setLeaveHours] = useState(0);
     const [absent_hours, setAbsent_hours] = useState(0);
     const handleLeaveHours = (event) => {

          const hour = event.target.value
          setLeaveHours(hour)
     }


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
     const GetCurrentDate = () => {

     }

     const handleDayType = (e) => {
          const type = e.target.value;
          setDay_type(type)
     }
     const CalculateTotalHours = () => {
          let totalHoursRendered;
          //30 / 60 = 0.5
          let convertedAmMinsIn = am_in_min / 60;
          let convertedAmMinsOut = am_out_min / 60;
          let convertedPmMinsIn = pm_in_min / 60;
          let convertedPmMinsOut = pm_out_min / 60;





          // this is the official time in
          let finalAmInHour;
          let convertedAmIn_early = parseFloat(official_am_timein)
          let convertedAmIn_regular = parseFloat(am_in_hour) + parseFloat(convertedAmMinsIn);


          if (convertedAmIn_regular < official_am_timein || convertedAmIn_regular == official_am_timein) {
               // 8:00
               finalAmInHour = convertedAmIn_early

               console.log("IF")
          } else {
               // 8.5
               finalAmInHour = convertedAmIn_regular
               console.log("else")
          }


          let convertedAmOut_regular = parseFloat(am_out_hour) + parseFloat(convertedAmMinsOut)

          let pmTimeIn = parseFloat(pm_in_hour) + parseFloat(convertedPmMinsIn)
          let pmTimOut = parseFloat(pm_out_hour) + parseFloat(convertedPmMinsOut)
          let calculateAmTotalHours = convertedAmOut_regular - finalAmInHour
          let calcualatePmTotalHours = pmTimOut - pmTimeIn
          let total = calculateAmTotalHours + calcualatePmTotalHours
          let extra = total - parseFloat(8)


          if (day_type === "regday") {
               if (total > 8) {
                    //dont use uquation insde useState "set". it will return an error
                    setTotal_working_hour(8)
                    setTotal_ot_hour(extra)
                    if (ot_type == "regular") {
                         setRegular_ot_hours(total_ot_hour)
                         setRestday_ot_hours(0)
                         setSpecial_ot_hours(0)
                         setLegal_ot_hours(0)
                    }
                    else if (ot_type == "restday") {
                         setRegular_ot_hours(0)
                         setRestday_ot_hours(total_ot_hour)
                         setSpecial_ot_hours(0)
                         setLegal_ot_hours(0)
                    }
                    else if (ot_type == "special") {
                         setRegular_ot_hours(0)
                         setRestday_ot_hours(0)
                         setSpecial_ot_hours(total_ot_hour)
                         setLegal_ot_hours(0)
                    }
                    else if (ot_type == "legal") {
                         setRegular_ot_hours(0)
                         setRestday_ot_hours(0)
                         setSpecial_ot_hours(0)
                         setLegal_ot_hours(total_ot_hour)
                    }
                    else {
                         setRegular_ot_hours(0)
                         setRestday_ot_hours(0)
                         setSpecial_ot_hours(0)
                         setLegal_ot_hours(0)
                    }
               } else {
                    setTotal_working_hour(total)
                    setTotal_ot_hour(0)
               }
          } else {
               setTotal_working_hour(0)
               setTotal_ot_hour(total)
               if (ot_type == "regular") {
                    setRegular_ot_hours(total_ot_hour)
                    setRestday_ot_hours(0)
                    setSpecial_ot_hours(0)
                    setLegal_ot_hours(0)
               }
               else if (ot_type == "restday") {
                    setRegular_ot_hours(0)
                    setRestday_ot_hours(total_ot_hour)
                    setSpecial_ot_hours(0)
                    setLegal_ot_hours(0)
               }
               else if (ot_type == "special") {
                    setRegular_ot_hours(0)
                    setRestday_ot_hours(0)
                    setSpecial_ot_hours(total_ot_hour)
                    setLegal_ot_hours(0)
               }
               else if (ot_type == "legal") {
                    setRegular_ot_hours(0)
                    setRestday_ot_hours(0)
                    setSpecial_ot_hours(0)
                    setLegal_ot_hours(total_ot_hour)
               }
               else {
                    setRegular_ot_hours(0)
                    setRestday_ot_hours(0)
                    setSpecial_ot_hours(0)
                    setLegal_ot_hours(0)
               }
          }


          calculateTardiness()
          if (total_tardiness_min > 0) {
               setIs_tardiness(1)
          } else {
               setIs_tardiness(0)
          }


     }

     const CalculateTotalOtHours = () => {

          calculateTardiness()
          if (total_tardiness_min > 0) {
               setIs_tardiness(1)
          } else {
               setIs_tardiness(0)
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

     const handleName = (event) => {
          const name = event.target.value;
          setName(name)
          const firstWord = name.split(" ")[0];
          setEmployeeId(firstWord)
     }
     const [disabled, setDisabled] = useState(true);
     const [regular_ot_hours, setRegular_ot_hours] = useState(0);
     const [restday_ot_hours, setRestday_ot_hours] = useState(0);
     const [special_ot_hours, setSpecial_ot_hours] = useState(0);
     const [legal_ot_hours, setLegal_ot_hours] = useState(0);
     const [hide_ot_others, setHide_ot_others] = useState(true);
     // const handleOvertime = (event) => {
     //      const type = event.target.value
     //      if (type != "none") {
     //           setDisabled(false)
     //           setHide_ot_others(false)
     //      }
     //      else {
     //           setDisabled(true);
     //           setHide_ot_others(true)
     //      }
     //      setOt_type(type)
     // }

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

     const handleClearFields = () => {
          setOfficial_am_timein(0)
          setAm_in_hour(0)
          setAm_in_min(0)
          setAm_out_hour(0)
          setAm_out_min(0)
          setPm_in_hour(0)
          setPm_in_min(0)
          setPm_out_hour(0)
          setPm_out_min(0)
          setTotal_working_hour(0)
          setOt_type('none')
          setTotal_tardiness_min(0)
          setAbsent_hours(0)
          setIs_tardiness(0)
     }

     const handleDelete = async () => {
          const response = await fetch('https://coop-backend-v1.herokuapp.com/api/dtr/' + id, {
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
     const handleAdd = async (e) => {
          e.preventDefault()

          if (name === "" || official_am_timein === "" || am_in_hour === "" || am_out_hour === "" || pm_in_hour === "" || pm_out_hour === "" || total_working_hour === "") {
               handleOnError()
          }
          else {
               if (!user) {
                    console.log('You must be logged in first')
                    return
               }
               else {
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
                         total_working_hour: total_working_hour,
                         total_tardiness_min: total_tardiness_min,
                         ot_type: ot_type,
                         regular_ot_hours: regular_ot_hours,
                         restday_ot_hours: restday_ot_hours,
                         special_ot_hours: special_ot_hours,
                         legal_ot_hours: legal_ot_hours,
                         vl_nopay_hours: vl_nopay_hours,
                         sl_nopay_hours: sl_nopay_hours,
                         el_nopay_hours: el_nopay_hours,
                         vl_hours: vl_wpay_hours,
                         sl_hours: sl_wpay_hours,
                         el_hours: el_wpay_hours,
                         is_tardiness: is_tardiness,
                         official_am_timein: official_am_timein,
                         absent_hours: absent_hours,
                         leave_type: leave_type
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
                         console.log(error)
                    }
                    handleOnSuccess();
                    setTimeout(() => {
                         handleClearFields()
                         handleRefresher()
                         handleCloseAdd()
                    }, 1000);

               }
          }



         
     }


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
          if (!user) {
               console.log('You must be logged in first')
               return
          }
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
                                             onRowClick={handleRowClick}
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
                                             <div>
                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleOpenAdd}>
                                                            Add New DTR
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
                                             ref={dialogRef}
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
                                                  {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up the form completely. Remember that, unused fields should be "0"</Alert> : ""}
                                                  {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Successfully Saved</Alert> : ""}
                                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                       <DatePicker
                                                            label="Date"
                                                            value={date}

                                                            inputFormat="MM-DD-YYYY"
                                                            onChange={convertDateToString}
                                                            renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px", marginTop: "20px" }}{...params} error={false} />}
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
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={handleSelectChange}
                                                            value={leave_type}
                                                       >

                                                            <MenuItem value={'none'}>None</MenuItem>
                                                            <MenuItem value={'absent'}>Absent</MenuItem>
                                                            <MenuItem value={'vl_wholeday'}>VL With Pay Wholeday</MenuItem>
                                                            <MenuItem value={'vl_halfday'}>VL With Pay Halfday</MenuItem>
                                                            <MenuItem value={'sl_wholeday'}>SL With Pay Wholeday</MenuItem>
                                                            <MenuItem value={'sl_halfday'}>SL With Pay Halfday</MenuItem>
                                                            <MenuItem value={'el_wholeday'}>EL With Pay Wholeday</MenuItem>
                                                            <MenuItem value={'el_halfday'}>EL With Pay Halfday</MenuItem>

                                                            <MenuItem value={'vl_nopay_wholeday'}>VL No Pay Wholeday</MenuItem>
                                                            <MenuItem value={'vl_nopay_halfday'}>VL No Pay Halfday</MenuItem>
                                                            <MenuItem value={'sl_nopay_wholeday'}>SL No Pay Wholeday</MenuItem>
                                                            <MenuItem value={'sl_nopay_halfday'}>SL No Pay Halfday</MenuItem>
                                                            <MenuItem value={'el_nopay_wholeday'}>EL No Pay Wholeday</MenuItem>
                                                            <MenuItem value={'el_nopay_halfday'}>EL No Pay Halfday</MenuItem>

                                                       </TextField>

                                                  </TimeContainer>

                                                  <Warnings>
                                                       <div>*Please use military time format</div>
                                                       <div>**Leave "0" (zero) if the field not in use</div>
                                                       <div>***For Official AM Timein, if time in is 8:30, please input 8.5. (30mins / 60mins = 0.5)</div>
                                                  </Warnings>
                                                  {hide === true ? null : <Others id="others">
                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="Official AM Timein"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setOfficial_am_timein(e.target.value)}
                                                                 value={official_am_timein}
                                                            />
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Day Type (e.g: restday but overtime)"
                                                                 fullWidth
                                                                 select
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={handleDayType}
                                                                 value={day_type}
                                                            >
                                                                 <MenuItem value={'regday'}>Regular Day</MenuItem>
                                                                 <MenuItem value={'otday'}>Overtime Day</MenuItem>


                                                            </TextField>
                                                       </TimeContainer>
                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="Time in (hour)"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setAm_in_hour(e.target.value)}
                                                                 value={am_in_hour}

                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="Time in (mins)"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setAm_in_min(e.target.value)}
                                                                 value={am_in_min}

                                                            />
                                                       </TimeContainer>
                                                       <TimeContainer style={{ paddingBottom: "40px" }}>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="AM-OUT Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setAm_out_hour(e.target.value)}
                                                                 value={am_out_hour}

                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="AM-OUT Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setAm_out_min(e.target.value)}
                                                                 value={am_out_min}

                                                            />
                                                       </TimeContainer >

                                                       <TimeContainer>
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="PM-IN Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setPm_in_hour(e.target.value)}
                                                                 value={pm_in_hour}

                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="PM-IN Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setPm_in_min(e.target.value)}
                                                                 value={pm_in_min}

                                                            />
                                                       </TimeContainer>
                                                       <TimeContainer style={{ paddingBottom: "40px" }}>
                                                            <TextField
                                                                 type="number"
                                                                 fullWidth
                                                                 required
                                                                 id="outlined-required"
                                                                 label="PM-OUT Hour"
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                                 onChange={(e) => setPm_out_hour(e.target.value)}
                                                                 value={pm_out_hour}

                                                            />
                                                            <TextField
                                                                 type="number"
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="PM-OUT Min"
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setPm_out_min(e.target.value)}
                                                                 value={pm_out_min}

                                                            />
                                                       </TimeContainer>


                                                       {/* {hide_ot_others === true ? null : <OthersOT id="othersOt">
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Regular Overtime in hour"
                                                                 fullWidth
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setRegular_ot_hours(e.target.value)}
                                                                 value={regular_ot_hours}
                                                                 InputProps={{
                                                                      readOnly: true,
                                                                 }}
                                                            />
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Restday Overtime in hour"
                                                                 fullWidth
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setRestday_ot_hours(e.target.value)}
                                                                 value={restday_ot_hours}
                                                                 InputProps={{
                                                                      readOnly: true,
                                                                 }}
                                                            />
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Special Overtime in hour"
                                                                 fullWidth
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setSpecial_ot_hours(e.target.value)}
                                                                 value={special_ot_hours}
                                                                 InputProps={{
                                                                      readOnly: true,
                                                                 }}
                                                            />
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Legal Overtime in hour"
                                                                 fullWidth
                                                                 style={{ paddingBottom: "20px" }}
                                                                 onChange={(e) => setLegal_ot_hours(e.target.value)}
                                                                 value={legal_ot_hours}
                                                                 InputProps={{
                                                                      readOnly: true,
                                                                 }}
                                                            />

                                                       </OthersOT>} */}
                                                       <ThemeProvider theme={theme}>

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
                                                            label="Total Overtime Hour"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setTotal_ot_hour(e.target.value)}
                                                            value={total_ot_hour}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Overtime Type"
                                                            fullWidth
                                                            select
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setOt_type(e.target.value)}
                                                            value={ot_type}
                                                       >
                                                            <MenuItem value={'none'}>None</MenuItem>
                                                            <MenuItem value={'regular'}>Regular</MenuItem>
                                                            <MenuItem value={'restday'}>Rest Day</MenuItem>
                                                            <MenuItem value={'special'}>Special Holiday</MenuItem>
                                                            <MenuItem value={'legal'}>Legal Holiday</MenuItem>

                                                       </TextField>

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
                                                            label="Absent Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setAbsent_hours(e.target.value)}
                                                            value={absent_hours}
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
                                                  {hideWithPayLeaves === true ? null : <OthersWithPayLeaves id="othersWithPayLeaves">
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="VL With Pay Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setVl_wpay_hours(e.target.value)}
                                                            value={vl_wpay_hours}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="SL With Pay Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setSl_wpay_hours(e.target.value)}
                                                            value={sl_wpay_hours}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="EL With Pay Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setEl_wpay_hours(e.target.value)}
                                                            value={el_wpay_hours}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                  </OthersWithPayLeaves>}


                                                  {hideNoPayLeaves === true ? null : <OthersNoPayLeaves id="othersNoPayLeaves">
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="VL No Pay Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setVl_nopay_hours(e.target.value)}
                                                            value={vl_nopay_hours}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="SL No Pay Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setSl_nopay_hours(e.target.value)}
                                                            value={sl_nopay_hours}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="EL No Pay Hours"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={(e) => setEl_nopay_hours(e.target.value)}
                                                            value={el_nopay_hours}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />
                                                  </OthersNoPayLeaves>}
                                                  {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up the form completely. Remember that, unused fields should be "0"</Alert> : ""}
                                                  {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Successfully Saved</Alert> : ""}
                                             </DialogContent>
                                             <DialogActions>
                                                  {/* <Button onClick={handleAdd}>Add</Button> */}
                                                  <Button onClick={handleCloseAdd} autoFocus>
                                                       Cancel
                                                  </Button>
                                                  <Button onClick={handleAdd}>Save</Button>
                                             </DialogActions>
                                        </Dialog>
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

export default Dtr