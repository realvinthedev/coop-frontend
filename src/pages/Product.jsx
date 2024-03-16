
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
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import 'react-toastify/dist/ReactToastify.css';
import ProductPrinter from '../components/ProductPrinter';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

     const handleSuccessToast = (success) => {
          toast.success(success);
     };
     const handleErrorToast = (error) => {
          toast.error(error);
     };

     const { user } = useAuthContext()
     const [refresher, setRefresher] = useState(0)
     useEffect(() => {
          const fetchProduct = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/product', {
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
     const [query, setQuery] = useState("")
     const [product, setproduct] = useState([])
     const [openError, setopen_error] = useState(false)
     const [error, setError] = useState(false)
     const [openSuccess, setOpenSuccess] = useState(false)
     const [openDelete, setOpenDelete] = useState(false)
     const [zero, setZero] = ([])
     const [low, setLow] = ([])



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
               product_code === "" ||
               product_name === "" ||
               product_description === "" ||
               product_cost_price === "" ||
               product_selling_price === "" ||
               product_stock === ""
          ) {
               handleErrorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/product/', {
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
               handleSuccessToast('Item Added Successfully');
               handleRefresher()

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
               product_code === "" ||
               product_name === "" ||
               product_description === "" ||
               product_cost_price === "" ||
               product_selling_price === "" ||
               product_stock === ""
          ) {
               handleErrorToast('Fill up the required fields completely')
          }
          else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/product/' + id, {
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
               handleSuccessToast('Item Updated Successfully')
               handleRefresher()
          }

     }
     const handleDelete = async (e) => {

          if (!user) {
               console.log('You must be logged in first')
               return
          } else {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/product/' + id, {
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
               handleSuccessToast('Item Deleted Successfully')
               handleCloseDelete();
               handleRefresher()

          }

     }

     const filteredZero = product.filter(obj => obj.product_stock == 0).sort();
     const filteredLow = product.filter(obj => obj.product_stock <= 3 && obj.product_stock != 0).sort();

     const downloadAsPDF = () => {
          const customWidth = 200; // Specify your custom width here
          const pdf = new jsPDF({
               orientation: 'landscape',
               format: [customWidth, 500], // Adjust the dimensions as needed
          });

          pdf.autoTable({
               head: [columns.map((column) => column.headerName)],
               body: product.map((row) => columns.map((column) => row[column.field])),
          });

          pdf.save('product_data.pdf');
     };

     const downloadAsPDFLow = () => {
          const customWidth = 200; // Specify your custom width here
          const pdf = new jsPDF({
               orientation: 'landscape',
               format: [customWidth, 500], // Adjust the dimensions as needed
          });

          pdf.autoTable({
               head: [columns.map((column) => column.headerName)],
               body: filteredLow.map((row) => columns.map((column) => row[column.field])),
          });

          pdf.save('product_data.pdf');
     };
     const downloadAsPDFLowZero= () => {
          const customWidth = 200; // Specify your custom width here
          const pdf = new jsPDF({
               orientation: 'landscape',
               format: [customWidth, 500], // Adjust the dimensions as needed
          });

          pdf.autoTable({
               head: [columns.map((column) => column.headerName)],
               body: filteredZero.map((row) => columns.map((column) => row[column.field])),
          });

          pdf.save('product_data.pdf');
     };
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
                                             value={query}
                                        />

                                   </SearchContainer>
                                   <div style={{ height: 475, width: '100%' }}>
                                        <DataGrid
                                             getRowId={(row) => row._id}
                                             rows={product}
                                             columns={columns}
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

                                   <div >

                                        <ThemeProvider theme={theme}>
                                             <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }} >
                                                  <div style={{ display: "flex" }} >
                                                       {/* <Button style={{ width: "100%", padding: "10px", marginBottom: "5px", marginRight: "5px" }} variant="outlined" color="blue">
                                                            <PDFDownloadLink fileName="all_products" document={< ProductPrinter data={product} />} >
                                                                 {({ loading }) => (loading ? 'Loading document...' : 'All Products')}
                                                            </PDFDownloadLink>
                                                       </Button> */}
                                                       <Button
                                                            style={{
                                                                 width: '100%',
                                                                 padding: '10px',
                                                                 marginRight: '10px'
                                                            }}
                                                            variant="contained"
                                                            color="blue"
                                                            onClick={downloadAsPDF}
                                                       >
                                                            Download All Products
                                                       </Button>
                                                       <Button
                                                            style={{
                                                                 width: '100%',
                                                                 padding: '10px',
                                                                 marginRight: '10px'
                                                            }}
                                                            variant="contained"
                                                            color="blue"
                                                            onClick={downloadAsPDFLow}
                                                       >
                                                            
                                                            Download Low Qty Products
                                                       </Button>
                                                       <Button
                                                            style={{
                                                                 width: '100%',
                                                                 padding: '10px',
                                                                 marginRight: '10px'
                                                            }}
                                                            variant="contained"
                                                            color="blue"
                                                            onClick={downloadAsPDFLowZero}
                                                            
                                                       >
                                                              Download 0 Qty Products
                                                       </Button>
                                                       {/* <Button style={{ width: "100%", padding: "10px", marginBottom: "5px", marginRight: "5px" }} variant="outlined" color="blue">
                                                            <PDFDownloadLink fileName="low_stocks" document={< ProductPrinter data={filteredLow} />} >
                                                                 {({ loading }) => (loading ? 'Loading document...' : 'Low Stocks')}
                                                            </PDFDownloadLink>
                                                       </Button>
                                                       <Button style={{ width: "100%", padding: "10px", marginBottom: "5px" }} variant="outlined" color="blue">
                                                            <PDFDownloadLink fileName="zero_stocks" document={< ProductPrinter data={filteredZero} />} >
                                                                 {({ loading }) => (loading ? 'Loading document...' : ' 0 Stocks')}
                                                            </PDFDownloadLink>
                                                       </Button> */}
                                                  </div>
                                                  <div>
                                                       <Button style={{ width: "100%", padding: "10px", marginBottom: "5px" }} variant="outlined" color="red" onClick={handleOpenDelete}>
                                                            Delete
                                                       </Button>
                                                  </div>
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
                                                  label="Product Code (Code should be unique)"
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
                                                       <Button style={{ marginRight: "5px", width: "100%", padding: "10px" }} variant="contained" color="blue" onClick={handleNew}>
                                                            Add
                                                       </Button>
                                                       <Button style={{ marginRight: "5px", width: "100%", padding: "10px" }} variant="contained" color="blue" onClick={handlePatch}>
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