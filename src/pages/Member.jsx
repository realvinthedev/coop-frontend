
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
    height: 900px;
`
const Card = styled.div`
    background-color: white;
    height: 800px;
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

/**GET REQUESTS */
const columns = [
     { field: 'member_id', headerName: 'Member ID', width: 100, filter: 'text' },
     { field: 'firstname', headerName: 'Firstname', width: 150, filter: 'text' },
     { field: 'middlename', headerName: 'Middlename', width: 150, filter: 'text' },
     { field: 'lastname', headerName: 'Lastname', width: 150, filter: 'text' },
     { field: 'membership_date', headerName: 'Membership Date', width: 80 },
     { field: 'status', headerName: 'Status', width: 80 },
     { field: 'hhhc_membership_number', headerName: 'HHH Membership Number', width: 200 },
     { field: 'bod_res', headerName: 'BOD Res', width: 150 },
     { field: 'coop_savings_account_number', headerName: 'Coop Savings Accnt Number', width: 200 },
     { field: 'kaya_atm_card_number', headerName: 'Kaya ATM Card Number', width: 200 },
     { field: 'kaya_atm_savings_account_number', headerName: 'Kaya ATM Savings Account Number', width: 200 },
     { field: 'membership_fee', headerName: 'Membership Fee', width: 80 },
     { field: 'share_capital', headerName: 'Share Capital', width: 80 },
     { field: 'coop_savings', headerName: 'Coop Savings', width: 80 },
     { field: 'loan_balance', headerName: 'Loan Balance', width: 80 },
     { field: 'mbh', headerName: 'MBH', width: 80 },
     { field: 'housing_equity', headerName: 'Housing Equity', width: 80 },
     { field: 'kaya_savings', headerName: 'Kaya Savings', width: 80 },
     { field: 'atm_passbook_fee', headerName: 'ATM Book Fee', width: 80 },
     { field: 'atm_status', headerName: 'ATM Status', width: 80 },
     { field: 'pb_account_number', headerName: 'PB Account Number', width: 80 },
     { field: 'pb_account_number_series', headerName: 'PB Account Number Series', width: 80 },
     { field: 'passbook_series_number', headerName: 'Passbook Series number', width: 80 },
     { field: 'affiliation_org', headerName: 'Affiliation Org', width: 80 },
     { field: 'passbook_printed', headerName: 'Passbook Printed', width: 80 },
     { field: 'remarks', headerName: 'Remarks', width: 80 },
     { field: 'notes', headerName: 'Notes', width: 80 },

     // member_id,
     // firstname,
     // middlename,
     // lastname,
     // membership_date,
     // status,
     // hhhc_membership_number,
     // bod_res,
     // coop_savings_account_number,
     // kaya_atm_card_number,
     // kaya_atm_savings_account_number,
     // membership_fee,
     // share_capital,
     // coop_savings,
     // loan_balance,
     // mbh,
     // housing_equity,
     // kaya_savings,
     // atm_passbook_fee,
     // atm_status,
     // pb_account_number,
     // pb_account_number_series,
     // passbook_series_number,
     // affiliation_org,
     // passbook_printed,
     // remarks,
     // notes
];






const Member = (props) => {

     /**POST REQUESTS */
     const { user } = useAuthContext()
     const [id, setId] = useState('')
     const [openError, setopen_error] = useState(false)
     const [error, setError] = useState(false)
     const [openSuccess, setOpenSuccess] = useState(false)
     const [refresher, setRefresher] = useState(0)
     const [query, setQuery] = useState('')
     const [members, setMembers] = useState([])
     const [gridTrigger, setGridTrigger] = useState(false);
     const [member_id, setmember_id] = useState('')
     const [firstname, setfirstname] = useState('')
     const [middlename, setmiddlename] = useState('')
     const [lastname, setlastname] = useState('')
     const [membership_date, setmembership_date] = useState('')
     const [status, setstatus] = useState('active')
     const [hhhc_membership_number, sethhhc_membership_number] = useState('')
     const [bod_res, setbod_res] = useState('')
     const [coop_savings_account_number, setcoop_savings_account_number] = useState('')
     const [kaya_atm_card_number, setkaya_atm_card_number] = useState('')
     const [kaya_atm_savings_account_number, setkaya_atm_savings_account_number] = useState('')
     const [membership_fee, setmembership_fee] = useState('')
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



     const [openAdd, setOpenAdd] = useState(false);
     const [openDelete, setOpenDelete] = useState(false);
     const [openUpdate, setOpenUpdate] = useState(false);
     const [searchcolumn, setsearchcolumn] = useState('member_id')
     // member_id,
     // firstname,
     // middlename,
     // lastname,
     // membership_date,
     // status,
     // hhhc_membership_number,
     // bod_res,
     // coop_savings_account_number,
     // kaya_atm_card_number,
     // kaya_atm_savings_account_number,
     // membership_fee,
     // share_capital,
     // coop_savings,
     // loan_balance,
     // mbh,
     // housing_equity,
     // kaya_savings,
     // atm_passbook_fee,
     // atm_status,
     // pb_account_number,
     // pb_account_number_series,
     // passbook_series_number,
     // affiliation_org,
     // passbook_printed,
     // remarks,
     // notes



     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })



     useEffect(() => {
          const fetchMembers = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/member', {
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




     const convertDateToString = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setmembership_date(dateString)
     };

     const handleUpdateQuantity = () => {
          setGridTrigger(!gridTrigger)
     }
     const handleRefresher = () => {
          setRefresher(Math.random())
     };

     /**Handle Error */
     const handleOnError = () => {
          setopen_error(true);
     };

     const handleOffError = () => {
          setopen_error(false);
     };

     /**Handle Success */
     const handleOnSuccess = () => {
          setOpenSuccess(true);
     };

     const handleOffSuccess = () => {
          setOpenSuccess(false);
     };

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
     const handleRandomId = () => {
          let num = Math.floor(Math.random() * 9000) + 10000;
          const value = "MBR" + num
          setmember_id(value)
     }
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
          setmbh(params.row.mbh);
          sethousing_equity(params.row.housing_equity);
          setatm_passbook_fee(params.row.atm_passbook_fee);
          setatm_status(params.row.atm_status);
          setpb_account_number(params.row.pb_account_number);
          setpb_account_number_series(params.row.pb_account_number_series);
          setpassbook_series_number(params.row.passbook_series_number);
          setaffiliation_org(params.row.affiliation_org);
          setpassbook_printed(params.row.passbook_printed);
          setremarks(params.row.remarks);
          setnotes(params.row.notes);
     };

     //savings nako


     const handleAddMember = async (e) => {
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
               mbh: mbh,
               housing_equity: housing_equity,
               atm_passbook_fee: atm_passbook_fee,
               atm_status: atm_status,
               pb_account_number: pb_account_number,
               pb_account_number_series: pb_account_number_series,
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
               middlename === "" ||
               lastname === ""

          ) {
               handleOnError()
               setTimeout(() => {
                    handleOffError();
               }, 1500);
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

                    handleOnSuccess();
                    setTimeout(() => {
                         setOpenAdd(false)
                         handleRefresher()
                         handleOffSuccess();
                    }, 1500);
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
               mbh: mbh,
               housing_equity: housing_equity,
               atm_passbook_fee: atm_passbook_fee,
               atm_status: atm_status,
               pb_account_number: pb_account_number,
               pb_account_number_series: pb_account_number_series,
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
               middlename === "" ||
               lastname === ""

          ) {
               handleOnError()
               setTimeout(() => {
                    handleOffError();
               }, 1500);
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

                    handleOnSuccess();
                    setTimeout(() => {
                         setOpenUpdate(false)
                         handleRefresher()
                         handleOffSuccess();
                    }, 1500);
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
                    handleOnSuccess();
                  
                    setTimeout(() => {
                         handleRefresher()
                         handleOffSuccess();
                         handleCancel();
                    }, 1500);
               }
          }
     }


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
     }


     const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Success</Alert> : ""}
                                 

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
                                   <div style={{ height: 600, width: '100%' }} >
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


                                   <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div></div>
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
                                                       label="KAYA ATM Card Number"
                                                       style={{ paddingBottom: "10px" }}
                                                       onChange={(e) => setkaya_atm_card_number(e.target.value)}
                                                       value={kaya_atm_card_number}
                                                  />
                                                  <TextField
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="KAYA ATM Savings Account Number"
                                                       style={{ paddingBottom: "10px" }}
                                                       onChange={(e) => setkaya_atm_savings_account_number(e.target.value)}
                                                       value={kaya_atm_savings_account_number}
                                                  />
                                                  <TextField
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
                                                       label="Housing Equity"
                                                       style={{ paddingBottom: "10px" }}
                                                       onChange={(e) => sethousing_equity(e.target.value)}
                                                       value={housing_equity}
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
                                                  />
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
                                                       label="KAYA ATM Card Number"
                                                       style={{ paddingBottom: "10px" }}
                                                       onChange={(e) => setkaya_atm_card_number(e.target.value)}
                                                       value={kaya_atm_card_number}
                                                  />
                                                  <TextField
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="KAYA ATM Savings Account Number"
                                                       style={{ paddingBottom: "10px" }}
                                                       onChange={(e) => setkaya_atm_savings_account_number(e.target.value)}
                                                       value={kaya_atm_savings_account_number}
                                                  />
                                                  <TextField
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
                                                       label="Housing Equity"
                                                       style={{ paddingBottom: "10px" }}
                                                       onChange={(e) => sethousing_equity(e.target.value)}
                                                       value={housing_equity}
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
                                                  />
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
                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )
}

export default Member