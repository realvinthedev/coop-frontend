import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
    background-color: white;
    height: 150px;
    width: 350px;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    justify-content: space-between;
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
const Cards = (props) => {
    return (
        
        <Container>
               <TextContainer>
                    <p style={{color: "#8d89b4"}}>{props.title}</p>
                    <h1 style={{fontSize: "35px", fontWeight: "500"}}>{props.data}</h1>
               </TextContainer>
               <ChartContainer>
                    <Chart src={props.color}/>
               </ChartContainer>
        </Container>
    )
}

export default Cards