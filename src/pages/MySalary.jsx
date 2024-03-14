
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
    width: 1020px;
    height: 650px;
`
const CardContainer = styled.div`
    width: 1020px;
    height: 650px;
    display: flex;
    justify-content: space-between;
`
const Card = styled.div`
    background-color: white;
    height: 680px;
    max-width: 490px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
`
const CardTitle = styled.h1`
    color: #f8951d;
    padding-bottom: 30px;
    font-size: 25px;
`
const CardDescription = styled.p`
    color: #6d6d6d;
    padding-bottom: 10px;
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


const MySalary = (props) => {


     /**POST REQUESTS */
     const [employeeId, setEmployeeId] = useState('')
     const [firstname, setFirstname] = useState('')
     const [middlename, setMiddlename] = useState('')
     const [lastname, setLastname] = useState('')
     const [contract, setContract] = useState('')
     const [position, setPosition] = useState('')
     const [department, setDepartment] = useState('')
     const [baseSalary, setBaseSalary] = useState('')
     const [allowance, setAllowance] = useState('')
     const [total, setTotal] = useState('')
     const [query, setQuery] = useState('')


     const { user } = useAuthContext()
     const currentUser = user.username

     function checkAdult(age) {
          return age >= 18;
     }


     useEffect(() => {

          if (currentUser) {

               const fetchEmployee = async () => {
                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
                         //const response = await fetch('/api/employee/'+user.username, {
                         headers: {

                              'Authorization': `Bearer ${user.token}`
                         }
                    })
                    const json = await response.json()

                    if (response.ok) {
                         setEmployees(json)
                         setCurrentEmployee(json.filter(employee => {
                              return employee.employee_id === currentUser
                         }))

                    }
               }
               fetchEmployee();
          }
          else {
               return
          }
     }, [])
     const [employees, setEmployees] = useState([])
     const [currentEmployee, setCurrentEmployee] = useState([])

     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <CardContainer>
                                   <Card>
                                        <div>
                                             <CardTitle>
                                                  Job Information
                                             </CardTitle>
                                             <CardDescription>Employee ID: {currentEmployee.length && currentEmployee[0].employee_id}</CardDescription>
                                             <CardDescription>Name: {currentEmployee.length && currentEmployee[0].firstname + ' ' + currentEmployee[0].lastname}</CardDescription>
                                             <CardDescription>Department: {currentEmployee.length && currentEmployee[0].department}</CardDescription>
                                             <CardDescription>Contract: {currentEmployee.length && currentEmployee[0].contract}</CardDescription>

                                        </div>
                                   </Card>
                                   <Card>
                                        <div>
                                             <CardTitle>
                                                  Salary
                                             </CardTitle>
                                             <CardDescription>Job Title: {currentEmployee.length && currentEmployee[0].job_title}</CardDescription>
                                             <CardDescription>Base Salary: {currentEmployee.length && currentEmployee[0].base_salary}</CardDescription>
                                             <CardDescription>Allowance: {currentEmployee.length && currentEmployee[0].allowance}</CardDescription>
                                             <CardDescription>Total: {currentEmployee.length && currentEmployee[0].total_salary}</CardDescription>

                                        </div>
                                        <div>{ }</div>
                                   </Card>
                              </CardContainer>
                         </Main>
                    </Wrapper>
               </Container>
          </div>
     )

}

export default MySalary