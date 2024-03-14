
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

const Cards = styled.div`
    height: 340px;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    justify-content: left;
    margin: 15px;
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
    padding-bottom: 20px;
`

/**GET REQUESTS */

const savings_columns = [
     { field: 'date', headerName: 'Date', width: 100 },
     { field: 'particulars', headerName: 'Particulars', width: 300 },
     { field: 'type', headerName: 'Type', width: 200 },
     { field: 'amount', headerName: 'Amount', width: 200 },
     { field: 'reference_document', headerName: 'Reference Document', width: 200 },
     { field: 'remarks', headerName: 'Remarks', width: 300 },
];








const MemberIndividual = (props) => {

     /**POST REQUESTS */
     const [refresher, setRefresher] = useState(0)
     const [member_id, setmember_id] = useState('')

     const [tabvalue, settabvalue] = React.useState('1');
     const [savings, setsavings] = useState([]);
     const [member, setmember] = useState([]);

     //tobe added
     const [firstname, setfirstname] = useState('')
     const [lastname, setlastname] = useState('')
     const [credit_part_membershipfee, setcredit_part_membershipfee] = useState(0);
     const [credit_part_captial, setcredit_part_captial] = useState(0);
     const [credit_part_savings, setcredit_part_savings] = useState(0);
     const [credit_part_loans, setcredit_part_loans] = useState(0);
     const [credit_part_kayasavings, setcredit_part_kayasavings] = useState(0);
     const [credit_part_others, setcredit_part_others] = useState(0);
     const { user } = useAuthContext()
     const currentUser = user.username

     /**useEffects */
     /**individual */
     useEffect(() => {
          if (currentUser) {
               const fetchSavings = async () => {
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/savings/', {
                    //const response = await fetch('https://coop-back-zqr6.onrender.com/api/savings/' + member_id, {
                         headers: {
                              'Authorization': `Bearer ${user.token}`
                         }
                    })
                    const json = await response.json()
                    if (response.ok) {
                        // setsavings(json)
                         setsavings(json.filter(saving => {
                              return saving.member_id === currentUser
                         }))
                        
                    }
               }
               if (user) {
                    fetchSavings();
               }
          }
          console.log(savings)
     }, [user, refresher])

     useEffect(() => {
          const fetchMembers = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/member/', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    setmember(json.filter(member => {
                         return member.member_id === currentUser
                    }))
                    

               }
             
          }
          if (user) {
               fetchMembers();
          }
     }, [user, refresher])
     useEffect(() => {
         
     }, [user])

     useEffect(() => {
          let creditTotal_membershipfee = 0;
          let debitTotal_membershipfee = 0;

          let creditTotal_capital = 0;
          let debitTotal_capital = 0;

          let creditTotal_savings = 0;
          let debitTotal_savings = 0;

          let creditTotal_loans = 0;
          let debitTotal_loans = 0;

          let creditTotal_kaya = 0;
          let debitTotal_kaya = 0;

          let creditTotal_others = 0;
          let debitTotal_others = 0;

          savings.forEach(saving => {
               if (saving.particulars === "MEMBERSHIP FEE") {
                    if (saving.type === "CREDIT") {
                         creditTotal_membershipfee += parseFloat(saving.amount)
                    }
                    else {
                         debitTotal_membershipfee += parseFloat(saving.amount)
                    }
               }
               else if (saving.particulars === "CAPITAL") {
                    if (saving.type === "CREDIT") {
                         creditTotal_capital += parseFloat(saving.amount)
                    }
                    else {
                         debitTotal_capital += parseFloat(saving.amount)
                    }
               }
               else if (saving.particulars === "SAVINGS") {
                    if (saving.type === "CREDIT") {
                         creditTotal_savings += parseFloat(saving.amount)
                    }
                    else {
                         debitTotal_savings += parseFloat(saving.amount)
                    }
               }
               else if (saving.particulars === "LOANS") {
                    if (saving.type === "CREDIT") {
                         creditTotal_loans += parseFloat(saving.amount)
                    }
                    else {
                         debitTotal_loans += parseFloat(saving.amount)
                    }
               }
               else if (saving.particulars === "KAYA SAVINGS") {
                    if (saving.type === "CREDIT") {
                         creditTotal_kaya += parseFloat(saving.amount)
                    }
                    else {
                         debitTotal_kaya += parseFloat(saving.amount)
                    }
               }
               else if (saving.particulars === "OTHERS") {
                    if (saving.type === "CREDIT") {
                         creditTotal_others += parseFloat(saving.amount)
                    }
                    else {
                         debitTotal_others += parseFloat(saving.amount)
                    }
               }
          })

          let totalmembership = creditTotal_membershipfee - debitTotal_membershipfee

          setcredit_part_membershipfee(totalmembership)
          //setdebit_part_membershipfee(totalmembership)

          let totalcaptial = creditTotal_capital - debitTotal_capital
          setcredit_part_captial(totalcaptial)
          //setdebit_part_captial(debitTotal_capital)

          let totalsavings = creditTotal_savings - debitTotal_savings
          setcredit_part_savings(totalsavings)
          //setdebit_part_savings(debitTotal_savings)

          let totalkaya = creditTotal_kaya - debitTotal_kaya
          setcredit_part_kayasavings(totalkaya)
          //setdebit_part_kayasavings(debitTotal_kaya)

          let totalloans = debitTotal_loans - creditTotal_loans
          setcredit_part_loans(totalloans)
          //setdebit_part_loans(debitTotal_loans)

          let totalothers = creditTotal_others - debitTotal_others
          setcredit_part_others(totalothers)
          //setdebit_part_others(debitTotal_others)

     }, [savings])


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
                                                  <TabList aria-label="lab API tabs example">
                                                       <Tab label="Savings" value="1" />

                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
                                                  <CardContainer>
                                                       <Cards style={{ backgroundColor: "#5D35B2", color: "white", width: "500px" }}>
                                                            <div style={{ marginBottom: "20px" }}>
                                                                 <p style={{ fontSize: "40px", margin: 0 }}>{member[0]?.firstname}</p>
                                                                 <p style={{ color: "#a7a7a7" }}>Firstname</p>
                                                                 <p style={{ fontSize: "40px", margin: 0 }}>{member[0]?.lastname}</p>
                                                                 <p style={{ color: "#a7a7a7" }}>Lastname</p>
                                                            </div>
                                                       </Cards>
                                                       <Cards style={{ backgroundColor: "#1D88E6", color: "white", width: "100%" }}>
                                                            <div style={{ paddingRight: "200px" }}>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{credit_part_membershipfee}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>MEMBERSHIP FEE</p>
                                                                 </div>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{credit_part_captial}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>TOTAL CAPITAL</p>
                                                                 </div>
                                                                 <div>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{credit_part_savings}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>TOTAL SAVINGS</p>
                                                                 </div>
                                                            </div>
                                                            <div>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{credit_part_loans}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>LOAN BALANCE</p>
                                                                 </div>
                                                                 <div style={{ marginBottom: "20px" }}>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{credit_part_kayasavings}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>TOTAL SPECIAL SAVINGS</p>
                                                                 </div>
                                                                 <div>
                                                                      <p style={{ fontSize: "40px", margin: 0 }}>P{credit_part_others}</p>
                                                                      <p style={{ color: "#e0e0e0" }}>OTHERS</p>
                                                                 </div>
                                                            </div>
                                                       </Cards>
                                                  </CardContainer>
                                                  <CardContainer>
                                                       <div style={{ height: 500, width: '100%' }} >
                                                            <DataGrid
                                                                 getRowId={(row) => row._id}
                                                                 rows={savings}
                                                                 columns={savings_columns}
                                                                 pageSize={7}
                                                                 rowsPerPageOptions={[5]}
                                                            />
                                                       </div>
                                                  </CardContainer>
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

export default MemberIndividual