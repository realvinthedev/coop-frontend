
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
import { Alert } from '@mui/material';
import { Fullscreen, PaddingRounded } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import { width } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { useSignup } from '../hooks/useSignup';
import SavingsPrinter from '../components/SavingsPrinter';
import { toast } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SavingsReceiptPrinter from '../components/SavingsReceiptPrinter';
import ImageUploader from '../components/ImageUploader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { saveAs } from 'file-saver-es';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import SavingsMasterlistPrinter from '../components/SavingsMasterlistPrinter';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';




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
          },
          blue: {
               main: '#2b55af',
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
    height: 900px;
`
const Card = styled.div`
    background-color: white;
    height: 800px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: auto;
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

const Cards = styled.div`
    height: 340px;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    justify-content: left;
    
   
`
const Cardslist = styled.div`
    height: 80px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    justify-content: space-between;
    margin: 15px;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
`

/**GET REQUESTS */
const columns = [
     { field: 'member_id', headerName: 'Member ID', width: 200, filter: 'text' },
     { field: 'lastname', headerName: 'Lastname', width: 250, filter: 'text' },
     { field: 'firstname', headerName: 'Firstname', width: 250, filter: 'text' },
     { field: 'middlename', headerName: 'Middlename', width: 250, filter: 'text' },
     { field: 'tin', headerName: 'TIN No', width: 250, filter: 'text' },
     { field: 'membership_date', headerName: 'Membership Date Accepted', width: 250 },
     { field: 'membership_type', headerName: 'Type / Kind of Membership', width: 250 },
     { field: 'hhhc_membership_number', headerName: 'HHH Membership Number', width: 250 },
     { field: 'bod_res', headerName: 'BOD Resolution No', width: 250 },
     //membership fee
     { field: 'initial_share_capital', headerName: 'Initial Share Capital', width: 250 },
     { field: 'initial_no_share', headerName: 'Initial No. of Shares', width: 250 },
     { field: 'passbook_series_number', headerName: 'Passbook Account Series No.', width: 250 },
     { field: 'coop_savings_account_number', headerName: 'Savings Account No.', width: 250 },
     //share capital amount
     //coop savings amount
     { field: 'housing_equity', headerName: 'Housing Equity Account No.', width: 250 },
     { field: 'special_savings_account', headerName: 'Special Savings Account No.', width: 250 },
     //special savings amount
     { field: 'impukan_certificate_account', headerName: 'Impukan Certificate Account No.', width: 250 },
     { field: 'kaya_atm_savings_account_number', headerName: 'Kaya Savings Account Number', width: 250 },
     //Kaya savings amount
     { field: 'address', headerName: 'Current Address', width: 250, filter: 'text' },
     { field: 'email', headerName: 'Email Address', width: 250, filter: 'text' },
     { field: 'contact_number', headerName: 'Contact Number', width: 250, filter: 'text' },
     { field: 'dob', headerName: 'Date of Birth', width: 250, filter: 'text' },
     { field: 'age', headerName: 'Age', width: 250, filter: 'text' },
     { field: 'gender', headerName: 'Sex', width: 250, filter: 'text' },
     { field: 'civil_status', headerName: 'Civil Status', width: 250, filter: 'text' },
     { field: 'highest_educational_attainment', headerName: 'Highest Ed. Att.', width: 250, filter: 'text' },
     { field: 'occupation', headerName: 'Occupation / Income Source', width: 250, filter: 'text' },
     { field: 'number_of_dependent', headerName: 'Number of Dependent', width: 250 },
     { field: 'religion', headerName: 'Religion/Social Affiliation', width: 250, filter: 'text' },
     { field: 'annual_income', headerName: 'Annual Income', width: 250, filter: 'text' },
     { field: 'pwd_type', headerName: 'PWD Type(DISABILITY TYPE/ADVOCATE)', width: 250 },
     { field: 'termination_date', headerName: 'Termination of Membership Date', width: 300 },
     { field: 'termination_bod', headerName: 'Termination BOD Resolution No', width: 300 },
     { field: 'remarks', headerName: 'Remarks', width: 600 },
     { field: 'notes', headerName: 'Notes', width: 600 },
     { field: 'status', headerName: 'Status', width: 250 },
     { field: 'coop_savings_passbook_number', headerName: 'Coop Savings Passbook Number', width: 250 },
     { field: 'kaya_atm_card_number', headerName: 'Special Savings Passbook Number', width: 250 },
     { field: 'affiliation_org', headerName: 'Affiliation Org', width: 250 },
     { field: 'passbook_printed', headerName: 'Passbook Printed', width: 250 },




];

const savings_columns = [
     { field: 'date', headerName: 'Date', width: 100 },
     { field: 'particulars', headerName: 'Particulars', width: 300 },
     { field: 'membership_fee', headerName: 'Membership Fee', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'share_capital_debit', headerName: 'SC-Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header1', cellClassName: 'super-app-theme--header1cell' },
     { field: 'share_capital_credit', headerName: 'SC-Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header1', cellClassName: 'super-app-theme--header1cell' },
     { field: 'share_capital_balance', headerName: 'SC-Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header1', cellClassName: 'super-app-theme--header1cell' },

     { field: 'coop_savings_debit', headerName: 'CS-Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header2', cellClassName: 'super-app-theme--header2cell' },
     { field: 'coop_savings_credit', headerName: 'CS-Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header2', cellClassName: 'super-app-theme--header2cell' },
     { field: 'coop_savings_balance', headerName: 'CS-Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header2', cellClassName: 'super-app-theme--header2cell' },

     { field: 'special_savings_debit', headerName: 'SS-Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header3', cellClassName: 'super-app-theme--header3cell' },
     { field: 'special_savings_credit', headerName: 'SS-Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header3', cellClassName: 'super-app-theme--header3cell' },
     { field: 'special_savings_balance', headerName: 'SS-Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header3', cellClassName: 'super-app-theme--header3cell' },

     { field: 'kaya_savings_debit', headerName: 'Kaya-Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header4', cellClassName: 'super-app-theme--header4cell' },
     { field: 'kaya_savings_credit', headerName: 'Kaya-Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header4', cellClassName: 'super-app-theme--header4cell' },
     { field: 'kaya_savings_balance', headerName: 'Kaya-Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header4', cellClassName: 'super-app-theme--header4cell' },

     { field: 'housing_savings_debit', headerName: 'Housing-Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header5', cellClassName: 'super-app-theme--header5cell' },
     { field: 'housing_savings_credit', headerName: 'Housing-Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header5', cellClassName: 'super-app-theme--header5cell' },
     { field: 'housing_savings_balance', headerName: 'Housing-Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header5', cellClassName: 'super-app-theme--header5cell' },

     { field: 'karamay_savings_debit', headerName: 'KS-Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header6', cellClassName: 'super-app-theme--header6cell' },
     { field: 'karamay_savings_credit', headerName: 'KS-Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header6', cellClassName: 'super-app-theme--header6cell' },
     { field: 'karamay_savings_balance', headerName: 'KS-Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header6', cellClassName: 'super-app-theme--header6cell' },

     { field: 'others_debit', headerName: 'O-Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header7', cellClassName: 'super-app-theme--header7cell' },
     { field: 'others_credit', headerName: 'O-Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header7', cellClassName: 'super-app-theme--header7cell' },
     { field: 'others_balance', headerName: 'O-Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right", headerClassName: 'super-app-theme--header7', cellClassName: 'super-app-theme--header7cell' },

     { field: 'reference_document', headerName: 'Reference Document', width: 200 },
     { field: 'remarks', headerName: 'Remarks', width: 800 },
];

function zeroValueFormatter(params) {
     const value = params.value;
     return value === 0 ? "" : value;
}








const Member = (props) => {

     const CustomCell = ({ value }) => (
          <div style={{ border: '1px solid #ccc', padding: '4px' }}>{value}</div>
     );




     /**POST REQUESTS */

     const { user } = useAuthContext()
     const currentUser = user.username;
     const [id, setId] = useState('')
     const [openError, setopen_error] = useState(false)
     const [error, setError] = useState(false)
     const [openSuccess, setOpenSuccess] = useState(false)

     const [query, setQuery] = useState('')
     const [members, setMembers] = useState([])
     const [individual, setindividual] = useState([])
     const [gridTrigger, setGridTrigger] = useState(false);


     const [selectedImage, setSelectedImage] = useState(null);

     const { signup, isLoading } = useSignup()

     const [password, setPassword] = useState('')
     const [member_id, setmember_id] = useState('')
     const [firstname, setfirstname] = useState('')
     const [middlename, setmiddlename] = useState('')
     const [lastname, setlastname] = useState('')
     const [contact_number, setcontact_number] = useState('')
     const [email, setemail] = useState('')
     const [membership_date, setmembership_date] = useState('')
     const [status, setstatus] = useState('active')
     const [hhhc_membership_number, sethhhc_membership_number] = useState('')
     const [bod_res, setbod_res] = useState('')
     const [coop_savings_account_number, setcoop_savings_account_number] = useState('')
     const [kaya_atm_card_number, setkaya_atm_card_number] = useState('')
     const [kaya_atm_savings_account_number, setkaya_atm_savings_account_number] = useState('')

     const [share_capital, setshare_capital] = useState('')
     const [coop_savings, setcoop_savings] = useState('')
     const [loan_balance, setloan_balance] = useState('')
     const [mbh, setmbh] = useState('')
     const [housing_equity, sethousing_equity] = useState('')
     const [kaya_savings, setkaya_savings] = useState('')
     const [atm_passbook_fee, setatm_passbook_fee] = useState('')
     const [pb_account_number, setpb_account_number] = useState('')
     const [pb_account_number_series, setpb_account_number_series] = useState('')
     const [passbook_series_number, setpassbook_series_number] = useState('')
     const [affiliation_org, setaffiliation_org] = useState('')
     const [passbook_printed, setpassbook_printed] = useState('')
     const [remarks, setremarks] = useState('')
     const [atm_status, setatm_status] = useState('')
     const [notes, setnotes] = useState('')
     const [tabvalue, settabvalue] = React.useState(user.username.substring(0, 5) !== "hhhc." ? '2' : '1')
     const [buttonReceiptDisabled, setbuttonReceiptDisabled] = useState(true)
     //new
     const [tin, settin] = useState('')
     const [coop_savings_passbook_number, setcoop_savings_passbook_number] = useState('')
     const [address, setaddress,] = useState('')
     const [dob, setdob] = useState('')
     const [age, setage,] = useState('')
     const [gender, setgender] = useState('')
     const [civil_status, setcivil_status] = useState('')
     const [highest_educational_attainment, sethighest_educational_attainment] = useState('')
     const [occupation, setoccupation] = useState('')
     const [religion, setreligion] = useState('')
     const [annual_income, setannual_income] = useState('')

     const [openAdd, setOpenAdd] = useState(false);
     const [openDelete, setOpenDelete] = useState(false);
     const [openUpdate, setOpenUpdate] = useState(false);
     const [searchcolumn, setsearchcolumn] = useState('member_id')

     const [membership_type, setmembership_type] = useState('')
     const [initial_share_capital, setinitial_share_capital] = useState('')
     const [initial_no_share, setinitial_no_share] = useState('')
     const [special_savings_account, setspecial_savings_account] = useState('')
     const [impukan_certificate_account, setimpukan_certificate_account] = useState('')
     const [number_of_dependent, setnumber_of_dependent] = useState('')
     const [pwd_type, setpwd_type] = useState('')
     const [termination_date, settermination_date] = useState('')
     const [termination_bod, settermination_bod] = useState('')





     const [savingsid, setsavingsid] = useState('')
     const [date, setdate] = useState('')
     const [particulars, setparticulars] = useState('')

     const [membership_fee, setmembership_fee] = useState(0)
     const [share_capital_debit, setshare_capital_debit] = useState(0)
     const [share_capital_credit, setshare_capital_credit] = useState(0)
     const [share_capital_balance, setshare_capital_balance] = useState(0)

     const [coop_savings_debit, setcoop_savings_debit] = useState(0)
     const [coop_savings_credit, setcoop_savings_credit] = useState(0)
     const [coop_savings_balance, setcoop_savings_balance] = useState(0)

     const [special_savings_debit, setspecial_savings_debit] = useState(0)
     const [special_savings_credit, setspecial_savings_credit] = useState(0)
     const [special_savings_balance, setspecial_savings_balance] = useState(0)


     const [kaya_savings_debit, setkaya_savings_debit] = useState(0)
     const [kaya_savings_credit, setkaya_savings_credit] = useState(0)
     const [kaya_savings_balance, setkaya_savings_balance] = useState(0)

     const [housing_savings_debit, sethousing_savings_debit] = useState(0)
     const [housing_savings_credit, sethousing_savings_credit] = useState(0)
     const [housing_savings_balance, sethousing_savings_balance] = useState(0)



     const [karamay_savings_debit, setkaramay_savings_debit] = useState(0)
     const [karamay_savings_credit, setkaramay_savings_credit] = useState(0)
     const [karamay_savings_balance, setkaramay_savings_balance] = useState(0)

     const [others_debit, setothers_debit] = useState(0)
     const [others_credit, setothers_credit] = useState(0)
     const [others_balance, setothers_balance] = useState(0)

     const [reference_document, setreference_document] = useState('')
     const [remarks2, setremarks2] = useState('')









     const [openAddSavings, setopenAddSavings] = useState(false);
     const [openUpdateSavings, setopenUpdateSavings] = useState(false);
     const [openDeleteSavings, setopenDeleteSavings] = useState(false);
     const [refresher, setRefresher] = useState(0)
     const [refresher2, setRefresher2] = useState(0)


     const [savings, setsavings] = useState([]);
     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })

     const [credit_part_membershipfee, setcredit_part_membershipfee] = useState(0);
     const [credit_part_captial, setcredit_part_captial] = useState(0);
     const [credit_part_savings, setcredit_part_savings] = useState(0);
     const [credit_part_loans, setcredit_part_loans] = useState(0);
     const [credit_part_kayasavings, setcredit_part_kayasavings] = useState(0);
     const [credit_part_housingeuity, setcredit_part_housingeuity] = useState(0);
     const [credit_part_others, setcredit_part_others] = useState(0);

     const [total_membershipfee, settotal_membershipfee] = useState(0);
     const [total_captial, settotal_captial] = useState(0);
     const [total_savings, settotal_savings] = useState(0);
     const [total_loans, settotal_loans] = useState(0);
     const [total_kayasavings, settotal_kayasavings] = useState(0);
     const [total_housingequity, settotal_housingequity] = useState(0);
     const [total_others, settotal_others] = useState(0);

     const handleSuccessToast = (success) => {
          toast.success(success);
     };
     const handleErrorToast = (error) => {
          toast.error(error);
     };

     const appRef = useRef(null);
     const captureScreenshot = () => {
          const element = appRef.current;
          html2canvas(element).then((canvas) => {
               canvas.toBlob((blob) => {
                    saveAs(blob, `savings_` + firstname + "_" + lastname);
               });
          });
     };



     /**useEffects */
     /**Masterlist */
     const [individual_firstname, setindividual_firstname] = useState('')
     const [individual_lastname, setindividual_lastname] = useState('')
     const [individual_tin, setindividual_tin] = useState('')
     const [individual_contact, setindividual_contact] = useState('')
     const [individual_currentadd, setindividual_currentadd] = useState('')
     // useEffect(() => {
     //      if (!user) return; // Ensure user is defined

     //      const fetchMembers = async () => {
     //           const response = await fetch('https://coop-back-zqr6.onrender.com/api/member/', {
     //                headers: {
     //                     'Authorization': `Bearer ${user.token}`
     //                }
     //           })
     //           const json = await response.json()
     //           if (response.ok) {

     //                if (user.username.substring(0, 5) !== "hhhc.") {
     //                     // Filter the JSON response to get the row where member_id === user.username
     //                     // const filteredMember = json.filter(member => member.member_id === user.username);


     //                     const filteredData = json.filter(item => {
     //                          const current = item.member_id
     //                          return current === user.username

     //                     });
     //                     setindividual(filteredData);
     //                     setindividual_firstname(filteredData.firstname)
     //                     setindividual_lastname(filteredData.lastname)
     //                     setindividual_tin(filteredData.tin)
     //                     setindividual_contact(filteredData.contact_number)
     //                     setindividual_currentadd(filteredData.address)


     //                     console.log(individual_firstname, "individual")
     //                } else {
     //                     // If user.username starts with "hhhc.", set the entire JSON response as members
     //                     setMembers(json);
     //                }
     //           }
     //      }
     //      if (user) {
     //           fetchMembers();
     //      }
     // }, [user, refresher])


     useEffect(() => {
          console.log(individual_firstname, "individual_firstname");
          console.log(individual_lastname, "individual_lastname");
          console.log(individual_tin, "individual_tin");
          console.log(individual_contact, "individual_contact");
          console.log(individual_currentadd, "individual_currentadd");
     }, [individual_firstname, individual_lastname, individual_tin, individual_contact, individual_currentadd]);

     useEffect(() => {
          if (!user) return; // Ensure user is defined

          const fetchMembers = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/member/', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               });
               const json = await response.json();
               if (response.ok) {
                    if (user.username.substring(0, 5) !== "hhhc.") {
                         const filteredData = json.filter(item => item.member_id === user.username);
                         if (filteredData.length > 0) {
                              const data = filteredData[0]; // Take the first item from the filtered array
                              setindividual(data);
                              setindividual_firstname(data.firstname);
                              setindividual_lastname(data.lastname);
                              setindividual_tin(data.tin);
                              setindividual_contact(data.contact_number);
                              setindividual_currentadd(data.address);
                         }
                    } else {
                         // If user.username starts with "hhhc.", set the entire JSON response as members
                         setMembers(json);
                    }
               }
          };

          fetchMembers();
     }, [user, refresher, individual_firstname, individual_lastname, individual_tin, individual_contact, individual_currentadd]);

     /**individual */
     useEffect(() => {
         
          const fetchSavings = async () => {
               let url;
               // if (user.username.substring(0, 5) !== "hhhc." ? '2' : '1') {
               if (user.username.substring(0, 5) !== "hhhc.") {
                    url = `https://coop-back-zqr6.onrender.com/api/savings/${user.username}`;
               } else {
                    url = `https://coop-back-zqr6.onrender.com/api/savings/${member_id}`;
               }

               const response = await fetch(url, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })

               // const response = await fetch('https://coop-back-zqr6.onrender.com/api/savings/' + member_id, {
               //      headers: {
               //           'Authorization': `Bearer ${user.token}`
               //      }
               // })

               const json = await response.json()
               if (response.ok) {
                    setsavings(json)
                    console.log("!!!!!!!!!!!!!!!!!!!!!", json)
                    const share_balance = json.reduce((acc, entry) => acc + entry.share_capital_credit, 0);
                    const share_less = json.reduce((acc, entry) => acc + entry.share_capital_debit, 0);
                    setshare_capital_balance(parseFloat(share_balance) - parseFloat(share_less))

                    const coop_balance = json.reduce((acc, entry) => acc + entry.coop_savings_credit, 0);
                    const coop_less = json.reduce((acc, entry) => acc + entry.coop_savings_debit, 0);
                    setcoop_savings_balance(parseFloat(coop_balance) - parseFloat(coop_less))

                    const special_balance = json.reduce((acc, entry) => acc + entry.special_savings_credit, 0);
                    const special_less = json.reduce((acc, entry) => acc + entry.special_savings_debit, 0);
                    setspecial_savings_balance(parseFloat(special_balance) - parseFloat(special_less))

                    const kaya_balance = json.reduce((acc, entry) => acc + entry.kaya_savings_credit, 0);
                    const kaya_less = json.reduce((acc, entry) => acc + entry.kaya_savings_debit, 0);
                    setkaya_savings_balance(parseFloat(kaya_balance) - parseFloat(kaya_less))


                    // const housing_balance = json.reduce((acc, entry) => acc + entry.housing_savings_credit, 0);
                    // const housing_less = json.reduce((acc, entry) => acc + entry.housing_savings_debit, 0);
                    // sethousing_savings_balance(parseFloat(housing_balance) - parseFloat(housing_less))

                    const housing_balance = json.reduce((acc, entry) => acc + (entry.housing_savings_credit || 0), 0);
                    const housing_less = json.reduce((acc, entry) => acc + (entry.housing_savings_debit || 0), 0);
                    const calculated_housing_savings_balance = parseFloat(housing_balance) - parseFloat(housing_less);

                    if (!isNaN(calculated_housing_savings_balance)) {
                         const final_housing_savings_balance = calculated_housing_savings_balance;
                         sethousing_savings_balance(final_housing_savings_balance);
                    } else {
                         // Handle case where housing savings data is missing
                         sethousing_savings_balance(0); // Or any other default value you prefer
                    }

                    const karamay_balance = json.reduce((acc, entry) => acc + entry.karamay_savings_credit, 0);
                    const karamay_less = json.reduce((acc, entry) => acc + entry.karamay_savings_debit, 0);
                    setkaramay_savings_balance(parseFloat(karamay_balance) - parseFloat(karamay_less))

                    const others_balance = json.reduce((acc, entry) => acc + entry.others_credit, 0);
                    const others_less = json.reduce((acc, entry) => acc + entry.others_debit, 0);
                    setothers_balance(parseFloat(others_balance) - parseFloat(others_less))

                  
               }
          }
          if (user) {
               fetchSavings();
          }
     }, [user, refresher])

     const [master_membership, setmaster_membership] = useState(0)
     const [master_share, setmaster_share] = useState(0)
     const [master_coop, setmaster_coop] = useState(0)
     const [master_special, setmaster_special] = useState(0)
     const [master_kaya, setmaster_kaya] = useState(0)
     const [master_housing, setmaster_housing] = useState(0)
     const [master_karamay, setmaster_karamay] = useState(0)
     const [master_others, setmaster_others] = useState(0)
     useEffect(() => {
          if (user && user.username.substring(0, 5) === "hhhc.") {
               const fetchSavings = async () => {
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/savings/', {
                         headers: {
                              'Authorization': `Bearer ${user.token}`
                         }
                    })
                    const json = await response.json()
                    if (response.ok) {

                         setsavings(json)

                         const membership = json.reduce((acc, entry) => acc + entry.membership_fee, 0);
                         setmaster_membership(parseFloat(membership))


                         const share_balance = json.reduce((acc, entry) => acc + entry.share_capital_credit, 0);
                         const share_less = json.reduce((acc, entry) => acc + entry.share_capital_debit, 0);
                         setmaster_share(parseFloat(share_balance) - parseFloat(share_less))

                         const coop_balance = json.reduce((acc, entry) => acc + entry.coop_savings_credit, 0);
                         const coop_less = json.reduce((acc, entry) => acc + entry.coop_savings_debit, 0);
                         setmaster_coop(parseFloat(coop_balance) - parseFloat(coop_less))

                         const special_balance = json.reduce((acc, entry) => acc + entry.special_savings_credit, 0);
                         const special_less = json.reduce((acc, entry) => acc + entry.special_savings_debit, 0);
                         setmaster_special(parseFloat(special_balance) - parseFloat(special_less))

                         const kaya_balance = json.reduce((acc, entry) => acc + entry.kaya_savings_credit, 0);
                         const kaya_less = json.reduce((acc, entry) => acc + entry.kaya_savings_debit, 0);
                         setmaster_kaya(parseFloat(kaya_balance) - parseFloat(kaya_less))

                         // const housing_balance = json.reduce((acc, entry) => acc + entry.housing_savings_credit, 0);
                         // const housing_less = json.reduce((acc, entry) => acc + entry.housing_savings_debit, 0);
                         // setmaster_housing(parseFloat(housing_balance) - parseFloat(housing_less))

                         const housing_balance = json.reduce((acc, entry) => acc + (entry.housing_savings_credit || 0), 0);
                         const housing_less = json.reduce((acc, entry) => acc + (entry.housing_savings_debit || 0), 0);
                         const calculated_housing_savings_balance = parseFloat(housing_balance) - parseFloat(housing_less);

                         if (!isNaN(calculated_housing_savings_balance)) {
                              const final_housing_savings_balance = calculated_housing_savings_balance;
                              setmaster_housing(final_housing_savings_balance);
                         } else {
                              // Handle case where housing savings data is missing
                              setmaster_housing(0); // Or any other default value you prefer
                         }


                         const karamay_balance = json.reduce((acc, entry) => acc + entry.karamay_savings_credit, 0);
                         const karamay_less = json.reduce((acc, entry) => acc + entry.karamay_savings_debit, 0);
                         setmaster_karamay(parseFloat(karamay_balance) - parseFloat(karamay_less))

                         const others_balance = json.reduce((acc, entry) => acc + entry.others_credit, 0);
                         const others_less = json.reduce((acc, entry) => acc + entry.others_debit, 0);
                         setmaster_others(parseFloat(others_balance) - parseFloat(others_less))

                    }
               }
               fetchSavings();
          }

     }, [user, refresher2])




     // useEffect(() => {

     //      let creditTotal_membershipfee = 0;
     //      let debitTotal_membershipfee = 0;

     //      let creditTotal_capital = 0;
     //      let debitTotal_capital = 0;

     //      let creditTotal_savings = 0;
     //      let debitTotal_savings = 0;

     //      let creditTotal_loans = 0;
     //      let debitTotal_loans = 0;

     //      let creditTotal_kaya = 0;
     //      let debitTotal_kaya = 0;

     //      let creditTotal_housingequity = 0;
     //      let debitTotal_housingequity = 0;

     //      let creditTotal_others = 0;
     //      let debitTotal_others = 0;

     //      savings.forEach(saving => {
     //           if (saving.particulars === "MEMBERSHIP FEE") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_membershipfee += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_membershipfee += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "CAPITAL") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_capital += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_capital += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "SAVINGS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_savings += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_savings += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "LOANS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_loans += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_loans += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "SPECIAL SAVINGS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_kaya += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_kaya += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "HOUSING EQUITY") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_housingequity += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_housingequity += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "OTHERS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_others += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_others += parseFloat(saving.amount)
     //                }
     //           }
     //      })

     //      let totalmembership = creditTotal_membershipfee - debitTotal_membershipfee

     //      setcredit_part_membershipfee(totalmembership)
     //      //setdebit_part_membershipfee(totalmembership)

     //      let totalcaptial = creditTotal_capital - debitTotal_capital
     //      setcredit_part_captial(totalcaptial)
     //      //setdebit_part_captial(debitTotal_capital)

     //      let totalsavings = creditTotal_savings - debitTotal_savings
     //      setcredit_part_savings(totalsavings)
     //      //setdebit_part_savings(debitTotal_savings)

     //      let totalkaya = creditTotal_kaya - debitTotal_kaya
     //      setcredit_part_kayasavings(totalkaya)
     //      //setdebit_part_kayasavings(debitTotal_kaya)

     //      let totalloans = debitTotal_loans - creditTotal_loans
     //      setcredit_part_loans(totalloans)
     //      //setdebit_part_loans(debitTotal_loans)

     //      let totalhousing = creditTotal_housingequity - debitTotal_housingequity
     //      setcredit_part_housingeuity(totalhousing)

     //      let totalothers = creditTotal_others - debitTotal_others
     //      setcredit_part_others(totalothers)
     //      //setdebit_part_others(debitTotal_others)

     // }, [member_id, savings])

     // useEffect(() => {

     //      let creditTotal_membershipfee = 0;
     //      let debitTotal_membershipfee = 0;

     //      let creditTotal_capital = 0;
     //      let debitTotal_capital = 0;

     //      let creditTotal_savings = 0;
     //      let debitTotal_savings = 0;

     //      let creditTotal_loans = 0;
     //      let debitTotal_loans = 0;

     //      let creditTotal_kaya = 0;
     //      let debitTotal_kaya = 0;

     //      let creditTotal_housingequity = 0;
     //      let debitTotal_housingequity = 0;

     //      let creditTotal_others = 0;
     //      let debitTotal_others = 0;

     //      savings.forEach(saving => {
     //           if (saving.particulars === "MEMBERSHIP FEE") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_membershipfee += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_membershipfee += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "CAPITAL") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_capital += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_capital += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "SAVINGS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_savings += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_savings += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "LOANS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_loans += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_loans += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "SPECIAL SAVINGS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_kaya += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_kaya += parseFloat(saving.amount)
     //                }
     //           }
     //           else if (saving.particulars === "HOUSING EQUITY") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_housingequity += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_housingequity += parseFloat(saving.amount)
     //                }
     //           }

     //           else if (saving.particulars === "OTHERS") {
     //                if (saving.type === "CREDIT") {
     //                     creditTotal_others += parseFloat(saving.amount)
     //                }
     //                else {
     //                     debitTotal_others += parseFloat(saving.amount)
     //                }
     //           }
     //      })

     //      let totalmembership = creditTotal_membershipfee - debitTotal_membershipfee

     //      settotal_membershipfee(totalmembership)
     //      //setdebit_part_membershipfee(totalmembership)

     //      let totalcaptial = creditTotal_capital - debitTotal_capital
     //      settotal_captial(totalcaptial)
     //      //setdebit_part_captial(debitTotal_capital)

     //      let totalsavings = creditTotal_savings - debitTotal_savings
     //      settotal_savings(totalsavings)
     //      //setdebit_part_savings(debitTotal_savings)

     //      let totalkaya = creditTotal_kaya - debitTotal_kaya
     //      settotal_kayasavings(totalkaya)
     //      //setdebit_part_kayasavings(debitTotal_kaya)

     //      let totalloans = debitTotal_loans - creditTotal_loans
     //      settotal_loans(totalloans)
     //      //setdebit_part_loans(debitTotal_loans)

     //      let totalhousing = creditTotal_housingequity - debitTotal_housingequity
     //      settotal_housingequity(totalhousing)

     //      let totalothers = creditTotal_others - debitTotal_others
     //      settotal_others(totalothers)
     //      //setdebit_part_others(debitTotal_others)

     // }, [savings, refresher])



     const handleClearSavings = () => {
          setdate('')
          setparticulars('')


          setmembership_fee(0)
          setshare_capital_debit(0)
          setshare_capital_credit(0)
          setshare_capital_balance(0)

          setcoop_savings_debit(0)
          setcoop_savings_credit(0)
          setcoop_savings_balance(0)


          setspecial_savings_debit(0)
          setspecial_savings_credit(0)
          setspecial_savings_balance(0)


          setkaya_savings_debit(0)
          setkaya_savings_credit(0)
          setkaya_savings_balance(0)

          sethousing_savings_debit(0)
          sethousing_savings_credit(0)
          sethousing_savings_balance(0)


          setkaramay_savings_debit(0)
          setkaramay_savings_credit(0)
          setkaramay_savings_balance(0)


          setothers_debit(0)
          setothers_credit(0)
          setothers_balance(0)










          setreference_document('')
          setremarks2('')
     }
     const handlelogger = () => {
          let totalshare_capital_balance = share_capital_balance + parseFloat(share_capital_credit) - parseFloat(share_capital_debit)

          handleSuccessToast(share_capital_balance)
          handleSuccessToast(share_capital_debit)
          handleSuccessToast(share_capital_credit)
          handleSuccessToast(totalshare_capital_balance)
          handleSuccessToast(totalshare_capital_balance)

     }
     const handleClearTextFields = () => {
          setfirstname("")
          setmiddlename("")
          setlastname("")
          setmembership_date("")
          setstatus("")
          sethhhc_membership_number("")
          setbod_res("")
          setcoop_savings_account_number("")
          setkaya_atm_card_number("")
          setkaya_atm_savings_account_number("")
          setmbh("")
          sethousing_equity("")
          setatm_passbook_fee("")
          setatm_status("")
          setpb_account_number("")
          setpb_account_number_series("")
          setpassbook_series_number("")
          setaffiliation_org("")
          setpassbook_printed("")
          setremarks("")
          setemail("")
          setcontact_number("")
          setnotes("")
          settin("")
          setcoop_savings_passbook_number("")
          setaddress("")
          setdob("")
          setage("")
          setgender("")
          setcivil_status("")
          sethighest_educational_attainment("")
          setoccupation("")
          setreligion("")
          setannual_income("")
     }
     const handleZeroOnBlur = () => {
          if (share_capital_debit === "") {
               setshare_capital_debit(0)
          }
          else if (share_capital_credit === "") {
               setshare_capital_credit(0)
          }
     }

     const convertDateToString = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setmembership_date(dateString)
          setdate(dateString)
     };
     const handleRandomId = () => {
          let num = Math.floor(Math.random() * 9000) + 10000;
          const value = "MBR" + num
          setmember_id(value)
     }
     const handleUpdateQuantity = () => {
          setGridTrigger(!gridTrigger)
     }
     const handleRefresher = () => {
          setRefresher(Math.random())
     };
     const handleRefresher2 = () => {
          setRefresher2(Math.random())
     };
     const handleAddButton = () => {
          handleClearTextFields()
          handleRandomId()
          setOpenAdd(true)
     }
     const handleUpdateButton = () => {

          setOpenUpdate(true)
     }
     const handleDeleteButton = () => {
          setOpenDelete(true)
     }
     const handleCancel = () => {

          setOpenAdd(false)
          setOpenUpdate(false)
          setOpenDelete(false)
          setopenAddSavings(false)
          setopenUpdateSavings(false)
          setopenDeleteSavings(false)
     }


     const handleLogger = () => {

          handleSuccessToast(coop_savings_balance)
     }

     const handleGoToSavings = () => {
          setbuttonReceiptDisabled(true)
          if (id === "") {
               setopen_error(true)
               setTimeout(() => {
                    setopen_error(false)
               }, 2000);
          }
          else {
               handleRefresher();
               settabvalue('2')
          }

     }
     const handleGoToDetails = () => {
          setbuttonReceiptDisabled(true)
          if (id === "") {
               setopen_error(true)
               setTimeout(() => {
                    setopen_error(false)
               }, 2000);
          }
          else {
               handleRefresher();
               settabvalue('3')
          }

     }

     const handleGoToMasterlist = () => {
          handleRefresher2();
          settabvalue('1')

     }

     const handleChange = (event, newValue) => {
          handleRefresher()
          settabvalue(newValue);
     };

     const handleAddSavingsButton = () => {
          handleClearSavings()
          setopenAddSavings(true)


     }
     const handleUpdateSavingsButton = () => {
          handleSuccessToast(coop_savings_credit)
          handleSuccessToast(coop_savings_debit)
          setopenUpdateSavings(true)
     }
     const handleDeleteSavingsButton = () => {
          const latestEntry = savings[savings.length - 1];

          if (savingsid !== latestEntry._id) {
               handleErrorToast("Previous data can't be deleted. Please add another particulars for adjustments")
               return;
          }
          else {
               setopenDeleteSavings(true)
          }

     }

     const handleOnError = () => {
          setopen_error(true);
     };

     const handleOffError = () => {
          setopen_error(false);
     };

     const handleOnSuccess = () => {
          setOpenSuccess(true);
     };

     const handleOffSuccess = () => {
          setOpenSuccess(false);
     };


     /**Handle datagrid row click */
     const handleRowClick = (params) => {

          setId(params.row._id);
          setmember_id(params.row.member_id);
          setfirstname(params.row.firstname);
          setmiddlename(params.row.middlename);
          setlastname(params.row.lastname);
          setmembership_date(params.row.membership_date);
          setstatus(params.row.status);
          sethhhc_membership_number(params.row.hhhc_membership_number);
          setbod_res(params.row.bod_res);
          setcoop_savings_account_number(params.row.coop_savings_account_number);
          setkaya_atm_card_number(params.row.kaya_atm_card_number);
          setkaya_atm_savings_account_number(params.row.kaya_atm_savings_account_number);
          // setmbh(params.row.mbh);
          sethousing_equity(params.row.housing_equity);
          // setatm_passbook_fee(params.row.atm_passbook_fee);
          // setatm_status(params.row.atm_status);
          // setpb_account_number(params.row.pb_account_number);
          // setpb_account_number_series(params.row.pb_account_number_series);
          setpassbook_series_number(params.row.passbook_series_number);
          setaffiliation_org(params.row.affiliation_org);
          setpassbook_printed(params.row.passbook_printed);
          setremarks(params.row.remarks);
          setnotes(params.row.notes);



          settin(params.row.tin);
          setcoop_savings_passbook_number(params.row.coop_savings_passbook_number);
          setaddress(params.row.address);
          setdob(params.row.dob);
          setage(params.row.age);
          setgender(params.row.gender);
          setcivil_status(params.row.civil_status);
          sethighest_educational_attainment(params.row.highest_educational_attainment);
          setoccupation(params.row.occupation);
          setreligion(params.row.religion);
          setannual_income(params.row.annual_income);


          setmembership_type(params.row.membership_type);
          setinitial_share_capital(params.row.initial_share_capital);
          setinitial_no_share(params.row.initial_no_share);
          setspecial_savings_account(params.row.special_savings_account);
          setimpukan_certificate_account(params.row.impukan_certificate_account);
          setnumber_of_dependent(params.row.number_of_dependent);
          setpwd_type(params.row.annual_income);
          settermination_date(params.row.termination_date);
          settermination_bod(params.row.termination_bod);
          setemail(params.row.email);
          setcontact_number(params.row.contact_number);


     };


     const handleSavingsRowClick = (params) => {
          setbuttonReceiptDisabled(false)
          setmember_id(params.row.member_id)
          setsavingsid(params.row._id);
          setdate(params.row.date);
          setparticulars(params.row.particulars);
          setmembership_fee(params.row.membership_fee)
          setshare_capital_debit(params.row.share_capital_debit)
          setshare_capital_credit(params.row.share_capital_credit)

          setcoop_savings_debit(params.row.coop_savings_debit)
          setcoop_savings_credit(params.row.coop_savings_credit)


          setspecial_savings_debit(params.row.special_savings_debit)
          setspecial_savings_credit(params.row.special_savings_credit)



          setkaya_savings_debit(params.row.kaya_savings_debit)
          setkaya_savings_credit(params.row.kaya_savings_credit)

          sethousing_savings_debit(params.row.housing_savings_debit)
          sethousing_savings_credit(params.row.housing_savings_credit)


          setkaramay_savings_debit(params.row.karamay_savings_debit)
          setkaramay_savings_credit(params.row.karamay_savings_credit)



          setothers_debit(params.row.others_debit)
          setothers_credit(params.row.others_credit)
          setothers_balance(params.row.others_balance)


          setreference_document(params.row.reference_document);
          setremarks2(params.row.remarks);


     }


     const handleAddMember = async (e) => {
          e.preventDefault()

          const member = {
               member_id: member_id,
               lastname: lastname,
               firstname: firstname,
               middlename: middlename,
               tin: tin,
               membership_date: membership_date,
               membership_type: membership_type,
               hhhc_membership_number: hhhc_membership_number,
               bod_res: bod_res,
               initial_share_capital: initial_share_capital,
               initial_no_share: initial_no_share,
               passbook_series_number: passbook_series_number,
               coop_savings_account_number: coop_savings_account_number,
               housing_equity: housing_equity,
               special_savings_account: special_savings_account,
               impukan_certificate_account: impukan_certificate_account,
               kaya_atm_savings_account_number: kaya_atm_savings_account_number,
               address: address,
               email: email,
               contact_number: contact_number,
               dob: dob,
               age: age,
               gender: gender,
               civil_status: civil_status,
               highest_educational_attainment: highest_educational_attainment,
               occupation: occupation,
               number_of_dependent: number_of_dependent,
               religion: religion,
               annual_income: annual_income,
               pwd_type: pwd_type,
               termination_date: termination_date,
               termination_bod: termination_bod,
               remarks: remarks,
               notes: notes,
               status: status,
               coop_savings_passbook_number: coop_savings_passbook_number,
               kaya_atm_card_number: kaya_atm_card_number,
               affiliation_org: affiliation_org,
               passbook_printed: passbook_printed,
          }

          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               firstname === "" ||
               lastname === ""

          ) {
               handleErrorToast('Fill up the required fields completely ')
          }

          else {
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
               else {
                    await signup(member_id, member_id)
                    setfirstname("")
                    setmiddlename("")
                    setlastname("")
                    setmembership_date("")
                    setstatus("")
                    sethhhc_membership_number("")
                    setbod_res("")
                    setcoop_savings_account_number("")
                    setkaya_atm_card_number("")
                    setkaya_atm_savings_account_number("")
                    setmbh("")
                    setatm_passbook_fee("")
                    setatm_status("")
                    setpb_account_number("")
                    setpb_account_number_series("")
                    setpassbook_series_number("")
                    setaffiliation_org("")
                    setpassbook_printed("")
                    setremarks("")
                    setnotes("")
                    setemail("")
                    setcontact_number("")
                    setPassword("")
                    settin("")
                    setcoop_savings_passbook_number("")
                    setaddress("")
                    setdob("")
                    setage("")
                    setgender("")
                    setcivil_status("")
                    sethighest_educational_attainment("")
                    setoccupation("")
                    setreligion("")
                    setannual_income("")
                    handleSuccessToast('Member Added Successfully')
                    setOpenAdd(false)



                    setmembership_type("")
                    setinitial_share_capital("")
                    setinitial_no_share("")
                    setspecial_savings_account("")
                    setimpukan_certificate_account("")
                    setnumber_of_dependent("")
                    setpwd_type("")
                    settermination_date("")
                    settermination_bod("")
                    handleRefresher()

               }
          }
     }


     const handlePatch = async (e) => {
          e.preventDefault()
          const member = {
               member_id: member_id,
               lastname: lastname,
               firstname: firstname,
               middlename: middlename,
               tin: tin,
               membership_date: membership_date,
               membership_type: membership_type,
               hhhc_membership_number: hhhc_membership_number,
               bod_res: bod_res,
               initial_share_capital: initial_share_capital,
               initial_no_share: initial_no_share,
               passbook_series_number: passbook_series_number,
               coop_savings_account_number: coop_savings_account_number,
               housing_equity: housing_equity,
               special_savings_account: special_savings_account,
               impukan_certificate_account: impukan_certificate_account,
               kaya_atm_savings_account_number: kaya_atm_savings_account_number,
               address: address,
               email: email,
               contact_number: contact_number,
               dob: dob,
               age: age,
               gender: gender,
               civil_status: civil_status,
               highest_educational_attainment: highest_educational_attainment,
               occupation: occupation,
               number_of_dependent: number_of_dependent,
               religion: religion,
               annual_income: annual_income,
               pwd_type: pwd_type,
               termination_date: termination_date,
               termination_bod: termination_bod,
               remarks: remarks,
               notes: notes,
               status: status,
               coop_savings_passbook_number: coop_savings_passbook_number,
               kaya_atm_card_number: kaya_atm_card_number,
               affiliation_org: affiliation_org,
               passbook_printed: passbook_printed,
          }
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               firstname === "" ||
               lastname === ""

          ) {
               handleErrorToast('Fill up the required fields completely ')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/member/' + id, {
                    method: 'PATCH',
                    body: JSON.stringify(member),
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
                    setfirstname("")
                    setmiddlename("")
                    setlastname("")
                    setmembership_date("")
                    setstatus("")
                    sethhhc_membership_number("")
                    setbod_res("")
                    setcoop_savings_account_number("")
                    setkaya_atm_card_number("")
                    setkaya_atm_savings_account_number("")
                    setmbh("")
                    setatm_passbook_fee("")
                    setatm_status("")
                    setpb_account_number("")
                    setpb_account_number_series("")
                    setpassbook_series_number("")
                    setaffiliation_org("")
                    setpassbook_printed("")
                    setremarks("")
                    setnotes("")
                    setemail("")
                    setcontact_number("")
                    settin("")
                    setcoop_savings_passbook_number("")
                    setaddress("")
                    setdob("")
                    setage("")
                    setgender("")
                    setcivil_status("")
                    sethighest_educational_attainment("")
                    setoccupation("")
                    setreligion("")
                    setannual_income("")

                    handleSuccessToast('Updated Successfully')
                    setOpenUpdate(false)


                    setmembership_type("")
                    setinitial_share_capital("")
                    setinitial_no_share("")
                    setspecial_savings_account("")
                    setimpukan_certificate_account("")
                    setnumber_of_dependent("")
                    setpwd_type("")
                    settermination_date("")
                    settermination_bod("")


                    handleRefresher()
               }
          }
     }
     const handleDelete = async (e) => {

          if (!user) {
               console.log('You must be logged in first')
               return
          } else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/member/' + id, {
                    method: 'DELETE',
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    handleSuccessToast('Deleted Successfully')

                    handleRefresher()
                    handleCancel();

               }
          }
     }


     const handleAddSavings = async (e) => {
          e.preventDefault()
          //total balance(already calculated) 
          const totalshare_capital_balance = share_capital_balance + parseFloat(share_capital_credit) - parseFloat(share_capital_debit)
          const totalcoop_savings_balance = coop_savings_balance + parseFloat(coop_savings_credit) - parseFloat(coop_savings_debit)
          const totalspecial_savings_balance = special_savings_balance + parseFloat(special_savings_credit) - parseFloat(special_savings_debit)
          const totalkaya_savings_balance = kaya_savings_balance + parseFloat(kaya_savings_credit) - parseFloat(kaya_savings_debit)

          const totalhousing_savings_balance = housing_savings_balance + parseFloat(housing_savings_credit) - parseFloat(housing_savings_debit)

          const totalkaramay_savings_debit = karamay_savings_balance + parseFloat(karamay_savings_credit) - parseFloat(karamay_savings_debit)
          const totalothers_debit = others_balance + parseFloat(others_credit) - parseFloat(others_debit)

          const savings = {
               member_id: member_id,
               date: date,
               particulars: particulars,
               membership_fee: membership_fee,
               share_capital_debit: share_capital_debit,
               share_capital_credit: share_capital_credit,
               share_capital_balance: share_capital_debit === 0 && share_capital_credit === 0 ? 0 : totalshare_capital_balance,

               coop_savings_debit: coop_savings_debit,
               coop_savings_credit: coop_savings_credit,
               coop_savings_balance: coop_savings_credit === 0 && coop_savings_debit === 0 ? 0 : totalcoop_savings_balance,

               special_savings_debit: special_savings_debit,
               special_savings_credit: special_savings_credit,
               special_savings_balance: special_savings_credit === 0 && special_savings_debit === 0 ? 0 : totalspecial_savings_balance,

               kaya_savings_debit: kaya_savings_debit,
               kaya_savings_credit: kaya_savings_credit,
               kaya_savings_balance: kaya_savings_credit === 0 && kaya_savings_debit === 0 ? 0 : totalkaya_savings_balance,

               housing_savings_debit: housing_savings_debit,
               housing_savings_credit: housing_savings_credit,
               housing_savings_balance: housing_savings_credit === 0 && housing_savings_debit === 0 ? 0 : totalhousing_savings_balance,


               karamay_savings_debit: karamay_savings_debit,
               karamay_savings_credit: karamay_savings_credit,
               karamay_savings_balance: karamay_savings_credit === 0 && karamay_savings_debit === 0 ? 0 : totalkaramay_savings_debit,

               others_debit: others_debit,
               others_credit: others_credit,
               others_balance: others_credit === 0 && others_debit === 0 ? 0 : totalothers_debit,


               reference_document: reference_document,
               remarks: remarks2,

          }
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               date === "" ||
               particulars === ""

          ) {
               handleErrorToast('Fill up the required fields completely ')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/savings/', {
                    method: 'POST',
                    body: JSON.stringify(savings),
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
                    handleClearSavings()
                    handleSuccessToast('Added Successfully')
                    setopenAddSavings(false)
                    handleRefresher()
               }
          }
     }


     const handleDeleteSavings = async (e) => {

          if (!user) {
               console.log('You must be logged in first')
               return
          } else {



               const response = await fetch('https://coop-back-zqr6.onrender.com/api/savings/' + savingsid, {
                    method: 'DELETE',
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    handleSuccessToast('Deleted Successfully')


                    handleRefresher()
                    handleCancel();

               }
          }
     }
     const handleUpdateSavings = async (e) => {
          e.preventDefault()

          const totalcoop_savings_balance = parseFloat(coop_savings_credit) + parseFloat(-coop_savings_debit)


          const savings = {
               member_id: member_id,
               date: date,
               particulars: particulars,
               membership_fee: membership_fee,
               share_capital_debit: share_capital_debit,
               share_capital_credit: share_capital_credit,
               share_capital_balance: share_capital_balance + share_capital_credit - share_capital_debit,

               coop_savings_debit: coop_savings_debit,
               coop_savings_credit: coop_savings_credit,
               coop_savings_balance: coop_savings_balance,

               special_savings_debit: special_savings_debit,
               special_savings_credit: special_savings_credit,
               special_savings_balance: special_savings_balance,

               kaya_savings_debit: kaya_savings_debit,
               kaya_savings_credit: kaya_savings_credit,
               kaya_savings_balance: kaya_savings_balance,


               housing_savings_debit: housing_savings_debit,
               housing_savings_credit: housing_savings_credit,
               housing_savings_balance: housing_savings_balance,


               karamay_savings_debit: karamay_savings_debit,
               karamay_savings_credit: karamay_savings_credit,
               karamay_savings_balance: karamay_savings_balance,

               others_debit: others_debit,
               others_credit: others_credit,
               others_balance: others_balance,




               reference_document: reference_document,
               remarks: remarks2,

          }
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               date === "" ||
               particulars === ""

          ) {
               handleErrorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/savings/' + savingsid, {
                    method: 'PATCH',
                    body: JSON.stringify(savings),
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
                    handleClearSavings();

                    handleSuccessToast('Updated Successfully')

                    setopenUpdateSavings(false)
                    handleRefresher()

               }
          }
     }


     // <MenuItem value={'MEMBERSHIP FEE'}>Membership Fee</MenuItem>
     // <MenuItem value={'SHARE CAPITAL'}>Share Capital</MenuItem>
     // <MenuItem value={'COOP SAVINGS'}>Coop Savings</MenuItem>
     // <MenuItem value={'SPECIAL SAVINGS'}>Special Savings</MenuItem>
     // <MenuItem value={'KAYA SAVINGS'}>KAYA Savings</MenuItem>
     // <MenuItem value={'KARAMAY SAVINGS'}>Karamay Savings</MenuItem>
     // <MenuItem value={'OTHERS'}>Others</MenuItem>

     const handleParticulars = (e) => {
          setparticulars(e.target.value)
          handleRefresher();
          if (particulars === "SHARE CAPITAL") {
               //setshare_capital_balance(0)
               setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
               sethousing_savings_balance(0)

          }
          else if (particulars === "COOP SAVINGS") {
               setshare_capital_balance(0)
               //setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
               sethousing_savings_balance(0)
          }
          else if (particulars === "SPECIAL SAVINGS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               //setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               sethousing_savings_balance(0)
               setothers_balance(0)
          }
          else if (particulars === "KAYA SAVINGS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               sethousing_savings_balance(0)
               //setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
          }
          else if (particulars === "KARAMAY SAVINGS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               sethousing_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               //setkaramay_savings_balance(0)
               setothers_balance(0)
          }
          else if (particulars === "OTHERS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               sethousing_savings_balance(0)
               //setothers_balance(0)
          }
          else if (particulars === "HOUSING SAVINGS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               //sethousing_savings_balance(0)
               setothers_balance(0)
          }
          else {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
               sethousing_savings_balance(0)
          }

     }

     const [membershiptotal, setmembershiptotal] = useState(0);

     //WORKING TABLE
     const downloadAsPDF = () => {
          const customWidth = 200; // Specify your custom width here
          const pdf = new jsPDF({
               orientation: 'landscape',
               format: [customWidth, 600], // Adjust the dimensions as needed
          });
          pdf.text(`Name: ${firstname + " " + lastname}`, 10, 10);
          pdf.autoTable({
               head: [savings_columns.map((column) => column.headerName)],
               body: savings.map((row) => savings_columns.map((column) => row[column.field])),
          });

          pdf.save('savings_data.pdf');
     };





     const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
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
                                                       {user.username.substring(0, 5) === "hhhc." && (
                                                            <Tab label="Masterlist" value="1" />
                                                       )}
                                                       {user.username.substring(0, 5) === "hhhc." && (
                                                            <Tab label="Savings" value="2" onClick={handleGoToSavings} disabled />
                                                       )}
                                                       {user.username.substring(0, 5) === "hhhc." && (
                                                            <Tab label="Details" value="3" onClick={handleGoToDetails} disabled />
                                                       )}
                                                       {/*                                                        
                                                       <Tab label="Masterlist" value="1"  />
                                                       <Tab label="Savings" value="2" onClick={handleGoToSavings} disabled />
                                                       <Tab label="Details" value="3" onClick={handleGoToDetails} disabled /> */}

                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
                                                  {user.username.substring(0, 5) === "hhhc." && (
                                                       <>
                                                            {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Success</Alert> : ""}
                                                            <div>
                                                                 <Cards style={{ backgroundColor: "#e6881d", color: "white", width: "100%", marginBottom: "50px", height: "450px" }}>
                                                                      <div style={{ paddingRight: "200px", display: "flex", flexDirection: "column" }}>
                                                                           <div style={{ marginBottom: "20px", fontSize: "30px" }}>
                                                                                SAVINGS SUMMARY REPORT
                                                                           </div>
                                                                           <ThemeProvider theme={theme}>
                                                                                <Button style={{ width: "100%", padding: "10px" }} variant="contained" color="orange">
                                                                                     <PDFDownloadLink fileName="savings_summary" document={
                                                                                          < SavingsPrinter
                                                                                               total_membershipfee={master_membership}
                                                                                               total_share={master_share}
                                                                                               total_coop={master_coop}
                                                                                               total_special={master_special}
                                                                                               total_kaya={master_kaya}
                                                                                               total_housingequity={total_housingequity}
                                                                                               total_karamay={master_karamay}
                                                                                               total_others={master_others}
                                                                                          />} >
                                                                                          {({ loading }) => (loading ? 'Loading document...' : 'Download Savings Summary')}
                                                                                     </PDFDownloadLink>
                                                                                </Button>

                                                                           </ThemeProvider>
                                                                      </div>
                                                                      <div style={{ paddingRight: "200px" }}>
                                                                           <div style={{ marginBottom: "20px" }}>
                                                                                <p style={{ fontSize: "40px", margin: 0 }}>P{master_share && master_share.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</p>
                                                                                <p style={{ color: "#e0e0e0" }}>Share Capital</p>
                                                                           </div>
                                                                           <div style={{ marginBottom: "20px" }}>
                                                                                <p style={{ fontSize: "40px", margin: 0 }}>P{master_coop && master_coop.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</p>
                                                                                <p style={{ color: "#e0e0e0" }}>Coop Savings</p>
                                                                           </div>
                                                                           <div>
                                                                                <p style={{ fontSize: "40px", margin: 0 }}>P{master_special && master_special.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</p>
                                                                                <p style={{ color: "#e0e0e0" }}>Special Savings</p>
                                                                           </div>
                                                                           <div style={{ marginBottom: "20px" }}>
                                                                                <p style={{ fontSize: "40px", margin: 0 }}>P{master_kaya && master_kaya.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</p>
                                                                                <p style={{ color: "#e0e0e0" }}>Kaya Savings</p>
                                                                           </div>
                                                                      </div>
                                                                      <div>
                                                                           <div style={{ marginBottom: "20px" }}>
                                                                                <p style={{ fontSize: "40px", margin: 0 }}>P{master_karamay && master_karamay.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</p>
                                                                                <p style={{ color: "#e0e0e0" }}>Karamay Savings</p>
                                                                           </div>
                                                                           <div style={{ marginBottom: "20px" }}>
                                                                                <p style={{ fontSize: "40px", margin: 0 }}>P{master_housing && master_housing.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</p>
                                                                                <p style={{ color: "#e0e0e0" }}>Housing Equity Savings</p>
                                                                           </div>
                                                                           <div>
                                                                                <p style={{ fontSize: "40px", margin: 0 }}>P{master_others && master_others.toLocaleString(undefined, {
                                                                                     minimumFractionDigits: 2,
                                                                                     maximumFractionDigits: 2
                                                                                })}</p>
                                                                                <p style={{ color: "#e0e0e0" }}>OTHERS</p>
                                                                           </div>


                                                                      </div>
                                                                 </Cards>
                                                            </div>

                                                            <SearchContainer>
                                                                 <TextField
                                                                      required
                                                                      id="search"
                                                                      label="Search a member"
                                                                      fullWidth
                                                                      style={{ marginRight: "10px" }}
                                                                      onChange={(e) => {
                                                                           setQuery(e.target.value);
                                                                           console.log('query:', e.target.value); // add this line
                                                                      }}

                                                                      value={query}
                                                                 />
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Search category"
                                                                      fullWidth
                                                                      select

                                                                      onChange={(e) => setsearchcolumn(e.target.value)}
                                                                      value={searchcolumn}
                                                                 >
                                                                      <MenuItem value={'member_id'}>Member ID</MenuItem>
                                                                      <MenuItem value={'firstname'}>Firstname</MenuItem>
                                                                      <MenuItem value={'middlename'}>Middlename</MenuItem>
                                                                      <MenuItem value={'lastname'}>Lastname</MenuItem>

                                                                 </TextField>

                                                            </SearchContainer>
                                                            <div style={{ height: 500, width: '100%' }} >

                                                                 <DataGrid
                                                                      getRowId={(row) => row._id}
                                                                      rows={members}
                                                                      columns={columns}
                                                                      pageSize={7}
                                                                      rowsPerPageOptions={[5]}
                                                                      onRowClick={handleRowClick}
                                                                      filterModel={{
                                                                           items: [
                                                                                {
                                                                                     columnField: searchcolumn,
                                                                                     operatorValue: 'contains',
                                                                                     value: query,
                                                                                },
                                                                           ],
                                                                      }}
                                                                 />
                                                            </div>


                                                            {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please select a member first</Alert> : ""}
                                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                 <div style={{ display: "flex", marginTop: "20px" }}>
                                                                      <ThemeProvider theme={theme}>
                                                                           <Button style={{ width: "100%", padding: "10px", marginRight: "5px" }} variant="contained" color="blue" onClick={handleGoToSavings}>
                                                                                View Savings
                                                                           </Button>
                                                                           <Button style={{ width: "100%", padding: "10px", marginRight: "5px" }} variant="contained" color="green" onClick={handleGoToDetails}>
                                                                                View Personal Details
                                                                           </Button>
                                                                           <Button style={{ width: "100%", padding: "10px" }} variant="contained" color="orange">
                                                                                <PDFDownloadLink fileName="all_products" document={< SavingsMasterlistPrinter data={members} />} >
                                                                                     {({ loading }) => (loading ? 'Loading document...' : 'Download Masterlist Summary (legal size)')}
                                                                                </PDFDownloadLink>
                                                                                {/* <PDFDownloadLink fileName="employee_profile" document={
                                                                           < SavingsMasterlistPrinter
                                                                                member_id={member_id}
                                                                                firstname={firstname}
                                                                                middlename={middlename}
                                                                                lastname={lastname}
                                                                                membership_date={membership_date}
                                                                                status={status}
                                                                                hhhc_membership_number={hhhc_membership_number}
                                                                                bod_res={bod_res}
                                                                                coop_savings_account_number={coop_savings_account_number}
                                                                                kaya_atm_card_number={kaya_atm_card_number}
                                                                                kaya_atm_savings_account_number={kaya_atm_savings_account_number}
                                                                                passbook_series_number={passbook_series_number}
                                                                                affiliation_org={affiliation_org}
                                                                                passbook_printed={passbook_printed}
                                                                                remarks={remarks}
                                                                                notes={notes}
                                                                           />} >
                                                                           {({ loading }) => (loading ? 'Loading document...' : 'Download Masterlist Summary')}
                                                                      </PDFDownloadLink> */}
                                                                           </Button>

                                                                      </ThemeProvider>
                                                                 </div>
                                                                 <div style={{ display: "flex", marginTop: "20px" }}>
                                                                      <ThemeProvider theme={theme}>

                                                                           <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="contained" color="blue" onClick={handleAddButton}>
                                                                                New
                                                                           </Button>
                                                                           <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="contained" color="green" onClick={handleUpdateButton}>
                                                                                Update
                                                                           </Button>
                                                                           <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="contained" color="red" onClick={handleDeleteButton}>
                                                                                Delete
                                                                           </Button>
                                                                      </ThemeProvider>
                                                                 </div>
                                                            </div>









































                                                            {/**DIALOGS */}
                                                            <Dialog
                                                                 fullScreen={fullscreen}
                                                                 open={openAdd}
                                                                 onClose={handleCancel}
                                                                 aria-labelledby="alert-dialog-title"
                                                                 aria-describedby="alert-dialog-description"
                                                            >
                                                                 <DialogTitle id="alert-dialog-title">
                                                                      Adding New Member
                                                                 </DialogTitle>
                                                                 <DialogContent style={{ height: '800px', paddingTop: '20px' }}>
                                                                      {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                                      {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                                      <div style={{ marginBottom: '50px' }}>
                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Auto Generated Member ID"
                                                                                style={{ marginBottom: "10px" }}
                                                                                fullWidth
                                                                                value={member_id}
                                                                           />
                                                                           <TextField
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Lastname"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setlastname(e.target.value)}
                                                                                value={lastname}
                                                                           />
                                                                           <TextField
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Firstname"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setfirstname(e.target.value)}
                                                                                value={firstname}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Middlename"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setmiddlename(e.target.value)}
                                                                                value={middlename}
                                                                           />

                                                                           <TextField

                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="TIN"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => settin(e.target.value)}
                                                                                value={tin}
                                                                           />
                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Membership Date"
                                                                                     value={membership_date}
                                                                                     inputFormat="MM-DD-YYYY"
                                                                                     onChange={convertDateToString}
                                                                                     renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "10px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Type / Kind of Membership"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setmembership_type(e.target.value)}
                                                                                value={membership_type}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="HHHC Membership Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => sethhhc_membership_number(e.target.value)}
                                                                                value={hhhc_membership_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="BOD Resolution No"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setbod_res(e.target.value)}
                                                                                value={bod_res}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Initial Share Capital"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setinitial_share_capital(e.target.value)}
                                                                                value={initial_share_capital}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Initial No. of Shares"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setinitial_no_share(e.target.value)}
                                                                                value={initial_no_share}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Passbook Account Series Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setpassbook_series_number(e.target.value)}
                                                                                value={passbook_series_number}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Savings Account Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcoop_savings_account_number(e.target.value)}
                                                                                value={coop_savings_account_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Housing Equity Account No."
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => sethousing_equity(e.target.value)}
                                                                                value={housing_equity}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Special Savings Account Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setspecial_savings_account(e.target.value)}
                                                                                value={special_savings_account}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Impukan Certificate Account No."
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setimpukan_certificate_account(e.target.value)}
                                                                                value={impukan_certificate_account}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Kaya Savings Account Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setkaya_atm_savings_account_number(e.target.value)}
                                                                                value={kaya_atm_savings_account_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Current Address"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setaddress(e.target.value)}
                                                                                value={address}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Email Address"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setemail(e.target.value)}
                                                                                value={email}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Contact Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcontact_number(e.target.value)}
                                                                                value={contact_number}
                                                                           />
                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Date of Birth"
                                                                                     value={dob}
                                                                                     onChange={(newValue) => { setdob(newValue) }}
                                                                                     renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Age"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setage(e.target.value)}
                                                                                value={age}
                                                                           />
                                                                           <TextField
                                                                                id="outlined-required"
                                                                                label="Sex"
                                                                                select
                                                                                style={{ paddingBottom: "20px" }}
                                                                                fullWidth
                                                                                onChange={(e) => setgender(e.target.value)}
                                                                                value={gender}
                                                                           >
                                                                                <MenuItem value={"Male"}>Male</MenuItem>
                                                                                <MenuItem value={"Female"}>Female</MenuItem>
                                                                           </TextField>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Civil Status"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcivil_status(e.target.value)}
                                                                                value={civil_status}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Highest Educational Att."
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => sethighest_educational_attainment(e.target.value)}
                                                                                value={highest_educational_attainment}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Occupation / Income Source"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setoccupation(e.target.value)}
                                                                                value={occupation}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Number of Dependent"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setnumber_of_dependent(e.target.value)}
                                                                                value={number_of_dependent}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Religion/Social Affiliation"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setreligion(e.target.value)}
                                                                                value={religion}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Annual Income"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setannual_income(e.target.value)}
                                                                                value={annual_income}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="PWD Type(DISABILITY TYPE/ADVOCATE)"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setpwd_type(e.target.value)}
                                                                                value={pwd_type}
                                                                           />


                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Termination of Membership Date"
                                                                                     value={termination_date}
                                                                                     inputFormat="MM-DD-YYYY"
                                                                                     onChange={(newValue) => { settermination_date(newValue) }}
                                                                                     renderInput={(params) => <TextField fullWidth style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>

                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Termination BOD Resolution No"
                                                                                     value={termination_bod}
                                                                                     inputFormat="MM-DD-YYYY"
                                                                                     onChange={(newValue) => { settermination_bod(newValue) }}
                                                                                     renderInput={(params) => <TextField fullWidth style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>



                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Remarks"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setremarks(e.target.value)}
                                                                                value={remarks}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Notes"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setnotes(e.target.value)}
                                                                                value={notes}
                                                                           />
                                                                           <TextField
                                                                                id="outlined-required"
                                                                                label="Status"
                                                                                fullWidth
                                                                                select
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setstatus(e.target.value)}
                                                                                value={status}
                                                                           >
                                                                                <MenuItem value={'active'}>Active</MenuItem>
                                                                                <MenuItem value={'inactive'}>Inactive</MenuItem>
                                                                           </TextField>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="COOP Savings Passbook Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcoop_savings_passbook_number(e.target.value)}
                                                                                value={coop_savings_passbook_number}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Special Savings Passbook Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setkaya_atm_card_number(e.target.value)}
                                                                                value={kaya_atm_card_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Affiliation Org"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setaffiliation_org(e.target.value)}
                                                                                value={affiliation_org}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Passbook Printed"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setpassbook_printed(e.target.value)}
                                                                                value={passbook_printed}
                                                                           />
                                                                      </div>
                                                                      {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                                      {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                                 </DialogContent>
                                                                 <DialogActions>
                                                                      <ThemeProvider theme={theme}>
                                                                           <Button variant="outlined" color="blue" onClick={handleAddMember}>Add</Button>
                                                                           <Button variant="outlined" color="green" onClick={handleClearTextFields} autoFocus>Clear</Button>
                                                                           <Button variant="outlined" color="red" onClick={handleCancel} autoFocus>Cancel</Button>
                                                                      </ThemeProvider>
                                                                 </DialogActions>
                                                            </Dialog>

                                                            <Dialog
                                                                 fullScreen={fullscreen}
                                                                 open={openUpdate}
                                                                 onClose={handleCancel}
                                                                 aria-labelledby="alert-dialog-title"
                                                                 aria-describedby="alert-dialog-description"
                                                            >
                                                                 <DialogTitle id="alert-dialog-title">
                                                                      Update Member Data
                                                                 </DialogTitle>
                                                                 <DialogContent style={{ height: '800px', paddingTop: '20px' }}>
                                                                      {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                                      {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                                      <div style={{ marginBottom: '50px' }}>
                                                                           <TextField
                                                                                required
                                                                                id="outlined-required"
                                                                                label="Auto Generated Member ID"
                                                                                style={{ marginBottom: "10px" }}
                                                                                fullWidth
                                                                                value={member_id}
                                                                           />
                                                                           <TextField
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Lastname"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setlastname(e.target.value)}
                                                                                value={lastname}
                                                                           />
                                                                           <TextField
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Firstname"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setfirstname(e.target.value)}
                                                                                value={firstname}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Middlename"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setmiddlename(e.target.value)}
                                                                                value={middlename}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="TIN"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => settin(e.target.value)}
                                                                                value={tin}
                                                                           />
                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Membership Date"
                                                                                     value={membership_date}
                                                                                     inputFormat="MM-DD-YYYY"
                                                                                     onChange={convertDateToString}
                                                                                     renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "10px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Type / Kind of Membership"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setmembership_type(e.target.value)}
                                                                                value={membership_type}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="HHHC Membership Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => sethhhc_membership_number(e.target.value)}
                                                                                value={hhhc_membership_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="BOD Resolution No"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setbod_res(e.target.value)}
                                                                                value={bod_res}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Initial Share Capital"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setinitial_share_capital(e.target.value)}
                                                                                value={initial_share_capital}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Initial No. of Shares"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setinitial_no_share(e.target.value)}
                                                                                value={initial_no_share}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Passbook Account Series Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setpassbook_series_number(e.target.value)}
                                                                                value={passbook_series_number}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Savings Account Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcoop_savings_account_number(e.target.value)}
                                                                                value={coop_savings_account_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Housing Equity Account No."
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => sethousing_equity(e.target.value)}
                                                                                value={housing_equity}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Special Savings Account Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setspecial_savings_account(e.target.value)}
                                                                                value={special_savings_account}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Impukan Certificate Account No."
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setimpukan_certificate_account(e.target.value)}
                                                                                value={impukan_certificate_account}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Kaya Savings Account Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setkaya_atm_savings_account_number(e.target.value)}
                                                                                value={kaya_atm_savings_account_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Current Address"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setaddress(e.target.value)}
                                                                                value={address}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Email Address"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setemail(e.target.value)}
                                                                                value={email}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Contact Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcontact_number(e.target.value)}
                                                                                value={contact_number}
                                                                           />
                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Date of Birth"
                                                                                     value={dob}
                                                                                     onChange={(newValue) => { setdob(newValue) }}
                                                                                     renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Age"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setage(e.target.value)}
                                                                                value={age}
                                                                           />
                                                                           <TextField
                                                                                id="outlined-required"
                                                                                label="Sex"
                                                                                select
                                                                                style={{ paddingBottom: "20px" }}
                                                                                fullWidth
                                                                                onChange={(e) => setgender(e.target.value)}
                                                                                value={gender}
                                                                           >
                                                                                <MenuItem value={"Male"}>Male</MenuItem>
                                                                                <MenuItem value={"Female"}>Female</MenuItem>
                                                                           </TextField>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Civil Status"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcivil_status(e.target.value)}
                                                                                value={civil_status}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Highest Educational Att."
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => sethighest_educational_attainment(e.target.value)}
                                                                                value={highest_educational_attainment}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Occupation"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setoccupation(e.target.value)}
                                                                                value={occupation}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Number of Dependent"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setnumber_of_dependent(e.target.value)}
                                                                                value={number_of_dependent}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Religion/Social Affiliation"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setreligion(e.target.value)}
                                                                                value={religion}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Annual Income"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setannual_income(e.target.value)}
                                                                                value={annual_income}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="PWD Type(DISABILITY TYPE/ADVOCATE)"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setpwd_type(e.target.value)}
                                                                                value={pwd_type}
                                                                           />

                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Termination of Membership Date"
                                                                                     value={termination_date}
                                                                                     inputFormat="MM-DD-YYYY"
                                                                                     onChange={(newValue) => { settermination_date(newValue) }}
                                                                                     renderInput={(params) => <TextField fullWidth style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>

                                                                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DatePicker
                                                                                     label="Termination BOD Resolution No"
                                                                                     value={termination_bod}
                                                                                     inputFormat="MM-DD-YYYY"
                                                                                     onChange={(newValue) => { settermination_bod(newValue) }}
                                                                                     renderInput={(params) => <TextField fullWidth style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                                                />
                                                                           </LocalizationProvider>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Remarks"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setremarks(e.target.value)}
                                                                                value={remarks}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Notes"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setnotes(e.target.value)}
                                                                                value={notes}
                                                                           />
                                                                           <TextField
                                                                                id="outlined-required"
                                                                                label="Status"
                                                                                fullWidth
                                                                                select
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setstatus(e.target.value)}
                                                                                value={status}
                                                                           >
                                                                                <MenuItem value={'active'}>Active</MenuItem>
                                                                                <MenuItem value={'inactive'}>Inactive</MenuItem>
                                                                           </TextField>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="COOP Savings Passbook Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setcoop_savings_passbook_number(e.target.value)}
                                                                                value={coop_savings_passbook_number}
                                                                           />

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Special Savings Passbook Number"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setkaya_atm_card_number(e.target.value)}
                                                                                value={kaya_atm_card_number}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Affiliation Org"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setaffiliation_org(e.target.value)}
                                                                                value={affiliation_org}
                                                                           />
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Passbook Printed"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setpassbook_printed(e.target.value)}
                                                                                value={passbook_printed}
                                                                           />
                                                                      </div>
                                                                      {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                                      {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                                 </DialogContent>
                                                                 <DialogActions>
                                                                      <ThemeProvider theme={theme}>
                                                                           <Button variant="outlined" color="blue" onClick={handlePatch}>Update</Button>
                                                                           <Button variant="outlined" color="green" onClick={handleClearTextFields} autoFocus>Clear</Button>
                                                                           <Button variant="outlined" color="red" onClick={handleCancel} autoFocus>Cancel</Button>
                                                                      </ThemeProvider>
                                                                 </DialogActions>
                                                            </Dialog>

                                                            <Dialog
                                                                 open={openDelete}
                                                                 onClose={handleCancel}
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
                                                                      {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Success</Alert> : ""}
                                                                 </DialogContent>
                                                                 <DialogActions>
                                                                      <Button onClick={handleDelete}>Delete</Button>
                                                                      <Button onClick={handleCancel} autoFocus>
                                                                           Cancel
                                                                      </Button>
                                                                 </DialogActions>
                                                            </Dialog>
                                                       </>
                                                  )}
                                             </TabPanel>
                                             <TabPanel value="2">

                                                  <div style={{ display: "flex", justifyContent: "right" }}>
                                                       <ThemeProvider theme={theme}>
                                                            <Button style={{ width: "200px", padding: "10px", borderRadius: "20px", marginBottom: "10px" }} variant="contained" color="blue" onClick={captureScreenshot}>
                                                                 Download Summary
                                                            </Button>
                                                       </ThemeProvider>
                                                  </div>
                                                  <CardContainer ref={appRef}>
                                                       <Cards style={{ backgroundColor: "#5D35B2", color: "white", width: "500px", height: "400px" }}>
                                                            <div style={{ marginBottom: "20px" }}>
                                                                 {user.username.substring(0, 5) === "hhhc." ? (
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>{firstname}</p>
                                                                 ) : (
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>{individual_firstname}</p>
                                                                 )}
                                                                 <p style={{ color: "#a7a7a7" }}>Firstname</p>
                                                                 {user.username.substring(0, 5) === "hhhc." ? (
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>{lastname}</p>
                                                                 ) : (
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>{individual_lastname}</p>
                                                                 )}
                                                                 <p style={{ color: "#a7a7a7", paddingBottom: "12px" }}>Lastname</p>
                                                                 <p style={{ color: "#a7a7a7", paddingBottom: "12px" }}>---------------------</p>
                                                                 <div style={{ display: "flex" }}>
                                                                      <p style={{ color: "#a7a7a7", marginRight: "10px" }}>TIN</p>
                                                                      {user.username.substring(0, 5) === "hhhc." ? (
                                                                           <p style={{ fontSize: "15px", margin: 0 }}>{tin}</p>
                                                                      ) : (
                                                                           <p style={{ fontSize: "15px", margin: 0 }}>{individual_tin}</p>
                                                                      )}
                                                                 </div>
                                                                 <div style={{ display: "flex" }}>
                                                                      <p style={{ color: "#a7a7a7", marginRight: "10px" }}>Contact No.</p>
                                                                      {user.username.substring(0, 5) === "hhhc." ? (
                                                                           <p style={{ fontSize: "15px", margin: 0 }}>{contact_number}</p>
                                                                      ) : (
                                                                           <p style={{ fontSize: "15px", margin: 0 }}>{individual_contact}</p>
                                                                      )}
                                                                 </div>
                                                                 <div style={{ display: "flex" }}>
                                                                      <p style={{ color: "#a7a7a7", marginRight: "10px" }}>Current Address</p>
                                                                      {user.username.substring(0, 5) === "hhhc." ? (
                                                                           <p style={{ fontSize: "15px", margin: 0 }}>{address}</p>
                                                                      ) : (
                                                                           <p style={{ fontSize: "15px", margin: 0 }}>{individual_currentadd}</p>
                                                                      )}
                                                                 </div>
                                                            </div>
                                                       </Cards>
                                                       <div style={{ marginRight: "10px" }}></div>
                                                       <Cards style={{ backgroundColor: "#1D88E6", color: "white", width: "100%", height: "400px" }}>
                                                            <div style={{ paddingRight: "200px" }}>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{share_capital_balance && share_capital_balance.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>Share Capital</p>
                                                                 </div>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{coop_savings_balance && coop_savings_balance.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>Coop Savings</p>
                                                                 </div>
                                                                 <div>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{special_savings_balance && special_savings_balance.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>Special Savings</p>
                                                                 </div>
                                                            </div>
                                                            <div style={{ marginRight: "50px" }}>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{kaya_savings_balance && kaya_savings_balance.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>Kaya Savings</p>
                                                                 </div>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{karamay_savings_balance && karamay_savings_balance.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>Karamay Savings</p>
                                                                 </div>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{housing_savings_balance && housing_savings_balance.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>Housing Equity Savings</p>
                                                                 </div>

                                                            </div>
                                                            <div style={{ marginRight: "50px" }}>
                                                                 <div>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{others_balance && others_balance.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>Others</p>
                                                                 </div>
                                                            </div>
                                                            {/* <div style={{ marginRight: "50px" }}>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{credit_part_housingeuity && credit_part_housingeuity.toLocaleString(undefined, {
                                                                           minimumFractionDigits: 2,
                                                                           maximumFractionDigits: 2
                                                                      })}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>HOUSING EQUITY</p>
                                                                 </div>


                                                            </div> */}

                                                       </Cards>

                                                  </CardContainer>

                                                  <div style={{ paddingBottom: "20px", overflowX: "auto" }} >

                                                       <div style={{ marginTop: "30px", display: 'flex', justifyContent: 'flex-start' }}>
                                                            <div style={{ marginLeft: 520, textAlign: "left", backgroundColor: "#49bcff", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Share Capital</div><div>{share_capital_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#45e7b6", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Coop Savings</div><div>{coop_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#375fcc", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Special Savings</div><div>{special_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#ff8df0", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Kaya Savings</div><div>{kaya_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#b575ce", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Housing Savings</div><div>{housing_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#d3cd76", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Karamay Savings</div><div>{karamay_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#aa5f5f", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Others</div><div>{others_balance}</div></div></div>
                                                       </div>
                                                       <div style={{ height: 600, width: '5000px', paddingBottom: "20px", }} >

                                                            <Box
                                                                 sx={{
                                                                      height: 600,
                                                                      width: '100%',
                                                                      '& .super-app-theme--header1': {
                                                                           backgroundColor: '#49bcff',
                                                                      },
                                                                      '& .super-app-theme--header1cell': {
                                                                           backgroundColor: '#c3e2f3',
                                                                      },
                                                                      '& .super-app-theme--header2': {
                                                                           backgroundColor: '#45e7b6',
                                                                      },
                                                                      '& .super-app-theme--header2cell': {
                                                                           backgroundColor: '#e3fff7',
                                                                      },
                                                                      '& .super-app-theme--header3': {
                                                                           backgroundColor: '#375fcc',
                                                                      },
                                                                      '& .super-app-theme--header3cell': {
                                                                           backgroundColor: '#9baad3',
                                                                      },
                                                                      '& .super-app-theme--header4': {
                                                                           backgroundColor: '#ff8df0',
                                                                      },
                                                                      '& .super-app-theme--header4cell': {
                                                                           backgroundColor: '#ffdafa',
                                                                      },
                                                                      '& .super-app-theme--header5': {
                                                                           backgroundColor: '#B575CE',
                                                                      },
                                                                      '& .super-app-theme--header5cell': {
                                                                           backgroundColor: '#ddc0e7',
                                                                      },
                                                                      '& .super-app-theme--header6': {
                                                                           backgroundColor: '#d3cd76',
                                                                      },
                                                                      '& .super-app-theme--header6cell': {
                                                                           backgroundColor: '#fffcd9',
                                                                      },
                                                                      '& .super-app-theme--header7': {
                                                                           backgroundColor: '#aa5f5f',
                                                                      },
                                                                      '& .super-app-theme--header7cell': {
                                                                           backgroundColor: '#ffd4d4',
                                                                      },
                                                                 }}>



                                                                




















                                                                 <DataGrid
                                                                      bord
                                                                      getRowId={(row) => row._id}
                                                                      rows={savings}
                                                                      columns={savings_columns}
                                                                      onRowClick={handleSavingsRowClick}
                                                                      filterModel={{
                                                                           items: [
                                                                                {
                                                                                     columnField: searchcolumn,
                                                                                     operatorValue: 'contains',
                                                                                     value: query,
                                                                                },
                                                                           ],
                                                                      }}
                                                                      showCellRightBorder={true}
                                                                      rowHeight={50}
                                                                 />
                                                            </Box>
                                                       </div>

                                                  </div>
                                                  {user.username.substring(0, 5) === "hhhc." && (
                                                       <div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>

                                                                 <div style={{ display: "flex" }}>
                                                                      <ThemeProvider theme={theme}>
                                                                           <Button style={{ width: "100%", padding: "10px", marginRight: "10px" }} variant="contained" color="blue" onClick={handleGoToMasterlist}>
                                                                                Go back to Masterlist
                                                                           </Button>
                                                                           <Button
                                                                                style={{
                                                                                     width: '100%',
                                                                                     padding: '10px',
                                                                                }}
                                                                                variant="contained"
                                                                                color="blue"
                                                                                onClick={downloadAsPDF}
                                                                           >
                                                                                Download Ledger
                                                                           </Button>
                                                                           {/* <Button disabled={buttonReceiptDisabled} style={{ width: "100%", padding: "10px" }} variant="contained" color="orange">
                                                                      <PDFDownloadLink fileName="savings_summary" document={
                                                                           < SavingsReceiptPrinter
                                                                                date={date}
                                                                                particulars={particulars}
                                                                                type={type}
                                                                                amount={amount}
                                                                                reference_document={reference_document}
                                                                                remarks2={remarks2}
                                                                                name={firstname + " " + lastname}

                                                                           // total_membershipfee={total_membershipfee}
                                                                           // total_kayasavings={total_kayasavings}
                                                                           // total_loans={total_loans}
                                                                           // total_captial={total_captial}
                                                                           // total_others={total_others}
                                                                           // total_savings={total_savings}
                                                                           />} >
                                                                           {({ loading }) => (loading ? 'Loading document...' : 'Download Selected')}
                                                                      </PDFDownloadLink>
                                                                 </Button> */}
                                                                      </ThemeProvider>
                                                                 </div>



                                                                 <div style={{ display: "flex" }}><ThemeProvider theme={theme}>

                                                                      <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="contained" color="blue" onClick={handleAddSavingsButton}>
                                                                           New
                                                                      </Button>
                                                                      {/* <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="outlined" color="green" onClick={handleUpdateSavingsButton}>
                                                                 Update
                                                            </Button> */}
                                                                      <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="contained" color="red" onClick={handleDeleteSavingsButton}>
                                                                           Delete
                                                                      </Button>
                                                                 </ThemeProvider></div>

                                                            </div>
                                                       </div>
                                                  )}
                                                  <Dialog
                                                       fullScreen={fullscreen}
                                                       open={openAddSavings}
                                                       onClose={handleCancel}
                                                       aria-labelledby="alert-dialog-title"
                                                       aria-describedby="alert-dialog-description"
                                                  >
                                                       <DialogTitle id="alert-dialog-title">
                                                            Adding New Particulars
                                                       </DialogTitle>
                                                       <DialogContent style={{ height: '800px', paddingTop: '20px' }}>
                                                            {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                            {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                            <div style={{ marginBottom: '50px' }}>
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="Date"
                                                                           value={date}
                                                                           inputFormat="MM-DD-YYYY"
                                                                           onChange={convertDateToString}
                                                                           renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "10px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Select Particulars"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "10px" }}
                                                                      select
                                                                      onChange={handleParticulars}
                                                                      value={particulars}
                                                                 >
                                                                      <MenuItem value={'MEMBERSHIP FEE'}>Membership Fee</MenuItem>
                                                                      <MenuItem value={'SHARE CAPITAL'}>Share Capital</MenuItem>
                                                                      <MenuItem value={'COOP SAVINGS'}>Coop Savings</MenuItem>
                                                                      <MenuItem value={'SPECIAL SAVINGS'}>Special Savings</MenuItem>
                                                                      <MenuItem value={'KAYA SAVINGS'}>Kaya Savings</MenuItem>
                                                                      <MenuItem value={'HOUSING SAVINGS'}>Housing Equity Savings</MenuItem>
                                                                      <MenuItem value={'KARAMAY SAVINGS'}>Karamay Savings</MenuItem>
                                                                      <MenuItem value={'OTHERS'}>Others</MenuItem>

                                                                 </TextField>
                                                                 {particulars === "SHARE CAPITAL" &&
                                                                      <div>
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Debit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setshare_capital_debit(e.target.value)}
                                                                                value={share_capital_debit}
                                                                                onBlur={handleZeroOnBlur}
                                                                           />
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Credit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setshare_capital_credit(e.target.value)}
                                                                                value={share_capital_credit}
                                                                                onBlur={handleZeroOnBlur}
                                                                           />
                                                                      </div>}
                                                                 {particulars === "SPECIAL SAVINGS" &&
                                                                      <div>
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Debit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setspecial_savings_debit(e.target.value)}
                                                                                value={special_savings_debit}
                                                                           />
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Credit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setspecial_savings_credit(e.target.value)}
                                                                                value={special_savings_credit}
                                                                           />

                                                                      </div>}
                                                                 {particulars === "COOP SAVINGS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setcoop_savings_debit(e.target.value)}
                                                                           value={coop_savings_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setcoop_savings_credit(e.target.value)}
                                                                           value={coop_savings_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "KAYA SAVINGS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaya_savings_debit(e.target.value)}
                                                                           value={kaya_savings_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaya_savings_credit(e.target.value)}
                                                                           value={kaya_savings_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "HOUSING SAVINGS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => sethousing_savings_debit(e.target.value)}
                                                                           value={housing_savings_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => sethousing_savings_credit(e.target.value)}
                                                                           value={housing_savings_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "KARAMAY SAVINGS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaramay_savings_debit(e.target.value)}
                                                                           value={karamay_savings_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaramay_savings_credit(e.target.value)}
                                                                           value={karamay_savings_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "OTHERS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setothers_debit(e.target.value)}
                                                                           value={others_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setothers_credit(e.target.value)}
                                                                           value={others_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "MEMBERSHIP FEE" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Amount"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setmembership_fee(e.target.value)}
                                                                           value={membership_fee}
                                                                      />

                                                                 </div>}

                                                                 <TextField
                                                                      required
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Reference Document"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setreference_document(e.target.value)}
                                                                      value={reference_document}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Remarks"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setremarks2(e.target.value)}
                                                                      value={remarks2}
                                                                 />
                                                            </div>
                                                            {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                            {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                       </DialogContent>
                                                       <DialogActions>
                                                            <ThemeProvider theme={theme}>
                                                                 <Button variant="outlined" color="blue" onClick={handleAddSavings}>Save</Button>
                                                                 <Button variant="outlined" color="green" onClick={handleClearTextFields} autoFocus>Clear</Button>
                                                                 {/* <Button variant="outlined" color="red" onClick={handlelogger} autoFocus>Cancel</Button> */}
                                                                 <Button variant="outlined" color="red" onClick={handleCancel} autoFocus>Cancel</Button>
                                                            </ThemeProvider>
                                                       </DialogActions>
                                                  </Dialog>
                                                  <Dialog
                                                       fullScreen={fullscreen}
                                                       open={openUpdateSavings}
                                                       onClose={handleCancel}
                                                       aria-labelledby="alert-dialog-title"
                                                       aria-describedby="alert-dialog-description"
                                                  >
                                                       <DialogTitle id="alert-dialog-title">
                                                            Update a Particular
                                                       </DialogTitle>
                                                       <DialogContent style={{ height: '800px', paddingTop: '20px' }}>
                                                            {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                            {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                            <div style={{ marginBottom: '50px' }}>
                                                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DatePicker
                                                                           label="Date"
                                                                           value={date}
                                                                           inputFormat="MM-DD-YYYY"
                                                                           onChange={convertDateToString}
                                                                           renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "10px" }}{...params} error={false} />}
                                                                      />
                                                                 </LocalizationProvider>
                                                                 <TextField
                                                                      id="outlined-required"
                                                                      label="Select Particulars"
                                                                      fullWidth
                                                                      style={{ paddingBottom: "10px" }}
                                                                      select
                                                                      onChange={handleParticulars}
                                                                      value={particulars}
                                                                 >
                                                                      <MenuItem value={'MEMBERSHIP FEE'}>Membership Fee</MenuItem>
                                                                      <MenuItem value={'SHARE CAPITAL'}>Share Capital</MenuItem>
                                                                      <MenuItem value={'COOP SAVINGS'}>Coop Savings</MenuItem>
                                                                      <MenuItem value={'SPECIAL SAVINGS'}>Special Savings</MenuItem>
                                                                      <MenuItem value={'KAYA SAVINGS'}>Kaya Savings</MenuItem>
                                                                      <MenuItem value={'HOUSING SAVINGS'}>Housing Equity Savings</MenuItem>
                                                                      <MenuItem value={'KARAMAY SAVINGS'}>Karamay Savings</MenuItem>
                                                                      <MenuItem value={'OTHERS'}>Others</MenuItem>

                                                                 </TextField>
                                                                 {particulars === "SHARE CAPITAL" &&
                                                                      <div>
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Debit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setshare_capital_debit(e.target.value)}
                                                                                value={share_capital_debit}
                                                                           />
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Credit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setshare_capital_credit(e.target.value)}
                                                                                value={share_capital_credit}
                                                                           />

                                                                      </div>}
                                                                 {particulars === "SPECIAL SAVINGS" &&
                                                                      <div>
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Debit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setspecial_savings_debit(e.target.value)}
                                                                                value={special_savings_debit}
                                                                           />
                                                                           <TextField
                                                                                type='number'
                                                                                required
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Credit"
                                                                                style={{ paddingBottom: "10px" }}
                                                                                onChange={(e) => setspecial_savings_credit(e.target.value)}
                                                                                value={special_savings_credit}
                                                                           />

                                                                      </div>}
                                                                 {particulars === "COOP SAVINGS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setcoop_savings_debit(e.target.value)}
                                                                           value={coop_savings_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setcoop_savings_credit(e.target.value)}
                                                                           value={coop_savings_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "KAYA SAVINGS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaya_savings_debit(e.target.value)}
                                                                           value={kaya_savings_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaya_savings_credit(e.target.value)}
                                                                           value={kaya_savings_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "KARAMAY SAVINGS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaramay_savings_debit(e.target.value)}
                                                                           value={karamay_savings_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setkaramay_savings_credit(e.target.value)}
                                                                           value={karamay_savings_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "OTHERS" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Debit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setothers_debit(e.target.value)}
                                                                           value={others_debit}
                                                                      />
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Credit"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setothers_credit(e.target.value)}
                                                                           value={others_credit}
                                                                      />

                                                                 </div>}
                                                                 {particulars === "MEMBERSHIP FEE" && <div>
                                                                      <TextField
                                                                           type='number'
                                                                           required
                                                                           fullWidth
                                                                           id="outlined-required"
                                                                           label="Amount"
                                                                           style={{ paddingBottom: "10px" }}
                                                                           onChange={(e) => setmembership_fee(e.target.value)}
                                                                           value={membership_fee}
                                                                      />

                                                                 </div>}

                                                                 <TextField
                                                                      required
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Reference Document"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setreference_document(e.target.value)}
                                                                      value={reference_document}
                                                                 />
                                                                 <TextField
                                                                      required
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Remarks"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setremarks2(e.target.value)}
                                                                      value={remarks2}
                                                                 />
                                                            </div>
                                                            {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                                            {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up required fields</Alert> : ""}
                                                       </DialogContent>
                                                       <DialogActions>
                                                            <ThemeProvider theme={theme}>
                                                                 <Button variant="outlined" color="blue" onClick={handleUpdateSavings}>Update</Button>
                                                                 <Button variant="outlined" color="green" onClick={handleClearTextFields} autoFocus>Clear</Button>
                                                                 <Button variant="outlined" color="red" onClick={handleCancel} autoFocus>Cancel</Button>
                                                                 <Button variant="outlined" color="red" onClick={handleLogger} autoFocus>Log</Button>
                                                            </ThemeProvider>
                                                       </DialogActions>
                                                  </Dialog>

                                                  <Dialog
                                                       open={openDeleteSavings}
                                                       onClose={handleCancel}
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
                                                            {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Success</Alert> : ""}
                                                       </DialogContent>
                                                       <DialogActions>
                                                            <Button onClick={handleDeleteSavings}>Delete</Button>
                                                            <Button onClick={handleCancel} autoFocus>
                                                                 Cancel
                                                            </Button>
                                                       </DialogActions>
                                                  </Dialog>

                                             </TabPanel>
                                             <TabPanel value="3">
                                                  {user.username.substring(0, 5) === "hhhc." && (
                                                       <>
                                                            <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                                                                 <Table aria-label="simple table">
                                                                      <TableBody>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>LASTNAME</TableCell><TableCell>{lastname}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>FIRSTNAME</TableCell><TableCell>{firstname}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>MIDDLE INITIAL</TableCell><TableCell>{middlename}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>TIN</TableCell><TableCell>{tin}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>MEMBERSHIP DATE ACCEPTED</TableCell><TableCell>{membership_date}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>TYPE/KIND OF MEMBERSHIP</TableCell><TableCell>{membership_type}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>HHHC MEMBERSHIP NO.</TableCell><TableCell>{hhhc_membership_number}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }} >BOD RESOLUTION NO.</TableCell><TableCell>{bod_res}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>MEMBERSHIP FEE</TableCell><TableCell>{membership_fee}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>INITIAL CAPITAL</TableCell><TableCell>{initial_share_capital}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>INITIAL NO. OF SHARES</TableCell><TableCell>{initial_no_share}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>PASSBOOK ACCOUNT SERIES NO.</TableCell><TableCell>{passbook_series_number}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>SAVINGS ACCOUNT NO.</TableCell><TableCell>{coop_savings_account_number}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>SHARE CAPITAL AMOUNT</TableCell><TableCell>{share_capital_balance}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>COOP SAVINGS AMOUNT</TableCell><TableCell>{coop_savings_balance}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>HOUSING EQUITY ACCOUNT NO.</TableCell><TableCell>{housing_equity}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>HOUSING EQUITY AMOUNT</TableCell><TableCell>{housing_savings_balance}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>SPECIAL SAVINGS ACCOUNT NUMBER</TableCell><TableCell>{special_savings_account}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>SPECIAL SAVINGS AMOUNT</TableCell><TableCell>{special_savings_balance}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>IMPUKAN CERTIFICATE ACCOUNT NO.</TableCell><TableCell>{impukan_certificate_account}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>KAYA SAVINGS ACCOUNT NO.</TableCell><TableCell>{kaya_savings}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>KAYA SAVINGS AMOUNT</TableCell><TableCell>{kaya_savings_balance}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>CURRENT ADDRESS</TableCell><TableCell>{address}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>CONTACT NO.</TableCell><TableCell>{contact_number}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>DATE OF BIRTH</TableCell><TableCell>{dob}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>AGE</TableCell><TableCell>{age}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>SEX</TableCell><TableCell>{gender}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>CIVIL STATUS</TableCell><TableCell>{civil_status}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>HIGHEST EDUCATIONAL ATTAINMENT</TableCell><TableCell>{highest_educational_attainment}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>OCCUPATION/INCOME SOURCE</TableCell><TableCell>{occupation}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>NO. OF DEPENDENT</TableCell><TableCell>{number_of_dependent}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>RELIGION/SOCIAL AFFILIATION</TableCell><TableCell>{religion}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>ANNUAL INCOME</TableCell><TableCell>{annual_income}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>PWD TYPE(DISABILITY TYPE/ADVOCATE)</TableCell><TableCell>{pwd_type}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>TERMINATION OF MEMBERSHIP DATE</TableCell><TableCell>{termination_date}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>TERMINATION BOD RESOLUTION NO.</TableCell><TableCell>{termination_bod}</TableCell></TableRow>
                                                                           <TableRow><TableCell sx={{ width: 300 }} style={{ fontWeight: "600" }}>REMARKS</TableCell><TableCell>{remarks}</TableCell></TableRow>

                                                                      </TableBody>
                                                                 </Table>
                                                            </TableContainer>
                                                            <ThemeProvider theme={theme}>
                                                                 <Button style={{ width: "auto", padding: "10px", marginRight: "10px" }} variant="contained" color="green" onClick={handleGoToMasterlist}>
                                                                      Go back to Masterlist
                                                                 </Button>
                                                            </ThemeProvider>
                                                       </>
                                                  )}
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

export default Member