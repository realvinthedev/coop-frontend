import React from 'react'
import styled from 'styled-components'
import Cards from '../components/Cards'
import Leaves from '../components/Leaves'
import green from '../images/radial-green.png'
import purple from '../images/radial-purple.png'
import violet from '../images/radial-violet.png'
import orange from '../images/radial-orange.png'
import yellow from '../images/radial-yellow.png'
import Header from '../components/Header'
import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import bg from '../images/websitebg.jpg';
import { useAuthContext } from '../hooks/useAuthContext'
import Calendar from 'react-calendar';
import LongCard from '../components/LongCard'
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
    //background-image: url(${bg});
    background-size: cover;
    background-repeat: repeat;
    background-position: right;
    height: 100vh;
    width: 1366px;
    padding: 50px 100px 100px 100px;
   
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 1366px) {
    justify-content: left;
    align-items: left;
  }
`
const CardContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`
const UpdateContainer = styled.div`
    display: flex;
    justify-content: right;
    align-items: right;
`
const Update = styled.button`
     background-color: purple;
    height: 150px;
    width: 320px;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    margin: 15px;
    color: white;
`
const MemberCardContainer = styled.div`
    background-color: white;
    height: 150px;
    width: 320px;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    justify-content: left;
    
`


const Dashboard = (props) => {
     const [value, onChange] = useState(new Date());
     const { user } = useAuthContext()
     const currentUser = user.username;
     const [departments, setDepartment] = useState([])
     const [net, setNet] = useState([])
     const [profit, setProft] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/departments', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setDepartment(json)
               }
          }

          if (user) {
               fetchDepartment();
          }
     }, [user])

     const [employees, setEmployee] = useState([])
     useEffect(() => {
          const fetchEmployees = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setEmployee(json)
               }
          }

          if (user) {
               fetchEmployees();
          }



     }, [user])
     const [product, setProduct] = useState([])
     useEffect(() => {
          const fetchEmployees = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/product', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setProduct(json)
               }
          }

          if (user) {
               fetchEmployees();
          }



     }, [user])

     const [leaves, setLeaves] = useState([])
     const [pendingLeaves, setPendingLeaves] = useState([]);
     useEffect(() => {
          const fetchLeaves = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/leaves', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setLeaves(json)
                    setPendingLeaves(json.filter(leave => {
                         return leave.status === 'Pending'
                    }))
               }
          }
          if (user) {
               fetchLeaves();
          }
     }, [user])

     const [pos, setpos] = useState([]);
     const [gross, setGross] = useState([]);
     useEffect(() => {
          const fetchSales = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/pos', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    let pos_total = 0;
                    let pos_cost_total = 0;
                    // setpos(json)
                    json.forEach((item) => {
                         pos_total += item.pos_total
                         pos_cost_total += item.pos_cost_total
                    });
                    setGross(pos_total);
                    setNet(pos_cost_total);
                    setProft(pos_total && pos_total-pos_cost_total);
               }
          }
          if (user) {
               fetchSales();
          }

     }, [user])
     const [members, setMembers] = useState([]);
     useEffect(() => {
          const fetchMembers = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/member/', {
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
     }, [user])

     useEffect(() => {
          let pos_total = 0;

          pos.forEach((item) => {
               pos_total += item.pos_total
          });
          setGross(pos_total);
     }, [user]);

     useEffect(() => {
          let pos_net_total = 0;
          pos.forEach((item) => {
               pos_net_total += item.pos_cost_total
          });
          setNet(pos_net_total);
     }, [user]);


     const [openUpdate, setOpenUpdate] = useState(false);
     const handleCloseUpdate = () => {
          setOpenUpdate(false);
     }
     const handleOpenUpdate = () => {
          setOpenUpdate(true);
     }
     /**render or return different container per different navigation */
     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Header title={props.title} user={props.user} />
                         {user && currentUser == "hhhc.bcadmin" &&
                              <div style={{ width: "100%" }}>
                                   <CardContainer>
                                        <Cards title="Total Employees" data={employees.length} color={violet} />
                                        <Cards title="Total Departments" data={departments.length} color={yellow} />
                                        <Cards title="Total Products" data={product.length} color={violet} />
                                   </CardContainer>
                                   <CardContainer>
                                        <LongCard title="Total Gross Income" data={gross ? gross.toLocaleString() : 0} title2="Total Actual Cost" data2={net? net.toLocaleString() : 0} title3="Total Net Profit" data3={profit? profit.toLocaleString() : 0} color={yellow} />
                                        <Cards title="Total Savings Member" data={members.length} color={violet} />
                                   </CardContainer>
                                   <CardContainer>

                                       
                                   </CardContainer>
                                   <UpdateContainer>
                                   </UpdateContainer>

                              </div>}
                    </Wrapper>
               </Container>
          </div>
     )
}

export default Dashboard