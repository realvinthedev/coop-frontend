
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
import jsPDF from 'jspdf';
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
import { EarbudsOutlined, TableRows, TempleHinduTwoTone } from '@mui/icons-material';
import PayslipPrinter from '../components/PayslipPrinter';
import html2canvas from 'html2canvas';
import Autocomplete from '@mui/material/Autocomplete';
import { saveAs } from 'file-saver-es';
import { useRef } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

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
const SalesList = styled.div`
     width: 100%;
     padding: 10px 20px 10px 20px;
     border: 1px solid #dbdbdb;
     border-radius: 20px;
     background-color: white;
     font-size: 14px;
     margin-bottom: 10px;
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
   
`
const TablesContainer = styled.div`
     padding-left: 30px;
     padding-right: 3px;
     padding-bottom: 50px;
     display: flex;
     justify-content: space-between;
`
const NameIDContainer = styled.div`
   
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
     const currentUser = user.username;
     const [openAdd, setOpenAdd] = useState(false);
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);
     const [year, setyear] = useState('')
     const [year2, setyear2] = useState('')
     const [randomNum, setrandomNum] = React.useState('1');
     const random = () => {
          const number = Math.floor(Math.random() * 1000) + 1;
          setrandomNum(number)
     }
     const [current_date, setCurrent_date] = useState('January');
     const [payroll, setPayroll] = useState([]);
     const [name, setName] = useState("");
     const [name2, setName2] = useState("");
     const [new_name, setNew_name] = useState("");
     const [employeeId, setEmployeeId] = useState('')
     const [employeeId2, setEmployeeId2] = useState('')
     const [start_date, setStartDate] = useState("");
     const [end_date, setEndDate] = useState("");

     const [start_date2, setStartDate2] = useState("");
     const [end_date2, setEndDate2] = useState("");

     const [employmentStatus, setemploymentStatus] = useState("");


     const [month, setMonth] = useState('January');

     const [period, setPeriod] = useState('First Half');
     const [period2, setPeriod2] = useState('First Half');

     const [month2, setmonth2] = useState('January');
     const handleMonthChange2 = (e) => {
          setmonth2(e.target.value)
          console.log(filtered_employee_dtr)

     }
     const handleMonthChange = (e) => {
          setMonth(e.target.value)

     }

     useEffect(() => {
          handleDates();
     }, [month, name, year, end_date, start_date, period])

     useEffect(() => {
          handleDate2();
     }, [month2, year2, end_date2, start_date2, period2])



     const handleDate2 = () => {
          if (month2 == "january" && period2 == "first") {
               setStartDate2(`01-01-${year2}`)
               setEndDate2(`01-15-${year2}`)
          }
          if (month2 == "january" && period2 == "second") {
               setStartDate2(`01-16-${year2}`)
               setEndDate2(`01-31-${year2}`)
          }

          if (month2 == "february" && period2 == "first") {
               setStartDate2(`02-01-${year2}`)
               setEndDate2(`02-15-${year2}`)
          }
          if (month2 == "february" && period2 == "second") {
               setStartDate2(`02-16-${year2}`)
               setEndDate2(`02-29-${year2}`)
          }

          if (month2 == "march" && period2 == "first") {
               setStartDate2(`03-01-${year2}`)
               setEndDate2(`03-15-${year2}`)
          }
          if (month2 == "march" && period2 == "second") {
               setStartDate2(`03-16-${year2}`)
               setEndDate2(`03-31-${year2}`)
          }


          if (month2 == "april" && period2 == "first") {
               setStartDate2(`04-01-${year2}`)
               setEndDate2(`04-15-${year2}`)
          }
          if (month2 == "april" && period2 == "second") {
               setStartDate2(`04-16-${year2}`)
               setEndDate2(`04-30-${year2}`)
          }


          if (month2 == "may" && period2 == "first") {
               setStartDate2(`05-01-${year2}`)
               setEndDate2(`05-15-${year2}`)
          }
          if (month2 == "may" && period2 == "second") {
               setStartDate2(`05-16-${year2}`)
               setEndDate2(`05-31-${year2}`)
          }


          if (month2 == "june" && period2 == "first") {
               setStartDate2(`06-01-${year2}`)
               setEndDate2(`06-15-${year2}`)
          }
          if (month2 == "june" && period2 == "second") {
               setStartDate2(`06-16-${year2}`)
               setEndDate2(`06-30-${year2}`)
          }


          if (month2 == "july" && period2 == "first") {
               setStartDate2(`07-01-${year2}`)
               setEndDate2(`07-15-${year2}`)
          }
          if (month2 == "july" && period2 == "second") {
               setStartDate2(`07-16-${year2}`)
               setEndDate2(`07-31-${year2}`)
          }


          if (month2 == "august" && period2 == "first") {
               setStartDate2(`08-01-${year2}`)
               setEndDate2(`08-15-${year2}`)
          }
          if (month2 == "august" && period2 == "second") {
               setStartDate2(`08-16-${year2}`)
               setEndDate2(`08-31-${year2}`)
          }


          if (month2 == "september" && period2 == "first") {
               setStartDate2(`09-01-${year2}`)
               setEndDate2(`09-15-${year2}`)
          }
          if (month2 == "september" && period2 == "second") {
               setStartDate2(`09-16-${year2}`)
               setEndDate2(`09-30-${year2}`)
          }


          if (month2 == "october" && period2 == "first") {
               setStartDate2(`10-01-${year2}`)
               setEndDate2(`10-15-${year2}`)
          }
          if (month2 == "october" && period2 == "second") {
               setStartDate2(`10-16-${year2}`)
               setEndDate2(`10-31-${year2}`)
          }

          if (month2 == "november" && period2 == "first") {
               setStartDate2(`11-01-${year2}`)
               setEndDate2(`11-15-${year2}`)
          }
          if (month2 == "november" && period2 == "second") {
               setStartDate2(`11-16-${year2}`)
               setEndDate2(`11-30-${year2}`)
          }

          if (month2 == "december" && period2 == "first") {
               setStartDate2(`12-01-${year2}`)
               setEndDate2(`12-15-${year2}`)
          }
          if (month2 == "december" && period2 == "second") {
               setStartDate2(`12-16-${year2}`)
               setEndDate2(`12-31-${year2}`)
          }

     }
     const appRef = useRef(null);
     const captureScreenshot = () => {
          const element = appRef.current;
          html2canvas(element).then((canvas) => {
               const imgData = canvas.toDataURL('image/png');
               const pdf = new jsPDF();
               const imgProps = pdf.getImageProperties(imgData);
               const pdfWidth = pdf.internal.pageSize.getWidth();
               const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
               pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
               pdf.save(`payslip_${month}_${period}_period_${new_name}.pdf`);
          });
     };
     const appRefSummary = useRef(null);
     const captureScreenshotSummary = () => {
          const element = appRefSummary.current;
          html2canvas(element).then((canvas) => {
               canvas.toBlob((blob) => {
                    saveAs(blob, `summary` + month + `_` + period + `_period`);
               });
          });
     };
     const handleYearChange = (e) => {
          setyear(e.target.value)
     }
     const handleYearChange2 = (e) => {
          setyear2(e.target.value)
     }
     const handleDates = () => {
          if (month == "january" && period == "first") {
               setStartDate(`01-01-${year}`)
               setEndDate(`01-15-${year}`)
          }
          if (month == "january" && period == "second") {
               setStartDate(`01-16-${year}`)
               setEndDate(`01-31-${year}`)
          }

          if (month == "february" && period == "first") {
               setStartDate(`02-01-${year}`)
               setEndDate(`02-15-${year}`)
          }
          if (month == "february" && period == "second") {
               setStartDate(`02-16-${year}`)
               setEndDate(`02-29-${year}`)
          }

          if (month == "march" && period == "first") {
               setStartDate(`03-01-${year}`)
               setEndDate(`03-15-${year}`)
          }
          if (month == "march" && period == "second") {
               setStartDate(`03-16-${year}`)
               setEndDate(`03-31-${year}`)
          }

          if (month == "april" && period == "first") {
               setStartDate(`04-01-${year}`)
               setEndDate(`04-15-${year}`)
          }
          if (month == "april" && period == "second") {
               setStartDate(`04-16-${year}`)
               setEndDate(`04-30-${year}`)
          }

          if (month == "may" && period == "first") {
               setStartDate(`05-01-${year}`)
               setEndDate(`05-15-${year}`)
          }
          if (month == "may" && period == "second") {
               setStartDate(`05-16-${year}`)
               setEndDate(`05-31-${year}`)
          }

          if (month == "june" && period == "first") {
               setStartDate(`06-01-${year}`)
               setEndDate(`06-15-${year}`)
          }
          if (month == "june" && period == "second") {
               setStartDate(`06-16-${year}`)
               setEndDate(`06-30-${year}`)
          }

          if (month == "july" && period == "first") {
               setStartDate(`07-01-${year}`)
               setEndDate(`07-15-${year}`)
          }
          if (month == "july" && period == "second") {
               setStartDate(`07-16-${year}`)
               setEndDate(`07-31-${year}`)
          }

          if (month == "august" && period == "first") {
               setStartDate(`08-01-${year}`)
               setEndDate(`08-15-${year}`)
          }
          if (month == "august" && period == "second") {
               setStartDate(`08-16-${year}`)
               setEndDate(`08-31-${year}`)
          }

          if (month == "september" && period == "first") {
               setStartDate(`09-01-${year}`)
               setEndDate(`09-15-${year}`)
          }
          if (month == "september" && period == "second") {
               setStartDate(`09-16-${year}`)
               setEndDate(`09-30-${year}`)
          }

          if (month == "october" && period == "first") {
               setStartDate(`10-01-${year}`)
               setEndDate(`10-15-${year}`)
          }
          if (month == "october" && period == "second") {
               setStartDate(`10-16-${year}`)
               setEndDate(`10-31-${year}`)
          }

          if (month == "november" && period == "first") {
               setStartDate(`11-01-${year}`)
               setEndDate(`11-15-${year}`)
          }
          if (month == "november" && period == "second") {
               setStartDate(`11-16-${year}`)
               setEndDate(`11-30-${year}`)
          }

          if (month == "december" && period == "first") {
               setStartDate(`12-01-${year}`)
               setEndDate(`12-15-${year}`)
          }
          if (month == "december" && period == "second") {
               setStartDate(`12-16-${year}`)
               setEndDate(`12-31-${year}`)
          }
     }




     const handlePeriodChange = (e) => {
          setPeriod(e.target.value)
     }
     const handlePeriodChange2 = (e) => {
          setPeriod2(e.target.value)
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


     const handleName = (event) => {
          const name = event.target.value;
          const new_name = name.split("- ")[1].trim();
          setName(name)
          setNew_name(new_name)
          const firstWord = name.split(" ")[0];
          setEmployeeId(firstWord)
          setEmployeeId2(firstWord)

     }
     const handleName2 = (event) => {
          const name = event.target.value;
          setName2(name)
          const firstWord = name.split(" ")[0];
          setEmployeeId2(firstWord)

     }





     const [filtered_employee_dtr, setFiltered_employee_dtr] = useState([])
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch(`https://coop-back-zqr6.onrender.com/api/dtr/employee/${employeeId}`, {
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
                    // setEmployee_dtr(json)

               }
          }
          if (user) {

               fetchEmp();
          }
     }, [employeeId, start_date, end_date, period])

     const [arr, setArr] = useState([])
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch(`https://coop-back-zqr6.onrender.com/api/payslip/`, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const month = item.month
                         const year = item.year
                         const period = item.period
                         const empid = item.employee_id
                         return month == month && period == period && empid == employeeId && year == year
                    });
                    setArr(filteredData)
                    console.log(filteredData)
               }
          }
          if (user) {
               fetchEmp();
          }
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', arr)
     }, [randomNum])

     const [summ, setSumm] = useState([])
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch(`https://coop-back-zqr6.onrender.com/api/payslip/`, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@',json)
                    const filteredData = json.filter(item => {
                         const month = item.month;
                         const year = item.year;
                         const period = item.period;

                         console.log('Debugging:', { month, period, year, month2, period2, year2 });

                         // Check if "year" is defined before comparing
                         if (year !== undefined && year !== null) {
                              // Data with "year" column
                              return year === year2 && month === month2 && period === period2;
                         } else {
                              // Data without "year" column
                              // Assume it matches the selected year
                              return year2 === '2023' && month === month2 && period === period2;
                         }
                    });
                    //ytd - create another if else here and return only whole year. then once get, filter it again 

                    setSumm(filteredData);
                    console.log('@', filteredData);
               }
          }
          if (user) {
               fetchEmp();
          }



     }, [start_date2, end_date2, period2, randomNum])


     const [totalnet, settotalnet] = useState(0)
     useEffect(() => {
          const fetchEmp = async () => {
              const response = await fetch(`https://coop-back-zqr6.onrender.com/api/payslip/`, {
                  headers: {
                      'Authorization': `Bearer ${user.token}`
                  }
              });
              const json = await response.json();
              if (response.ok) {
                  // Get the current year
                  const currentYear = new Date().getFullYear();
                  // Get the current employee ID, replace 'current_emp_id' with the actual value
                  const currentEmpId = employeeId; // Replace 'current_emp_id' with the actual employee ID
                  // Filter payslip data for the current year and current employee ID
                  const filteredData = json.filter(item => {
                      const year = new Date(item.createdAt).getFullYear(); // Extract year from createdAt timestamp
                      const employeeId = item.employee_id;
                      return year === currentYear && employeeId === currentEmpId;
                  });
      
                  // Calculate the total net
                  const totalNet = filteredData.reduce((total, item) => total + item.net, 0);
      
                  // Set the filtered data and total net to state
                  settotalnet(totalNet);
                  console.log(')))))))))))))))))))))))))))))))))))))))))',totalNet)
              }
          };
          fetchEmp();
      }, [employeeId, start_date, end_date, period]);


     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch(`https://coop-back-zqr6.onrender.com/api/dtr/`, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const date = item.date
                         return date >= start_date2 && date <= end_date2

                    });
                    setFiltered_employee_dtr(filteredData)
                    // setEmployee_dtr(json)

               }
          }
          if (user) {

               fetchEmp();
          }
     }, [start_date2, end_date2])







     const [filtered_additional, setFiltered_Additional] = useState([]);
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/additional/' + employeeId, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const date = item.date_covered
                         if (employeeId !== "") {
                              return date >= start_date && date <= end_date
                         }

                    });
                    setFiltered_Additional(filteredData)
               }
          }
          if (user) {
               fetchEmp();
               console.log(filtered_additional)
          }

          // }, [employeeId, start_date, end_date, period, name])
     }, [employeeId, start_date, end_date])






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
     }, [employeeId])


     const [full_emp, setFullEmp] = useState([])
     const [default_base, setdefault_base] = useState(0)
     const [default_bimonthly, setdefault_bimonthly] = useState(0)
     const [default_daily, setdefault_daily] = useState(0)
     const [default_hourly, setdefault_hourly] = useState(0)
     const [default_minute, setdefault_minute] = useState(0)

     const [default_regular_ot, setdefault_regular_ot] = useState(0)
     const [default_restday_ot, setdefault_restday_ot] = useState(0)
     const [default_special_ot, setdefault_special_ot] = useState(0)
     const [default_legal_ot, setdefault_legal_ot] = useState(0)


     const [default_first_eight_restday_ot, setdefault_first_eight_restday_ot] = useState(0)
     const [default_first_eight_special_ot, setdefault_first_eight_special_ot] = useState(0)
     const [default_first_eight_legal_ot, setdefault_first_eight_legal_ot] = useState(0)



     const [restday_first_eight, setrestday_first_eight] = useState(0);
     const [special_first_eight, setspecial_first_eight] = useState(0);
     const [legal_first_eight, setlegal_first_eight] = useState(0);




     //Save to DB
     const [db_employeeid, setdb_employeeid] = useState("")
     const [db_month, setdb_month] = useState("")
     const [db_period, setdb_period] = useState("")
     const [db_year, setdb_year] = useState("")
     const [db_name, setdb_name] = useState("")
     const [db_base_salary, setdb_base_salary] = useState(0)
     const [db_bimonthly, setdb_bimonthly] = useState(0)
     const [db_daily, setdb_daily] = useState(0)
     const [db_hourly, setdb_hourly] = useState(0)
     const [db_minute, setdb_minute] = useState(0)
     const [db_basic, setdb_basic] = useState(0)
     const [db_allowance, setdb_allowance] = useState(0)
     const [db_ot_regular_amount, setdb_ot_regular_amount] = useState(0)
     const [db_ot_restday_amount, setdb_ot_restday_amount] = useState(0)
     const [db_ot_special_amount, setdb_ot_special_amount] = useState(0)
     const [db_ot_legal_amount, setdb_ot_legal_amount] = useState(0)
     const [db_add_ot_restday_amount, setdb_add_ot_restday_amount] = useState(0)
     const [db_add_ot_special_amount, setdb_add_ot_special_amount] = useState(0)
     const [db_add_ot_legal_amount, setdb_add_ot_legal_amount] = useState(0)
     const [db_nightdiff, setdb_nightdiff] = useState(0)
     const [db_prior_period_adj_earnings, setdb_prior_period_adj_earnings] = useState(0)
     const [db_earnings_total, setdb_earnings_total] = useState(0)
     const [db_tardiness_amount, setdb_tardiness_amount] = useState(0)
     const [db_undertime_amount, setdb_undertime_amount] = useState(0)
     const [db_restday_nopay_amount, setdb_restday_nopay_amount] = useState(0)
     const [db_absence_amount, setdb_absence_amount] = useState(0)
     const [db_vl_nopay_amount, setdb_vl_nopay_amount] = useState(0)
     const [db_sl_nopay_amount, setdb_sl_nopay_amount] = useState(0)
     const [db_el_nopay_amount, setdb_el_nopay_amount] = useState(0)
     const [db_earnings_deduction_total, setdb_earnings_deduction_total] = useState(0)
     const [db_sss, setdb_sss] = useState(0)
     const [db_philhealth, setdb_philhealth] = useState(0)
     const [db_hdmf, setdb_hdmf] = useState(0)
     const [db_wtax, setdb_wtax] = useState(0)
     const [db_cash_advance_loans, setdb_cash_advance_loans] = useState(0)
     const [db_hhhc_savings, setdb_hhhc_savings] = useState(0)
     const [db_hhhc_membership_fee, setdb_hhhc_membership_fee] = useState(0)
     const [db_hmo, setdb_hmo] = useState(0)
     const [db_lodging, setdb_lodging] = useState(0)
     const [db_utilities, setdb_utilities] = useState(0)
     const [db_deduction_total, setdb_deduction_total] = useState(0)
     const [db_grosspay, setdb_grosspay] = useState(0)
     const [db_net_pay, setdb_net_pay] = useState(0)
     const [db_other_earnings, setdb_other_earnings] = useState(0)
     const [db_other_deductions, setdb_other_deductions] = useState(0)
     const [db_share_capital, setdb_share_capital] = useState(0)
     const [db_pay_adjustment_deduction, setdb_pay_adjustment_deduction] = useState(0)





     const [db_department, setdb_department] = useState(0)
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee/' + employeeId, {
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
                    setdefault_regular_ot(json.regular_ot ? json.regular_ot : 0)
                    setdefault_restday_ot(json.restday_ot ? json.restday_ot : 0)
                    setdefault_special_ot(json.special_ot ? json.special_ot : 0)
                    setdefault_legal_ot(json.legal_ot ? json.legal_ot : 0)
                    setemploymentStatus(json.employment_status ? json.employment_status : "regular")
                    setdb_department(json.department)


                    setdefault_first_eight_restday_ot(json.restday_first_eight_ot ? json.special_first_eight_ot : 0)
                    setdefault_first_eight_special_ot(json.special_first_eight_ot ? json.special_first_eight_ot : 0)
                    setdefault_first_eight_legal_ot(json.legal_first_eight_ot ? json.legal_first_eight_ot : 0)
                    setFullEmp(json)
               }
          }
          if (user) {
               fetchEmp();
          }
     }, [employeeId])
















     //code for accumulating total


     const [total, setTotal] = useState({
          total_tardiness_min: 0,
          total_undertime_min: 0,
          absent_day: 0,
          vl_day: 0,
          sl_day: 0,
          el_day: 0,

          vl_nopay_day: 0,
          sl_nopay_day: 0,
          el_nopay_day: 0,
          restday_nopay_day: 0,

          // Extra of 8 hours
          regular_ot_hours: 0,
          restday_ot_hours: 0,
          special_ot_hours: 0,
          legal_ot_hours: 0,

          restday_counter: 0,
          working_day_counter: 0,

          // First 8 hours
          restday_overtime_counter: 0,
          special_working_day_counter: 0,
          legal_working_day_counter: 0,


     });





     const [temp_tardiness, setTemp_tardiness] = useState(0);
     const [temp_absent, setTemp_absent] = useState(0);


     const columnWidth = 100;
     const columnWidthNumber = 40;
     useEffect(() => {

          /**GOAL: KUHAON NKO ANG 
           * 1. RESTDAY (WITH PAY) - ADD (RESTDAY_COUNTER = 1)  
           * 2. WORKING DAY - (ADD WORKING_DAY_COUNTER = 1 IF WORKING DAY, IF HALFDAYS, PRESENT DAY = .5)
           * 3. 
           * 
           * 
           * 
           * */

          //NEW
          let total_tardiness_min = 0;
          let total_undertime_min = 0;

          let absent_day = 0;
          let vl_day = 0;
          let sl_day = 0;
          let el_day = 0;

          let vl_nopay_day = 0;
          let sl_nopay_day = 0;
          let el_nopay_day = 0;
          let restday_nopay_day = 0;

          //total extra from 8 hours
          let regular_ot_hours = 0
          let restday_ot_hours = 0
          let special_ot_hours = 0
          let legal_ot_hours = 0

          let restday_counter = 0
          let working_day_counter = 0

          //total first 8 hours
          let restday_overtime_counter = 0
          let special_working_day_counter = 0
          let legal_working_day_counter = 0




          filtered_employee_dtr.forEach((item) => {
               //NEW FOR DEPLOYMENT
               if (item.approve_tardiness == "approved") {
                    total_tardiness_min += item.total_tardiness_min
               }

               if (item.approve_undertime == "approved") {
                    total_undertime_min += item.total_undertime_min
               }




               absent_day += item.absent_day
               vl_day += item.vl_day
               sl_day += item.sl_day
               el_day += item.el_day


               vl_nopay_day += item.vl_nopay_day;
               sl_nopay_day += item.sl_nopay_day
               el_nopay_day += item.el_nopay_day
               restday_nopay_day += item.restday_nopay_day

               if (item.approve_ot == "approved") {
                    regular_ot_hours += item.regular_ot_hours
                    restday_ot_hours += item.restday_ot_hours
                    special_ot_hours += item.special_ot_hours
                    legal_ot_hours += item.legal_ot_hours
               }

               restday_counter += item.restday_counter
               restday_overtime_counter += item.restday_overtime_counter

               if (item.day_type === "special_holiday_today" && (item.leave_type !== "restday" || item.leave_type !== "restday_nopay")) {
                    special_working_day_counter += item.working_day_counter
                    working_day_counter += item.working_day_counter
               }

               else if (item.day_type === "legal_holiday_today" && (item.leave_type !== "restday" || item.leave_type !== "restday_nopay")) {
                    legal_working_day_counter += item.working_day_counter
                    working_day_counter += item.working_day_counter
               }
               else {
                    working_day_counter += item.working_day_counter
               }

          });


          setTotal({
               //NEW
               total_tardiness_min: total_tardiness_min,
               total_undertime_min: total_undertime_min,
               absent_day: absent_day,
               vl_day: vl_day,
               sl_day: sl_day,
               el_day: el_day,

               vl_nopay_day: vl_nopay_day,
               sl_nopay_day: sl_nopay_day,
               el_nopay_day: el_nopay_day,
               restday_nopay_day: restday_nopay_day,


               // Extra of 8 hours
               regular_ot_hours: regular_ot_hours,
               restday_ot_hours: restday_ot_hours,
               special_ot_hours: special_ot_hours,
               legal_ot_hours: legal_ot_hours,

               restday_counter: restday_counter,
               working_day_counter: working_day_counter,

               // First 8 hours
               special_working_day_counter: special_working_day_counter,
               legal_working_day_counter: legal_working_day_counter,
               restday_overtime_counter: restday_overtime_counter,




          });

     }, [filtered_employee_dtr]);

     const [summ_net, setsumm_net] = useState(0)
     useEffect(() => {
          //NEW
          let net = 0;
          summ.forEach((item) => {
               net += item.net
          });
          setsumm_net(net);

     }, [summ]);

     useEffect(() => {
          setTemp_absent(total.absent_hours * default_hourly)
          setTemp_tardiness(total.total_tardiness_min * default_minute)
     }, [total]);


     const [final_gross_pay, setfinal_gross_pay] = useState(0);
     const [final_deduction, setfinal_deduction] = useState(0);
     const [final_earnings, setfinal_earnings] = useState(0);
     const [final_net_pay, setfinal_net_pay] = useState(0);
     const [grosspay_without_earnings, setgrosspay_without_earnings] = useState(0);
     const [new_earnings_total, setnew_earnings_total] = useState(0);
     const [new_deduction_total, setnew_deduction_total] = useState(0);
     const [earning_deduction, setearning_deduction] = useState(0);
     const [new_net_total, setnew_net_total] = useState(0);
     const [grosspay, setgrosspay] = useState(0);
     const [regular_ot_amount, setregular_ot_amount] = useState(0);
     const [restday_ot_amount, setrestday_ot_amount] = useState(0);
     const [special_ot_amount, setspecial_ot_amount] = useState(0);
     const [legal_ot_amount, setlegal_ot_amount] = useState(0);

     const [restday_ot_amount_eight_hours, setrestday_ot_amount_eight_hours] = useState(0);
     const [special_ot_amount_eight_hours, setspecial_ot_amount_eight_hours] = useState(0);
     const [legal_ot_amount_eight_hours, setlegal_ot_amount_eight_hours] = useState(0);

     const [undertime_amount, setundertime_amount] = useState(0);
     const [tardiness_amount, settardiness_amount] = useState(0);

     const [absence_amount, setabsence_amount] = useState(0);
     const [vl_nopay_amount, setvl_nopay_amount] = useState(0);
     const [sl_nopay_amount, setsl_nopay_amount] = useState(0);
     const [el_nopay_amount, setel_nopay_amount] = useState(0);
     const [restday_nopay_amount, setrestday_nopay_amount] = useState(0);
     const [working_day_counter, setworking_day_counter] = useState(0);

     const [summary_grosspay, setsummary_grosspay] = useState(0);
     const [summary_net, setsummary_net] = useState(0);
     const [summary_deductions, setsummary_deductions] = useState(0);
     let rowNumber = 0;

     const calculateGrossPay = () => {
          random();
          //NEW
          let total_tardiness_min = total.total_tardiness_min
          let total_undertime_min = total.total_undertime_min

          let absent_day = total.absent_day
          let vl_day = total.vl_day
          let sl_day = total.sl_day
          let el_day = total.el_day

          let vl_nopay_day = total.vl_nopay_day
          let sl_nopay_day = total.sl_nopay_day
          let el_nopay_day = total.el_nopay_day
          let restday_nopay_day = total.restday_nopay_day


          // Extra of 8 hours
          let regular_ot_hours = total.regular_ot_hours
          let restday_ot_hours = total.restday_ot_hours
          let special_ot_hours = total.special_ot_hours
          let legal_ot_hours = total.legal_ot_hours

          // First 8 hours
          let restday_counter = total.restday_counter
          let working_day_counter = total.working_day_counter
          setworking_day_counter(working_day_counter)


          let restday_overtime_counter = total.restday_overtime_counter
          let bimonthly = default_bimonthly;
          let daily = default_daily;
          let hourly = default_hourly;
          let minutely = default_minute;
          let regular_ot_percentage = default_regular_ot / 100
          let restday_ot_percentage = default_restday_ot / 100
          let special_ot_percentage = default_special_ot / 100
          let legal_ot_percentage = default_legal_ot / 100



          let first_eight_restday_percentage = default_first_eight_restday_ot / 100
          let first_eight_special_percentage = default_first_eight_special_ot / 100
          let first_eight_legal_percentage = default_first_eight_legal_ot / 100





          // The result of this, add this to the grosspay
          // 2 days * 130% * P500(daily) - 2days*P500(daily)
          // let total_pay_first_eight_restday_percentage = (total.restday_overtime_counter * first_eight_restday_percentage * daily) - (total.restday_overtime_counter * daily);
          // let total_pay_first_eight_special_percentage = (total.special_working_day_counter * first_eight_special_percentage * daily) - (total.restday_overtime_counter * daily)
          // let total_pay_first_eight_legal_percentage = (total.special_working_day_counter * first_eight_legal_percentage * daily) - (total.restday_overtime_counter * daily)


          // Additional Pay not whole pay
          //  420 * .30  * 1  =  125(additional pay for the restday OT)
          let total_pay_first_eight_restday_percentage = daily * first_eight_restday_percentage * total.restday_overtime_counter
          let total_pay_first_eight_special_percentage = daily * first_eight_special_percentage * total.special_working_day_counter
          let total_pay_first_eight_legal_percentage = daily * first_eight_legal_percentage * total.legal_working_day_counter
          //successToast(default_first_eight_legal_ot)


          setrestday_ot_amount_eight_hours(total_pay_first_eight_restday_percentage)
          setspecial_ot_amount_eight_hours(total_pay_first_eight_special_percentage)
          setlegal_ot_amount_eight_hours(total_pay_first_eight_legal_percentage)

          //Pay
          //Earnings
          let total_pay_restday = restday_counter * daily
          let total_pay_workingday = working_day_counter * daily
          let total_pay_restdayovertimecounter = restday_overtime_counter * daily
          let total_pay_vl = vl_day * daily
          let total_pay_sl = sl_day * daily
          let total_pay_el = el_day * daily


          //Deductions
          let total_pay_absence = absent_day * daily
          let total_pay_vlnopay = vl_nopay_day * daily
          let total_pay_slnopay = sl_nopay_day * daily
          let total_pay_elnopay = el_nopay_day * daily
          let total_pay_restdaynopay = restday_nopay_day * daily

          setabsence_amount(total_pay_absence)
          setvl_nopay_amount(total_pay_vlnopay)
          setsl_nopay_amount(total_pay_slnopay)
          setel_nopay_amount(total_pay_elnopay)
          setrestday_nopay_amount(total_pay_restdaynopay)



          //Additional Earnings
          let total_pay_regularothours;
          if (regular_ot_hours > 0) {
               //52.50 * .25  + 52.50 =65.625
               let hourly_with_overtime = (hourly * regular_ot_percentage) + hourly
               total_pay_regularothours = hourly_with_overtime * regular_ot_hours
          }
          else {
               total_pay_regularothours = 0
          }

          let total_pay_restdayothours;
          if (restday_ot_hours > 0) {
               //total_pay_restdayothours = (restday_ot_hours * hourly) + (restday_ot_hours * hourly * restday_ot_percentage)
               let hourly_with_overtime = (hourly * restday_ot_percentage) + hourly
               total_pay_restdayothours = hourly_with_overtime * restday_ot_hours
          }
          else {
               total_pay_restdayothours = 0
          }

          let total_pay_specialothours;
          if (special_ot_hours > 0) {
               let hourly_with_overtime = (hourly * special_ot_percentage) + hourly
               total_pay_specialothours = hourly_with_overtime * special_ot_hours
          }
          else {
               total_pay_specialothours = 0
          }

          let total_pay_legalothours;
          if (legal_ot_hours > 0) {
               let hourly_with_overtime = (hourly * legal_ot_percentage) + hourly
               total_pay_legalothours = hourly_with_overtime * legal_ot_hours
          }
          else {
               total_pay_legalothours = 0
          }


          setregular_ot_amount(total_pay_regularothours)
          setrestday_ot_amount(total_pay_restdayothours)
          setspecial_ot_amount(total_pay_specialothours)
          setlegal_ot_amount(total_pay_legalothours)


          setrestday_first_eight(total_pay_first_eight_restday_percentage)
          setspecial_first_eight(total_pay_first_eight_special_percentage)
          setlegal_first_eight(total_pay_first_eight_legal_percentage)



          //Additional Deductions
          let total_pay_undertimemin = total_undertime_min * minutely
          let total_pay_tardinessmin = total_tardiness_min * minutely
          setundertime_amount(total_pay_undertimemin)
          settardiness_amount(total_pay_tardinessmin)

          //SUBTOTAL
          let additional_earnings = filtered_additional && filtered_additional[0]?.total_earnings
          let additional_deductions = filtered_additional && filtered_additional[0]?.total_deduction
          let deductions = total_pay_absence + total_pay_vlnopay + total_pay_slnopay + total_pay_elnopay + total_pay_undertimemin + total_pay_tardinessmin + total_pay_restdaynopay
          let daily_deductions = total_pay_undertimemin + total_pay_tardinessmin
          let earnings = total_pay_regularothours + total_pay_restdayothours + total_pay_specialothours + total_pay_legalothours + total_pay_first_eight_restday_percentage + total_pay_first_eight_special_percentage + total_pay_first_eight_legal_percentage

          //Daily
          let daily_earnings = working_day_counter * daily

          let daily_gross = (daily_earnings + earnings) - deductions
          let daily_final_gross = daily_gross + additional_earnings
          let daily_net = daily_final_gross - additional_deductions

          let gross = (bimonthly + earnings) - deductions
          let final_gross = gross + additional_earnings
          let net = final_gross - additional_deductions





          console.log(total_pay_absence, "total_pay_absence")
          //NEW Earnings
          let new_allowance = filtered_additional && filtered_additional[0]?.allowance
          let new_pay_adj = filtered_additional && filtered_additional[0]?.pay_adjustment_earnings
          let new_others = filtered_additional && filtered_additional[0]?.other_earnings
          let new_earnings_total = bimonthly + earnings + new_allowance + new_pay_adj + new_others
          let new_daily_earnings_total = daily_earnings + earnings + new_allowance + new_pay_adj + new_others


          //NEW Deductions
          let new_deductions_total = additional_deductions
          let new_daily_deductions_total = additional_deductions

          let new_net_total = new_earnings_total - new_deductions_total
          let new_daily_net_total = new_earnings_total - new_daily_deductions_total


          let grosspay = new_earnings_total - deductions;
          let daily_grosspay = new_daily_earnings_total - daily_deductions;


          let netpay = grosspay - additional_deductions;
          let daily_netpay = daily_grosspay - additional_deductions;



          setfinal_earnings(additional_earnings)
          setfinal_gross_pay(final_gross)
          setfinal_deduction(additional_deductions)
          setfinal_net_pay(net)




          setnew_deduction_total(new_deductions_total)
          setnew_earnings_total(employmentStatus !== "daily" ? new_earnings_total : new_daily_earnings_total)
          setnew_net_total(employmentStatus !== "daily" ? netpay : daily_netpay)
          setearning_deduction(employmentStatus !== "daily" ? deductions : daily_deductions)


          setgrosspay(employmentStatus !== "daily" ? grosspay : daily_grosspay)





          setsummary_grosspay(earnings)
          setsummary_deductions(earnings)
          setsummary_net(earnings)







          //      console.log(additional_earnings, "additional_earnings")
          //      console.log(additional_deductions, "additional_deductions")
          //      console.log(deductions, "deductions")
          //      console.log(total_pay_first_eight_legal_percentage, "earnings")
          //      console.log(gross, "gross")
          //      console.log(final_gross, "final_gross")
          //      console.log(net, "net")
          // 



          //Save to DB

          setdb_employeeid(employeeId);
          setdb_month(month)
          setdb_period(period)
          setdb_year(year)
          setdb_net_pay(employmentStatus !== "daily" ? netpay : daily_netpay)
     }
     const handleChange = (event, newValue) => {
          settabvalue(newValue);
     };
     const [tabvalue, settabvalue] = React.useState('1');
     const handleGoToSummary = () => {
          // setbuttonReceiptDisabled(true)
          settabvalue('3')
     }

     const handleGoToApprovals = () => {
          // setbuttonReceiptDisabled(true)
          settabvalue('2')
     }




     const calculateFinalDeduction = () => {
          return filtered_additional && filtered_additional[0]?.total_deduction
     }
     const firstFinalDeduction = calculateFinalDeduction();

     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
     };
     const handleGenerateSummary = () => {

     }



     const handleAdd = async (e) => {
          e.preventDefault()

          if (period === "" || month === "" || employeeId === "") {
               errorToast('Saving failed, please finalize payroll properly')
          }
          else {
               const isDuplicate = arr.find(item => item.employee_id === employeeId);
               if (!isDuplicate) {
                    if (!user) {
                         console.log('You must be logged in first')
                         return
                    }
                    else {
                         const payslip = {
                              approval_status: 'PENDING', //need to update to "APPROVED"
                              month: db_month,
                              period: db_period,
                              employee_id: db_employeeid,
                              net: db_net_pay,
                              department: db_department,
                              name: new_name,
                              year: db_year
                         }
                         const response = await fetch('https://coop-back-zqr6.onrender.com/api/payslip', {
                              method: 'POST',
                              body: JSON.stringify(payslip),
                              headers: {
                                   'Content-Type': 'application/json',
                                   'Authorization': `Bearer ${user.token}`
                              }
                         })
                         const json = await response.json()

                         successToast('Added Successfully')

                    }
               }
               else {
                    const isAlreadyApproved = arr.find(item => item.employee_id === employeeId && item.approval_status === 'APPROVED' && item.year === year && item.month == month);
                    if (isAlreadyApproved) {
                         errorToast('This payslip is already approved. Editing is not allowed anymore.')
                    }
                    else {
                         const payslip = {
                              approval_status: 'PENDING',
                              month: db_month,
                              period: db_period,
                              employee_id: db_employeeid,
                              net: db_net_pay,
                              department: db_department,
                              name: new_name,
                              year: db_year

                         }
                         if (!user) {
                              console.log('You must be logged in first')
                              return
                         }
                         if (
                              db_net_pay === ""
                         ) {
                              errorToast('Finalize this payroll first before saving')
                         }
                         else {
                              const response = await fetch(`https://coop-back-zqr6.onrender.com/api/payslip/${employeeId}`, {
                                   method: 'PATCH',
                                   body: JSON.stringify(payslip),
                                   headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${user.token}`
                                   }
                              })
                              const json = await response.json()
                              if (!response.ok) {
                                   errorToast('Network Error')
                              }
                              else {
                                   successToast('Item Updated Successfully')
                              }
                         }
                    }


               }
          }
          setTimeout(() => {
               random()
          }, 1000)

     }
     const [departmentTotals, setDepartmentTotals] = useState({});
     useEffect(() => {
          // Calculate the total net pay for each department
          const calculatedDepartmentTotals = summ.reduce((totals, transaction) => {
               const department = transaction.department || 'No Department';
               const netPay = transaction.net || 0;
               totals[department] = (totals[department] || 0) + netPay;
               return totals;
          }, {});
          setDepartmentTotals(calculatedDepartmentTotals);

          // // Calculate the grand total net pay for all departments
          // const calculatedGrandTotalNetPay = Object.values(calculatedDepartmentTotals).reduce((total, netPay) => total + netPay, 0);
          // setGrandTotalNetPay(calculatedGrandTotalNetPay);
     }, [summ]);


     const handleApproval = async (transaction) => {

          // Make the API request to update the approval_status to 'APPROVED'

          if (transaction.approval_status === 'PENDING' || transaction.approval_status === 'REJECTED') {
               const approved = {
                    approval_status: 'APPROVED', // Update to 'PENDING'
               };
               const response = await fetch(`https://coop-back-zqr6.onrender.com/api/payslip/${transaction.employee_id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(approved),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`,
                    },
               });
               const json = await response.json()

               random();
          }


     }

     const handleRejection = async (transaction) => {

          const rejected = {
               approval_status: 'REJECTED', // Update to 'PENDING'
          };

          const response = await fetch(`https://coop-back-zqr6.onrender.com/api/payslip/${transaction.employee_id}`, {
               method: 'PATCH',
               body: JSON.stringify(rejected),
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
               },
          });
          const json = await response.json()

          random();
     }
     let daily;
     useEffect(() => {
          let total = {}; // Initialize total with an empty object or appropriate default value

          if (employmentStatus !== "daily") {
               if (total.working_day_counter !== 0) {
                    daily = total.working_day_counter;
               }
          } else {
               if (total.working_day_counter !== 0) {
                    daily = total.working_day_counter * default_bimonthly;
               }
          }
     }, [employeeId, start_date, end_date, period]);


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
                                                       <Tab label="Payslip" value="1" />
                                                       <Tab label="Approvals" value="2" onClick={handleGoToApprovals} />
                                                       <Tab label="Summary" value="3" onClick={handleGoToSummary} />
                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
                                                  <div style={{ display: "flex", width: "100%", }}>
                                                       <div style={{ width: "100%" }}>
                                                            <div style={{ display: "flex", paddingRight: "20px" }}>
                                                                 <div>
                                                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                           <DateContainer>
                                                                                <TextField
                                                                                     required
                                                                                     id="outlined-required"
                                                                                     label="Month"
                                                                                     fullWidth
                                                                                     select
                                                                                     style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
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
                                                                                     style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
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

                                                                                <TextField
                                                                                     required
                                                                                     id="outlined-required"
                                                                                     label="Period"
                                                                                     fullWidth
                                                                                     select
                                                                                     style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                                     onChange={handlePeriodChange}
                                                                                     value={period}
                                                                                >
                                                                                     <MenuItem value={'first'}>First Half</MenuItem>
                                                                                     <MenuItem value={'second'}>Second Half</MenuItem>
                                                                                </TextField>
                                                                           </DateContainer>
                                                                      </LocalizationProvider>
                                                                      <ThemeProvider theme={theme}>
                                                                           <Button style={{ marginRight: "10px" }} variant="outlined" color="green" onClick={calculateGrossPay}>
                                                                                Generate
                                                                           </Button>
                                                                      </ThemeProvider>
                                                                 </div>
                                                                 <div>
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
                                                                           label="Employee_id"
                                                                           style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                           value={employeeId}

                                                                           InputProps={{
                                                                                readOnly: true,
                                                                           }}
                                                                      />

                                                                 </div>

                                                            </div>
                                                       </div>
                                                       <div style={{ display: "flex", width: "100%" }}>
                                                            <div>
                                                                 <div style={{ display: "flex" }}><p style={{ marginRight: "200px" }}>Base Salary</p></div>
                                                                 <div style={{ display: "flex" }}><p style={{ marginRight: "200px" }}>Bimonthly Salary</p></div>
                                                                 <div style={{ display: "flex" }}><p style={{ marginRight: "200px" }}>Daily Salary</p></div>
                                                                 <div style={{ display: "flex" }}><p style={{ marginRight: "200px" }}>Hourly Salary</p></div>
                                                                 <div style={{ display: "flex" }}><p style={{ marginRight: "200px" }}>Minute Salary</p></div>
                                                            </div>
                                                            <div>
                                                                 <p>{default_base.toLocaleString()}</p>
                                                                 <p>{default_bimonthly.toLocaleString()}</p>
                                                                 <p>{default_daily.toLocaleString()}</p>
                                                                 <p>{default_hourly.toLocaleString()}</p>
                                                                 <p>{default_minute.toLocaleString()}</p>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div ref={appRef} style={{ border: "solid 1px #d3d3d3", marginTop: "20px" }}>
                                                       <div style={{ marginBottom: "20px", marginTop: "50px" }}>
                                                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                                                 <p style={{ fontWeight: "600", fontSize: "16px" }}>HAPPY HOMES HOUSING COOPERATIVE</p>
                                                                 <p style={{ fontWeight: "600", fontSize: "16px" }}>FOR THE CUT-OFF PERIOD {start_date + " - " + end_date}</p>
                                                            </div>
                                                            <div>
                                                                 <div style={{ paddingLeft: "50px", fontWeight: "600", fontSize: "16px" }}>Name: {new_name}</div>

                                                            </div>

                                                       </div>
                                                       <TablesContainer >
                                                            <TableContainer
                                                                 style={{ width: "100%" }} >
                                                                 <Table sx={{ width: 600 }} aria-label="simple table">
                                                                      <TableHead>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}>Earnings</TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}>Days</TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}>Hours</TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}>Mins</TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}>Amount</TableCell>
                                                                      </TableHead>
                                                                      <TableBody>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Basic Pay</TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{employmentStatus !== "daily" ? "" : total.working_day_counter != 0 ? total.working_day_counter : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>

                                                                                {/* working */}
                                                                                {/* <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}> {employmentStatus !== "daily" ? default_bimonthly : default_bimonthly * total.working_day_counter} </TableCell> */}

                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>
                                                                                     {employmentStatus !== "daily"
                                                                                          ? default_bimonthly !== null && default_bimonthly !== undefined
                                                                                               ? `P${default_bimonthly.toLocaleString("en-PH", {
                                                                                                    minimumFractionDigits: 2,
                                                                                                    maximumFractionDigits: 2,
                                                                                               })}`
                                                                                               : 'N/A'
                                                                                          : default_bimonthly !== null && default_bimonthly !== undefined && total.working_day_counter !== null && total.working_day_counter !== undefined
                                                                                               ? `P${(default_bimonthly * total.working_day_counter).toLocaleString("en-PH", {
                                                                                                    minimumFractionDigits: 2,
                                                                                                    maximumFractionDigits: 2,
                                                                                               })}`
                                                                                               : 'N/A'
                                                                                     }
                                                                                </TableCell>








                                                                                {/* <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>
                                                                                     {daily ? (
                                                                                          `P${daily.toLocaleString(undefined, {
                                                                                               minimumFractionDigits: 2,
                                                                                               maximumFractionDigits: 2
                                                                                          })}`
                                                                                     ) : (
                                                                                          "N/A" // Provide a default value or message when 'daily' is undefined
                                                                                     )}
                                                                                </TableCell> */}

                                                                                {/* <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{default_bimonthly.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell> */}
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Allowance</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.allowance.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Overtime (Regular)</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.regular_ot_hours != 0 ? total.regular_ot_hours : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{regular_ot_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Overtime (Restday)</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.restday_ot_hours != 0 ? total.restday_ot_hours : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{restday_ot_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Overtime (Special Working Hol.)</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.special_ot_hours != 0 ? total.special_ot_hours : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{special_ot_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Overtime (Legal Hol.)</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.legal_ot_hours != 0 ? total.legal_ot_hours : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{legal_ot_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>


                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Add: Restday OT</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{restday_first_eight.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>

                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Add: Special Working Hol </TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{special_first_eight.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Add: Legal Holiday</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{legal_first_eight.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Night Differential</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P0.00</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Prior Period Adjustment</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.pay_adjustment_earnings.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Other Earnings</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.other_earnings.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1', fontWeight: "600", fontSize: "16px" }}>Sub Total</TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1', textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{new_earnings_total.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Tardiness</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.total_tardiness_min != 0 ? total.total_tardiness_min : ""}</TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{tardiness_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Undertime</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.total_undertime_min != 0 ? total.total_undertime_min : ""}</TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{undertime_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Restday No Pay</TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.restday_nopay_day != 0 ? total.restday_nopay_day : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{employmentStatus === "daily" ? "0.00" : restday_nopay_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Absences</TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.absent_day != 0 ? total.absent_day : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{absence_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>VL Without Pay</TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.vl_nopay_day != 0 ? total.vl_nopay_day : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{vl_nopay_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>SL Without Pay</TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.sl_nopay_day != 0 ? total.sl_nopay_day : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{sl_nopay_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>SIL Without Pay</TableCell>
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>{total.el_nopay_day != 0 ? total.el_nopay_day : ""}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{el_nopay_amount.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1', fontWeight: "600", fontSize: "16px" }}>Sub Total</TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1', textAlign: "right", fontWeight: "600", fontSize: "16px" }}>(P{earning_deduction.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })})</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ backgroundColor: 'orange', fontWeight: "600", fontSize: "16px" }}><strong>Gross Pay</strong></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'orange', textAlign: "right", fontWeight: "600", fontSize: "16px" }}><strong>P{grosspay.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</strong></TableCell>
                                                                           </TableRow>




                                                                      </TableBody>
                                                                 </Table>

                                                            </TableContainer>

                                                            <TableContainer
                                                                 style={{ width: "100%" }} >
                                                                 <Table sx={{ width: 600, marginBottom: "20px" }} aria-label="simple table">
                                                                      <TableHead>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}>Deduction</TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                                           <TableCell style={{ backgroundColor: 'orange' }}></TableCell>
                                                                      </TableHead>
                                                                      <TableBody>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>SSS Contributions</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.sss.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Philhealth Contributions</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.philhealth.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>HDMF Contributions</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.pagibig.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>WTAX</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.wtax.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>

                                                                           <TableRow >
                                                                                <TableCell style={{ backgroundColor: '#e6e6e6' }}>Others</TableCell>
                                                                                <TableCell style={{ backgroundColor: '#e6e6e6' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#e6e6e6' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#e6e6e6' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#e6e6e6' }}></TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Cash Advance/Loans</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.cash_advances.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Share Capital</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.share_capital.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>HHHC Savings</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.hhhc_savings.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>HHHC Membership Fee</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.hhhc_membership_fee.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>HMO</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.hmo.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Lodging</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.lodging.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                                {/* <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>
                                                                                     {filtered_additional && filtered_additional[0] && filtered_additional[0].lodging !== null
                                                                                          ? `P${filtered_additional[0].lodging.toLocaleString(undefined, {
                                                                                               minimumFractionDigits: 2,
                                                                                               maximumFractionDigits: 2,
                                                                                          })}`
                                                                                          : 'N/A' // Replace with your desired fallback value
                                                                                     }
                                                                                </TableCell> */}

                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Utilities</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>
                                                                                     P{filtered_additional && filtered_additional[0]?.water_electricity.toLocaleString(undefined, {
                                                                                          minimumFractionDigits: 2,
                                                                                          maximumFractionDigits: 2
                                                                                     })}

                                                                                </TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Pay Adjustment - Deduction</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.pay_adjustment_deduction.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ fontWeight: "600", fontSize: "16px" }}>Other Deductions</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell style={{ textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{filtered_additional && filtered_additional[0]?.other_deduction.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1', fontWeight: "600", fontSize: "16px" }}>Sub Total</TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: '#b1b1b1', textAlign: "right", fontWeight: "600", fontSize: "16px" }}>P{new_deduction_total && new_deduction_total.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</TableCell>
                                                                           </TableRow>
                                                                           <TableRow >

                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>
                                                                                <TableCell ></TableCell>

                                                                           </TableRow>


                                                                           <TableRow >
                                                                                <TableCell style={{ backgroundColor: 'darkorange', fontWeight: "600", fontSize: "16px" }}><strong>Net Pay</strong></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'darkorange' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'darkorange' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'darkorange' }}></TableCell>
                                                                                <TableCell style={{ backgroundColor: 'darkorange', textAlign: "right", fontWeight: "600", fontSize: "16px" }}><strong>P{new_net_total.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</strong></TableCell>
                                                                           </TableRow>
                                                                      </TableBody>
                                                                 </Table>
                                                            </TableContainer>

                                                       </TablesContainer>

                                                  </div>
                                                  <ThemeProvider theme={theme}>

                                                       <div style={{ display: "flex", justifyContent: "left", marginTop: "20px", width: "100%" }}>
                                                            <Button style={{ marginRight: "10px" }} variant="contained" color="red" onClick={handleAdd}>
                                                                 Save to Database
                                                            </Button>
                                                            <Button style={{ marginRight: "10px" }} variant="outlined" color="green" onClick={captureScreenshot}>
                                                                 Download
                                                            </Button>
                                                       </div>

                                                  </ThemeProvider>
                                                  <ButtonContainer>

                                                       <EditDeleteContainer>
                                                            <ThemeProvider theme={theme}>
                                                            </ThemeProvider>
                                                       </EditDeleteContainer>
                                                  </ButtonContainer>
                                             </TabPanel>













                                             {/* 9/4/2023 */}

                                             <TabPanel value="2">
                                                  <div ref={appRefSummary} style={{ width: "100%", padding: "20px" }}>
                                                       <div style={{ display: "flex", paddingRight: "20px" }}>
                                                            <div>
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DateContainer>

                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Month"
                                                                                fullWidth
                                                                                select
                                                                                style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                                onChange={handleMonthChange2}
                                                                                value={month2}
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
                                                                                style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                                onChange={handleYearChange2}
                                                                                value={year2}
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

                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Period"
                                                                                fullWidth
                                                                                select
                                                                                style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                                onChange={handlePeriodChange2}
                                                                                value={period2}
                                                                           >
                                                                                <MenuItem value={'first'}>First Half</MenuItem>
                                                                                <MenuItem value={'second'}>Second Half</MenuItem>
                                                                           </TextField>
                                                                      </DateContainer>
                                                                 </LocalizationProvider>
                                                            </div>

                                                       </div>
                                                       <div>
                                                            {/* <div style={{ width: "100%", marginRight: "20px" }}>
                                                                 <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                                      <h3>Confirmation</h3>
                                                                 </div>
                                                                 {summ && summ.length > 0 ? (

                                                                      <TableContainer style={{ width: "100%" }}>
                                                                           {summ
                                                                                .sort((a, b) => (a.department || '').localeCompare(b.department || ''))
                                                                                .map((transaction, index) => {
                                                                                     const prevDepartment = index > 0 ? summ[index - 1].department : null;
                                                                                     const currentDepartment = transaction.department;

                                                                                     if (prevDepartment !== currentDepartment) {
                                                                                          rowNumber = 1; // Reset the row number for a new department
                                                                                          return (
                                                                                               <div key={index}>
                                                                                                    <h2 style={{ backgroundColor: '#f0f0f0', padding: '5px', marginBottom: '10px' }}>
                                                                                                         {currentDepartment}
                                                                                                    </h2>
                                                                                                    <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                                         <TableHead>
                                                                                                              <TableRow>
                                                                                                                   <TableCell style={{ width: 20 }}>#</TableCell>
                                                                                                                   <TableCell style={{ width: 250 }}>Name</TableCell>
                                                                                                                   <TableCell style={{ width: 120 }}>Department</TableCell>
                                                                                                                   <TableCell align='right' style={{ width: 100 }}>Net Pay</TableCell>
                                                                                                                   <TableCell style={{ width: 120 }}>Status</TableCell>
                                                                                                              </TableRow>
                                                                                                         </TableHead>
                                                                                                         <TableBody>
                                                                                                              <TableRow>
                                                                                                                   <TableCell style={{ width: 20 }}>{rowNumber}</TableCell>
                                                                                                                   <TableCell style={{ width: 250 }}>{transaction.name}</TableCell>
                                                                                                                   <TableCell style={{ width: 120 }}>{transaction.department}</TableCell>
                                                                                                                   <TableCell align='right' style={{ width: 100 }}>{transaction.net && transaction.net.toLocaleString(undefined, {
                                                                                                                        minimumFractionDigits: 2,
                                                                                                                        maximumFractionDigits: 2
                                                                                                                   })}</TableCell>
                                                                                                                   <TableCell style={{ width: 120 }}>{transaction.status}</TableCell>
                                                                                                              </TableRow>
                                                                                                         </TableBody>
                                                                                                    </Table>
                                                                                               </div>
                                                                                          );
                                                                                     } else {
                                                                                          rowNumber++; // Increment row number for subsequent rows within the same department
                                                                                          return (
                                                                                               <Table key={index} sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                                    <TableBody>
                                                                                                         <TableRow>
                                                                                                              <TableCell style={{ width: 20 }}>{rowNumber}</TableCell>
                                                                                                              <TableCell style={{ width: 250 }}>{transaction.name}</TableCell>
                                                                                                              <TableCell style={{ width: 120 }}>{transaction.department}</TableCell>
                                                                                                              <TableCell align='right' style={{ width: 100 }}>{transaction.net && transaction.net.toLocaleString(undefined, {
                                                                                                                   minimumFractionDigits: 2,
                                                                                                                   maximumFractionDigits: 2
                                                                                                              })}</TableCell>
                                                                                                              <TableCell style={{ width: 120 }}>{transaction.status}</TableCell>
                                                                                                         </TableRow>
                                                                                                    </TableBody>
                                                                                               </Table>
                                                                                          );
                                                                                     }
                                                                                })}
                                                                      </TableContainer>

                                                                 ) : (
                                                                      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", alignItems: "center", flexDirection: "column" }}>
                                                                           <p>Select a month and period to display the data</p>
                                                                      </div>
                                                                 )}


                                                            </div> */}


                                                            <div style={{ width: "100%", marginRight: "20px" }}>
                                                                 <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                                      <h3>Approvals</h3>
                                                                 </div>
                                                                 {summ && summ.length > 0 ? (

                                                                      <TableContainer style={{ width: "100%" }}>
                                                                           {summ
                                                                                .sort((a, b) => (a.department || '').localeCompare(b.department || ''))
                                                                                .map((transaction, index) => {
                                                                                     const prevDepartment = index > 0 ? summ[index - 1].department : null;
                                                                                     const currentDepartment = transaction.department;

                                                                                     const isPending = transaction.approval_status === 'PENDING';
                                                                                     // const buttonText = isPending ? 'Approve' : 'Disapprove';
                                                                                     const textBackground = (() => {
                                                                                          if (transaction.approval_status === 'PENDING') {
                                                                                               return '#ffb453'
                                                                                          }
                                                                                          else if (transaction.approval_status === 'APPROVED') {
                                                                                               return '#448d42'
                                                                                          }
                                                                                          else {
                                                                                               return '#b43f3b'
                                                                                          }
                                                                                     })();



                                                                                     if (prevDepartment !== currentDepartment) {
                                                                                          rowNumber = 1; // Reset the row number for a new department
                                                                                          return (
                                                                                               <div key={index}>
                                                                                                    <h2 style={{ backgroundColor: '#f0f0f0', padding: '5px', marginBottom: '10px' }}>
                                                                                                         {currentDepartment}
                                                                                                    </h2>
                                                                                                    <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                                         <TableHead>
                                                                                                              <TableRow>
                                                                                                                   <TableCell style={{ width: 20 }}>#</TableCell>
                                                                                                                   <TableCell style={{ width: 120 }}>Name</TableCell>
                                                                                                                   <TableCell style={{ width: 40 }}>Departments</TableCell>
                                                                                                                   <TableCell align='left' style={{ width: 50 }}>Net Pay</TableCell>
                                                                                                                   <TableCell style={{ width: 60 }}>Status</TableCell>
                                                                                                                   {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.adminpayroll") && <TableCell style={{ width: 80 }}>Action</TableCell>}
                                                                                                              </TableRow>
                                                                                                         </TableHead>
                                                                                                         <TableBody>
                                                                                                              <TableRow>
                                                                                                                   <TableCell style={{ width: 20 }}>{rowNumber}</TableCell>
                                                                                                                   <TableCell style={{ width: 120 }}>{transaction.name}</TableCell>
                                                                                                                   <TableCell style={{ width: 40 }}>{transaction.department}</TableCell>
                                                                                                                   <TableCell align='left' style={{ width: 50 }}>{transaction.net && transaction.net.toLocaleString(undefined, {
                                                                                                                        minimumFractionDigits: 2,
                                                                                                                        maximumFractionDigits: 2
                                                                                                                   })}</TableCell>
                                                                                                                   <TableCell style={{ width: 60 }}><p style={{ backgroundColor: textBackground, textAlign: 'center', borderRadius: "5px", color: "#fff" }}>{transaction.approval_status}</p></TableCell>
                                                                                                                   {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.adminpayroll") && <TableCell style={{ width: 80 }}>

                                                                                                                        <ThemeProvider theme={theme}>
                                                                                                                             <div>
                                                                                                                                  <Button style={{ marginRight: "5px" }} variant="contained" color="green" onClick={() => handleApproval(transaction)}>
                                                                                                                                       Approve
                                                                                                                                  </Button>
                                                                                                                                  <Button variant="contained" color="red" onClick={() => handleRejection(transaction)}>
                                                                                                                                       Reject
                                                                                                                                  </Button>
                                                                                                                             </div>
                                                                                                                        </ThemeProvider>

                                                                                                                   </TableCell>}
                                                                                                              </TableRow>
                                                                                                         </TableBody>
                                                                                                    </Table>
                                                                                               </div>
                                                                                          );
                                                                                     } else {
                                                                                          rowNumber++; // Increment row number for subsequent rows within the same department
                                                                                          return (
                                                                                               <Table key={index} sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                                    <TableBody>
                                                                                                         <TableRow>
                                                                                                              <TableCell style={{ width: 20 }}>{rowNumber}</TableCell>
                                                                                                              <TableCell style={{ width: 120 }}>{transaction.name}</TableCell>
                                                                                                              <TableCell style={{ width: 40 }}>{transaction.department}</TableCell>
                                                                                                              <TableCell align='left' style={{ width: 50 }}>{transaction.net && transaction.net.toLocaleString(undefined, {
                                                                                                                   minimumFractionDigits: 2,
                                                                                                                   maximumFractionDigits: 2
                                                                                                              })}</TableCell>
                                                                                                              <TableCell style={{ width: 60 }}><p style={{ backgroundColor: textBackground, textAlign: 'center', borderRadius: "5px", color: "#fff" }}>{transaction.approval_status}</p></TableCell>
                                                                                                              {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.adminpayroll") && <TableCell style={{ width: 80 }}>

                                                                                                                   <ThemeProvider theme={theme}>
                                                                                                                        <div>
                                                                                                                             <Button style={{ marginRight: "5px" }} variant="contained" color="green" onClick={() => handleApproval(transaction)}>
                                                                                                                                  Approve
                                                                                                                             </Button>
                                                                                                                             <Button variant="contained" color="red" onClick={() => handleRejection(transaction)}>
                                                                                                                                  Reject
                                                                                                                             </Button>
                                                                                                                        </div>
                                                                                                                   </ThemeProvider>

                                                                                                              </TableCell>}
                                                                                                         </TableRow>
                                                                                                    </TableBody>
                                                                                               </Table>
                                                                                          );
                                                                                     }
                                                                                })}
                                                                      </TableContainer>

                                                                 ) : (
                                                                      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", alignItems: "center", flexDirection: "column" }}>
                                                                           <p>Select a month and period to display the data</p>
                                                                      </div>
                                                                 )}


                                                            </div>


                                                            <div style={{ width: "100%", marginTop: "100px" }}>
                                                                 <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                                      <h3>Total</h3>
                                                                 </div>
                                                                 <TableContainer style={{ marginBottom: "20px" }}>
                                                                      <Table aria-label="simple table">
                                                                           <TableBody>
                                                                                {Object.entries(departmentTotals).map(([department, total]) => (
                                                                                     <TableRow key={department}>
                                                                                          <TableCell sx={{ width: 300 }}>{department} Total Net Pay</TableCell>
                                                                                          <TableCell align='right'>
                                                                                               {total.toLocaleString(undefined, {
                                                                                                    minimumFractionDigits: 2,
                                                                                                    maximumFractionDigits: 2
                                                                                               })}
                                                                                          </TableCell>
                                                                                     </TableRow>
                                                                                ))}
                                                                                <TableRow>
                                                                                     <TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>Grand Total Net Pay</TableCell>
                                                                                     <TableCell align='right' style={{ fontWeight: "600" }}>{summ_net && summ_net.toLocaleString(undefined, {
                                                                                          minimumFractionDigits: 2,
                                                                                          maximumFractionDigits: 2
                                                                                     })}</TableCell>
                                                                                </TableRow>
                                                                           </TableBody>
                                                                      </Table>
                                                                 </TableContainer>
                                                            </div>

                                                       </div>

                                                  </div>
                                                  <ThemeProvider theme={theme}>

                                                       <div style={{ display: "flex", justifyContent: "left", marginTop: "20px", width: "100%" }}>
                                                            <Button style={{ marginRight: "10px" }} variant="outlined" color="green" onClick={captureScreenshotSummary}>
                                                                 Download
                                                            </Button>
                                                       </div>

                                                  </ThemeProvider>
                                             </TabPanel>

















                                             <TabPanel value="3">
                                                  <div ref={appRefSummary} style={{ width: "100%", padding: "20px" }}>
                                                       <div style={{ display: "flex", paddingRight: "20px" }}>
                                                            <div>
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DateContainer>

                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Month"
                                                                                fullWidth
                                                                                select
                                                                                style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                                onChange={handleMonthChange2}
                                                                                value={month2}
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
                                                                                style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                                onChange={handleYearChange2}
                                                                                value={year2}
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

                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Period"
                                                                                fullWidth
                                                                                select
                                                                                style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                                onChange={handlePeriodChange2}
                                                                                value={period2}
                                                                           >
                                                                                <MenuItem value={'first'}>First Half</MenuItem>
                                                                                <MenuItem value={'second'}>Second Half</MenuItem>
                                                                           </TextField>
                                                                      </DateContainer>
                                                                 </LocalizationProvider>
                                                                 {/* <ThemeProvider theme={theme}>
                                                                      <Button style={{ marginRight: "10px" }} variant="outlined" color="green" onClick={calculateGrossPay}>
                                                                           Generate
                                                                      </Button>
                                                                 </ThemeProvider> */}
                                                            </div>

                                                       </div>
                                                       <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", border: "1px solid grey", padding: "50px" }}>
                                                            <div style={{ width: "100%", marginRight: "20px", }}>
                                                                 <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                                      <h3>Confirmation</h3>
                                                                 </div>
                                                                 {summ && summ.length > 0 ? (

                                                                      <TableContainer style={{ width: "100%" }}>
                                                                           {summ
                                                                                .sort((a, b) => (a.department || '').localeCompare(b.department || ''))
                                                                                .map((transaction, index) => {
                                                                                     const prevDepartment = index > 0 ? summ[index - 1].department : null;
                                                                                     const currentDepartment = transaction.department;

                                                                                     if (prevDepartment !== currentDepartment) {
                                                                                          rowNumber = 1; // Reset the row number for a new department
                                                                                          return (
                                                                                               <div key={index}>
                                                                                                    <h2 style={{ backgroundColor: '#f0f0f0', padding: '5px', marginBottom: '10px' }}>
                                                                                                         {currentDepartment}
                                                                                                    </h2>
                                                                                                    <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                                         <TableHead>
                                                                                                              <TableRow>
                                                                                                                   <TableCell style={{ width: 20, fontSize: "11px", lineHeight: "1" }}>#</TableCell>
                                                                                                                   <TableCell style={{ width: 250, fontSize: "11px", lineHeight: "1" }}>Name</TableCell>
                                                                                                                   <TableCell style={{ width: 120, fontSize: "11px", lineHeight: "1" }}>Department</TableCell>
                                                                                                                   <TableCell align='right' style={{ width: 100, fontSize: "11px", lineHeight: "1" }}>Net Pay</TableCell>
                                                                                                              </TableRow>
                                                                                                         </TableHead>
                                                                                                         <TableBody>
                                                                                                              <TableRow>
                                                                                                                   <TableCell style={{ width: 20, fontSize: "11px", lineHeight: "1" }}>{rowNumber}</TableCell>
                                                                                                                   <TableCell style={{ width: 250, fontSize: "11px", lineHeight: "1" }}>{transaction.name}</TableCell>
                                                                                                                   <TableCell style={{ width: 120, fontSize: "11px", lineHeight: "1" }}>{transaction.department}</TableCell>
                                                                                                                   <TableCell align='right' style={{ width: 100, fontSize: "11px", lineHeight: "1" }}>{transaction.net && transaction.net.toLocaleString(undefined, {
                                                                                                                        minimumFractionDigits: 2,
                                                                                                                        maximumFractionDigits: 2
                                                                                                                   })}</TableCell>
                                                                                                              </TableRow>
                                                                                                         </TableBody>
                                                                                                    </Table>
                                                                                               </div>
                                                                                          );
                                                                                     } else {
                                                                                          rowNumber++; // Increment row number for subsequent rows within the same department
                                                                                          return (
                                                                                               <Table key={index} sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                                    <TableBody>
                                                                                                         <TableRow>
                                                                                                              <TableCell style={{ width: 20, fontSize: "11px" }}>{rowNumber}</TableCell>
                                                                                                              <TableCell style={{ width: 250, fontSize: "11px" }}>{transaction.name}</TableCell>
                                                                                                              <TableCell style={{ width: 120, fontSize: "11px" }}>{transaction.department}</TableCell>
                                                                                                              <TableCell align='right' style={{ width: 100, fontSize: "11px" }}>{transaction.net && transaction.net.toLocaleString(undefined, {
                                                                                                                   minimumFractionDigits: 2,
                                                                                                                   maximumFractionDigits: 2
                                                                                                              })}</TableCell>
                                                                                                         </TableRow>
                                                                                                    </TableBody>
                                                                                               </Table>
                                                                                          );
                                                                                     }
                                                                                })}
                                                                      </TableContainer>

                                                                 ) : (
                                                                      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", alignItems: "center", flexDirection: "column" }}>
                                                                           <p>Select a month and period to display the data</p>
                                                                      </div>
                                                                 )}


                                                            </div>


                                                            <div style={{ width: "100%", }}>
                                                                 <div style={{ width: "100%", backgroundColor: "orange", color: "white", padding: "20px", borderRadius: "10px 10px 0 0" }}>
                                                                      <h3>Total</h3>
                                                                 </div>
                                                                 <TableContainer style={{ marginBottom: "20px" }}>
                                                                      <Table aria-label="simple table">
                                                                           <TableBody>
                                                                                {Object.entries(departmentTotals).map(([department, total]) => (
                                                                                     <TableRow key={department}>
                                                                                          <TableCell sx={{ width: 300, fontSize: "11px" }}>{department} Total Net Pay</TableCell>
                                                                                          <TableCell sx={{ fontSize: "11px" }} align='right'>
                                                                                               {total.toLocaleString(undefined, {
                                                                                                    minimumFractionDigits: 2,
                                                                                                    maximumFractionDigits: 2
                                                                                               })}
                                                                                          </TableCell>
                                                                                     </TableRow>
                                                                                ))}
                                                                                <TableRow>
                                                                                     <TableCell sx={{ width: 300 }} style={{ fontWeight: "600", fontSize: "11px" }}>Grand Total Net Pay</TableCell>
                                                                                     <TableCell align='right' style={{ fontWeight: "600", fontSize: "11px" }}>{summ_net && summ_net.toLocaleString(undefined, {
                                                                                          minimumFractionDigits: 2,
                                                                                          maximumFractionDigits: 2
                                                                                     })}</TableCell>
                                                                                </TableRow>
                                                                           </TableBody>
                                                                      </Table>
                                                                 </TableContainer>
                                                            </div>

                                                       </div>

                                                  </div>
                                                  <ThemeProvider theme={theme}>

                                                       <div style={{ display: "flex", justifyContent: "left", marginTop: "20px", width: "100%" }}>
                                                            <Button style={{ marginRight: "10px" }} variant="outlined" color="green" onClick={captureScreenshotSummary}>
                                                                 Download
                                                            </Button>
                                                       </div>

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

export default Payroll