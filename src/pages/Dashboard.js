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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';

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
const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`




const Dashboard = (props) => {

    const [departments, setDepartment] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/departments')
               const json = await response.json()

               if (response.ok) {
                    setDepartment(json)
               }
          }
          fetchDepartment();
     }, [])

     const [employees, setEmployee] = useState([])
     useEffect(() => {
          const fetchEmployees = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/employee')
               const json = await response.json()

               if (response.ok) {
                    setEmployee(json)
               }
          }
          fetchEmployees();
     }, [])

     const [leaves, setLeaves] = useState([])
     const [pendingLeaves, setPendingLeaves] = useState([]);
     useEffect(() => {
          const fetchLeaves = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/leaves')
               const json = await response.json()

               if (response.ok) {
                    setLeaves(json)
                    setPendingLeaves(json.filter(leave=>{
                         return leave.status === 'Pending'
                    }))
                    
                }
          }
          fetchLeaves();
     }, [])

    /**render or return different container per different navigation */
    return (

        <Container>
            <Wrapper>
                <Header title={props.title} user={props.user} />
                <CardContainer>
                    <Cards title="Total Employees" data={employees.length} color={violet} />
                    <Cards title="Total Departments" data={departments.length} color={yellow} />
                    <Cards title="New Password Reset" data="4" color={green} />
                </CardContainer>
                <CardContainer>
                    <Leaves title="Pending Leave Application" data={pendingLeaves.length} color={orange} />
                </CardContainer>
               
            </Wrapper>
        </Container>

    ) 
}

export default Dashboard