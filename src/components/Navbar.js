import * as React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import WorkIcon from '@mui/icons-material/Work';
import CoopLogo from '../images/one_happy_logo.jpg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { useAuthContext } from '../hooks/useAuthContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoneyIcon from '@mui/icons-material/Money';
import SavingsIcon from '@mui/icons-material/Savings';
import GroupsIcon from '@mui/icons-material/Groups';


const Container = styled.div`
     background-color: white;
     height: 100vh;
     width: 300px;
     color: #8d89b4;
`
const LogoContainer = styled.div`
     display: flex;
     justify-content: left;
     align-items: center;
     padding-left: 40px;
`
const Logo = styled.div`
     width: 200px;
     margin: 80px 0 50px 0;
     padding-left: 10px;
`
const SampleLogoContainer = styled.img`
     width: 70px;
`
const NavContainer = styled.div`
     width: 350px;
     padding-left: 100px;
`
const NavList = styled.div`
     padding: 10px;
`


const Navbar = () => {
     const { user } = useAuthContext()
     const currentUser = user.username;

     return (
          <Container>
               <LogoContainer>
                    <SampleLogoContainer src={CoopLogo}></SampleLogoContainer>
                    <Logo style={{ color: "purple", fontSize: "15px", fontWeight: "600" }}>One Happy Child</Logo>
               </LogoContainer>
               <List
                    sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                    component="nav">

                    {user && currentUser == "hhhc.bcadmin" &&
                         <div style={{ paddingLeft: "30px" }}>
                              <p style={{ color: "orange" }}>HR SYSTEM</p>
                         </div>}

                    {user && currentUser == "hhhc.bcadmin" &&
                         <Link to="/">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <DashboardIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Dashboard" />
                              </ListItemButton>
                         </Link>}
                    {user && currentUser == "hhhc.bcadmin" &&
                         <Link to="/employees">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <PeopleAltIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Employees" />
                              </ListItemButton>
                         </Link>}
                    {user && currentUser == "hhhc.bcadmin" &&
                         <Link to="/departments">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <WorkIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Departments" />
                              </ListItemButton>
                         </Link>}

                    {/* {user && currentUser == "hhhc.bcadmin" &&
                    <Link to="/salaries">
                         <ListItemButton>
                              <div style={{ paddingLeft: "40px" }}>
                                   <ListItemIcon>
                                        <PaidIcon />
                                   </ListItemIcon>
                              </div>
                              <ListItemText primary="Salaries" />
                         </ListItemButton>
                    </Link>}
                    {user && currentUser == "hhhc.bcadmin" &&
                    <Link to="/leaves">
                         <ListItemButton>
                              <div style={{ paddingLeft: "40px" }}>
                                   <ListItemIcon>
                                        <NoAccountsIcon />
                                   </ListItemIcon>
                              </div>
                              <ListItemText primary="Leaves" />
                         </ListItemButton>
                    </Link>} */}


                    {/* {user && currentUser == "hhhc.bcadmin" &&
                    <Link to="/credentials">
                         <ListItemButton>
                              <div style={{ paddingLeft: "40px" }}>
                                   <ListItemIcon>
                                        <PasswordIcon />
                                   </ListItemIcon>
                              </div>
                              <ListItemText primary="Credentials" />
                         </ListItemButton>
                    </Link>}  */}

                    {/* 
                    {user && currentUser == "hhhc.bcadmin" &&
                    <Link to="/credentials/signup">
                         <ListItemButton>
                              <div style={{ paddingLeft: "40px" }}>
                                   <ListItemIcon>
                                        <PasswordIcon />
                                   </ListItemIcon>
                              </div>
                              <ListItemText primary="Signup a user" />
                         </ListItemButton>
                    </Link>} */}
                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.payrollstaff" || currentUser == "hhhc.adminpayroll") &&
                         <Link to="/dtr">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <AccessTimeIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="DTR" />
                              </ListItemButton>
                         </Link>}
                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.payrollstaff" || currentUser == "hhhc.adminpayroll") &&
                         <Link to="/additionals">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <MoneyIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Additional Earnings & Deductions" />
                              </ListItemButton>
                         </Link>}
                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.payrollstaff" || currentUser == "hhhc.adminpayroll") &&
                         <Link to="/payroll">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <AttachMoneyIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Payroll" />
                              </ListItemButton>
                         </Link>}

                    {user && currentUser == "hhhc.bcadmin" &&
                         <div style={{ marginBottom: "70px" }}>

                         </div>}

                    {/* {user && currentUser != "hhhc.bcadmin" &&
                    <Link to="/employee/salary">
                         <ListItemButton>
                              <div style={{ paddingLeft: "40px" }}>
                                   <ListItemIcon>
                                        <AttachMoneyIcon />
                                   </ListItemIcon>
                              </div>
                              <ListItemText primary="My Salary" />
                         </ListItemButton>
                    </Link>} */}


                    <div style={{ paddingLeft: "30px" }}>
                         <p style={{ color: "orange" }}>COOPERATIVE SYSTEM</p>
                    </div>

                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.bcadmin") &&
                         <Link to="/customer">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <GroupsIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Customers" />
                              </ListItemButton>
                         </Link>}

                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.bcadmin") &&
                         <Link to="/product">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <InventoryIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Product & Services" />
                              </ListItemButton>
                         </Link>}


                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.bcadmin") &&
                         <Link to="/sales">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <ReceiptIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Sales & Transaction" />
                              </ListItemButton>
                         </Link>}
                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.cashier" || currentUser == "hhhc.bcadmin") &&
                         <Link to="/pos">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <PointOfSaleIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="POS" />
                              </ListItemButton>
                         </Link>}
                    
                         <Link to="/member">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <SavingsIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Savings" />
                              </ListItemButton>
                         </Link>
                    {/* {user && currentUser == "hhhc.bcadmin" &&
                         <Link to="/member">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <SavingsIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Savings" />
                              </ListItemButton>
                         </Link>} */}
                    {(user && currentUser == "hhhc.bcadmin" || currentUser == "hhhc.bcadmin") && //change
                         <Link to="/reports">
                              <ListItemButton>
                                   <div style={{ paddingLeft: "40px" }}>
                                        <ListItemIcon>
                                             <PointOfSaleIcon />
                                        </ListItemIcon>
                                   </div>
                                   <ListItemText primary="Reports" />
                              </ListItemButton>
                         </Link>}

               </List>
          </Container>














          // <header>
          //      <Container>
          //           <Logo>HR System</Logo>
          //           <NavContainer>
          //                <NavList>
          //                     <Link to='/'>  
          //                          <h1>Employees</h1>
          //                     </Link>
          //                </NavList>
          //                <NavList>
          //                     <Link to='/'>
          //                          <h1>Departments</h1>
          //                     </Link>
          //                </NavList>
          //                <NavList>
          //                     <Link to='/'>
          //                          <h1>Salary</h1>
          //                     </Link>
          //                </NavList>
          //                <NavList>
          //                     <Link to='/'>
          //                          <h1>Leaves</h1>
          //                     </Link>
          //                </NavList>
          //                <NavList>
          //                     <Link to='/'>
          //                          <h1>Credentials</h1>
          //                     </Link>
          //                </NavList>





          //           </NavContainer>

          //      </Container>
          // </header>
     )
}

export default Navbar