
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



     { field: 'total_tardiness_min', headerName: 'Tardiness in Minutes', width: 140 },
     { field: 'total_undertime_min', headerName: 'Undertime in Minutes', width: 140 },


     { field: 'leave_type', headerName: 'Leave Type', width: 140 },
     { field: 'day_type', headerName: 'Day Type', width: 140 },
     { field: 'absent_day', headerName: 'Absent', width: 140 },
     { field: 'vl_day', headerName: 'VL - Paid', width: 140 },
     { field: 'sl_day', headerName: 'SL - Paid', width: 140 },
     { field: 'el_day', headerName: 'SIL - Paid', width: 140 },

     { field: 'vl_nopay_day', headerName: 'VL - No Pay', width: 140 },
     { field: 'sl_nopay_day', headerName: 'SL - No Pay', width: 140 },
     { field: 'el_nopay_day', headerName: 'SIL - No Pay', width: 140 },
     { field: 'restday_nopay_day', headerName: 'Restday - No Pay', width: 140 },


     { field: 'approve_ot', headerName: 'Approved Overtime?', width: 140 },
     { field: 'regular_ot_hours', headerName: 'Regular - OT', width: 140 },
     { field: 'special_ot_hours', headerName: 'Spec. Non Working - OT', width: 140 },
     { field: 'legal_ot_hours', headerName: 'Legal Holiday - OT', width: 140 },
];



/**GET REQUESTS */
const Dtr = (props) => {
     const [query, setQuery] = useState('')
     const { user } = useAuthContext()
     const [dtr, setDtr] = useState([])
     const [year, setyear] = useState('')
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

     const handleMonthChange = (e) => {
          setMonth(e.target.value)
     }


     const [currentmonth, setcurrentmonth] = useState('')

     // Auto set the month when opening the system. Example today is July. When opening the system, it will not display January. Instead, July
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




     const handleScroll = (event) => {
          event.preventDefault();
     };


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
     const [is_tardiness, setIs_tardiness] = useState(0)
     const [departmentfilter, setdepartmentfilter] = useState('all')

     const [isAdd, setIsAdd] = useState(false)
     const [refresher, setRefresher] = useState(0)
     const handleRefresher = () => {
          setRefresher(Math.random())
     };







     //Paster

     const [paster_official_am, setpaster_official_am] = useState('');
     const [hour_official_am, sethour_official_am] = useState('');
     const [min_official_am, setmin_official_am] = useState('');

     const [paster_timein_am, setpaster_timein_am] = useState('');
     const [hour_timein_am, sethour_timein_am] = useState('');
     const [min_timein_am, setmin_timein_am] = useState('');

     const [paster_timeout_am, setpaster_timeout_am] = useState('');
     const [hour_timeout_am, sethour_timeout_am] = useState('');
     const [min_timeout_am, setmin_timeout_am] = useState('');

     const [paster_official_pm, setpaster_official_pm] = useState('');
     const [hour_official_pm, sethour_official_pm] = useState('');
     const [min_official_pm, setmin_official_pm] = useState('');

     const [paster_timein_pm, setpaster_timein_pm] = useState('');
     const [hour_timein_pm, sethour_timein_pm] = useState('');
     const [min_timein_pm, setmin_timein_pm] = useState('');

     const [paster_timeout_pm, setpaster_timeout_pm] = useState('');
     const [hour_timeout_pm, sethour_timeout_pm] = useState('');
     const [min_timeout_pm, setmin_timeout_pm] = useState('');


     const handlePasteChange_official_am = (event) => {
          const time = event.target.value.trim();

          if (time !== '') {
               const parts = time.split(':');
               const extractedHour = parseInt(parts[0]);
               const extractedMinute = parseInt(parts[1].split(' ')[0]);

               setofficial_am_in_hour(extractedHour);
               setofficial_am_in_min(extractedMinute);
          }
          setpaster_official_am(time);
     };

     const handlePasteChange_timein_am = (event) => {
          const time = event.target.value.trim();

          if (time !== '') {
               const parts = time.split(':');
               const extractedHour = parseInt(parts[0]);
               const extractedMinute = parseInt(parts[1].split(' ')[0]);

               setAm_in_hour(extractedHour);
               setAm_in_min(extractedMinute);
          }
          setpaster_timein_am(time);
     };

     const handlePasteChange_timeout_am = (event) => {
          const time = event.target.value.trim();

          if (time !== '') {
               const parts = time.split(':');
               const extractedHour = parseInt(parts[0]);
               const extractedMinute = parseInt(parts[1].split(' ')[0]);

               setAm_out_hour(extractedHour);
               setAm_out_min(extractedMinute);
          }
          setpaster_timeout_am(time);
     };



     const handlePasteChange_official_pm = (event) => {
          const time = event.target.value.trim();

          if (time !== '') {
               const parts = time.split(':');
               let extractedHour = parseInt(parts[0]) + parseInt(12);
               const extractedMinute = parseInt(parts[1].split(' ')[0]);

               setofficial_pm_in_hour(extractedHour);
               setofficial_pm_in_min(extractedMinute);
          }
          setpaster_official_pm(time);
     };

     const handlePasteChange_timein_pm = (event) => {
          const time = event.target.value.trim();

          if (time !== '') {
               const parts = time.split(':');
               let extractedHour = parseInt(parts[0]) + parseInt(12);
               const extractedMinute = parseInt(parts[1].split(' ')[0]);

               setPm_in_hour(extractedHour);
               setPm_in_min(extractedMinute);
          }
          setpaster_timein_pm(time);
     };

     const handlePasteChange_timeout_pm = (event) => {
          const time = event.target.value.trim();

          if (time !== '') {
               const parts = time.split(':');
               let extractedHour = parseInt(parts[0]) + parseInt(12);
               const extractedMinute = parseInt(parts[1].split(' ')[0]);

               setPm_out_hour(extractedHour);
               setPm_out_min(extractedMinute);
          }
          setpaster_timeout_pm(time);
     };






















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
     const [undertime, setundertime] = useState("approved")
     const [tardiness, settardiness] = useState("approved")
     const [working_day_counter, setworking_day_counter] = useState(0)
     const [restday_counter, setrestday_counter] = useState(0)
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

          if (total_tardiness_min > 0) {
               setdisabled_tardiness(false)
          }
          else {
               setdisabled_tardiness(true)
          }
          if (total_undertime_min > 0) {
               setdisabled_undertime(false)
          }
          else {
               setdisabled_undertime(true)
          }
     }, [total_ot_hour, total_tardiness_min, total_undertime_min])


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

     useEffect(() => {
          const fetchDtr = async () => {
               const response = await fetch(`https://coop-back-zqr6.onrender.com/api/dtr/employee/${employeeId}`, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const startDateObj = new Date(startDate);
                    const endDateObj = new Date(endDate);

                    const filteredData = json.filter(item => {
                         const date = new Date(item.date);
                         return date >= startDateObj && date <= endDateObj;
                    });
                    // const filteredData = json.filter(item => {

                    //      const date = item.date
                    //     // successToast(date + " | " + startDate + " | " + endDate)
                    //      return date >= startDate && date <= endDate

                    // });
                    const sortedData = [...filteredData].sort((a, b) => new Date(a.date) - new Date(b.date));

                    setDtr(sortedData)

               }
          }
          if (user) {
               fetchDtr();
          }
     }, [employeeId, refresher, startDate, endDate])















     const [official_am_in_hour, setofficial_am_in_hour] = useState(0);
     const [official_am_in_min, setofficial_am_in_min] = useState(0);

     const [official_pm_in_hour, setofficial_pm_in_hour] = useState(0);
     const [official_pm_in_min, setofficial_pm_in_min] = useState(0);

     const [leave_type, setLeaveType] = useState('working_day');
     const [hide, setHide] = useState(false);

     const [day_type, setday_type] = useState('normal_day_today');



     //Run every time fields changes
     useEffect(() => {
          handleCalculateTotalHours();
          handleCalculateTardiness()
          handleCalculateUndertime();
          handleCalculateOvertime();
          handleOTType()
        
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

     ])


     const [vl_day, setvl_day] = useState(0);
     const [sl_day, setsl_day] = useState(0);
     const [el_day, setel_day] = useState(0);

     const [vl_nopay_day, setvl_nopay_day] = useState(0);
     const [sl_nopay_day, setsl_nopay_day] = useState(0);
     const [el_nopay_day, setel_nopay_day] = useState(0);
     const [restday_nopay_day, setrestday_nopay_day] = useState(0);
     const [restday_overtime_counter, setrestday_overtime_counter] = useState(0);

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

          if (status == "absent") {
               setovertime('not_approved')
               setdisabled_overtime(true)
               setdisabled_day_type(true)
               setdisabled_tardiness(true)
               setdisabled_undertime(true)
          }
          if (status == "vl_wholeday" || status == "vl_nopay_wholeday" || status == "sl_wholeday" || status == "sl_nopay_wholeday" || status == "el_wholeday" || status == "el_nopay_wholeday") {
               setovertime('not_approved')
               setdisabled_overtime(true)
               setdisabled_tardiness(true)
               setdisabled_undertime(true)
               setdisabled_day_type(true)
          }

     }
     const handleDayTypeChange = (event) => {
          const type = event.target.value
          setday_type(type);
     }

     useEffect(() => {
          // Invoke the handler function on the first render
          handleSelectLeaveTypeChange({ target: { value: leave_type } });
     }, [refresher]);


     const handleSelectLeaveTypeChange = (event) => {
          const type = event.target.value

          setLeaveType(event.target.value);
          //handleDisabledAbsence(type)

          handleClearTotal();
          if (type === "working_day") {
               /**Main Function */
               setworking_day_counter(1)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(false)

          }
          else if (type === "restday") {
               /**Main Function */
               setworking_day_counter(0)
               setrestday_counter(1)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearForRestDay()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(false)
          }
          else if (type === "restday_nopay") {
               /**Main Function */
               setworking_day_counter(0)
               setrestday_counter(1)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(1)
               handleClearForRestDay()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(false)
          }
          else if (type === "restdaynopay_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0.5)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "restdaynopay_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0.5)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(true)
               setdisabled_am_time(true)
               setdisabled_pm_official(false)
               setdisabled_pm_time(false)
          }
          else if (type === "restday_overtime") {
               /**Main Function */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(1)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)

               /**Shower and Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(false)
          }
          else if (type === "restday_overtime_morning") {
               /**Main Function */
               setworking_day_counter(0)
               setrestday_counter(0.5)
               setrestday_overtime_counter(0.5)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)

          }
          else if (type === "restday_overtime_afternoon") {
               setworking_day_counter(0)
               setrestday_counter(0.5)
               setrestday_overtime_counter(0.5)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower and Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(true)
               setdisabled_am_time(true)
               setdisabled_pm_official(false)
               setdisabled_pm_time(false)

          }
          else if (type === "absent") {
               /**Main Functions */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(1)
               handleClearForAbsent()
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)


               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(true)

          }
          else if (type === "absent_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0.5)
               handleClearForAbsent()
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "absent_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0.5)
               handleClearForAbsent()
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(true)
               setdisabled_am_time(true)
               setdisabled_pm_official(false)
               setdisabled_pm_time(false)
          }
          else if (type === "vl_wholeday") {
               /**Main Functions */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(1)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearForLeave()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(true)
          }

          else if (type === "sl_wholeday") {
               /**Main Functions */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(1)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearForLeave()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(true)
          }
          else if (type === "el_wholeday") {
               /**Main Functions */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(1)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearForLeave()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(true)
          }
          else if (type === "vl_nopay_wholeday") {
               /**Main Functions */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(1)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearForLeave()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(true)
          }
          else if (type === "sl_nopay_wholeday") {
               /**Main Functions */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(1)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearForLeave()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(true)
          }
          else if (type === "el_nopay_wholeday") {
               /**Main Functions */
               setworking_day_counter(0)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(1)
               setrestday_nopay_day(0)
               handleClearForLeave()

               /**Shower And Hider */
               setHide(true)
               setdisabled_day_type(true)
          }
          else if (type === "vl_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0.5)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()



               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "sl_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0.5)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "el_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0.5)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "vl_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0.5)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(true)
               setdisabled_am_time(true)
               setdisabled_pm_official(false)
               setdisabled_pm_time(false)
          }
          else if (type === "sl_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0.5)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(true)
               setdisabled_am_time(true)
               setdisabled_pm_official(false)
               setdisabled_pm_time(false)
          }
          else if (type === "el_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0.5)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(true)
               setdisabled_am_time(true)
               setdisabled_pm_official(false)
               setdisabled_pm_time(false)
          }



          else if (type === "vl_nopay_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0.5)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "sl_nopay_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0.5)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "el_nopay_halfday_morning") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0.5)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }

          else if (type === "vl_nopay_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0.5)
               setsl_nopay_day(0)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()

               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "sl_nopay_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0.5)
               setel_nopay_day(0)
               setrestday_nopay_day(0)
               handleClearTime()


               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
          }
          else if (type === "el_nopay_halfday_afternoon") {
               /**Main Functions */
               setworking_day_counter(0.5)
               setrestday_counter(0)
               setrestday_overtime_counter(0)
               setabsent_day(0)
               setvl_day(0)
               setsl_day(0)
               setel_day(0)
               setvl_nopay_day(0)
               setsl_nopay_day(0)
               setel_nopay_day(0.5)
               setrestday_nopay_day(0)
               handleClearTime()
               /**Shower And Hider */
               setHide(false)
               setdisabled_day_type(false)
               setdisabled_am_official(false)
               setdisabled_am_time(false)
               setdisabled_pm_official(true)
               setdisabled_pm_time(true)
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
          setday_type('normal_day_today')
          setPm_out_hour(0)
          setPm_out_min(0)
          setTotal_working_hour(0)
          setTotal_tardiness_min(0)
          setTotal_ot_hour(0)
          setIs_tardiness(0)
          setabsent_day(0)
     }
     const handleClearFields = () => {
          setpaster_official_am('')
          setpaster_timein_pm("")
          setpaster_official_pm('')
          setpaster_timein_am('')
          setpaster_timeout_am('')
          setpaster_timeout_pm('')
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
          setLeaveType('working_day')
          setHide(false)
          setdisabled_am_official(false)
          setdisabled_am_time(false)
          setday_type('normal_day_today')
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
     const handleClearTime = () => {
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
          setTotal_tardiness_min(0)
          setday_type('normal_day_today')
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
          setday_type('normal_day_today')
          setTotal_ot_hour(0)
          setPm_out_min(0)
          setTotal_working_hour(0)
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

          if (leave_type == "working_day" || leave_type == "restday_overtime") {
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
               leave_type == "restdaynopay_halfday_morning" ||
               leave_type == "restday_overtime_morning" ||
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
               leave_type == "restdaynopay_halfday_afternoon" ||
               leave_type == "restday_overtime_afternoon" ||
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

          if (leave_type == "working_day" || leave_type == "restday_overtime") {
               let difference = (actual_am_in_hours - official_am_in_hours) * 60
               let difference_pm = ((actual_pm_in_hours - actual_am_out_hours) - 1) * 60
               let total_difference = 0;
               if (actual_am_in_hours > official_am_in_hours) {
                    let rounded_difference = Math.round(difference)
                    total_difference += rounded_difference
                    setIs_tardiness(1)
                    // let rounded_difference = Math.round(difference)
                    // setTotal_tardiness_min(total_difference)
                    // setIs_tardiness(1)
               }
               if (actual_pm_in_hours - actual_am_out_hours > 1) {
                    let rounded_difference = Math.round(difference_pm)
                    total_difference += rounded_difference
                    setIs_tardiness(1)
               }

               else {
                    setTotal_tardiness_min(0)
                    setIs_tardiness(0)
               }
               setTotal_tardiness_min(total_difference)
          }
          else if (
               leave_type == "restdaynopay_halfday_morning" ||
               leave_type == "restday_overtime_morning" ||
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
               leave_type == "restdaynopay_halfday_afternoon" ||
               leave_type == "restday_overtime_afternoon" ||
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



          if (leave_type == "working_day" || leave_type == "restday_overtime") {
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

               leave_type == "restdaynopay_halfday_morning" ||
               leave_type == "absent_halfday_morning" ||
               leave_type == "restday_overtime_morning" ||
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
               leave_type == "restdaynopay_halfday_afternoon" ||
               leave_type == "absent_halfday_afternoon" ||
               leave_type == "vl_halfday_afternoon" ||
               leave_type == "vl_nopay_halfday_afternoon" ||
               leave_type == "restday_overtime_afternoon" ||
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




     const [selectedText, setSelectedText] = useState("")

     const handleName = (event) => {
          const name = event.target.value;
          setName(name)
          const firstWord = name.split(" ")[0];
          setEmployeeId(firstWord)
     }



     const handleApproveUndertime = (e) => {
          setundertime(e.target.value)
     }

     const handleApproveTardiness = (e) => {
          settardiness(e.target.value)
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
     const [disabled_undertime, setdisabled_undertime] = useState(false);
     const [disabled_tardiness, setdisabled_tardiness] = useState(false);


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


          const response = await fetch('https://coop-back-zqr6.onrender.com/api/dtr/' + id, {
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
                         restday_nopay_day: restday_nopay_day,
                         regular_ot_hours: regular_ot_hours,
                         restday_ot_hours: restday_ot_hours,
                         special_ot_hours: special_ot_hours,
                         legal_ot_hours: legal_ot_hours,
                         day_type: day_type,
                         approve_ot: overtime,
                         restday_counter: restday_counter,
                         working_day_counter: working_day_counter,
                         restday_overtime_counter: restday_overtime_counter
                    }
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/dtr', {
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
                    setdisabled_day_type(false)
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
          else if (official_am_in_hour > 24) {
               errorToast("Invalid time")
               setofficial_am_in_hour(0)
          }




          else if (official_am_in_min === "") {
               setofficial_am_in_min(0)
          }
          else if (official_am_in_min > 59) {
               errorToast("Invalid time")
               setofficial_am_in_min(0)
          }



          else if (am_in_hour === "") {
               setAm_in_hour(0)
          }
          else if (am_in_hour > 24) {
               errorToast("Invalid time")
               setAm_in_hour(0)
          }



          else if (am_in_min === "") {
               setAm_in_min(0)
          }
          else if (am_in_min > 59) {
               errorToast("Invalid time")
               setAm_in_min(0)
          }



          else if (am_out_hour === "") {
               setAm_out_hour(0)
          }
          else if (am_out_hour > 24) {
               errorToast("Invalid time")
               setAm_out_hour(0)
          }


          else if (am_out_min === "") {
               setAm_out_min(0)
          }
          else if (am_out_min > 59) {
               errorToast("Invalid time")
               setAm_out_min(0)
          }



          else if (official_pm_in_hour === "") {
               setofficial_pm_in_hour(0)
          }
          else if (official_pm_in_hour > 24) {
               errorToast("Invalid time")
               setofficial_pm_in_hour(0)
          }



          else if (official_pm_in_min === "") {
               setofficial_pm_in_min(0)
          }
          else if (official_pm_in_min > 59) {
               errorToast("Invalid time")
               setofficial_pm_in_min(0)
          }



          else if (pm_in_hour === "") {
               setPm_in_hour(0)
          }
          else if (pm_in_hour > 24) {
               errorToast("Invalid time")
               setPm_in_hour(0)
          }



          else if (pm_in_min === "") {
               setPm_in_min(0)
          }
          else if (pm_in_min > 59) {
               errorToast("Invalid time")
               setPm_in_min(0)
          }





          else if (pm_out_hour === "") {
               setPm_out_hour(0)
          }
          else if (pm_out_hour > 24) {
               errorToast("Invalid time")
               setPm_out_hour(0)
          }




          else if (pm_out_min === "") {
               setPm_out_min(0)
          }
          else if (pm_out_min > 59) {
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
          //window.location.reload();
     }


     const handleYearChange = (e) => {
          setyear(e.target.value)

     }
     useEffect(() => {
          handleDates();
          //successToast(startDate + " " + endDate)
     }, [month, year])

     const handleDates = () => {
          if (month == "january") {
               setStartDate(`01-01-${year}`)
               setEndDate(`01-31-${year}`)
          }

          if (month == "february") {
               setStartDate(`02-01-${year}`)
               setEndDate(`02-29-${year}`)
          }

          if (month == "march") {
               setStartDate(`03-01-${year}`)
               setEndDate(`03-31-${year}`)
          }

          if (month == "april") {
               setStartDate(`04-01-${year}`)
               setEndDate(`04-30-${year}`)
          }

          if (month == "may") {
               setStartDate(`05-01-${year}`)
               setEndDate(`05-31-${year}`)
          }

          if (month == "june") {
               setStartDate(`06-01-${year}`)
               setEndDate(`06-30-${year}`)
          }

          if (month == "july") {
               setStartDate(`07-01-${year}`)
               setEndDate(`07-31-${year}`)
          }

          if (month == "august") {
               setStartDate(`08-01-${year}`)
               setEndDate(`08-31-${year}`)
          }

          if (month == "september") {
               setStartDate(`09-01-${year}`)
               setEndDate(`09-30-${year}`)
          }

          if (month == "october") {
               setStartDate(`10-01-${year}`)
               setEndDate(`10-31-${year}`)
          }

          if (month == "november") {
               setStartDate(`11-01-${year}`)
               setEndDate(`11-30-${year}`)
          }

          if (month == "december") {
               setStartDate(`12-01-${year}`)
               setEndDate(`12-31-${year}`)
          }
     }

     const handleChange = (event, newValue) => {
          settabvalue(newValue);
     };
     const [tabvalue, settabvalue] = React.useState('1');
     const handleGoToSummary = () => {
          // setbuttonReceiptDisabled(true)
          settabvalue('2')
     }
     useEffect(() => {
          if(tardiness === "not_approved"){
               setTotal_tardiness_min(0)
          }

          if(undertime === "not_approved"){
               settotal_undertime_min(0)
          }
     },[tardiness, undertime])
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

                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
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
                                                            style={{ paddingBottom: "20px", marginRight: "10px" }}
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
                                                            style={{ paddingBottom: "20px" }}
                                                            onChange={handleYearChange}
                                                            value={year}
                                                       >
                                                            <MenuItem value={'2023'}>2023</MenuItem>
                                                            <MenuItem value={'2024'}>2024</MenuItem>
                                                            <MenuItem value={'2025'}>2025</MenuItem>
                                                            <MenuItem value={'2026'}>2026</MenuItem>
                                                            <MenuItem value={'2027'}>2027</MenuItem>
                                                            <MenuItem value={'2028'}>2028</MenuItem>
                                                            <MenuItem value={'2029'}>2029</MenuItem>
                                                            <MenuItem value={'2030'}>2030</MenuItem>
                                                            <MenuItem value={'2031'}>2031</MenuItem>
                                                            <MenuItem value={'2032'}>2032</MenuItem>
                                                            <MenuItem value={'2033'}>2033</MenuItem>
                                                            

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

                                                                           <MenuItem style={{ color: '#a41fe2' }} value={'restday_nopay'}>Restday No Pay</MenuItem>
                                                                           <MenuItem style={{ color: '#a41fe2' }} value={'restdaynopay_halfday_morning'}>Restday No Pay Halfday - Morning Work</MenuItem>
                                                                           <MenuItem style={{ color: '#a41fe2' }} value={'restdaynopay_halfday_afternoon'}>Restday No Pay Halfday - Afternoon Work</MenuItem>
                                                                           <MenuItem style={{ color: '#4a0d66' }} value={'restday'}>Restday - Paid</MenuItem>
                                                                           <MenuItem style={{ color: '#4a0d66' }} value={'restday_overtime'}>RDOT - Wholeday</MenuItem>
                                                                           <MenuItem style={{ color: '#4a0d66' }} value={'restday_overtime_morning'}>RDOT - Morning Work</MenuItem>
                                                                           <MenuItem style={{ color: '#4a0d66' }} value={'restday_overtime_afternoon'}>RDOT - Afternoon Work</MenuItem>

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


                                                                           <MenuItem style={{ color: 'red', marginTop: "30px" }} value={'el_wholeday'}>SIL With Pay Wholeday</MenuItem>
                                                                           <MenuItem style={{ color: 'red' }} value={'el_halfday_morning'}>SIL With Pay Halfday - Morning Work</MenuItem>
                                                                           <MenuItem style={{ color: 'red' }} value={'el_halfday_afternoon'}>SIL With Pay Halfday - Afternoon Work</MenuItem>
                                                                           <MenuItem style={{ color: '#d63e3e' }} value={'el_nopay_wholeday'}>SIL No Pay Wholeday</MenuItem>
                                                                           <MenuItem style={{ color: '#d63e3e' }} value={'el_nopay_halfday_morning'}>SIL No Pay Halfday - Morning Work</MenuItem>
                                                                           <MenuItem style={{ color: '#d63e3e' }} value={'el_nopay_halfday_afternoon'}>SIL No Pay Halfday - Afternoon Work</MenuItem>

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
                                                                                     {/* <TextField
                                                                                          disabled={disabled_am_official}
                                                                                          required
                                                                                          fullWidth
                                                                                          id="outlined-required"
                                                                                          label="Paster"
                                                                                          style={{ paddingBottom: "20px" }}
                                                                                          onChange={handlePasteChange_official_am}
                                                                                          value={paster_official_am}
                                                                                     /> */}
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
                                                                                     {/* <TextField
                                                                                          disabled={disabled_am_official}
                                                                                          required
                                                                                          fullWidth
                                                                                          id="outlined-required"
                                                                                          label="Paster"
                                                                                          style={{ paddingBottom: "20px" }}
                                                                                          onChange={handlePasteChange_timein_am}
                                                                                          value={paster_timein_am}
                                                                                     /> */}
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
                                                                                     {/* <TextField
                                                                                          disabled={disabled_am_official}
                                                                                          required
                                                                                          fullWidth
                                                                                          id="outlined-required"
                                                                                          label="Paster"
                                                                                          style={{ paddingBottom: "20px" }}
                                                                                          onChange={handlePasteChange_timeout_am}
                                                                                          value={paster_timeout_am}
                                                                                     /> */}
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
                                                                                     {/* <TextField
                                                                                          disabled={disabled_am_official}
                                                                                          required
                                                                                          fullWidth
                                                                                          id="outlined-required"
                                                                                          label="Paster"
                                                                                          style={{ paddingBottom: "20px" }}
                                                                                          onChange={handlePasteChange_official_pm}
                                                                                          value={paster_official_pm}
                                                                                     /> */}
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
                                                                                     {/* <TextField
                                                                                          disabled={disabled_am_official}
                                                                                          required
                                                                                          fullWidth
                                                                                          id="outlined-required"
                                                                                          label="Paster"
                                                                                          style={{ paddingBottom: "20px" }}
                                                                                          onChange={handlePasteChange_timein_pm}
                                                                                          value={paster_timein_pm}
                                                                                     /> */}
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
                                                                                     {/* <TextField
                                                                                          disabled={disabled_am_official}
                                                                                          required
                                                                                          fullWidth
                                                                                          id="outlined-required"
                                                                                          label="Paster"
                                                                                          style={{ paddingBottom: "20px" }}
                                                                                          onChange={handlePasteChange_timeout_pm}
                                                                                          value={paster_timeout_pm}
                                                                                     /> */}
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
                                                                                     required
                                                                                     id="outlined-required"
                                                                                     label="Approve undertime?"
                                                                                     fullWidth
                                                                                     select
                                                                                     style={{ paddingBottom: "20px" }}
                                                                                     onChange={handleApproveUndertime}
                                                                                     value={undertime}
                                                                                     disabled={disabled_undertime}
                                                                                >
                                                                                  
                                                                                     <MenuItem value={'approved'}>Yes, Include undertime</MenuItem>
                                                                                     <MenuItem value={'not_approved'}>No, disregard undertime</MenuItem>

                                                                                </TextField>

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
                                                                                     required
                                                                                     id="outlined-required"
                                                                                     label="Approve tardiness?"
                                                                                     fullWidth
                                                                                     select
                                                                                     style={{ paddingBottom: "20px" }}
                                                                                     onChange={handleApproveTardiness}
                                                                                     value={tardiness}
                                                                                     disabled={disabled_tardiness}
                                                                                >
                                                                                   
                                                                                     <MenuItem value={'approved'}>Yes, include tardiness</MenuItem>
                                                                                     <MenuItem value={'not_approved'}>No, disregard tardiness</MenuItem>

                                                                                </TextField>
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
                                                                                     label="SIL with pay"
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
                                                                                     label="SIL no pay"
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
                                                                      onWheel={handleScroll}
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
          </div >
     )
}

export default Dtr