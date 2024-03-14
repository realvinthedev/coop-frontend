
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
import { toast } from 'react-toastify';
import { Audio } from 'react-loader-spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

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
    width: 1400px;
    height: 750px;
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
const TablesContainer = styled.div`
     padding-left: 30px;
     padding-right: 3px;
     padding-bottom: 50px;
     display: flex;
     justify-content: space-between;
`


const Reports = (props) => {

     const { user } = useAuthContext()

     const [openDialog_open, setopenDialog_open] = useState(false);
     const [openDialog_close, setopenDialog_close] = useState(false);
     const [drawer_id, setdrawer_id] = useState("");
     const [drawer_startdatetime, setdrawer_startdatetime] = useState("");
     const [drawer_enddatetime, setdrawer_enddatetime] = useState("");
     const [drawer_starting_cash, setdrawer_starting_cash] = useState(0);
     const [drawer_sales, setdrawer_sales] = useState(0);
     const [drawer_actual_cash, setdrawer_actual_cash] = useState(0);
     const [drawer_status, setdrawer_status] = useState("");
     const [drawer_current_status, setdrawer_current_status] = useState("");
     const [drawer_expected_cash, setdrawer_expected_cash] = useState(0);
     const [loading, setLoading] = useState(true);
     const [drawer_current_id, setdrawer_current_id] = useState("");
     const [refresher, setRefresher] = useState(0)
     const [calendardate, setcalendardate] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     });

     const convertDateToString = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setcalendardate(dateString)
     };


     const [dateTime, setDateTime] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let year = date.getFullYear();

          let hours = date.getHours().toString().padStart(2, '0');
          let minutes = date.getMinutes().toString().padStart(2, '0');

          let currentDateTime = `${month}-${day}-${year} ${hours}:${minutes}`;
          return currentDateTime;
     });

     const columns = [
          { field: 'drawer_startdatetime', headerName: 'Starting Datetime', width: 150, sortable: false, },
          { field: 'drawer_enddatetime', headerName: 'Ending Datetime', width: 150 },
          { field: 'drawer_starting_cash', headerName: 'Starting Cash', width: 150, sortable: false, hide: true },
          { field: 'drawer_sales', headerName: 'Sales', width: 150, sortable: false, hide: true },
          { field: 'drawer_expected_cash', headerName: 'Expected Cash', width: 150, sortable: false, hide: true },
          { field: 'drawer_actual_cash', headerName: 'Actual Cash', width: 150, sortable: false, hide: true },
          { field: 'drawer_status', headerName: 'Drawer Status', width: 150, sortable: false }
     ];

     const handleRowClick = (params) => {
          setdrawer_id(params.row._id);

     };


     const handleOpenDialog_Open = () => {
          handleRefresher();
          setdrawer_status("OPENED")
          setopenDialog_open(true);
     };
     const handleCloseDialog_Open = () => {
          setopenDialog_open(false);
     };
     const handleOpenDialog_Close = () => {
          setdrawer_status("CLOSED")
          setopenDialog_close(true);
     };
     const handleCloseDialog_Close = () => {
          setopenDialog_close(false);
     };

     const handleRefresher = () => {
          setRefresher(Math.random())
     };

     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
     };

     const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

     //Fetching Drawer Status
     const [drawers, setdrawers] = useState([]);
     useEffect(() => {
          const fetchDrawerStatus = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/drawer/', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const datetime = item.drawer_startdatetime
                         const date = datetime.split(' ')[0];

                         return date == calendardate

                    });
                    setdrawers(filteredData)
                    setdrawer_current_status(json[0].drawer_status)
                    setLoading(false);
                    setdrawer_current_id(json[0]._id)
               }
          }
          if (user) {
               fetchDrawerStatus();
          }
     }, [user, refresher, calendardate])

     const [sales, setsales] = useState([]);
     const [daily_sales, setdaily_sales] = useState(0);
     const [drawersales, setdrawersales] = useState([]);
     // Fetching Sales
     useEffect(() => {
          const fetchSales = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/pos', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    const filteredData = json.filter(item => {
                         const datetime = item.pos_date
                         const date = datetime.split(' ')[0];
                         return date >= calendardate
                    });
                    const filteredData2 = json.filter(item => {
                         const drawerid = item.pos_drawer_id
                         return drawerid == drawer_id
                    });
                    const filteredData3 = json.filter(item => {
                         const drawerid = item.pos_drawer_id
                         return drawerid == drawer_current_id
                    });
                    let pos_total = 0;
                    filteredData3.forEach((item) => {
                         pos_total += item.pos_total
                    });
                    setdrawer_sales(pos_total);


                    setsales(filteredData)
                    setdrawersales(filteredData2)

               }
          }
          if (user) {
               fetchSales();
          }

     }, [user, calendardate, drawer_id, refresher, drawer_current_id])

     useEffect(() => {
          let pos_total = 0;
          sales.forEach((item) => {
               pos_total += item.pos_total
          });
          setdaily_sales(pos_total);
     }, [sales])


     const logger = () => {
          successToast(drawer_id)
     }


     const handleAdd = async (e) => {
          e.preventDefault()

          const drawer = {
               drawer_id: "DRAWER1",
               drawer_startdatetime: dateTime,
               drawer_enddatetime: "",
               drawer_starting_cash: drawer_starting_cash,
               drawer_sales: 0,
               drawer_expected_cash: 0,
               drawer_actual_cash: 0,
               drawer_status: drawer_status
          }

          if (!user) {
               console.log('You must be logged in first')
               return
          }

          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/drawer', {
                    method: 'POST',
                    body: JSON.stringify(drawer),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    errorToast('Error')
               }
               else {
                    successToast('Drawer is now open')
                    handleCloseDialog_Open()
                    handleRefresher()
                    setdrawer_starting_cash(0)
               }
          }
     }


     // //INITIAL CREATION OF DRAWER - CNA BE USED IF DB IS REFRESHED
     // const handleAdd = async (e) => {
     //    //  e.preventDefault()

     //      const drawer = {
     //           drawer_id: "DRAWER1",
     //           drawer_startdatetime: dateTime,
     //           drawer_enddatetime: "",
     //           drawer_starting_cash: 0,
     //           drawer_sales: 0,
     //           drawer_expected_cash: 0,
     //           drawer_actual_cash: 0,
     //           drawer_status: "CLOSED"
     //      }

     //      if (!user) {
     //           console.log('You must be logged in first')
     //           return
     //      }

     //      else {
     //           const response = await fetch('https://coop-back-zqr6.onrender.com/api/drawer', {
     //                method: 'POST',
     //                body: JSON.stringify(drawer),
     //                headers: {
     //                     'Content-Type': 'application/json',
     //                     'Authorization': `Bearer ${user.token}`
     //                }
     //           })
     //           const json = await response.json()
     //           if (!response.ok) {
     //                errorToast('Error')
     //           }
     //           else {
     //                successToast('Drawer is now open')
     //                handleCloseDialog_Open()
     //                handleRefresher()
     //                setdrawer_starting_cash(0)
     //           }
     //      }
     // }
     const handlePatch = async (e) => {
          e.preventDefault()

          const drawer = {
               drawer_id: "DRAWER1",
               drawer_enddatetime: dateTime,
               drawer_sales: 100,
               drawer_expected_cash: drawer_expected_cash,
               drawer_actual_cash: drawer_actual_cash,
               drawer_status: drawer_status
          }

          if (!user) {
               console.log('You must be logged in first')
               return
          }

          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/drawer/' + drawer_current_id, {
                    method: 'PATCH',
                    body: JSON.stringify(drawer),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    errorToast('Error')
               }
               else {
                    successToast('Drawer is now closed')
                    handleCloseDialog_Close()
                    handleRefresher()
               }
          }
     }


     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   {loading ? (
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "300px" }}>
                                             <Audio
                                                  height="100"
                                                  width="100"
                                                  color="#f08b06"
                                                  ariaLabel="audio-loading"
                                                  wrapperStyle={{}}
                                                  wrapperClass="wrapper-class"
                                                  visible={true}
                                             />
                                             {/* <ThemeProvider theme={theme}>
                                                  <Button style={{ width: "400px" }} variant="contained"  onClick={logger}>
                                                      sdfsdf
                                                  </Button>
                                             </ThemeProvider> */}
                                        </div>
                                   ) : (
                                        <div style={{ display: "flex" }}>
                                             <div style={{ maxWidth: "400px", marginRight: "40px" }}>
                                                  <div style={{ marginBottom: "20px" }}>
                                                       <ThemeProvider theme={theme}>
                                                            <Button style={{ width: "400px" }} variant="contained" color={drawer_current_status === "CLOSED" ? "green" : "red"} onClick={drawer_current_status === "CLOSED" ? handleOpenDialog_Open : handleOpenDialog_Close}>
                                                                 {
                                                                      drawer_current_status === "CLOSED" ? "OPEN THE DRAWER" : "CLOSE THE DRAWER"
                                                                 }
                                                            </Button>
                                                       </ThemeProvider>

                                                  </div>

                                                  {/* <p>Current Drawer Status: {drawer_current_status === "CLOSED" ? <span style={{ color: "red" }}>CLOSED</span> : <span style={{ color: "green" }}>OPEN</span>}</p> */}
                                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                       <DatePicker
                                                            label="Select date"
                                                            value={calendardate}
                                                            inputFormat="MM-DD-YYYY"
                                                            onChange={convertDateToString}
                                                            renderInput={(params) => <TextField fullWidth required style={{ paddingBottom: "20px" }}{...params} error={false} />}
                                                       />
                                                  </LocalizationProvider>

                                                  <div style={{ height: 475, width: '100%' }}>
                                                       <DataGrid
                                                            getRowId={(row) => row._id}
                                                            rows={drawers}
                                                            columns={columns}
                                                            style={{ marginBottom: "20px" }}
                                                            onRowClick={handleRowClick}
                                                       />
                                                  </div>
                                             </div>
                                             <div style={{ backgroundColor: "white", padding: "0 30px 30px 30px", width: "100%", height: "610px", overflow: "scroll" }}>
                                                  <div>
                                                       {drawersales && drawersales.length > 0 ? (
                                                            drawersales.map((sales, index) => (
                                                                 <SalesList key={index}>
                                                                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                           <p style={{ marginBottom: "10px" }}>Transaction ID: {sales.pos_transaction_id}</p>
                                                                           <p style={{ marginBottom: "10px" }}>User: {sales.pos_user}</p>
                                                                           <p style={{ marginBottom: "10px" }}>Date and Time: {sales.pos_date}</p>
                                                                      </div>
                                                                      <TableContainer
                                                                           style={{ width: "100%" }} >
                                                                           <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                                                                                <TableHead>
                                                                                     <TableCell >Code</TableCell>
                                                                                     <TableCell >Item</TableCell>
                                                                                     <TableCell >Quantity</TableCell>
                                                                                     <TableCell >Amount</TableCell>
                                                                                </TableHead>
                                                                                <TableBody>

                                                                                     {sales.pos_items.map((item, idx) => (
                                                                                          <TableRow key={idx}>
                                                                                               < >
                                                                                                    <TableCell>{item.product_code}</TableCell>
                                                                                                    <TableCell>{item.product_name}</TableCell>
                                                                                                    <TableCell>{item.product_quantity}</TableCell>
                                                                                                    <TableCell>{item.product_total}</TableCell>
                                                                                                    {idx !== sales.pos_items.length - 1 ? '' : ''}
                                                                                               </>
                                                                                          </TableRow>
                                                                                     ))}
                                                                                </TableBody>
                                                                           </Table>
                                                                      </TableContainer>
                                                                      <div style={{ marginTop: "10px", fontSize: "14px" }}>
                                                                           <p>Sales Total: {sales.pos_total}</p>
                                                                      </div>


                                                                 </SalesList>
                                                            ))
                                                       ) : (
                                                            <div style={{display: "flex", justifyContent: "center", marginTop: "250px", alignItems: "center", flexDirection: "column"}}>
                                                                 <p>No data for current drawer. Select other drawer on the list</p>
                                                                 <p>or create a new transaction</p>
                                                            </div>


                                                       )
                                                       }
                                                  </div>
                                             </div>


                                             <Dialog
                                                  fullScreen={fullScreen}
                                                  open={openDialog_open}
                                                  onClose={handleCloseDialog_Open}
                                                  aria-labelledby="alert-dialog-title"
                                                  aria-describedby="alert-dialog-description"
                                             >
                                                  <DialogTitle id="alert-dialog-title">
                                                       <h2>{"Drawer Opening"}</h2>
                                                  </DialogTitle>
                                                  <div style={{ marginBottom: "20px" }}></div>
                                                  <DialogContent>
                                                       <FormContainer>
                                                            <TextField
                                                                 required
                                                                 id="outlined-required"
                                                                 label="Starting Cash"
                                                                 style={{ marginBottom: "20px" }}
                                                                 fullWidth
                                                                 inputProps={{
                                                                      inputMode: 'decimal',
                                                                      step: '0.01',
                                                                 }}
                                                                 type='number'
                                                                 onChange={(e) => setdrawer_starting_cash(e.target.value)}
                                                                 value={drawer_starting_cash}
                                                            />
                                                       </FormContainer>
                                                  </DialogContent>
                                                  <DialogActions>
                                                       <Button onClick={handleAdd} autoFocus>
                                                            Open Drawer
                                                       </Button>
                                                       <Button onClick={handleCloseDialog_Open} autoFocus>
                                                            Cancel
                                                       </Button>
                                                  </DialogActions>
                                             </Dialog>

                                             <Dialog
                                                  fullScreen={fullScreen}
                                                  open={openDialog_close}
                                                  onClose={handleCloseDialog_Close}
                                                  aria-labelledby="alert-dialog-title"
                                                  aria-describedby="alert-dialog-description"
                                             >
                                                  <DialogTitle id="alert-dialog-title">
                                                       <h2>{"Drawer Closing"}</h2>
                                                  </DialogTitle>
                                                  <div style={{ marginBottom: "20px" }}></div>
                                                  <DialogContent>
                                                       <FormContainer>
                                                            <p style={{ marginBottom: "20px" }}>Starting Cash: {drawers[0] && drawers[0].drawer_starting_cash}</p>
                                                            <p style={{ marginBottom: "20px" }}>Sales: {drawer_sales && drawer_sales}</p>
                                                            <p style={{ marginBottom: "20px" }}>Expected Cash: {(drawer_sales && drawer_sales) + (drawers[0] && drawers[0].drawer_starting_cash)}</p>

                                                            <TextField
                                                                 required
                                                                 id="outlined-rfilteredDataequired"
                                                                 type="number"
                                                                 label="Actual Cash"
                                                                 style={{ marginBottom: "20px", width: "400px" }}
                                                                 fullWidth
                                                                 onChange={(e) => setdrawer_actual_cash(e.target.value)}
                                                                 value={drawer_actual_cash}
                                                                 inputProps={{
                                                                      inputMode: 'decimal',
                                                                      step: '0.01',
                                                                 }}
                                                            />

                                                       </FormContainer>
                                                  </DialogContent>
                                                  <DialogActions>
                                                       <Button onClick={handlePatch} autoFocus>
                                                            Close Drawer
                                                       </Button>
                                                       <Button onClick={handleCloseDialog_Close} autoFocus>
                                                            Cancel
                                                       </Button>
                                                   
                                                  </DialogActions>
                                             </Dialog>
                                        </div>)}

                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )

}

export default Reports






