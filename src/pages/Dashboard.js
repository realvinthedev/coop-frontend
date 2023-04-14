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
    background-image: url(${bg});
    background-size: cover;
    background-repeat: repeat;
    background-position: right;
    height: 100vh;
    width: 1600px;
    padding: 50px 100px 100px 100px;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const CardContainer = styled.div`
    display: flex;
    justify-content: center;
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

     const { user } = useAuthContext()
     const currentUser = user.username;
     const [departments, setDepartment] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/departments', {
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/employee', {
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/product', {
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/leaves', {
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
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/pos', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    let pos_total = 0;
                    // setpos(json)
                    json.forEach((item) => {
                         pos_total += item.pos_total
                    });
                    setGross(pos_total);
               }
          }
          if (user) {
               fetchSales();
          }

     }, [user])

     useEffect(() => {
          let pos_total = 0;

          pos.forEach((item) => {
               pos_total += item.pos_total
          });
          setGross(pos_total);
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
                         {user && currentUser == "admin" &&
                              <div>
                                   <CardContainer>
                                        <Cards title="Total Employees" data={employees.length} color={violet} />
                                        <Cards title="Total Departments" data={departments.length} color={yellow} />
                                        <Cards title="Total Products" data={product.length} color={violet} />
                                   </CardContainer>
                                   <CardContainer>

                                        <Cards title="Total Gross Income" data={gross ? gross.toLocaleString() : 0} color={yellow} />
                                        <Update
                                             onClick={handleOpenUpdate}
                                        >What's New?</Update>
                                        {/* <Leaves title="Pending Leave Application" data={pendingLeaves.length} color={orange} /> */}
                                   </CardContainer>
                                   <UpdateContainer>

                                   </UpdateContainer>

                                   <Dialog
                                        open={openUpdate}
                                        onClose={handleCloseUpdate}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth
                                        maxWidth="sm"
                                   >
                                        <DialogTitle id="alert-dialog-title">
                                             <h2>{"System Update"}</h2>
                                        </DialogTitle>
                                        <DialogContent>
                                             <DialogContentText id="alert-dialog-description">
                                                  <h1 style={{ color: "purple", paddingBottom: "10px" }}>New Update: 4/15/2023</h1>
                                                  <p>DTR - Bulk searching by Employee and Month for easy management.</p>
                                                  <h1 style={{ color: "purple", paddingBottom: "10px" }}>New Update: 4/13/2023</h1>
                                                  <p>Added "My Savings" feature. When creating one in masterlist, username and password is the same as Member ID</p>




                                             </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                             <Button onClick={handleCloseUpdate} autoFocus>
                                                  Close
                                             </Button>
                                        </DialogActions>
                                   </Dialog>
                              </div>}



                    </Wrapper>
                    {user && currentUser != "admin" &&
                         <MemberCardContainer>
                              <p>Hi there, see "My Savings" for your savings</p>
                         </MemberCardContainer>}
               </Container>
          </div>
     )
}

export default Dashboard