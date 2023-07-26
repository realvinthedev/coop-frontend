
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
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PaddingRounded } from '@mui/icons-material';
import SalesPrinter from '../components/SalesPrinter';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver-es';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { toast } from 'react-toastify';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';


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
const SalesList = styled.div`
     width: 100%;
     padding: 10px 20px 10px 20px;
     border: 1px solid #dbdbdb;
     border-radius: 20px;
     background-color: white;
font-size: 14px;
     margin-bottom: 10px;
`
const Main = styled.div`
    width: 1400px;
    height: 750px;
`
const Card = styled.div`
    background-color: white;
    height: 750px;
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
     const [tabvalue, settabvalue] = React.useState('1');
     const { user } = useAuthContext()
     const [daily_date, setdaily_date] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const [datefrom, setdatefrom] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const [dateto, setdateto] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
     };

     const [selectedmonth, setselectedmonth] = useState("01")
     const [selectedyear, setselectedyear] = useState("2023")
     const handleMonthChange = (e) => {
          setselectedmonth(e.target.value)
     }
     const handleYearChange = (e) => {
          setselectedyear(e.target.value)
     }

     const appRef = useRef(null);
     const captureScreenshot = async () => {
          const element = appRef.current;
          const rect = element.getBoundingClientRect();
          const totalHeight = element.scrollHeight;
          const viewportHeight = window.innerHeight;
          const numScreenshots = Math.ceil(totalHeight / viewportHeight);
          const canvas = document.createElement('canvas');
          canvas.width = rect.width;
          canvas.height = totalHeight;

          const ctx = canvas.getContext('2d');
          let yOffset = 0;

          for (let i = 0; i < numScreenshots; i++) {
               const scrollTop = i * viewportHeight;
               window.scrollTo(0, scrollTop);
               await html2canvas(element, {
                    scrollY: -scrollTop, // This negative value ensures proper scrolling
                    windowWidth: rect.width,
                    windowHeight: viewportHeight,
                    x: 0,
                    y: 0,
                    canvas,
               });
               ctx.drawImage(canvas, 0, yOffset);
               yOffset += viewportHeight;
          }

          canvas.toBlob((blob) => {
               saveAs(blob, 'sales.png');
          });

          // Reset scroll position to the top
          window.scrollTo(0, 0);
     };
     // const captureScreenshot = () => {
     //      const element = appRef.current;
     //      html2canvas(element).then((canvas) => {
     //           canvas.toBlob((blob) => {
     //                saveAs(blob, 'sales');
     //           });
     //      });
     // };

     const [transactionid, settransactionid] = useState("")
     const [sales, setsales] = useState([])
     useEffect(() => {
          const fetchSales = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/pos', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const datetime = item.pos_date
                         const date = datetime.split(' ')[0];
                         return date == daily_date
                    });

                    setsales(filteredData)
               }
          }
          if (user) {
               fetchSales();
          }

     }, [user, daily_date])

     const [monthlysales, setmonthlysales] = useState([])

     useEffect(() => {
          const fetchSales = async () => {
               const response = await fetch('https://inquisitive-red-sun-hat.cyclic.app/api/pos', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {

                    const filteredData = json.filter(item => {
                         const datetime = item.pos_date //1-1-2023 09:30
                         const date = datetime.split(' ')[0]; //1-1-2023
                         const month = date.slice(0, 2) //01
                         const year = date.slice(6, 10) //2023

                         return month === selectedmonth && year === selectedyear;

                    });
                    setmonthlysales(filteredData) //confirmed that has a value
               }
          }
          if (user) {
               fetchSales();
          }

     }, [user, selectedmonth, selectedyear])


     // const handleSelectedMonthData = () => {
     //      const filteredData = sales.filter(item => {
     //           const datetime = item.pos_date //1-1-2023 09:30
     //           const date = datetime.split(' ')[0]; //1-1-2023
     //           const month = date.slice(0, 2) //01
     //           const year = date.slice(6, 10) //2023
     //           return month === selectedmonth && year === selectedyear;
     //      });

     //      setmonthlysales(filteredData)
     // }

     // useEffect(() => {
     //      handleSelectedMonthData()
     // }, [selectedmonth, selectedyear])




     const [gross, setGross] = useState(0);
     const [net, setNet] = useState(0);
     const [cost, setCost] = useState(0);

     useEffect(() => {
          let pos_total = 0;
          sales.forEach((item) => {
               pos_total += item.pos_total

          });
          setGross(pos_total);
     }, [sales])

     useEffect(() => {
          let pos_cost_total = 0;
          let total = 0;
          sales.forEach((item) => {
               pos_cost_total += item.pos_cost_total
          });
          total = gross - pos_cost_total
          setNet(total)
     }, [gross])

     useEffect(() => {
          let pos_cost_total = 0;
          sales.forEach((item) => {
               pos_cost_total += item.pos_cost_total
          });
          setCost(pos_cost_total)
     }, [sales])









     const [monthlygross, setmonthlygross] = useState(0);
     const [monthlynet, setmonthlynet] = useState(0);
     const [monthlycost, setmonthlycost] = useState(0);

     useEffect(() => {
          let pos_total = 0;
          monthlysales.forEach((item) => {
               pos_total += item.pos_total

          });
          setmonthlygross(pos_total);
     }, [monthlysales])

     useEffect(() => {
          let pos_cost_total = 0;
          let total = 0;
          monthlysales.forEach((item) => {
               pos_cost_total += item.pos_cost_total
          });
          total = monthlygross - pos_cost_total
          setmonthlynet(total)
     }, [monthlygross])

     useEffect(() => {
          let pos_cost_total = 0;
          monthlysales.forEach((item) => {
               pos_cost_total += item.pos_cost_total
          });
          setmonthlycost(pos_cost_total)
     }, [monthlysales])










     const convertDateToStringDailyDate = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setdaily_date(dateString)

     };
     const convertDateToStringTo = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setdateto(dateString)

     };
     const convertDateToStringFrom = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setdatefrom(dateString)

     };

     function getRowHeight(params) {
          const lineHeight = 20; // Set the desired line height
          const itemsHeight = params.value?.length * lineHeight || 0;
          const padding = 120; // Set the desired padding
          return itemsHeight + padding;
     }

     const [id, setId] = useState('')
     const handleRowClick = (params) => {
          settransactionid(params.row.pos_transaction_id);
     }


     const columns = [
          { field: 'pos_date', headerName: 'Datetime', width: 150 },
          { field: 'pos_transaction_id', headerName: 'Transaction ID', width: 120 },
          { field: 'pos_user', headerName: 'Cashier', width: 150 },
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
                                        <th style={{ paddingRight: "200px" }}>Item/s</th>
                                        <th style={{ paddingRight: "40px" }}>Quantity</th>
                                        <th style={{ paddingRight: "40px" }}>Cost Price</th>
                                        <th style={{ paddingRight: "40px" }}>Selling Price</th>
                                        <th style={{ paddingRight: "40px" }}>Sub Total</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {params.value.map((item, index) => (
                                        <tr key={index}>
                                             <td>{item.product_name}</td>
                                             <td>{item.product_quantity}</td>
                                             <td>{item.product_cost_price}</td>
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

     const handleGoToDailySales = () => {
          settabvalue('1')
     }
     const handleGoToByProduct = () => {
          settabvalue('2')
     }
     const handleGoToMonthlySales = () => {
          settabvalue('3')
     }
     const handleChange = (event, newValue) => {
          settabvalue(newValue);
     };

     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   <Box>
                                        <TabContext value={tabvalue}>
                                             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                       <Tab label="Daily" value="1" />
                                                       <Tab label="By Product" value="2" onClick={handleGoToByProduct} />
                                                       <Tab label="Monthly Sales" value="3" onClick={handleGoToMonthlySales} />
                                                  </TabList>
                                             </Box>
                                             <TabPanel value="1">
                                                  <div>
                                                       <div style={{ display: "flex", width: "200px" }}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                 <DatePicker
                                                                      label="Choose a day"
                                                                      value={daily_date}
                                                                      inputFormat="MM-DD-YYYY"
                                                                      onChange={convertDateToStringDailyDate}
                                                                      renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px", marginRight: "20px" }}{...params} error={false} />}
                                                                 />
                                                            </LocalizationProvider>

                                                       </div>
                                                       {/* <div style={{ height: 475, width: '100%', borderRight: '1px solid #ccc' }}>
                                                            <DataGrid
                                                                 getRowId={(row) => row._id}
                                                                 rows={sales}
                                                                 columns={columns}
                                                                 pageSize={7}
                                                                 rowsPerPageOptions={[5]}
                                                                 getRowHeight={getRowHeight}
                                                                 onRowClick={handleRowClick}
                                                            />
                                                       </div> */}
                                                       <div style={{ backgroundColor: "white", padding: "0 30px 30px 0px", width: "100%", height: "500px", overflow: "scroll" }}>
                                                            <div>
                                                                 {sales && sales.length > 0 ? (
                                                                      sales.map((sales, index) => (
                                                                           <SalesList key={index}>

                                                                                <TableContainer
                                                                                     style={{ width: "100%" }} >
                                                                                     <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                          <TableHead>
                                                                                               <TableCell >Datetime</TableCell>
                                                                                               <TableCell >TRANS ID</TableCell>
                                                                                               <TableCell >Cashier</TableCell>
                                                                                               <TableCell >Total</TableCell>
                                                                                               <TableCell >Items</TableCell>
                                                                                          </TableHead>
                                                                                          <TableBody>
                                                                                               <TableRow>
                                                                                                    <TableCell >{sales.pos_date}</TableCell>
                                                                                                    <TableCell >{sales.pos_transaction_id}</TableCell>
                                                                                                    <TableCell >{sales.pos_user}</TableCell>
                                                                                                    <TableCell >{sales.pos_total}</TableCell>
                                                                                                    <TableCell>

                                                                                                         <table>
                                                                                                              <thead>
                                                                                                                   <tr>
                                                                                                                        <th style={{ paddingRight: "200px" }}>Item/s</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Quantity</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Cost Price</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Selling Price</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Sub Total</th>
                                                                                                                   </tr>
                                                                                                              </thead>
                                                                                                              <tbody>
                                                                                                                   {sales.pos_items.map((item, index) => (
                                                                                                                        <tr key={index}>
                                                                                                                             <td>{item.product_name}</td>
                                                                                                                             <td>{item.product_quantity}</td>
                                                                                                                             <td>{item.product_cost_price}</td>
                                                                                                                             <td>{item.product_selling_price}</td>
                                                                                                                             <td>PHP {item.product_total}</td>
                                                                                                                        </tr>
                                                                                                                   ))}
                                                                                                              </tbody>
                                                                                                         </table>
                                                                                                    </TableCell>
                                                                                               </TableRow>
                                                                                          </TableBody>
                                                                                     </Table>
                                                                                </TableContainer>
                                                                           </SalesList>
                                                                      ))
                                                                 ) : (
                                                                      <div style={{ display: "flex", justifyContent: "center", marginTop: "180px", alignItems: "center", flexDirection: "column" }}>
                                                                           <p>No transaction on selected date</p>
                                                                      </div>
                                                                 )
                                                                 }
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px" }} >


                                                                 {<div style={{ display: "flex", justifyContent: "right" }}>
                                                                      <label style={{ marginRight: "30px" }}>Total Actual Cost: {cost ? cost.toLocaleString() : 0}</label>
                                                                      <label style={{ marginRight: "30px" }}>Total Sales: {gross ? gross.toLocaleString() : 0}</label>
                                                                      <label>Profit: {net ? net.toLocaleString() : 0}</label>
                                                                 </div>}
                                                            </div>
                                                       </div>
                                                       <ThemeProvider theme={theme}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                                                                 {/* <Button style={{ width: "100%", padding: "10px", marginRight: "10px", height: "50px" }} variant="outlined" color="blue">
                                                                      <PDFDownloadLink fileName="selected_sales" document={<SalesPrinter data={sales} cost={cost} gross={gross} profit={net} />} >
                                                                           {({ loading }) => (loading ? 'Loading document...' : 'Download Selected Range ')}
                                                                      </PDFDownloadLink>
                                                                 </Button> */}
                                                            </div>
                                                       </ThemeProvider>
                                                  </div>
                                             </TabPanel>
                                             <TabPanel value="2">

                                             </TabPanel>
                                             <TabPanel value="3">
                                                  <div>
                                                       <div style={{ display: "flex", width: "400px" }}>
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Month"
                                                                 fullWidth
                                                                 select
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                 onChange={handleMonthChange}
                                                                 value={selectedmonth}
                                                            >
                                                                 <MenuItem value={'01'}>January</MenuItem>
                                                                 <MenuItem value={'02'}>February</MenuItem>
                                                                 <MenuItem value={'03'}>March</MenuItem>
                                                                 <MenuItem value={'04'}>April</MenuItem>
                                                                 <MenuItem value={'05'}>May</MenuItem>
                                                                 <MenuItem value={'06'}>June</MenuItem>
                                                                 <MenuItem value={'07'}>July</MenuItem>
                                                                 <MenuItem value={'08'}>August</MenuItem>
                                                                 <MenuItem value={'09'}>September</MenuItem>
                                                                 <MenuItem value={'10'}>October</MenuItem>
                                                                 <MenuItem value={'11'}>November</MenuItem>
                                                                 <MenuItem value={'12'}>December</MenuItem>
                                                            </TextField>
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Year"
                                                                 fullWidth
                                                                 select
                                                                 style={{ paddingBottom: "20px", paddingRight: "10px", width: "300px" }}
                                                                 onChange={handleYearChange}
                                                                 value={selectedyear}
                                                            >
                                                                 <MenuItem value={'2023'}>2023</MenuItem>
                                                                 <MenuItem value={'2024'}>2024</MenuItem>
                                                                 <MenuItem value={'2025'}>2025</MenuItem>
                                                                 <MenuItem value={'2026'}>2026</MenuItem>
                                                                 <MenuItem value={'2027'}>2027</MenuItem>
                                                                 <MenuItem value={'2028'}>2028</MenuItem>
                                                                 <MenuItem value={'2029'}>2029</MenuItem>
                                                                 <MenuItem value={'2030'}>2030</MenuItem>
                                                                 <MenuItem value={'2031'}>2031</MenuItem>
                                                                 <MenuItem value={'2032'}>2032</MenuItem>
                                                            </TextField>

                                                       </div>

                                                       <div ref={appRef} style={{ backgroundColor: "white", padding: "0 30px 30px 0px", width: "100%", height: "500px", overflow: "scroll" }}>
                                                            <div>
                                                                 {/* {monthlysales && monthlysales.length > 0 ? (
                                                                      monthlysales && monthlysales.map((item, index) => (
                                                                           <SalesList key={index}>

                                                                                <TableContainer
                                                                                     style={{ width: "100%" }} >
                                                                                     <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                          <TableHead>
                                                                                               <TableCell >Datetime</TableCell>
                                                                                               <TableCell >TRANS ID</TableCell>
                                                                                               <TableCell >Cashier</TableCell>
                                                                                               <TableCell >Total</TableCell>
                                                                                               <TableCell >Items</TableCell>
                                                                                          </TableHead>
                                                                                          <TableBody>
                                                                                               <TableRow>
                                                                                                    <TableCell >{item.pos_date}</TableCell>
                                                                                                    <TableCell >{item.pos_transaction_id}</TableCell>
                                                                                                    <TableCell >{item.pos_user}</TableCell>
                                                                                                    <TableCell >{item.pos_total}</TableCell>
                                                                                                    <TableCell>

                                                                                                         <table>
                                                                                                              <thead>
                                                                                                                   <tr>
                                                                                                                        <th style={{ paddingRight: "200px" }}>Item/s</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Quantity</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Cost Price</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Selling Price</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Sub Total</th>
                                                                                                                   </tr>
                                                                                                              </thead>
                                                                                                              <tbody>
                                                                                                                   {monthlysales && Array.isArray(monthlysales.pos_items) && monthlysales.pos_items.map((item, index) => (
                                                                                                                        
                                                                                                                        <tr key={index}>
                                                                                                                             <td>{item.product_name}</td>
                                                                                                                             <td>{item.product_quantity}</td>
                                                                                                                             <td>{item.product_cost_price}</td>
                                                                                                                             <td>{item.product_selling_price}</td>
                                                                                                                             <td>PHP {item.product_total}</td>
                                                                                                                        </tr>
                                                                                                                   ))}
                                                                                                              </tbody>
                                                                                                         </table>
                                                                                                    </TableCell>
                                                                                               </TableRow>
                                                                                          </TableBody>
                                                                                     </Table>
                                                                                </TableContainer>
                                                                           </SalesList>
                                                                      ))
                                                                 ) : (
                                                                      <div style={{ display: "flex", justifyContent: "center", marginTop: "180px", alignItems: "center", flexDirection: "column" }}>
                                                                           <p>No transaction on selected date</p>
                                                                      </div>
                                                                 )
                                                                 } */}
                                                                 {monthlysales && monthlysales.length > 0 ? (
                                                                      monthlysales.map((transaction, index) => (
                                                                           <SalesList key={index}>
                                                                                <TableContainer style={{ width: "100%" }}>
                                                                                     <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                          <TableHead>
                                                                                               <TableCell>Datetime</TableCell>
                                                                                               <TableCell>TRANS ID</TableCell>
                                                                                               <TableCell>Cashier</TableCell>
                                                                                               <TableCell>Total</TableCell>
                                                                                               <TableCell>Items</TableCell>
                                                                                          </TableHead>
                                                                                          <TableBody>
                                                                                               <TableRow key={transaction._id}>
                                                                                                    <TableCell>{transaction.pos_date}</TableCell>
                                                                                                    <TableCell>{transaction.pos_transaction_id}</TableCell>
                                                                                                    <TableCell>{transaction.pos_user}</TableCell>
                                                                                                    <TableCell>{transaction.pos_total}</TableCell>
                                                                                                    <TableCell>
                                                                                                         <table>
                                                                                                              <thead>
                                                                                                                   <tr>
                                                                                                                        <th style={{ paddingRight: "200px" }}>Item/s</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Quantity</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Cost Price</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Selling Price</th>
                                                                                                                        <th style={{ paddingRight: "40px" }}>Sub Total</th>
                                                                                                                   </tr>
                                                                                                              </thead>
                                                                                                              <tbody>
                                                                                                                   {Array.isArray(transaction.pos_items) && transaction.pos_items.map((item, itemIndex) => (
                                                                                                                        <tr key={itemIndex}>
                                                                                                                             <td>{item.product_name}</td>
                                                                                                                             <td>{item.product_quantity}</td>
                                                                                                                             <td>{item.product_cost_price}</td>
                                                                                                                             <td>{item.product_selling_price}</td>
                                                                                                                             <td>PHP {item.product_total}</td>
                                                                                                                        </tr>
                                                                                                                   ))}
                                                                                                              </tbody>
                                                                                                         </table>
                                                                                                    </TableCell>
                                                                                               </TableRow>
                                                                                          </TableBody>
                                                                                     </Table>
                                                                                </TableContainer>
                                                                           </SalesList>
                                                                      ))
                                                                 ) : (
                                                                      <div style={{ display: "flex", justifyContent: "center", marginTop: "180px", alignItems: "center", flexDirection: "column" }}>
                                                                           <p>No transaction on selected date</p>
                                                                      </div>
                                                                 )}
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px" }} >


                                                                 {<div style={{ display: "flex", justifyContent: "right" }}>
                                                                      <label style={{ marginRight: "30px" }}>Total Actual Cost: {monthlycost ? monthlycost.toLocaleString() : 0}</label>
                                                                      <label style={{ marginRight: "30px" }}>Total Sales: {monthlygross ? monthlygross.toLocaleString() : 0}</label>
                                                                      <label>Profit: {monthlynet ? monthlynet.toLocaleString() : 0}</label>
                                                                 </div>}
                                                            </div>
                                                       </div>
                                                       <ThemeProvider theme={theme}>

                                                            <div style={{ display: "flex", justifyContent: "left", marginTop: "20px", width: "100%" }}>

                                                                 {/* <Button style={{ marginRight: "10px" }} variant="outlined" color="green" onClick={captureScreenshot}>
                                                                      Download
                                                                 </Button> */}
                                                            </div>

                                                       </ThemeProvider>
                                                  </div>
                                             </TabPanel>
                                        </TabContext>
                                   </Box>

                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )

}

export default Sales






