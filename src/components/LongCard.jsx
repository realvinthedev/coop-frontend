import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
    background-color: white;
    height: 150px;
    width: 730px;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    margin: 15px;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Chart = styled.img`
    width: 100px;
    height: 100px;
`
const LongCard = (props) => {
    return (
        
        <Container>
              <TextContainer style={{marginRight: "100px"}}>
                    <p style={{color: "#8d89b4"}}>{props.title}</p>
                    <h1 style={{fontSize: "35px", fontWeight: "500"}}>{props.data}</h1>
               </TextContainer>
               <TextContainer style={{marginRight: "100px"}}>
                    <p style={{color: "#8d89b4"}}>{props.title2}</p>
                    <h1 style={{fontSize: "35px", fontWeight: "500"}}>{props.data2}</h1>
               </TextContainer>
               <TextContainer >
                    <p style={{color: "#8d89b4"}}>{props.title3}</p>
                    <h1 style={{fontSize: "35px", fontWeight: "500"}}>{props.data3}</h1>
               </TextContainer>
             
        </Container>
    )
}

export default LongCard