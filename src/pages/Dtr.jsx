
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
import { toast } from 'react-toastify';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import { isElement } from 'react-dom/test-utils';
import { ElevatorSharp, Flare } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import { useRef } from 'react';
import Employees from './Employees';
import { isUnitless } from '@mui/material/styles/cssUtils';


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


     { field: 'official_am_in_hour', headerName: 'Official AM IN', width: 80 },
     { field: 'official_am_in_min', headerName: '', width: 80 },
     { field: 'am_in_hour', headerName: 'AM IN', width: 80 },
     { field: 'am_in_min', headerName: '', width: 80 },
     { field: 'am_out_hour', headerName: 'AM OUT', width: 80 },
     { field: 'am_out_min', headerName: '', width: 80 },



     { field: 'official_pm_in_hour', headerName: 'Official PM IN', width: 80 },
     { field: 'official_pm_in_min', headerName: '', width: 80 },
     { field: 'pm_in_hour', headerName: 'PM IN', width: 80 },
     { field: 'pm_in_min', headerName: '', width: 80 },
     { field: 'pm_out_hour', headerName: 'PM OUT', width: 80 },
     { field: 'pm_out_min', headerName: '', width: 80 },




     { field: 'is_restday', headerName: 'Is Restday?', width: 140 },
     { field: 'total_tardiness_min', headerName: 'Tardiness in Minutes', width: 140 },
     { field: 'total_undertime_min', headerName: 'Undertime in Minutes', width: 140 },


     { field: 'leave_type', headerName: 'Leave Type', width: 140 },
     { field: 'absent_day', headerName: 'Absent', width: 140 },
     { field: 'vl_day', headerName: 'VL - Paid', width: 140 },
     { field: 'sl_day', headerName: 'SL - Paid', width: 140 },
     { field: 'el_day', headerName: 'EL - Paid', width: 140 },

     { field: 'vl_nopay_day', headerName: 'VL - No Pay', width: 140 },
     { field: 'sl_nopay_day', headerName: 'SL - No Pay', width: 140 },
     { field: 'el_nopay_day', headerName: 'EL - No Pay', width: 140 },


     { field: 'approve_ot', headerName: 'Approved Overtime?', width: 140 },
     { field: 'regular_ot_hours', headerName: 'Regular - OT', width: 140 },
     { field: 'restday_ot_hours', headerName: 'Restday - OT', width: 140 },
     { field: 'special_ot_hours', headerName: 'Spec. Non Working - OT', width: 140 },
     { field: 'legal_ot_hours', headerName: 'Legal Holiday - OT', width: 140 },
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

     const [currentmonth, setcurrentmonth] = useState('')
     useEffect(() => {
          const month = date;
          const currentmonth = month.split('-')[0]
          if (currentmonth === "01") {
               setMonth('january')
          }
          else if (currentmonth === "02") {
               setMonth('february')
          }
          else if (currentmonth === "03") {
               setMonth('march')
          }
          else if (currentmonth === "04") {
               setMonth('april')
          }
          else if (currentmonth === "05") {
               setMonth('may')
          }
          else if (currentmonth === "06") {
               setMonth('june')
          }
          else if (currentmonth === "07") {
               setMonth('july')
          }
          else if (currentmonth === "08") {
               setMonth('august')
          }
          else if (currentmonth === "09") {
               setMonth('september')
          }
          else if (currentmonth === "10") {
               setMonth('october')
          }
          else if (currentmonth === "11") {
               setMonth('november')
          }
          else {
               setMonth('december')
          }


     }, [user])






     const [total_ot_hour, setTotal_ot_hour] = useState(0)

     const [month, setMonth] = useState('january');
     const [startDate, setStartDate] = useState('');
     const [endDate, setEndDate] = useState('');


     const [initialDate, setInitialDate] = useState('')
     const [am_in_hour, setAm_in_hour] = useState(0)
     const [am_in_min, setAm_in_min] = useState(0)
     const [am_out_hour, setAm_out_hour] = useState(0)
     const [am_out_min, setAm_out_min] = useState(0)
     const [pm_in_hour, setPm_in_hour] = useState(0)
     const [pm_in_min, setPm_in_min] = useState(0)
     const [pm_out_hour, setPm_out_hour] = useState(0)
     const [pm_out_min, setPm_out_min] = useState(0)
     const [total_undertime_min, settotal_undertime_min] = useState(0)
     const [ot_in_hour, setOt_in_hour] = useState(0)
     const [ot_in_min, setOt_in_min] = useState(0)
     const [ot_out_hour, setOt_out_hour] = useState(0)
     const [ot_out_min, setOt_out_min] = useState(0)
     const [total_working_hour, setTotal_working_hour] = useState(0)
     const [total_tardiness_min, setTotal_tardiness_min] = useState(0)
     const [ot_type, setOt_type] = useState("none")
     const [is_tardiness, setIs_tardiness] = useState(0)
     const [is_restday, setis_restday] = useState("No")

     const [departmentfilter, setdepartmentfilter] = useState('all')

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
     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
     };
     const [openAdd, setOpenAdd] = useState(false);
     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);
     const [openAddAdditionals, setOpenAddAdditionals] = useState(false);
     const [overtime, setovertime] = useState("not_approved")
     const [disabled_day_type, setdisabled_day_type] = useState(false)

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
     useEffect(() => {
          if (total_ot_hour > 0) {
               setdisabled_overtime(false)
          }
          else {
               setdisabled_overtime(true)
          }
     }, [total_ot_hour])


     const [dept, setDept] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/departments', {
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

     useEffect(() => {


          const fetchDtr = async () => {
               const response = await fetch(`https://inquisitive-red-sun-hat.cyclic.app/api/dtr/employee/${employeeId}`, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const date = item.date
                         return date >= startDate && date <= endDate

                    });

                    setDtr(filteredData)
                    console.log('^^^^^^^^^^^^^^^^^^', filteredData)

               }
          }
          if (user) {
               fetchDtr();
          }
     }, [employeeId, refresher, startDate])
     const [official_am_in_hour, setofficial_am_in_hour] = useState(0);
     const [official_am_in_min, setofficial_am_in_min] = useState(0);

     const [official_pm_in_hour, setofficial_pm_in_hour] = useState(0);
     const [official_pm_in_min, setofficial_pm_in_min] = useState(0);

     const [leave_type, setLeaveType] = useState('working_day');
     const [hide, setHide] = useState(false);
     const [hideWithPayLeaves, setHideWithPayLeaves] = useState(true)
     const [hideNoPayLeaves, setHideNoPayLeaves] = useState(true)
     const [day_type, setday_type] = useState('normal_day_today');



     //Run every time fields changes
     useEffect(() => {
          handleCalculateTotalHours();
          handleCalculateTardiness()
          handleCalculateUndertime();
          handleCalculateOvertime();
          handleOTType()
          console.log(')))))))))))))))))))))))))))))))))))))))))))))))))))', regular_ot_hours)
     }, [
          overtime,
          leave_type,
          official_am_in_hour,
          official_am_in_min,
          official_pm_in_hour,
          official_pm_in_min,
          am_in_hour,
          am_in_min,
          am_out_hour,
          am_out_min,
          pm_in_hour,
          pm_in_min,
          pm_out_hour,
          pm_out_min,
          ot_type,
     ])


     const [vl_day, setvl_day] = useState(0);
     const [sl_day, setsl_day] = useState(0);
     const [el_day, setel_day] = useState(0);

     const [vl_nopay_day, setvl_nopay_day] = useState(0);
     const [sl_nopay_day, setsl_nopay_day] = useState(0);
     const [el_nopay_day, setel_nopay_day] = useState(0);

     const handleCloseWarning = () => {
          setOpenWarning(false);
     };

     const handleDisabledAbsence = (status) => {
          if (
               status == "absent_halfday_morning" ||
               status == "vl_halfday_morning" ||
               status == "sl_halfday_morning" ||
               status == "el_halfday_morning" ||
               status == "vl_nopay_halfday_morning" ||
               status == "sl_nopay_halfday_morning" ||
               status == "el_nopay_halfday_morning"

          ) {
               setdisabled_pm_official(true) //correct
               setdisabled_pm_time(true) //true
               setdisabled_am_official(false) //true
               setdisabled_am_time(false) //true
               setovertime('not_approved')
               // setdisabled_overtime(false)
               setdisabled_day_type(false)
          }
          else if (
               status == "absent_halfday_afternoon" ||
               status == "vl_halfday_afternoon" ||
               status == "sl_halfday_afternoon" ||
               status == "el_halfday_afternoon" ||
               status == "vl_nopay_halfday_afternoon" ||
               status == "sl_nopay_halfday_afternoon" ||
               status == "el_nopay_halfday_afternoon"
          ) {
               setdisabled_pm_official(false)
               setdisabled_pm_time(false)
               setdisabled_am_official(true)

               setdisabled_am_time(true)
               // setdisabled_overtime(false)
               setovertime('not_approved')
               setdisabled_day_type(false)
          }
          else {
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(false)
               setdisabled_day_type(false)
          }
          // if (status == "_overtime") {
          //      setovertime('not_approved')
          //      setdisabled_overtime(false)
          //      setdisabled_day_type(false)
          // }
          // if (status == "") {
          //      setovertime('not_approved')
          //      setdisabled_overtime(true)
          //      setdisabled_day_type(true)
          // }
          // if (status == "none") {
          //      setovertime('not_approved')
          //      setdisabled_overtime(false)
          //      setdisabled_day_type(false)
          // }
          if (status == "absent") {
               setovertime('not_approved')
               setdisabled_overtime(true)
               setdisabled_day_type(true)
          }
          if (status == "vl_wholeday" || status == "vl_nopay_wholeday" || status == "sl_wholeday" || status == "sl_nopay_wholeday" || status == "el_wholeday" || status == "el_nopay_wholeday") {
               setovertime('not_approved')
               setdisabled_overtime(true)
               setdisabled_day_type(true)
          }

     }
     const handleDayTypeChange = (event) => {
          const type = event.target.value
          setday_type(type);
     }
     const handleSelectLeaveTypeChange = (event) => {
          const type = event.target.value
          setLeaveType(event.target.value);
          handleDisabledAbsence(type)
          handleClearTotal();


          if (type == "working_day") {
               setHide(false)
               setabsent_day(0)
               setHideWithPayLeaves(true)
               setis_restday("No")
               setHideNoPayLeaves(true)
          }
          else if (type === "_overtime") {
               setHide(false)
          }
          else if (type == "vl_halfday_morning" || type == "vl_halfday_afternoon" || type == "sl_halfday_morning" || type == "sl_halfday_afternoon" || type == "el_halfday_morning" || type == "el_halfday_afternoon") {
               setHide(false)
               setabsent_day(0)
               setHideWithPayLeaves(false)
               setHideNoPayLeaves(true)
               setis_restday("No")
               handleClearForLeave()
               if (type == "vl_halfday_afternoon" || type == "vl_halfday_morning") {
                    setvl_day(0.5)
                    setsl_day(0)
                    setel_day(0)
               }
               else if (type == "sl_halfday_afternoon" || type == "sl_halfday_morning") {
                    setvl_day(0)
                    setsl_day(0.5)
                    setel_day(0)
               }
               else {
                    setvl_day(0)
                    setsl_day(0)
                    setel_day(0.5)
               }

          }
          else if (type == "vl_wholeday" || type == "sl_wholeday" || type == "el_wholeday" || type == "absent") {
               setHide(true)
               setabsent_day(0)
               setHideWithPayLeaves(false)
               setHideNoPayLeaves(true)
               setis_restday("No")
               handleClearForLeave()
               if (type == "vl_wholeday") {
                    setvl_day(1)
                    setsl_day(0)
                    setel_day(0)
               }
               else if (type == "sl_wholeday") {
                    setvl_day(0)
                    setsl_day(1)
                    setel_day(0)
               }
               else {
                    setvl_day(0)
                    setsl_day(0)
                    setel_day(1)
               }

          }
          else if (type == "vl_nopay_halfday_morning" || type == "vl_nopay_halfday_afternoon" || type == "sl_nopay_halfday_morning" || type == "sl_nopay_halfday_afternoon" || type == "el_nopay_halfday_morning" || type == "el_nopay_halfday_afternoon") {
               setHide(false)
               setabsent_day(0)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(false)
               handleClearForLeave()
               setis_restday("No")
               if (type == "vl_nopay_halfday_afternoon" || type == "vl_nopay_halfday_morning") {
                    setvl_nopay_day(0.5)
                    setsl_nopay_day(0)
                    setel_nopay_day(0)
                    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
               }
               else if (type == "sl_nopay_halfday_afternoon" || type == "sl_nopay_halfday_morning") {
                    setvl_nopay_day(0)
                    setsl_nopay_day(0.5)
                    setel_nopay_day(0)
               }
               else {
                    setvl_nopay_day(0)
                    setsl_nopay_day(0)
                    setel_nopay_day(0.5)
               }

          }
          else if (type == "vl_nopay_wholeday" || type == "sl_nopay_wholeday" || type == "el_nopay_wholeday") {
               setHide(true)
               setabsent_day(0)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(false)
               setis_restday("No")
               handleClearForLeave()
               if (type == "vl_nopay_wholeday") {
                    setvl_nopay_day(1)
                    setsl_nopay_day(0)
                    setel_nopay_day(0)
               }
               else if (type == "sl_nopay_wholeday") {
                    setvl_nopay_day(0)
                    setsl_nopay_day(1)
                    setel_nopay_day(0)
               }
               else {
                    setvl_nopay_day(0)
                    setsl_nopay_day(0)
                    setel_nopay_day(1)
               }

          }
          else if (type == "absent") {

               setabsent_day(1)
               setHide(true)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(true)
               handleClearForAbsent()
               setis_restday("No")

          }
          else if (type == "absent_halfday_morning" || type == "absent_halfday_afternoon") {
               setabsent_day(0.5)
               setHide(false)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(true)
               handleClearForAbsent()
               setis_restday("No")
          }
          else if (type == "restday") {
               setabsent_day(0)
               setHide(true)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(true)
               handleClearForRestDay()
               setis_restday("Yes")
          }
          else if (type == "restday_overtime") {
               setabsent_day(0)
               setHide(false)
               setHideWithPayLeaves(true)
               setHideNoPayLeaves(true)
               handleClearForRestDay()
               setis_restday("No")

          }
          else {
          }
     };

     const handleClearForLeave = () => {
          setofficial_am_in_hour(0)
          setofficial_am_in_min(0)
          setofficial_pm_in_hour(0)
          setofficial_pm_in_min(0)
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
          setTotal_ot_hour(0)
          setIs_tardiness(0)
          setabsent_day(0)
     }
     const handleClearFields = () => {
          setofficial_am_in_hour(0)
          setofficial_am_in_min(0)
          setofficial_pm_in_hour(0)
          setofficial_pm_in_min(0)
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
          setLeaveType('working_day')
          setHide(false)
          setdisabled_am_official(false)
          setdisabled_am_time(false)
          setdisabled_day_type(false)
          setdisabled_pm_official(true)
          setdisabled_pm_time(false)
          setTotal_tardiness_min(0)
          setabsent_day(0)
          setIs_tardiness(0)
          setvl_day(0)
          setsl_day(0)
          setel_day(0)
          setvl_nopay_day(0)
          setsl_nopay_day(0)
          setel_nopay_day(0)
          setTotal_ot_hour(0)
          setovertime('not_approved')
     }
     const handleClearForAbsent = () => {
          setofficial_am_in_hour(0)
          setofficial_am_in_min(0)
          setofficial_pm_in_hour(0)
          setofficial_pm_in_min(0)
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
          setIs_tardiness(0)
          setvl_day(0)
          setsl_day(0)
          setel_day(0)
          setvl_nopay_day(0)
          setsl_nopay_day(0)
          setTotal_ot_hour(0)
          setel_nopay_day(0)
          setovertime('not_approved')
     }
     const handleClearForRestDay = () => {
          setofficial_am_in_hour(0)
          setofficial_am_in_min(0)
          setofficial_pm_in_hour(0)
          setofficial_pm_in_min(0)
          setAm_in_hour(0)
          setAm_in_min(0)
          setAm_out_hour(0)
          setAm_out_min(0)
          setPm_in_hour(0)
          setPm_in_min(0)
          setPm_out_hour(0)
          setTotal_ot_hour(0)
          setPm_out_min(0)
          setTotal_working_hour(0)
          setOt_type('none')
          setTotal_tardiness_min(0)
          setIs_tardiness(0)
          setvl_day(0)
          setsl_day(0)
          setel_day(0)
          setvl_nopay_day(0)
          setsl_nopay_day(0)
          setel_nopay_day(0)
          setovertime('not_approved')
          setabsent_day(0)
     }

     const handleClearTotal = () => {
          setTotal_working_hour(0)
          setTotal_tardiness_min(0)
          setabsent_day(0)
          setIs_tardiness(0)
          setvl_day(0)
          setsl_day(0)
          setel_day(0)
          setvl_nopay_day(0)
          setsl_nopay_day(0)
          setel_nopay_day(0)
          setTotal_ot_hour(0)
     }

     const [leaveHours, setLeaveHours] = useState(0);
     const [absent_day, setabsent_day] = useState(0);
     const handleLeaveHours = (event) => {

          const hour = event.target.value
          setLeaveHours(hour)
     }


     const handleOpenDelete = () => {
          if (id == "") {
               errorToast('Please select an item to delete first')
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

     const handleOTType = () => {

          if (day_type === "normal_day_today") {
               setRegular_ot_hours(total_ot_hour)
               setSpecial_ot_hours(0)
               setLegal_ot_hours(0)
          }
          else if (day_type === "special_holiday_today") {
               setSpecial_ot_hours(total_ot_hour)
               setRegular_ot_hours(0)
               setLegal_ot_hours(0)
          }
          else if (day_type === "legal_holiday_today") {
               setLegal_ot_hours(total_ot_hour)
               setRegular_ot_hours(0)
               setSpecial_ot_hours(0)
          }
     }
     useEffect(() => {
          handleOTType();
     }, [user, day_type, total_ot_hour])





     // const handleCalculateTardiness = () => {
     //      const amStartHour = official_am_in_hour
     //      const amStartMin = 0;
     //      let hourDiff = am_in_hour - amStartHour;
     //      let minDiff = am_in_min - amStartMin;
     //      let totalHourDiff = hourDiff //1
     //      let convertedTotalHourDiff = totalHourDiff * 60;
     //      let totalMinDiff = convertedTotalHourDiff + minDiff //10
     //      if (totalMinDiff > 0) {
     //           setTotal_tardiness_min(totalMinDiff)

     //      } else {
     //           setTotal_tardiness_min(0)
     //      }
     // }

     const handleCalculateUndertime = () => {

          let am_in_mins = am_in_min / 60;
          let am_out_mins = am_out_min / 60;
          let pm_in_mins = pm_in_min / 60;
          let pm_out_mins = pm_out_min / 60;
          let official_am_in_mins = official_am_in_min / 60;
          let official_pm_in_mins = official_pm_in_min / 60;

          let official_am_in_hours = parseFloat(official_am_in_hour) + parseFloat(official_am_in_mins)
          let official_pm_in_hours = parseFloat(official_pm_in_hour) + parseFloat(official_pm_in_mins)
          let actual_am_in_hours = parseFloat(am_in_hour) + parseFloat(am_in_mins);
          let actual_am_out_hours = parseFloat(am_out_hour) + parseFloat(am_out_mins);
          let actual_pm_in_hours = parseFloat(pm_in_hour) + parseFloat(pm_in_mins);
          let actual_pm_out_hours = parseFloat(pm_out_hour) + parseFloat(pm_out_mins);

          if (leave_type == "working_day") {
               let total_hours = (official_am_in_hours + 9)
               let is_undertime = (total_hours - actual_pm_out_hours) * 60
               // meaning, if there's an undertime, AND the official hours and pm hours has value
               if (is_undertime > 0 && official_am_in_hours > 0 && actual_pm_out_hours > 0) {
                    let rounded_is_undertime = Math.round(is_undertime)
                    settotal_undertime_min(rounded_is_undertime)
               }
               else {
                    settotal_undertime_min(0)
               }
          }
          else if (
               leave_type == "absent_halfday_morning" ||
               leave_type == "vl_halfday_morning" ||
               leave_type == "vl_nopay_halfday_morning" ||

               leave_type == "sl_halfday_morning" ||
               leave_type == "sl_nopay_halfday_morning" ||

               leave_type == "el_halfday_morning" ||
               leave_type == "el_nopay_halfday_morning"

          ) {
               let total_hours = (official_am_in_hours + 4)
               let is_undertime = (total_hours - actual_am_out_hours) * 60
               // meaning, if there's an undertime, AND the official hours and pm hours has value
               if (is_undertime > 0 && official_am_in_hours > 0 && actual_am_out_hours > 0) {
                    let rounded_is_undertime = Math.round(is_undertime)
                    settotal_undertime_min(rounded_is_undertime)
               }
               else {
                    settotal_undertime_min(0)
               }
          }
          else if (
               leave_type == "absent_halfday_afternoon" ||
               leave_type == "vl_halfday_afternoon" ||
               leave_type == "vl_nopay_halfday_afternoon" ||

               leave_type == "sl_halfday_afternoon" ||
               leave_type == "sl_nopay_halfday_afternoon" ||

               leave_type == "el_halfday_afternoon" ||
               leave_type == "el_nopay_halfday_afternoon"
          ) {
               let total_hours = (official_pm_in_hours + 4)
               let is_undertime = (total_hours - actual_pm_out_hours) * 60
               // meaning, if there's an undertime, AND the official hours and pm hours has value
               if (is_undertime > 0 && official_pm_in_hours > 0 && actual_pm_out_hours > 0) {
                    let rounded_is_undertime = Math.round(is_undertime)
                    settotal_undertime_min(rounded_is_undertime)
               }
               else {
                    settotal_undertime_min(0)
               }
          }

     }
     const handleCalculateTardiness = () => {
          let am_in_mins = am_in_min / 60;
          let am_out_mins = am_out_min / 60;
          let pm_in_mins = pm_in_min / 60;
          let pm_out_mins = pm_out_min / 60;
          let official_am_in_mins = official_am_in_min / 60;
          let official_pm_in_mins = official_pm_in_min / 60;

          let official_am_in_hours = parseFloat(official_am_in_hour) + parseFloat(official_am_in_mins)
          let official_pm_in_hours = parseFloat(official_pm_in_hour) + parseFloat(official_pm_in_mins)
          let actual_am_in_hours = parseFloat(am_in_hour) + parseFloat(am_in_mins);
          let actual_am_out_hours = parseFloat(am_out_hour) + parseFloat(am_out_mins);
          let actual_pm_in_hours = parseFloat(pm_in_hour) + parseFloat(pm_in_mins);
          let actual_pm_out_hours = parseFloat(pm_out_hour) + parseFloat(pm_out_mins);


          /**OVERBREAK */
          /**meaning, if he is overlunch, add the overlunch time to tardiness */
          // let overbreak
          // if (actual_pm_in_hours - actual_am_out_hours > 1) {
          //      overbreak = actual_pm_in_hours - actual_am_out_hours;
          // }

          if (leave_type == "working_day") {
               let difference = (actual_am_in_hours - official_am_in_hours) * 60
               if (actual_am_in_hours > official_am_in_hours) {
                    let rounded_difference = Math.round(difference)
                    setTotal_tardiness_min(rounded_difference)
                    setIs_tardiness(1)
               }
               else {
                    setTotal_tardiness_min(0)
                    setIs_tardiness(0)
               }
          }
          else if (
               leave_type == "absent_halfday_morning" ||
               leave_type == "vl_halfday_morning" ||
               leave_type == "vl_nopay_halfday_morning" ||

               leave_type == "sl_halfday_morning" ||
               leave_type == "sl_nopay_halfday_morning" ||

               leave_type == "el_halfday_morning" ||
               leave_type == "el_nopay_halfday_morning"

          ) {

               /**meaning, this is the difference minutes if he is late. if not, 0 */
               let difference = (actual_am_in_hours - official_am_in_hours) * 60
               if (actual_am_in_hours > official_am_in_hours) {
                    let rounded_difference = Math.round(difference)
                    setTotal_tardiness_min(rounded_difference)
                    setIs_tardiness(1)
               }
               else {
                    setTotal_tardiness_min(0)
                    setIs_tardiness(0)
               }
          }
          else if (
               leave_type == "absent_halfday_afternoon" ||
               leave_type == "vl_halfday_afternoon" ||
               leave_type == "vl_nopay_halfday_afternoon" ||

               leave_type == "sl_halfday_afternoon" ||
               leave_type == "sl_nopay_halfday_afternoon" ||

               leave_type == "el_halfday_afternoon" ||
               leave_type == "el_nopay_halfday_afternoon"
          ) {
               let difference = (actual_pm_in_hours - official_pm_in_hours) * 60
               if (actual_pm_in_hours > official_pm_in_hours) {
                    let rounded_difference = Math.round(difference)
                    setTotal_tardiness_min(rounded_difference)
                    setIs_tardiness(1)
               }
               else {
                    setTotal_tardiness_min(0)
                    setIs_tardiness(0)
               }
          }
     }

     const handleCalculateOvertime = () => {
          let am_in_mins = am_in_min / 60;
          let am_out_mins = am_out_min / 60;
          let pm_in_mins = pm_in_min / 60;
          let pm_out_mins = pm_out_min / 60;
          let official_am_in_mins = official_am_in_min / 60;
          let official_pm_in_mins = official_pm_in_min / 60;

          let official_am_in_hours = parseFloat(official_am_in_hour) + parseFloat(official_am_in_mins)
          let official_pm_in_hours = parseFloat(official_pm_in_hour) + parseFloat(official_pm_in_mins)
          let actual_am_in_hours = parseFloat(am_in_hour) + parseFloat(am_in_mins);
          let actual_am_out_hours = parseFloat(am_out_hour) + parseFloat(am_out_mins);
          let actual_pm_in_hours = parseFloat(pm_in_hour) + parseFloat(pm_in_mins);
          let actual_pm_out_hours = parseFloat(pm_out_hour) + parseFloat(pm_out_mins);



          if (leave_type == "working_day") {
               let total_hours = official_am_in_hours + 9;
               let is_overtime = actual_pm_out_hours - total_hours;
               if (is_overtime > 0 && official_am_in_hours > 0 && actual_pm_out_hours > 0) {
                    let toFixed_isovertime = is_overtime.toFixed(2)
                    setTotal_ot_hour(toFixed_isovertime)
               }
               else {
                    setTotal_ot_hour(0)
               }
          }
          else if (
               leave_type == "absent_halfday_morning" ||
               leave_type == "vl_halfday_morning" ||
               leave_type == "vl_nopay_halfday_morning" ||
               leave_type == "sl_halfday_morning" ||
               leave_type == "sl_nopay_halfday_morning" ||
               leave_type == "el_halfday_morning" ||
               leave_type == "el_nopay_halfday_morning"

          ) {
               let total_hours = official_am_in_hours + 4;
               let is_overtime = actual_am_out_hours - total_hours;
               if (is_overtime > 0 && official_am_in_hours > 0 && actual_am_out_hours > 0) {
                    let toFixed_isovertime = is_overtime.toFixed(2)
                    setTotal_ot_hour(toFixed_isovertime)
               }
               else {
                    setTotal_ot_hour(0)
               }
          }
          else if (
               leave_type == "absent_halfday_afternoon" ||
               leave_type == "vl_halfday_afternoon" ||
               leave_type == "vl_nopay_halfday_afternoon" ||

               leave_type == "sl_halfday_afternoon" ||
               leave_type == "sl_nopay_halfday_afternoon" ||

               leave_type == "el_halfday_afternoon" ||
               leave_type == "el_nopay_halfday_afternoon"
          ) {
               let total_hours = official_pm_in_hours + 4;
               let is_overtime = actual_pm_out_hours - total_hours;
               if (is_overtime > 0 && official_pm_in_hours > 0 && actual_pm_out_hours > 0) {
                    let toFixed_isovertime = is_overtime.toFixed(2)
                    setTotal_ot_hour(toFixed_isovertime)
               }
               else {
                    setTotal_ot_hour(0)
               }
          }

     }
     const handleCalculateTotalHours = () => {
          let am_in_mins = am_in_min / 60;
          let am_out_mins = am_out_min / 60;
          let pm_in_mins = pm_in_min / 60;
          let pm_out_mins = pm_out_min / 60;
          let official_am_in_mins = official_am_in_min / 60;
          let official_pm_in_mins = official_pm_in_min / 60;

          let official_am_in_hours = parseFloat(official_am_in_hour) + parseFloat(official_am_in_mins)
          let official_pm_in_hours = parseFloat(official_pm_in_hour) + parseFloat(official_pm_in_mins)
          let actual_am_in_hours = parseFloat(am_in_hour) + parseFloat(am_in_mins);
          let actual_am_out_hours = parseFloat(am_out_hour) + parseFloat(am_out_mins);
          let actual_pm_in_hours = parseFloat(pm_in_hour) + parseFloat(pm_in_mins);
          let actual_pm_out_hours = parseFloat(pm_out_hour) + parseFloat(pm_out_mins);



          /////////////////////
          /////////////////////
          /** TOTAL AM HOURS */
          /////////////////////
          /////////////////////
          /** Holding the AM total number of hours  */
          let total_am_hours
          /** If he is EARLY, use the offical time in */
          if (actual_am_in_hours <= official_am_in_hour) {
               total_am_hours = actual_am_out_hours - official_am_in_hours;
          }
          /** else if he is LATE, use the actual time in */
          else {
               total_am_hours = actual_am_out_hours - actual_am_in_hours
          }




          /////////////////////
          /////////////////////
          /** TOTAL PM HOURS */
          /////////////////////
          /////////////////////
          /** Holding the PM total number of hours  */
          let total_pm_hours
          /** If he is EARLY, use the offical time in */
          if (actual_pm_in_hours <= official_pm_in_hour) {
               total_pm_hours = actual_pm_out_hours - official_pm_in_hours;
          }
          /** else if he is LATE, use the actual time in */
          else {
               total_pm_hours = actual_pm_out_hours - actual_pm_in_hours
          }






          /////////////////////
          /////////////////////
          /** TOTAL OVERBREAK */
          /////////////////////
          /////////////////////


          setTotal_working_hour(total_am_hours + total_pm_hours)
     }


     // const CalculateTotalHours = () => {
     //      //30 / 60 = 0.5
     //      let convertedAmMinsIn = am_in_min / 60;
     //      let convertedAmMinsOut = am_out_min / 60;
     //      let convertedPmMinsIn = pm_in_min / 60;
     //      let convertedPmMinsOut = pm_out_min / 60;
     //      let convertedOfficialAmMins = official_am_in_min / 60;
     //      let convertedOfficialPmMins = official_pm_in_min / 60;


     //      // this is the official time in
     //      let officialTimeinAm = parseFloat(official_am_in_hour) + parseFloat(convertedOfficialAmMins)
     //      let officialTimeinPm = parseFloat(official_pm_in_hour) + parseFloat(convertedOfficialPmMins)
     //      // this is actual time in
     //      let convertedAmIn_regular = parseFloat(am_in_hour) + parseFloat(convertedAmMinsIn);

     //      // this variable whether it is official time in, or actual timein
     //      let finalAmInHour;
     //      // meaning, if he is earlier than the official time, use the official time
     //      if (convertedAmIn_regular <= official_am_in_hour) {
     //           finalAmInHour = officialTimeinAm
     //           // meaning, if he is not earlier than the official time, use the actual time he arrived
     //      } else {
     //           // this is the ACTUAL TIME IN
     //           finalAmInHour = convertedAmIn_regular
     //      }
     //      // this is the ACTUAL TIME OUT
     //      let convertedAmOut_regular = parseFloat(am_out_hour) + parseFloat(convertedAmMinsOut)


     //      //ACTUAL PM TIME IN
     //      let pmTimeIn = parseFloat(pm_in_hour) + parseFloat(convertedPmMinsIn)

     //      //ACTUAL PM TIME OUT
     //      let pmTimOut = parseFloat(pm_out_hour) + parseFloat(convertedPmMinsOut)


     //      //ACTUAL AM TOTAL HOURS
     //      let calculateAmTotalHours = convertedAmOut_regular - finalAmInHour

     //      //ACTUAL PM TOTAL HOURS
     //      let calcualatePmTotalHours = pmTimOut - pmTimeIn

     //      let total = 0;
     //      total = calculateAmTotalHours + calcualatePmTotalHours


     //      let extra2
     //      //1     -      8 + 9 =  0 
     //      let checkForExtra = pmTimOut - (officialTimeinAm + parseFloat(9))
     //      if (checkForExtra > 0) {
     //           extra2 = checkForExtra;
     //      }
     //      else {
     //           extra2 = 0
     //      }



     //      if (overtime === "regday") {
     //           if (total > 8) {
     //                //dont use uquation insde useState "set". it will return an error
     //                setTotal_working_hour(8)
     //                setTotal_ot_hour(extra2)
     //                if (ot_type == "regular") {
     //                     setRegular_ot_hours(total_ot_hour)
     //                     setRestday_ot_hours(0)
     //                     setSpecial_ot_hours(0)
     //                     setLegal_ot_hours(0)
     //                }
     //                else if (ot_type == "restday") {
     //                     setRegular_ot_hours(0)
     //                     setRestday_ot_hours(total_ot_hour)
     //                     setSpecial_ot_hours(0)
     //                     setLegal_ot_hours(0)
     //                }
     //                else if (ot_type == "special") {
     //                     setRegular_ot_hours(0)
     //                     setRestday_ot_hours(0)
     //                     setSpecial_ot_hours(total_ot_hour)
     //                     setLegal_ot_hours(0)
     //                }
     //                else if (ot_type == "legal") {
     //                     setRegular_ot_hours(0)
     //                     setRestday_ot_hours(0)
     //                     setSpecial_ot_hours(0)
     //                     setLegal_ot_hours(total_ot_hour)
     //                }
     //                else {
     //                     setRegular_ot_hours(0)
     //                     setRestday_ot_hours(0)
     //                     setSpecial_ot_hours(0)
     //                     setLegal_ot_hours(0)
     //                }
     //           } else {
     //                setTotal_working_hour(total)
     //                setTotal_ot_hour(0)
     //           }
     //      } else {
     //           setTotal_working_hour(0)
     //           setTotal_ot_hour(total)
     //           if (ot_type == "regular") {
     //                setRegular_ot_hours(total_ot_hour)
     //                setRestday_ot_hours(0)
     //                setSpecial_ot_hours(0)
     //                setLegal_ot_hours(0)
     //           }
     //           else if (ot_type == "restday") {
     //                setRegular_ot_hours(0)
     //                setRestday_ot_hours(total_ot_hour)
     //                setSpecial_ot_hours(0)
     //                setLegal_ot_hours(0)
     //           }
     //           else if (ot_type == "special") {
     //                setRegular_ot_hours(0)
     //                setRestday_ot_hours(0)
     //                setSpecial_ot_hours(total_ot_hour)
     //                setLegal_ot_hours(0)
     //           }
     //           else if (ot_type == "legal") {
     //                setRegular_ot_hours(0)
     //                setRestday_ot_hours(0)
     //                setSpecial_ot_hours(0)
     //                setLegal_ot_hours(total_ot_hour)
     //           }
     //           else {
     //                setRegular_ot_hours(0)
     //                setRestday_ot_hours(0)
     //                setSpecial_ot_hours(0)
     //                setLegal_ot_hours(0)
     //           }
     //      }

     // }




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


     const [disabled_pm_official, setdisabled_pm_official] = useState(true);
     const [disabled_am_official, setdisabled_am_official] = useState(false);
     const [disabled_pm_time, setdisabled_pm_time] = useState(false);
     const [disabled_am_time, setdisabled_am_time] = useState(false);
     const [disabled_overtime, setdisabled_overtime] = useState(false);
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/employee', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    if (departmentfilter === "all") {
                         setEmp(json)
                    }
                    else {
                         const filteredData = json.filter(item => {
                              const department = item.department
                              return department === departmentfilter
                         });
                         setEmp(filteredData)
                    }

               }
          }
          if (user) {

               fetchEmp();
          }
     }, [user, departmentfilter])

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



     const handleDelete = async () => {


          const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/dtr/' + id, {
               method: 'DELETE',
               headers: {
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()
          if (response.ok) {
               console.log('deleted', json)
          }
          handleCloseDelete();
          successToast('Deleted Successfully')
          handleRefresher();
          setId('')



     }

     const handleAdd = async (e) => {
          e.preventDefault()

          if (name === "" || official_am_in_hour === "" || am_in_hour === "" || am_out_hour === "" || pm_in_hour === "" || pm_out_hour === "") {
               errorToast('Fill up the required fields completely')
          }
          else if (
               (leave_type == "absent_halfday_morning" ||
                    leave_type == "vl_halfday_morning" ||
                    leave_type == "vl_nopay_halfday_morning" ||
                    leave_type == "sl_halfday_morning" ||
                    leave_type == "sl_nopay_halfday_morning" ||
                    leave_type == "el_halfday_morning" ||
                    leave_type == "el_nopay_halfday_morning")

               &&

               official_am_in_hour === 0 
                   


          ) {
               errorToast(leave_type + " " + official_am_in_hour + " " + am_in_hour + " " + am_out_hour)
          }
          else if (
               (leave_type == "absent_halfday_afternoon" ||
               leave_type == "vl_halfday_afternoon" ||
               leave_type == "vl_nopay_halfday_afternoon" ||
               leave_type == "sl_halfday_afternoon" ||
               leave_type == "sl_nopay_halfday_afternoon" ||
               leave_type == "el_halfday_afternoon" ||
               leave_type == "el_nopay_halfday_afternoon")

               &&

               official_pm_in_hour === 0 
          ) {
               errorToast("Please input time in and timeout first AFTERNOON")
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
                         official_am_in_hour: official_am_in_hour,
                         official_am_in_min: official_am_in_min,
                         official_pm_in_hour: official_pm_in_hour,
                         official_pm_in_min: official_pm_in_min,
                         am_in_hour: am_in_hour,
                         am_in_min: am_in_min,
                         am_out_hour: am_out_hour,
                         am_out_min: am_out_min,
                         pm_in_hour: pm_in_hour,
                         pm_in_min: pm_in_min,
                         pm_out_hour: pm_out_hour,
                         pm_out_min: pm_out_min,
                         is_restday: is_restday,
                         total_tardiness_min: total_tardiness_min,
                         total_undertime_min: total_undertime_min,
                         leave_type: leave_type,
                         absent_day: absent_day,
                         vl_day: vl_day,
                         sl_day: sl_day,
                         el_day: el_day,
                         vl_nopay_day: vl_nopay_day,
                         sl_nopay_day: sl_nopay_day,
                         el_nopay_day: el_nopay_day,
                         regular_ot_hours: regular_ot_hours,
                         restday_ot_hours: restday_ot_hours,
                         special_ot_hours: special_ot_hours,
                         legal_ot_hours: legal_ot_hours,
                         approve_ot: overtime,
                    }
                    const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/dtr', {
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
                    successToast('Added Successfully')

                    handleClearFields()
                    handleRefresher()
                    handleCloseAdd()

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
     const handleZeroOnBlur = () => {
          if (official_am_in_hour === "") {
               setofficial_am_in_hour(0)
          }
          else if(official_am_in_hour > 24){
               errorToast("Invalid time")
               setofficial_am_in_hour(0)
          }


          

          else if (official_am_in_min === "") {
               setofficial_am_in_min(0)
          }
          else if(official_am_in_min > 59){
               errorToast("Invalid time")
               setofficial_am_in_min(0)
          }



          else if (am_in_hour === "") {
               setAm_in_hour(0)
          }
          else if(am_in_hour > 24){
               errorToast("Invalid time")
               setAm_in_hour(0)
          }



          else if (am_in_min === "") {
               setAm_in_min(0)
          }
          else if(am_in_min > 59){
               errorToast("Invalid time")
               setAm_in_min(0)
          }



          else if (am_out_hour === "") {
               setAm_out_hour(0)
          }
          else if(am_out_hour > 24){
               errorToast("Invalid time")
               setAm_out_hour(0)
          }


          else if (am_out_min === "") {
               setAm_out_min(0)
          }
          else if(am_out_min > 59){
               errorToast("Invalid time")
               setAm_out_min(0)
          }



          else if (official_pm_in_hour === "") {
               setofficial_pm_in_hour(0)
          }
          else if(official_pm_in_hour > 24){
               errorToast("Invalid time")
               setofficial_pm_in_hour(0)
          }



          else if (official_pm_in_min === "") {
               setofficial_pm_in_min(0)
          }
          else if(official_pm_in_min > 59){
               errorToast("Invalid time")
               setofficial_pm_in_min(0)
          }



          else if (pm_in_hour === "") {
               setPm_in_hour(0)
          }
          else if(pm_in_hour > 24){
               errorToast("Invalid time")
               setPm_in_hour(0)
          }



          else if (pm_in_min === "") {
               setPm_in_min(0)
          }
          else if(pm_in_min > 59){
               errorToast("Invalid time")
               setPm_in_min(0)
          }





          else if (pm_out_hour === "") {
               setPm_out_hour(0)
          }
          else if(pm_out_hour > 24){
               errorToast("Invalid time")
               setPm_out_hour(0)
          }




          else if (pm_out_min === "") {
               setPm_out_min(0)
          }
          else if(pm_out_min > 59){
               errorToast("Invalid time")
               setPm_out_min(0)
          }
          else {

          }
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
          const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/additional', {
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


     const handleMonthChange = (e) => {
          setMonth(e.target.value)

     }
     useEffect(() => {
          handleDates();
     }, [month])

     const handleDates = () => {
          if (month == "january") {
               setStartDate(`01-01-2023`)
               setEndDate(`01-31-2023`)
          }

          if (month == "february") {
               setStartDate(`02-01-2023`)
               setEndDate(`02-28-2023`)
          }

          if (month == "march") {
               setStartDate(`03-01-2023`)
               setEndDate(`03-31-2023`)
          }

          if (month == "april") {
               setStartDate(`04-01-2023`)
               setEndDate(`04-30-2023`)
          }

          if (month == "may") {
               setStartDate(`05-01-2023`)
               setEndDate(`05-31-2023`)
          }

          if (month == "june") {
               setStartDate(`06-01-2023`)
               setEndDate(`06-30-2023`)
          }

          if (month == "july") {
               setStartDate(`07-01-2023`)
               setEndDate(`07-31-2023`)
          }

          if (month == "august") {
               setStartDate(`08-01-2023`)
               setEndDate(`08-31-2023`)
          }

          if (month == "september") {
               setStartDate(`09-01-2023`)
               setEndDate(`09-30-2023`)
          }

          if (month == "october") {
               setStartDate(`10-01-2023`)
               setEndDate(`10-31-2023`)
          }

          if (month == "november") {
               setStartDate(`11-01-2023`)
               setEndDate(`11-30-2023`)
          }

          if (month == "december") {
               setStartDate(`12-01-2023`)
               setEndDate(`12-31-2023`)
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
                                   <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Filter by department"
                                             fullWidth
                                             select
                                             style={{ paddingBottom: "20px", marginRight: "10px" }}
                                             onChange={(e) => setdepartmentfilter(e.target.value)}
                                             value={departmentfilter}
                                        >
                                             <MenuItem value="all">All Department</MenuItem>
                                             {dept.map((data) => {
                                                  return <MenuItem key={data._id} value={data.department_name}>{data.department_name}</MenuItem>
                                             })}
                                        </TextField>
                                        {/* <TextField
                                             required
                                             id="outlined-required"
                                             label="Search Employee"
                                             fullWidth
                                             select
                                             style={{ paddingBottom: "20px", marginRight: "10px" }}
                                             onChange={handleName}
                                             value={name}
                                        >
                                             {emp.map((data) => {
                                                  // return <MenuItem key={data._id} value={data.firstname + " " + data.lastname}>{data.employee_id + " - " + data.firstname + " " + data.lastname}</MenuItem>
                                                  return <MenuItem key={data._id} value={data.employee_id + " - " + data.firstname + " " + data.lastname}>{data.employee_id + " - " + data.firstname + " " + data.lastname}</MenuItem>
                                             })}
                                        </TextField> */}
                                        <Autocomplete
                                             value={name}
                                             style={{ marginRight: "10px" }}
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
                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Month"
                                             fullWidth
                                             select
                                             style={{ paddingBottom: "20px" }}
                                             onChange={(e) => setMonth(e.target.value)}
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
                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                             <DatePicker
                                                  label="Current Date"
                                                  value={currentDate}
                                                  inputFormat="MM-DD-YYYY"
                                                  onChange={convertDateToString}
                                                  renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                             />
                                        </LocalizationProvider> */}


                                   </div>
                                   <div style={{ height: 475, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={dtr}
                                             columns={columns}
                                             rowsPerPageOptions={[10]}
                                             style={{ marginBottom: "20px" }}
                                             onRowClick={handleRowClick}
                                        />

                                        <div></div>
                                        <ButtonContainer>
                                             <div>
                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleOpenAdd}>
                                                            Add New DTR
                                                       </Button>
                                                  </ThemeProvider>
                                             </div>
                                             <div style={{ marginTop: "20px" }}>
                                                  For updating DTR, please delete the old one and create an updated one.
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
                                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                 label="Date"
                                                                 value={date}
                                                                 inputFormat="MM-DD-YYYY"
                                                                 onChange={convertDateToString}
                                                                 renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px", marginTop: "20px", marginRight: "10px" }}{...params} error={false} />}
                                                            />
                                                       </LocalizationProvider>
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Filter by department"
                                                            fullWidth
                                                            select
                                                            style={{ width: "100%" }}
                                                            onChange={(e) => setdepartmentfilter(e.target.value)}
                                                            value={departmentfilter}
                                                       >
                                                            <MenuItem value="all">All Department</MenuItem>
                                                            {dept.map((data) => {
                                                                 return <MenuItem key={data._id} value={data.department_name}>{data.department_name}</MenuItem>
                                                            })}
                                                       </TextField>
                                                  </div>

                                                  <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                       <Autocomplete
                                                            style={{ width: "100%" }}
                                                            value={name}
                                                            onSelect={handleName}
                                                            options={emp.map((data) => data.employee_id + " - " + data.firstname + " " + data.lastname)}
                                                            renderInput={(params) => (
                                                                 <TextField
                                                                      {...params}
                                                                      required
                                                                      label="Search Employee"
                                                                      fullWidth
                                                                      style={{ width: "100%", paddingBottom: "20px" }}
                                                                 />
                                                            )}
                                                       />
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Employee_id"
                                                            fullWidth
                                                            style={{ paddingBottom: "20px", marginLeft: "10px" }}
                                                            value={employeeId}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />

                                                  </div>

                                                  <TimeContainer>

                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Choose Leave Type"
                                                            fullWidth
                                                            select
                                                            style={{ paddingBottom: "40px", marginRight: "10px" }}
                                                            onChange={handleSelectLeaveTypeChange}
                                                            value={leave_type}
                                                       >

                                                            <MenuItem style={{ color: '#a41fe2', marginTop: "20px" }} value={'working_day'}>Working Day</MenuItem>
                                                            <MenuItem style={{ color: '#a41fe2' }} value={'restday'}>Rest Day</MenuItem>
                                                            <MenuItem style={{ color: '#a41fe2' }} value={'restday_overtime'}>Rest Day - Overtime (RDOT)</MenuItem>

                                                            <MenuItem style={{ color: '#11b602', marginTop: "30px" }} value={'absent'}>Absent Wholeday</MenuItem>
                                                            <MenuItem style={{ color: '#11b602' }} value={'absent_halfday_morning'}>Absent Halfday - Morning Work</MenuItem>
                                                            <MenuItem style={{ color: '#11b602' }} value={'absent_halfday_afternoon'}>Absent Halfday - Afternoon Work</MenuItem>

                                                            <MenuItem style={{ color: '#02a1b6', marginTop: "30px" }} value={'vl_wholeday'}>VL With Pay Wholeday</MenuItem>
                                                            <MenuItem style={{ color: '#02a1b6' }} value={'vl_halfday_morning'}>VL With Pay Halfday - Morning Work</MenuItem>
                                                            <MenuItem style={{ color: '#02a1b6' }} value={'vl_halfday_afternoon'}>VL With Pay Halfday - Afternoon Work</MenuItem>
                                                            <MenuItem style={{ color: '#026977' }} value={'vl_nopay_wholeday'}>VL No Pay Wholeday</MenuItem>
                                                            <MenuItem style={{ color: '#026977' }} value={'vl_nopay_halfday_morning'}>VL No Pay Halfday - Morning Work</MenuItem>
                                                            <MenuItem style={{ color: '#026977' }} value={'vl_nopay_halfday_afternoon'}>VL No Pay Halfday - Afternoon Work</MenuItem>

                                                            <MenuItem style={{ color: 'orange', marginTop: "30px" }} value={'sl_wholeday'}>SL With Pay Wholeday</MenuItem>
                                                            <MenuItem style={{ color: 'orange' }} value={'sl_halfday_morning'}>SL With Pay Halfday - Morning Work</MenuItem>
                                                            <MenuItem style={{ color: 'orange' }} value={'sl_halfday_afternoon'}>SL With Pay Halfday - Afternoon Work</MenuItem>
                                                            <MenuItem style={{ color: '#d17a40' }} value={'sl_nopay_wholeday'}>SL No Pay Wholeday</MenuItem>
                                                            <MenuItem style={{ color: '#d17a40' }} value={'sl_nopay_halfday_morning'}>SL No Pay Halfday - Morning Work</MenuItem>
                                                            <MenuItem style={{ color: '#d17a40' }} value={'sl_nopay_halfday_afternoon'}>SL No Pay Halfday - Afternoon Work</MenuItem>


                                                            <MenuItem style={{ color: 'red', marginTop: "30px" }} value={'el_wholeday'}>EL With Pay Wholeday</MenuItem>
                                                            <MenuItem style={{ color: 'red' }} value={'el_halfday_morning'}>EL With Pay Halfday - Morning Work</MenuItem>
                                                            <MenuItem style={{ color: 'red' }} value={'el_halfday_afternoon'}>EL With Pay Halfday - Afternoon Work</MenuItem>
                                                            <MenuItem style={{ color: '#d63e3e' }} value={'el_nopay_wholeday'}>EL No Pay Wholeday</MenuItem>
                                                            <MenuItem style={{ color: '#d63e3e' }} value={'el_nopay_halfday_morning'}>EL No Pay Halfday - Morning Work</MenuItem>
                                                            <MenuItem style={{ color: '#d63e3e' }} value={'el_nopay_halfday_afternoon'}>EL No Pay Halfday - Afternoon Work</MenuItem>

                                                       </TextField>
                                                       <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Day Type"
                                                            fullWidth
                                                            select
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={handleDayTypeChange}
                                                            value={day_type}
                                                            disabled={disabled_day_type}

                                                       >
                                                            <MenuItem value={'normal_day_today'}>Normal Day</MenuItem>
                                                            <MenuItem value={'special_holiday_today'}>Special Non Working Holiday </MenuItem>
                                                            <MenuItem value={'legal_holiday_today'}>Legal Holiday</MenuItem>
                                                       </TextField>


                                                  </TimeContainer>

                                                  {hide === true ? null : <Others id="others">
                                                       < div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div style={{ marginRight: '40px' }}>
                                                                 <h1 style={{ padding: "10px", display: 'flex', justifyContent: 'center', backgroundColor: 'orange' }} >AM TIME</h1>
                                                                 <TimeContainer style={{ marginTop: "20px" }}>
                                                                      <TextField
                                                                           disabled={disabled_am_official}
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Official AM (hour)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setofficial_am_in_hour(e.target.value)}
                                                                           onBlur={handleZeroOnBlur}
                                                                           value={official_am_in_hour}

                                                                      />
                                                                      <TextField
                                                                           disabled={disabled_am_official}
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Official AM (mins)"
                                                                           onBlur={handleZeroOnBlur}
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setofficial_am_in_min(e.target.value)}
                                                                           value={official_am_in_min}
                                                                      />
                                                                 </TimeContainer>

                                                                 <TimeContainer>
                                                                      <TextField
                                                                           disabled={disabled_am_time}
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           onBlur={handleZeroOnBlur}
                                                                           id="outlined-required"
                                                                           label="AM IN (hour)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setAm_in_hour(e.target.value)}
                                                                           value={am_in_hour}
                                                                      />
                                                                      <TextField
                                                                           disabled={disabled_am_time}
                                                                           type="number"
                                                                           required
                                                                           onBlur={handleZeroOnBlur}
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="AM IN (mins)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setAm_in_min(e.target.value)}
                                                                           value={am_in_min}

                                                                      />
                                                                 </TimeContainer>
                                                                 <TimeContainer style={{ paddingBottom: "40px" }}>
                                                                      <TextField
                                                                           disabled={disabled_am_time}
                                                                           type="number"
                                                                           required
                                                                           onBlur={handleZeroOnBlur}
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="AM OUT (hour)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setAm_out_hour(e.target.value)}
                                                                           value={am_out_hour}
                                                                      />
                                                                      <TextField
                                                                           disabled={disabled_am_time}
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           onBlur={handleZeroOnBlur}
                                                                           id="outlined-required"
                                                                           label="AM OUT (mins)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setAm_out_min(e.target.value)}
                                                                           value={am_out_min}

                                                                      />
                                                                 </TimeContainer >
                                                            </div>

                                                            <div>
                                                                 <h1 style={{ padding: "10px", display: 'flex', justifyContent: 'center', backgroundColor: 'orange' }} >PM TIME</h1>
                                                                 <TimeContainer style={{ marginTop: "20px" }}>
                                                                      <TextField
                                                                           disabled={disabled_pm_official}
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           onBlur={handleZeroOnBlur}
                                                                           id="outlined-required"
                                                                           label="Official PM (hour)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setofficial_pm_in_hour(e.target.value)}
                                                                           value={official_pm_in_hour}
                                                                      />
                                                                      <TextField
                                                                           disabled={disabled_pm_official}
                                                                           type="number"
                                                                           required
                                                                           onBlur={handleZeroOnBlur}
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Official PM (mins)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setofficial_pm_in_min(e.target.value)}
                                                                           value={official_pm_in_min}
                                                                      />
                                                                 </TimeContainer>
                                                                 <TimeContainer >

                                                                      <TextField
                                                                           disabled={disabled_pm_time}
                                                                           type="number"
                                                                           required
                                                                           onBlur={handleZeroOnBlur}
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="PM IN (hour)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setPm_in_hour(e.target.value)}
                                                                           value={pm_in_hour}

                                                                      />
                                                                      <TextField
                                                                           disabled={disabled_pm_time}
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="PM IN (mins)"
                                                                           onBlur={handleZeroOnBlur}
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setPm_in_min(e.target.value)}
                                                                           value={pm_in_min}

                                                                      />
                                                                 </TimeContainer>
                                                                 <TimeContainer style={{ paddingBottom: "40px" }}>
                                                                      <TextField
                                                                           disabled={disabled_pm_time}
                                                                           type="number"
                                                                           fullWidth
                                                                           required
                                                                           id="outlined-required"
                                                                           onBlur={handleZeroOnBlur}
                                                                           label="PM OUT (hour)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setPm_out_hour(e.target.value)}
                                                                           value={pm_out_hour}

                                                                      />
                                                                      <TextField
                                                                           disabled={disabled_pm_time}
                                                                           type="number"
                                                                           required
                                                                           fullWidth
                                                                           onBlur={handleZeroOnBlur}
                                                                           id="outlined-required"
                                                                           label="PM OUT (mins)"
                                                                           style={{ paddingBottom: "20px" }}
                                                                           onChange={(e) => setPm_out_min(e.target.value)}
                                                                           value={pm_out_min}

                                                                      />
                                                                 </TimeContainer>
                                                            </div>

                                                       </div>



                                                       <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div style={{ display: "flex", flexDirection: "column" }}>

                                                                 <TextField
                                                                      type="number"

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
                                                                      label="Approve overtime?"
                                                                      fullWidth
                                                                      select
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setovertime(e.target.value)}
                                                                      value={overtime}
                                                                      disabled={disabled_overtime}
                                                                 >
                                                                      <MenuItem value={'not_approved'}>Don't Approve</MenuItem>
                                                                      <MenuItem value={'approved'}>Approved</MenuItem>

                                                                 </TextField>
                                                                 <TextField
                                                                      type="number"

                                                                      id="outlined-required"
                                                                      label="Total Undertime Minutes"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => settotal_undertime_min(e.target.value)}
                                                                      value={total_undertime_min}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />

                                                                 <TextField
                                                                      type="number"

                                                                      id="outlined-required"
                                                                      label="Total Tardiness Minutes"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setTotal_tardiness_min(e.target.value)}
                                                                      value={total_tardiness_min}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                                 <TextField

                                                                      id="outlined-required"
                                                                      label="Absent"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setabsent_day(e.target.value)}
                                                                      value={absent_day}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column" }}>


                                                                 <TextField

                                                                      id="outlined-required"
                                                                      label="VL with pay"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setvl_day(e.target.value)}
                                                                      value={vl_day}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                                 <TextField

                                                                      id="outlined-required"
                                                                      label="SL with pay"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setsl_day(e.target.value)}
                                                                      value={sl_day}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                                 <TextField

                                                                      id="outlined-required"
                                                                      label="EL with pay"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setel_day(e.target.value)}
                                                                      value={el_day}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                                 <TextField

                                                                      id="outlined-required"
                                                                      label="VL no pay"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setvl_nopay_day(e.target.value)}
                                                                      value={vl_nopay_day}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                                 <TextField

                                                                      id="outlined-required"
                                                                      label="SL no pay"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setsl_nopay_day(e.target.value)}
                                                                      value={sl_nopay_day}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                                 <TextField

                                                                      id="outlined-required"
                                                                      label="EL no pay"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "20px" }}
                                                                      onChange={(e) => setel_nopay_day(e.target.value)}
                                                                      value={el_nopay_day}
                                                                      InputProps={{
                                                                           readOnly: true,
                                                                      }}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </Others>}
                                                  {hideWithPayLeaves === true ? null : <OthersWithPayLeaves id="othersWithPayLeaves">

                                                  </OthersWithPayLeaves>}


                                                  {hideNoPayLeaves === true ? null : <OthersNoPayLeaves id="othersNoPayLeaves">

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
          </div >
     )
}

export default Dtr