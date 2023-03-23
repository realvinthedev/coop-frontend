
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Alert } from '@mui/material';
import { PaddingRounded } from '@mui/icons-material';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
const Card = styled.div`
    background-color: white;
    height: 680px;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;
    overflow: scroll;
`
const FormContainer = styled.div`
     display: flex;
     justify-content: space-between;
     margin-bottom: 20px;
`
const EditDeleteContainer = styled.div`
    display: flex;
    justify-content: right;
`
const ButtonContainer = styled.div`
     display: flex;
     justify-content: space-between;
`
const SearchContainer = styled.div`
     display: flex;
     padding-bottom: 30px;
`

const Sales = (props) => {

     const { user } = useAuthContext()
     const [date_from, setdate_from] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const [date_to, setdate_to] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const [filtered_data, setfiltered_data] = useState([])

     const [sales, setsales] = useState([])
     useEffect(() => {
          const fetchSales = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/pos', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const date = item.pos_date
                         return date >= date_from && date <= date_to

                    });
                    //setfiltered_data(filteredData)
                    //setsales(json)
                    setsales(filteredData)
               }
          }
          if (user) {
               fetchSales();
          }

     }, [date_to, date_from])


     const convertDateToStringFrom = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setdate_from(dateString)
     };
     const convertDateToStringTo = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setdate_to(dateString)
     };

     function getRowHeight(params) {
          const lineHeight = 20; // Set the desired line height
          const itemsHeight = params.value?.length * lineHeight || 0;
          const padding = 120; // Set the desired padding
          return itemsHeight + padding;
        }

     const columns = [
          { field: 'pos_date', headerName: 'Date', width: 150 },
          { field: 'pos_transaction_id', headerName: 'Transaction ID', width: 200 },
          { field: 'pos_total', headerName: 'Total', width: 150 },
          {
               field: 'pos_items',
               headerName: 'Items',
               width: 1000,
               renderCell: (params) => {
                    return (
                         <table>
                              <thead>
                                   <tr>
                                        <th style={{ paddingRight: "200px" }}>Name</th>
                                        <th style={{ paddingRight: "40px" }}>Quantity</th>
                                        <th style={{ paddingRight: "40px" }}>Price</th>
                                        <th style={{ paddingRight: "40px" }}>Total</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {params.value.map((item, index) => (
                                        <tr key={index}>
                                             <td>{item.product_name}</td>
                                        
                                             <td>{item.product_quantity}</td>
                                             <td>{item.product_selling_price}</td>
                                             <td>PHP {item.product_total}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    );
               },
          },
     ];


     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   <div style={{ display: "flex" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                             <DatePicker
                                                  label="Date From"
                                                  value={date_from}
                                                  inputFormat="MM-DD-YYYY"
                                                  onChange={convertDateToStringFrom}
                                                  renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px", marginRight: "20px" }}{...params} error={false} />}
                                             />
                                             <DatePicker
                                                  label="Date To"
                                                  value={date_to}
                                                  inputFormat="MM-DD-YYYY"
                                                  onChange={convertDateToStringTo}
                                                  renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                             />

                                        </LocalizationProvider>

                                   </div>
                                   <div style={{ height: 475, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={sales}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[5]}
                                             getRowHeight={getRowHeight}
                                        //onRowClick={handleRowClick}
                                        />
                                   </div>
                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )

}

export default Sales