
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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext } from '../hooks/useAuthContext'
import { Alert } from '@mui/material';
import { PaddingRounded } from '@mui/icons-material';
import { width } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
    height: 900px;
`
const Card = styled.div`
    background-color: white;
    height: 800px;
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

/**GET REQUESTS */
const columns = [
     { field: 'product_code', headerName: 'Code', width: 100 },
     { field: 'product_name', headerName: 'Name', width: 250 },
     { field: 'product_selling_price', headerName: 'Price', width: 80 },
     { field: 'product_stock', headerName: 'Stocks', width: 100 },
];
const columns_receipt = [
     { field: 'product_code', headerName: 'Item Code', width: 100 },
     { field: 'product_name', headerName: 'Item', width: 300 },
     { field: 'product_selling_price', headerName: 'Price', width: 100 },
     { field: 'product_quantity', headerName: 'Qty', width: 100, editable: true },
     { field: 'product_total', headerName: 'total', width: 100 },
];







const Pos = (props) => {

     /**POST REQUESTS */
     const [id, setId] = useState('')
     const [product_code, setproduct_code] = useState('')
     const [product_name, setproduct_name] = useState('')
     const [product_description, setproduct_description] = useState('')
     const [product_cost_price, setproduct_cost_price] = useState(0)
     const [product_selling_price, setproduct_selling_price] = useState(0)
     const [product_stock, setproduct_stock] = useState(0)
     const [product_total, setproduct_total] = useState(0)
     const [query, setQuery] = useState("")
     const [product, setproduct] = useState([])
     const [openError, setopen_error] = useState(false)
     const [error, setError] = useState(false)
     const [openSuccess, setOpenSuccess] = useState(false)
     const [openDelete, setOpenDelete] = useState(false)
     const [quantity_left, setquantity_left] = useState(1)
     const [quantity_right, setquantity_right] = useState(0)
     const [row_total, setrow_total] = useState(0)
     const [total, settotal] = useState(0)
     const [arr, setArr] = useState([]);
     const { user } = useAuthContext()
     const [refresher, setRefresher] = useState(0)
     const [gridTrigger, setGridTrigger] = useState(false);
     const [prms, setprms] = useState("");
     const [transactionnumber, setTransactionnumber] = useState("");
     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })


     useEffect(() => {
          handleTransactionId();
     }, []);
     useEffect(() => {
          let product_total = 0;

          arr.forEach((item) => {
               product_total += item.product_total
          });
          settotal(product_total);
          console.log(total)
     }, [gridTrigger]);
     useEffect(() => {
          const fetchProduct = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/product', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    setproduct(json)
               }
          }
          if (user) {
               fetchProduct();
          }
     }, [user, refresher])

     useEffect(() => {
          let total = quantity_left * product_selling_price;
          setrow_total(total);
     }, [quantity_left, product_selling_price])


     const handleRowClickReceipt = (params) => {
          setprms(params)
     };

     const handleRemoveItem = () => {
          const params = prms
          const newData = arr.filter((item) => item.product_code !== params.row.product_code);
          setArr(newData);
     }

     const convertDateToString = (date) => {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const dateString = new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
          setCurrentDate(dateString)
     };

     const handleUpdateQuantity = () => {
          setGridTrigger(!gridTrigger)
     }
     const handleRefresher = () => {
          setRefresher(Math.random())
     };

     /**Handle Error */
     const handleOnError = () => {
          setopen_error(true);
     };

     const handleOffError = () => {
          setopen_error(false);
     };

     /**Handle Success */
     const handleOnSuccess = () => {
          setOpenSuccess(true);
     };

     const handleOffSuccess = () => {
          setOpenSuccess(false);
     };

     const handleTransactionId = () => {
          let num = Math.floor(Math.random() * 900000000000000) + 10000;
          const value = "TRANS" + num
          setTransactionnumber(value)
     }
     /**Handle Delete */
     const handleCloseDelete = () => {
          setOpenDelete(false);
     };
     const handleOpenDelete = () => {
          setOpenDelete(true);
     };

     const handleAddItem = () => {

          const newObject = {
               product_code: product_code,
               product_name: product_name,
               product_description: product_description,
               product_selling_price: product_selling_price,
               product_quantity: quantity_left,
               product_total: row_total

          };

          setArr([...arr, newObject]);
          setGridTrigger(!gridTrigger)
     };


     const getRowId = (arr) => {
          return arr.product_code
     }



     /**Handle datagrid row click */
     const handleRowClick = (params) => {
          setId(params.row._id);
          setproduct_code(params.row.product_code)
          setproduct_name(params.row.product_name)
          setproduct_description(params.row.product_description)
          setproduct_cost_price(params.row.product_cost_price)
          setproduct_selling_price(params.row.product_selling_price)
          setproduct_stock(params.row.product_stock)

     };


     const handleSaveTransaction = async (e) => {
          e.preventDefault()
          const pos = {
               pos_date: currentDate,
               pos_transaction_id: transactionnumber,
               pos_items: arr,
               pos_total: total,
          }
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               arr.length == 0
          ) {
               handleOnError()
               setTimeout(() => {
                    handleOffError();
               }, 1500);
          }
          else {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/pos/', {
                    method: 'POST',
                    body: JSON.stringify(pos),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    setArr([])
               }
               handleOnSuccess();
               setTimeout(() => {
                    //handleRefresher()
                    handleOffSuccess();
               }, 1500);
          }

     }

     const handleNew = async (e) => {
          e.preventDefault()
          const product = {
               product_code: product_code,
               product_name: product_name,
               product_description: product_description,
               product_cost_price: product_cost_price,
               product_selling_price: product_selling_price,
               product_stock: product_stock

          }
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               product_code == "" ||
               product_name == "" ||
               product_description == "" ||
               product_cost_price == "" ||
               product_selling_price == "" ||
               product_stock == ""
          ) {
               handleOnError()
               setTimeout(() => {
                    handleOffError();
               }, 1500);
          }
          else {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/product/', {
                    method: 'POST',
                    body: JSON.stringify(product),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    setproduct_code('')
                    setproduct_name('')
                    setproduct_description('')
                    setproduct_cost_price('')
                    setproduct_selling_price('')
                    setproduct_stock('')
               }
               handleOnSuccess();
               setTimeout(() => {
                    handleRefresher()
                    handleOffSuccess();
               }, 1500);
          }

     }
     const handlePatch = async (e) => {
          e.preventDefault()
          const product = {
               product_code: product_code,
               product_name: product_name,
               product_description: product_description,
               product_cost_price: product_cost_price,
               product_selling_price: product_selling_price,
               product_stock: product_stock
          }
          if (!user) {
               console.log('You must be logged in first')
               return
          }
          if (
               product_code == "" ||
               product_name == "" ||
               product_description == "" ||
               product_cost_price == "" ||
               product_selling_price == "" ||
               product_stock == ""
          ) {
               handleOnError()
               setTimeout(() => {
                    handleOffError();
               }, 1500);
          }
          else {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/product/' + id, {
                    method: 'PATCH',
                    body: JSON.stringify(product),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    setproduct_code('')
                    setproduct_name('')
                    setproduct_description('')
                    setproduct_cost_price('')
                    setproduct_selling_price('')
                    setproduct_stock('')
               }
               handleOnSuccess();
               setTimeout(() => {
                    handleRefresher()
                    handleOffSuccess();
               }, 1500);
          }

     }
     const handleDelete = async (e) => {

          if (!user) {
               console.log('You must be logged in first')
               return
          } else {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/product/' + id, {
                    method: 'DELETE',
                    body: JSON.stringify(product),
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (!response.ok) {
                    setError(json.error)
               }
               else {
                    setproduct_code('')
                    setproduct_name('')
                    setproduct_description('')
                    setproduct_cost_price('')
                    setproduct_selling_price('')
                    setproduct_stock('')
               }
               handleOnSuccess();
               handleCloseDelete();
               setTimeout(() => {
                    handleRefresher()
                    handleOffSuccess();

               }, 1500);
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
                                   {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Data Success</Alert> : ""}
                                   {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up the form completely</Alert> : ""}
                                   <div
                                        style={{
                                             display: "flex",
                                             justifyContent: "space-between",
                                        }}
                                   >


                                        <div style={{
                                             marginRight: "30px",
                                             width: "80%"
                                        }}>
                                             <SearchContainer>
                                                  <TextField
                                                       required
                                                       id="search"
                                                       label="Search Item"
                                                       fullWidth
                                                       onChange={(e) => setQuery(e.target.value)}
                                                       value={query}
                                                  />

                                             </SearchContainer>
                                             <div style={{ height: 300, width: '100%' }}>
                                                  <DataGrid
                                                       getRowId={(row) => row._id}
                                                       rows={product}
                                                       columns={columns}
                                                       pageSize={7}
                                                       rowsPerPageOptions={[5]}
                                                       onRowClick={handleRowClick}
                                                       filterModel={{
                                                            items: [
                                                                 {
                                                                      columnField: 'product_name',
                                                                      operatorValue: 'contains',
                                                                      value: query,
                                                                 },
                                                            ],
                                                       }}

                                                  />
                                             </div>

                                             <div style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",

                                             }}>

                                             </div>
                                             <div >

                                                  <TextField
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Product Code"
                                                       style={{ paddingBottom: "20px", marginTop: "10px" }}
                                                       onChange={(e) => setproduct_code(e.target.value)}
                                                       value={product_code}
                                                       InputProps={{
                                                            readOnly: true,
                                                       }}
                                                  />
                                                  <TextField
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Product Name"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setproduct_name(e.target.value)}
                                                       value={product_name}
                                                       InputProps={{
                                                            readOnly: true,
                                                       }}
                                                  />

                                                  <TextField
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Selling Price"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setproduct_selling_price(e.target.value)}
                                                       value={product_selling_price}
                                                       InputProps={{
                                                            readOnly: true,
                                                       }}
                                                  />
                                                  <TextField
                                                       required
                                                       fullWidth
                                                       id="outlined-required"
                                                       label="Stocks"
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setproduct_stock(e.target.value)}
                                                       value={product_stock}
                                                       InputProps={{
                                                            readOnly: true,
                                                       }}
                                                  />
                                                  <ThemeProvider theme={theme}>
                                                       <div style={{
                                                            display: "flex",
                                                            justifyContent: "space-between"
                                                       }}>
                                                            <TextField
                                                                 required
                                                                 fullWidth
                                                                 id="outlined-required"
                                                                 label="Quantity"
                                                                 style={{ marginRight: "10px" }}
                                                                 onChange={(e) => setquantity_left(e.target.value)}
                                                                 value={quantity_left}
                                                            />
                                                            <Button style={{ width: "100%", padding: "10px" }} variant="outlined" color="blue" onClick={handleAddItem}>
                                                                 Add to cart
                                                            </Button>
                                                       </div>
                                                  </ThemeProvider>
                                                  <Dialog
                                                       open={openDelete}
                                                       onClose={handleCloseDelete}
                                                       aria-labelledby="alert-dialog-title"
                                                       aria-describedby="alert-dialog-description"
                                                  >
                                                       <DialogTitle id="alert-dialog-title">
                                                            <h2>{"Are you sure to delete selected item?"}</h2>
                                                       </DialogTitle>
                                                       <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                 Deleted item can't be undone. Confirm by clicking "Delete"
                                                            </DialogContentText>
                                                       </DialogContent>
                                                       <DialogActions>
                                                            <Button onClick={handleDelete}>Delete</Button>
                                                            <Button onClick={handleCloseDelete} autoFocus>
                                                                 Cancel
                                                            </Button>
                                                       </DialogActions>
                                                  </Dialog>

                                             </div>
                                        </div>

                                        <div style={{
                                             marginLeft: "30px",
                                             width: "120%"
                                        }}>

                                             <div style={{ height: 475, width: '100%' }}
                                             >

                                                  <div style={{ display: 'flex', justifyContent: "space-between"}}>
                                                  <label style={{ marginBottom: "20px"}}>Date: {currentDate}</label>
                                                  <label style={{ marginBottom: "20px" }}>Transaction ID: {transactionnumber}</label>
                                                  </div>
                                                  <DataGrid
                                                       getRowId={getRowId}
                                                       rows={arr}
                                                       columns={columns_receipt}
                                                       pageSize={7}
                                                       rowsPerPageOptions={[5]}
                                                       onRowClick={(params) => handleRowClickReceipt(params)}
                                                  />

                                             </div>

                                             <div style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",

                                             }}>

                                             </div>
                                             <div style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",
                                                  marginTop: "100px"

                                             }}>
                                                  <div style={{
                                                       display: "flex",
                                                       justifyContent: "space-between",
                                                       marginRight: "10px",
                                                       width: "50%",
                                                     
                                                  }}>
                                                       <ThemeProvider theme={theme}>
                                                            <div style={{
                                                                 display: "flex",
                                                                 justifyContent: "space-between"
                                                            }}>

                                                                 <Button style={{ marginRight: "5px", width: "100%", height: "55px" }} variant="outlined" color="blue" onClick={handleRemoveItem}>
                                                                      Remove from cart
                                                                 </Button>
                                                            </div>
                                                       </ThemeProvider>
                                                  </div>

                                                  <div style={{
                                                       width: "30%"
                                                  }}>
                                                       <TextField
                                                            fullWidth
                                                            id="outlined-required"
                                                            label="Amount Due"
                                                            style={{ paddingBottom: "20px", fontSize: "40px" }}
                                                            onChange={(e) => settotal(e.target.value)}
                                                            value={total}
                                                            InputProps={{
                                                                 readOnly: true,
                                                            }}
                                                       />

                                                       <ThemeProvider theme={theme}>
                                                            <div style={{
                                                                 display: "flex",
                                                                 justifyContent: "space-between"
                                                            }}>
                                                                 <Button style={{ marginRight: "5px", width: "100%", padding: "10px" }} variant="outlined" color="blue" onClick={handleSaveTransaction}>
                                                                      Save Transaction
                                                                 </Button>

                                                            </div>
                                                       </ThemeProvider>
                                                       <Dialog
                                                            open={openDelete}
                                                            onClose={handleCloseDelete}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                       >
                                                            <DialogTitle id="alert-dialog-title">
                                                                 <h2>{"Are you sure to delete selected item?"}</h2>
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                 <DialogContentText id="alert-dialog-description">
                                                                      Deleted item can't be undone. Confirm by clicking "Delete"
                                                                 </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                 <Button onClick={handleDelete}>Delete</Button>
                                                                 <Button onClick={handleCloseDelete} autoFocus>
                                                                      Cancel
                                                                 </Button>
                                                            </DialogActions>
                                                       </Dialog>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )

}

export default Pos