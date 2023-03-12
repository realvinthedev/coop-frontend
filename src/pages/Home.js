import React from 'react'
import styled from 'styled-components'
import Dashboard from './Dashboard'
import Navbar from '../components/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Department from './Departments'
import Employees from './Employees'
import Salaries from './Salaries'
import Leaves from './Leaves'
import Credentials from './Credentials'
import Signup from './Signup'
import { Login } from './Login'
import { useAuthContext } from '../hooks/useAuthContext';
import MyLeaves from './MyLeaves'
import MySalary from './MySalary'
import Dtr from './Dtr'

/**Styled Components */
const Container = styled.div`
    background-color: #f0f2f9;
    height: 100vh;
    display: flex;
`

const Home = () => {
    const { user } = useAuthContext()
    
    return (

        <div>
            <Container>

                <Routes>
                    <Route
                        path="/"
                        element={user ? <Dashboard title="Dashboard" user="User" /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/departments"
                        element={user ? <Department title="Department" user="User" /> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/employees"
                        element={user ?<Employees title="Employees" user="User" /> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/salaries"
                        element={user ?<Salaries title="Salaries" user="User" /> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/leaves"
                        element={user ?<Leaves title="Leaves" user="User" /> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/credentials"
                        element={user ?<Credentials title="Credentials" user="User" /> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/credentials/signup"
                        element={user ?<Signup title="Signup a user" user="User" /> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/dtr"
                        element={user ?<Dtr title="DTR" user="User" /> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" title="Dashboard" user="User" />}
                    />
                     <Route
                        path="/employee/applyleaves"
                        element={user ? <MyLeaves title="My Leaves" user="User"/> : <Navigate to="/" title="Dashboard" user="User" />}
                    />
                     <Route
                        path="/employee/salary"
                        element={user ? <MySalary title="My Salary" user="User"/> : <Navigate to="/" title="Dashboard" user="User" />}
                    />
                  
                </Routes>

            </Container>
        </div>
    )
}

export default Home