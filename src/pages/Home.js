import React from 'react'
import styled from 'styled-components'
import Dashboard from './Dashboard'
import Navbar from '../components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Department from './Departments'
import Employees from './Employees'
import Salaries from './Salaries'
import Leaves from './Leaves'
import Credentials from './Credentials'


/**Styled Components */
const Container = styled.div`
    background-color: #f0f2f9;
    height: 100vh;
    display: flex;
`

const Home = () => {
    return (
        <BrowserRouter>
            <Container>
                <Navbar></Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={<Dashboard title="Dashboard" user="User" />}
                    />
                    <Route
                        path="/departments"
                        element={<Department title="Department" user="User" />}
                    />
                    <Route
                        path="/employees"
                        element={<Employees title="Employees" user="User" />}
                    />
                    <Route
                        path="/salaries"
                        element={<Salaries title="Salaries" user="User" />}
                    />
                    <Route
                        path="/leaves"
                        element={<Leaves title="Leaves" user="User" />}
                    />
                    <Route
                        path="/credentials"
                        element={<Credentials title="Credentials" user="User" />}
                    />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default Home