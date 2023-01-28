import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Container = styled.div`
    background-color: #f0f2f9;
    height: 100px;
    width: 1020px;
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const UserContainer = styled.div`
     display: flex;
     width: 300px;
     justify-content: right;
`
const Header = (props) => {
     return (

          <Container>
               <h1 style={{ fontSize: "30px"}}>{props.title}</h1>
               <UserContainer>
                    <AccountCircleIcon/>
                    <h1  style={{ paddingLeft: "10px"}}>Hello {props.user}</h1>
               </UserContainer>
          </Container>
     )
}

export default Header