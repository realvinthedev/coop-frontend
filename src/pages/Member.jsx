
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
import { saveAs } from 'file-saver-es';
import html2canvas from 'html2canvas';
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
     { field: 'member_id', headerName: 'Member ID', width: 100, filter: 'text' },
     { field: 'firstname', headerName: 'Firstname', width: 150, filter: 'text' },
     { field: 'middlename', headerName: 'Middlename', width: 150, filter: 'text' },
     { field: 'lastname', headerName: 'Lastname', width: 150, filter: 'text' },
     { field: 'membership_date', headerName: 'Membership Date', width: 150 },
     { field: 'status', headerName: 'Status', width: 150 },
     { field: 'hhhc_membership_number', headerName: 'HHH Membership Number', width: 200 },
     { field: 'bod_res', headerName: 'BOD Res', width: 150 },
     { field: 'coop_savings_account_number', headerName: 'Coop Savings Accnt Number', width: 200 },
     { field: 'kaya_atm_card_number', headerName: 'Special Savings Passbook Number', width: 200 },
     { field: 'kaya_atm_savings_account_number', headerName: 'Special Savings Account Number', width: 200 },
     // { field: 'mbh', headerName: 'MBH', width: 150 },
     // { field: 'atm_passbook_fee', headerName: 'ATM Book Fee', width: 150 },
     // { field: 'atm_status', headerName: 'ATM Status', width: 150 },
     // { field: 'pb_account_number', headerName: 'PB Account Number', width: 150 },
     // { field: 'pb_account_number_series', headerName: 'PB Account Number Series', width: 150 },
     { field: 'passbook_series_number', headerName: 'Passbook Series number', width: 150 },
     { field: 'affiliation_org', headerName: 'Affiliation Org', width: 150 },
     { field: 'passbook_printed', headerName: 'Passbook Printed', width: 150 },
     { field: 'remarks', headerName: 'Remarks', width: 150 },
     { field: 'notes', headerName: 'Notes', width: 150 },

];

const savings_columns = [
     { field: 'date', headerName: 'Date', width: 100 },
     { field: 'particulars', headerName: 'Particulars', width: 300 },
     { field: 'membership_fee', headerName: 'Membership Fee', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'share_capital_debit', headerName: 'Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'share_capital_credit', headerName: 'Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'share_capital_balance', headerName: 'Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right" },

     { field: 'coop_savings_debit', headerName: 'Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'coop_savings_credit', headerName: 'Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'coop_savings_balance', headerName: 'Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right" },

     { field: 'special_savings_debit', headerName: 'Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'special_savings_credit', headerName: 'Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'special_savings_balance', headerName: 'Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right" },

     { field: 'kaya_savings_debit', headerName: 'Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'kaya_savings_credit', headerName: 'Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'kaya_savings_balance', headerName: 'Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right" },

     { field: 'karamay_savings_debit', headerName: 'Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'karamay_savings_credit', headerName: 'Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'karamay_savings_balance', headerName: 'Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right" },

     { field: 'others_debit', headerName: 'Debit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'others_credit', headerName: 'Credit', width: 120, valueFormatter: zeroValueFormatter, align: "right" },
     { field: 'others_balance', headerName: 'Balance', width: 120, valueFormatter: zeroValueFormatter, align: "right" },

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
     const [tabvalue, settabvalue] = React.useState('1');
     const [buttonReceiptDisabled, setbuttonReceiptDisabled] = useState(true)

     const [openAdd, setOpenAdd] = useState(false);
     const [openDelete, setOpenDelete] = useState(false);
     const [openUpdate, setOpenUpdate] = useState(false);
     const [searchcolumn, setsearchcolumn] = useState('member_id')





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
     useEffect(() => {
          const fetchMembers = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/member/', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    setMembers(json)
               }
          }
          if (user) {
               fetchMembers();
          }
     }, [user, refresher])

     /**individual */
     useEffect(() => {
          const fetchSavings = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/savings/' + member_id, {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    setsavings(json)
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
     const [master_karamay, setmaster_karamay] = useState(0)
     const [master_others, setmaster_others] = useState(0)
     useEffect(() => {
          const fetchSavings = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/savings/', {
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

                    const karamay_balance = json.reduce((acc, entry) => acc + entry.karamay_savings_credit, 0);
                    const karamay_less = json.reduce((acc, entry) => acc + entry.karamay_savings_debit, 0);
                    setmaster_karamay(parseFloat(karamay_balance) - parseFloat(karamay_less))

                    const others_balance = json.reduce((acc, entry) => acc + entry.others_credit, 0);
                    const others_less = json.reduce((acc, entry) => acc + entry.others_debit, 0);
                    setmaster_others(parseFloat(others_balance) - parseFloat(others_less))

               }
          }
          if (user) {
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
          setnotes("")
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
          else{
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
               firstname: firstname,
               middlename: middlename,
               lastname: lastname,
               email: email,
               contact_number: contact_number,
               membership_date: membership_date,
               status: status,
               hhhc_membership_number: hhhc_membership_number,
               bod_res: bod_res,
               coop_savings_account_number: coop_savings_account_number,
               kaya_atm_card_number: kaya_atm_card_number,
               kaya_atm_savings_account_number: kaya_atm_savings_account_number,
               // mbh: mbh,
               // atm_passbook_fee: atm_passbook_fee,
               // atm_status: atm_status,
               // pb_account_number: pb_account_number,
               // pb_account_number_series: pb_account_number_series,
               passbook_series_number: passbook_series_number,
               affiliation_org: affiliation_org,
               passbook_printed: passbook_printed,
               remarks: remarks,
               notes: notes
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/member/', {
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
                    setPassword("")

                    handleSuccessToast('Member Added Successfully')

                    setOpenAdd(false)
                    handleRefresher()

               }
          }
     }


     const handlePatch = async (e) => {
          e.preventDefault()
          const member = {
               member_id: member_id,
               firstname: firstname,
               middlename: middlename,
               lastname: lastname,
               membership_date: membership_date,
               status: status,
               hhhc_membership_number: hhhc_membership_number,
               bod_res: bod_res,
               coop_savings_account_number: coop_savings_account_number,
               kaya_atm_card_number: kaya_atm_card_number,
               kaya_atm_savings_account_number: kaya_atm_savings_account_number,
               // mbh: mbh,
               // atm_passbook_fee: atm_passbook_fee,
               // atm_status: atm_status,
               // pb_account_number: pb_account_number,
               // pb_account_number_series: pb_account_number_series,
               passbook_series_number: passbook_series_number,
               affiliation_org: affiliation_org,
               passbook_printed: passbook_printed,
               remarks: remarks,
               notes: notes
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/member/' + id, {
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

                    handleSuccessToast('Updated Successfully')
                    setOpenUpdate(false)
                    handleRefresher()
               }
          }
     }
     const handleDelete = async (e) => {

          if (!user) {
               console.log('You must be logged in first')
               return
          } else {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/member/' + id, {
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/savings/', {
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

              

               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/savings/' + savingsid, {
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/savings/' + savingsid, {
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
          }
          else if (particulars === "COOP SAVINGS") {
               setshare_capital_balance(0)
               //setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
          }
          else if (particulars === "SPECIAL SAVINGS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               //setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
          }
          else if (particulars === "KAYA SAVINGS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               //setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
          }
          else if (particulars === "KARAMAY SAVINGS") {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
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
               //setothers_balance(0)
          }
          else {
               setshare_capital_balance(0)
               setcoop_savings_balance(0)
               setspecial_savings_balance(0)
               setkaya_savings_balance(0)
               setkaramay_savings_balance(0)
               setothers_balance(0)
          }

     }

     const [membershiptotal, setmembershiptotal] = useState(0);
     // useEffect(() => {
     //      const fetchEmp = async () => {
     //           const response = await fetch(`https://inquisitive-red-sun-hat.cyclic.app/api/savings/${savingsid}`, {
     //                headers: {
     //                     'Authorization': `Bearer ${user.token}`
     //                }
     //           })
     //           const json = await response.json()
     //           if (response.ok) {
     //                const filteredData = json.filter(item => {
     //                     const membership_fee = item.membership_fee
     //                     return membership_fee == "membership_fee"
     //                });
     //                filteredData.forEach((item) => {
     //                     amount += item.amount
     //                });
     //                setmembershiptotal(amount);

     //           }
     //      }
     //      if (user) {
     //           fetchEmp();
     //      }
     // }, [])




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
                                                       <Tab label="Masterlist" value="1" disabled />
                                                       <Tab label="Savings" value="2" onClick={handleGoToSavings} disabled />

                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
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
                                                                 <Button style={{ width: "100%", padding: "10px", marginRight: "5px" }} variant="outlined" color="blue" onClick={handleGoToSavings}>
                                                                      View Savings
                                                                 </Button>

                                                            </ThemeProvider>
                                                       </div>
                                                       <div style={{ display: "flex", marginTop: "20px" }}>
                                                            <ThemeProvider theme={theme}>

                                                                 <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="outlined" color="blue" onClick={handleAddButton}>
                                                                      New
                                                                 </Button>
                                                                 <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="outlined" color="green" onClick={handleUpdateButton}>
                                                                      Update
                                                                 </Button>
                                                                 <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="outlined" color="red" onClick={handleDeleteButton}>
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
                                                                      required
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Lastname"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setlastname(e.target.value)}
                                                                      value={lastname}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Contact Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setcontact_number(e.target.value)}
                                                                      value={contact_number}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Email"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setemail(e.target.value)}
                                                                      value={email}
                                                                 />
                                                            </div>
                                                            <div>
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
                                                                      label="HHHC Membership Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => sethhhc_membership_number(e.target.value)}
                                                                      value={hhhc_membership_number}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="BOD Res"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setbod_res(e.target.value)}
                                                                      value={bod_res}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="COOP Savings Account Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setcoop_savings_account_number(e.target.value)}
                                                                      value={coop_savings_account_number}
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
                                                                      label="Special Savings Account Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setkaya_atm_savings_account_number(e.target.value)}
                                                                      value={kaya_atm_savings_account_number}
                                                                 />
                                                                 {/* <TextField
                                                                      type="number"
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="MBH"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setmbh(e.target.value)}
                                                                      value={mbh}
                                                                 />

                                                                 <TextField
                                                                      type="number"
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="ATM Passbook Fee"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setatm_passbook_fee(e.target.value)}
                                                                      value={atm_passbook_fee}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="ATM Status"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setatm_status(e.target.value)}
                                                                      value={atm_status}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="PB Account Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setpb_account_number(e.target.value)}
                                                                      value={pb_account_number}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="PB Account Number Series"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setpb_account_number_series(e.target.value)}
                                                                      value={pb_account_number_series}
                                                                 /> */}
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Passbook Series Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setpassbook_series_number(e.target.value)}
                                                                      value={passbook_series_number}
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
                                                                      required
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Lastname"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setlastname(e.target.value)}
                                                                      value={lastname}
                                                                 />
                                                            </div>
                                                            <div>
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
                                                                      label="HHHC Membership Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => sethhhc_membership_number(e.target.value)}
                                                                      value={hhhc_membership_number}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="BOD Res"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setbod_res(e.target.value)}
                                                                      value={bod_res}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="COOP Savings Account Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setcoop_savings_account_number(e.target.value)}
                                                                      value={coop_savings_account_number}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Special Savings Card Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setkaya_atm_card_number(e.target.value)}
                                                                      value={kaya_atm_card_number}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Special Savings Passbook Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setkaya_atm_savings_account_number(e.target.value)}
                                                                      value={kaya_atm_savings_account_number}
                                                                 />
                                                                 {/* <TextField
                                                                      type="number"
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="MBH"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setmbh(e.target.value)}
                                                                      value={mbh}
                                                                 />

                                                                 <TextField
                                                                      type="number"
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="ATM Passbook Fee"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setatm_passbook_fee(e.target.value)}
                                                                      value={atm_passbook_fee}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="ATM Status"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setatm_status(e.target.value)}
                                                                      value={atm_status}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="PB Account Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setpb_account_number(e.target.value)}
                                                                      value={pb_account_number}
                                                                 />
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="PB Account Number Series"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setpb_account_number_series(e.target.value)}
                                                                      value={pb_account_number_series}
                                                                 /> */}
                                                                 <TextField
                                                                      fullWidth
                                                                      id="outlined-required"
                                                                      label="Passbook Series Number"
                                                                      style={{ paddingBottom: "10px" }}
                                                                      onChange={(e) => setpassbook_series_number(e.target.value)}
                                                                      value={passbook_series_number}
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
                                                                 <p style={{ fontSize: "40px", margin: 0 }}>{firstname}</p>
                                                                 <p style={{ color: "#a7a7a7" }}>Firstname</p>
                                                                 <p style={{ fontSize: "40px", margin: 0 }}>{lastname}</p>
                                                                 <p style={{ color: "#a7a7a7" }}>Lastname</p>
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

                                                  <div style={{ paddingBottom: "20px", overflowX: "auto" }}>

                                                       <div style={{ marginTop: "30px", display: 'flex', justifyContent: 'flex-start' }}>
                                                            <div style={{ marginLeft: 520, textAlign: "left", backgroundColor: "#49bcff", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Share Capital</div><div>{share_capital_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#45ace7", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Coop Savings</div><div>{coop_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#3795cc", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Special Savings</div><div>{special_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#ff8df0", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Kaya Savings</div><div>{kaya_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#d376c7", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Karamay Savings</div><div>{karamay_savings_balance}</div></div></div>
                                                            <div style={{ textAlign: "left", backgroundColor: "#aa5fa0", flex: '0 0 360px', padding: "10px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><div>Others</div><div>{others_balance}</div></div></div>
                                                       </div>
                                                       <div style={{ height: 600, width: '5000px', paddingBottom: "20px", }} >

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
                                                            />
                                                       </div>

                                                  </div>
                                                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                                       <div style={{ display: "flex" }}>
                                                            <ThemeProvider theme={theme}>
                                                                 <Button style={{ width: "100%", padding: "10px", marginRight: "10px" }} variant="outlined" color="blue" onClick={handleGoToMasterlist}>
                                                                      Go back to Masterlist
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

                                                            <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="outlined" color="blue" onClick={handleAddSavingsButton}>
                                                                 New
                                                            </Button>
                                                            {/* <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="outlined" color="green" onClick={handleUpdateSavingsButton}>
                                                                 Update
                                                            </Button> */}
                                                            <Button style={{ width: "100%", padding: "10px", marginLeft: "10px" }} variant="outlined" color="red" onClick={handleDeleteSavingsButton}>
                                                                 Delete
                                                            </Button>
                                                       </ThemeProvider></div>

                                                  </div>
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
                                                                      <MenuItem value={'KAYA SAVINGS'}>KAYA Savings</MenuItem>
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
                                                                      <MenuItem value={'KAYA SAVINGS'}>KAYA Savings</MenuItem>
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