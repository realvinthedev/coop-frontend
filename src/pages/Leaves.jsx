import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'


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
    flex-direction: column;
    align-items: center;
    margin-top: 200px;
`

const Leaves = (props) => {
     /**render or return different container per different navigation */
     return (

          <Container>
               <Wrapper>
                    <Header title={props.title} user={props.user} />
                    <CardContainer>
                         <div>{"This feature will be up on next update."}</div>
                         <div>{"Here, you can see all employee's leaves as well as add, update, delete, and approve/decline leaves."}</div>
                    </CardContainer>
               </Wrapper>
          </Container>

     )
}

export default Leaves