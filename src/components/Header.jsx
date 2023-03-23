import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import  { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Container = styled.div`
    background-color: #f0f2f9;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const UserContainer = styled.div`
     display: flex;
     width: 300px;
     justify-content: right;
     align-items: center;
`
const Header = (props) => {

     const { logout } = useLogout()
     const {user} = useAuthContext()
     const handleLogout = () => {
          logout()
     }
     return (

          <Container>
               <h1 style={{ fontSize: "30px"}}>{props.title}</h1>
               <UserContainer>
                    <AccountCircleIcon/>
                    <h1 style={{ paddingRight: "30px"}}>Hello <span style={{ color: "#f8951d"}}>{user  && user.username}</span></h1>
                    <div><button onClick={handleLogout}>Logout</button></div>
               </UserContainer>
          </Container>
     )
}

export default Header