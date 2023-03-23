
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
import { Alert } from '@mui/material';
import { PaddingRounded } from '@mui/icons-material';
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

/**GET REQUESTS */
const columns = [
     { field: 'product_code', headerName: 'Item Code', width: 100 },
     { field: 'product_name', headerName: 'Name', width: 300 },
     { field: 'product_description', headerName: 'Description', width: 200 },
     { field: 'product_cost_price', headerName: 'Cost Price', width: 100 },
     { field: 'product_selling_price', headerName: 'Selling Price', width: 100 },
     { field: 'product_stock', headerName: 'Stocks', width: 100 },
];

const Product = (props) => {
     const { user } = useAuthContext()
     const [refresher, setRefresher] = useState(0)
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


     /**POST REQUESTS */
     const [id, setId] = useState('')
     const [product_code, setproduct_code] = useState('')
     const [product_name, setproduct_name] = useState('')
     const [product_description, setproduct_description] = useState('')
     const [product_cost_price, setproduct_cost_price] = useState(0)
     const [product_selling_price, setproduct_selling_price] = useState(0)
     const [product_stock, setproduct_stock] = useState(0)
     const [query, setQuery] = useState(0)
     const [product, setproduct] = useState([])
     const [openError, setopen_error] = useState(false)
     const [error, setError] = useState(false)
     const [openSuccess, setOpenSuccess] = useState(false)
     const [openDelete, setOpenDelete] = useState(false)


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

     /**Handle Delete */
     const handleCloseDelete = () => {
          setOpenDelete(false);
     };
     const handleOpenDelete = () => {
          setOpenDelete(true);
     };



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
                                   <SearchContainer>
                                        <TextField
                                             required
                                             id="search"
                                             label="Search"
                                             fullWidth
                                             onChange={(e) => setQuery(e.target.value)}
                                        />

                                   </SearchContainer>
                                   <div style={{ height: 475, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={product}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[5]}
                                             onRowClick={handleRowClick}
                                        />
                                   </div>

                                   <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",

                                   }}>
                                        <ThemeProvider theme={theme}>
                                             <div  style={{ marginTop: "20px" }} >
                                             <i>*Scroll down to add new product</i>
                                             </div>
                                             <div>
                                                  <Button style={{ marginTop: "20px" }} variant="outlined" color="red" onClick={handleOpenDelete}>
                                                       Delete
                                                  </Button>
                                             </div>
                                        </ThemeProvider>
                                   </div>
                                   <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "30px"

                                   }}>
                                        <div>
                                             <TextField
                                                  required
                                                  fullWidth
                                                  id="outlined-required"
                                                  label="Product Code"
                                                  style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                  onChange={(e) => setproduct_code(e.target.value)}
                                                  value={product_code}
                                             />
                                             <TextField
                                                  required
                                                  fullWidth
                                                  id="outlined-required"
                                                  label="Product Name"
                                                  style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                  onChange={(e) => setproduct_name(e.target.value)}
                                                  value={product_name}
                                             />
                                             <TextField
                                                  required
                                                  fullWidth
                                                  id="outlined-required"
                                                  label="Description"
                                                  style={{ paddingBottom: "20px", paddingRight: "10px" }}
                                                  onChange={(e) => setproduct_description(e.target.value)}
                                                  value={product_description}
                                             />
                                        </div>

                                        <div>
                                             <TextField
                                                  required
                                                  fullWidth
                                                  id="outlined-required"
                                                  label="Cost Price"
                                                  style={{ paddingBottom: "20px" }}
                                                  onChange={(e) => setproduct_cost_price(e.target.value)}
                                                  value={product_cost_price}
                                             />
                                             <TextField
                                                  required
                                                  fullWidth
                                                  id="outlined-required"
                                                  label="Selling Price"
                                                  style={{ paddingBottom: "20px" }}
                                                  onChange={(e) => setproduct_selling_price(e.target.value)}
                                                  value={product_selling_price}
                                             />
                                             <TextField
                                                  required
                                                  fullWidth
                                                  id="outlined-required"
                                                  label="Stocks"
                                                  style={{ paddingBottom: "20px" }}
                                                  onChange={(e) => setproduct_stock(e.target.value)}
                                                  value={product_stock}
                                             />
                                             <ThemeProvider theme={theme}>
                                                  <div style={{ 
                                                       display: "flex",
                                                       justifyContent: "space-between"
                                                   }}>
                                                  <Button style={{ marginRight: "5px", width: "100%", padding: "10px" }} variant="outlined" color="blue" onClick={handleNew}>
                                                       Add
                                                  </Button>
                                                  <Button style={{ marginRight: "5px", width: "100%", padding: "10px" }} variant="outlined" color="blue" onClick={handlePatch}>
                                                       Update
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
                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div >
     )

}

export default Product