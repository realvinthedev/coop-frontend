
import styled from 'styled-components'
import Header from '../components/Header'
import * as React from 'react';
import { useRef } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext } from '../hooks/useAuthContext'
import { Alert } from '@mui/material';
import { PaddingRounded } from '@mui/icons-material';
import { width } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PosPrinter from '../components/PosPrinter';
import { toast } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import drawer_image from '../images/drawer.png';
import { Audio } from 'react-loader-spinner';
import Autocomplete from '@mui/material/Autocomplete';
import jsPDF from 'jspdf';
const theme = createTheme({
     palette: {
          neutral: {
               main: '#c68961',
               contrastText: '#fff',
          },
          red: {
               main: '#d13f3f',
               contrastText: '#fff',
          },
          purple: {
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
const ImageContainer = styled.img`
     width: 350px;
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
     { field: 'product_name', headerName: 'Particulars', width: 300 },
     { field: 'product_selling_price', headerName: 'Unit Price', width: 100 },
     { field: 'product_quantity', headerName: 'Qty', width: 100, editable: true },
     { field: 'product_total', headerName: 'Total', width: 100 },
];

const Pos = (props) => {
     /**POST REQUESTS */
     const [isButtonDisabled, setButtonDisabled] = useState(true);
     const [isButtonAddtoCartDisabled, setButtonAddtoCartDisabled] = useState(false);
     const [isButtonNewTransactionDisabled, setButtonNewTransactionDisabled] = useState(true);
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
     const [openErrorDuplicate, setopen_errorduplicate] = useState(false)
     const [openStockError, setopen_stockerror] = useState(false)
     const [error, setError] = useState(false)
     const [openSuccess, setOpenSuccess] = useState(false)
     const [openDelete, setOpenDelete] = useState(false)
     const [paymenttype, setpaymenttype] = useState('Cash')
     const [cash_sales, setcash_sales] = useState(0)
     const [credit_sales, setcredit_sales] = useState(0)
     const [discount, setdiscount] = useState(0)
     const [openSave, setopenSave] = useState(false);
     const [amoundue, setamoundue] = useState(0)
     const [quantity_left, setquantity_left] = useState(1)
     const [quantity_right, setquantity_right] = useState(0)
     const [row_total, setrow_total] = useState(0)
     const [total, settotal] = useState(0)
     const [costtotal, setcosttotal] = useState(0)
     const [isButtonSaveTransaction, setisButtonSaveTransaction] = useState(false)
     const [costtotal2, setcosttotal2] = useState(0)
     const [arr, setArr] = useState([]);
     const [discounted_amount, setdiscounted_amount] = useState(0)
     const { user } = useAuthContext()
     const [refresher, setRefresher] = useState(0)
     const [gridTrigger, setGridTrigger] = useState(false);
     const [prms, setprms] = useState("");
     const [customer_name, setcustomer_name] = useState("");
     const [cash, setcash] = useState(0);
     const [change, setchange] = useState(0);
     const [customer_nameonly, setcustomer_nameonly] = useState("");
     const [customer_id, setcustomer_id] = useState("");
     const [transactionnumber, setTransactionnumber] = useState("");
     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let year = date.getFullYear();

          let hours = date.getHours().toString().padStart(2, '0');
          let minutes = date.getMinutes().toString().padStart(2, '0');

          let currentDateTime = `${month}-${day}-${year} ${hours}:${minutes}`;
          return currentDateTime;
     })
     const successToast = (success) => {
          toast.success(success);
     };
     const errorToast = (error) => {
          toast.error(error);
     };

     const handleName = (event) => {
          const name = event.target.value;
          const id = name.split(" ")[0];
          const nameonly = name.split(" ")[2];
          setcustomer_name(name)
          setcustomer_id(id)
          setcustomer_nameonly(nameonly)
     }
     useEffect(() => {
          handleTransactionId();
     }, []);
     useEffect(() => {
          let product_total = 0;

          arr.forEach((item) => {
               product_total += item.product_total
          });
          settotal(product_total);
          setamoundue(product_total)
          console.log(total)
     }, [gridTrigger]);

     const [customers, setcustomers] = useState([])
     useEffect(() => {
          const fetchEmp = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/customer', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setcustomers(json)
               }
          }
          if (user) {

               fetchEmp();
          }
     }, [user])
     const [allCredits, setAllCredits] = useState([]);

     useEffect(() => {
          const fetchCustomer = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/credit', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    // const filteredData = json.filter(item => {
                    //      const transid = item.transaction_id
                    //      return transid == transactionnumber

                    // });
                    setAllCredits(json)
               }
          }
          if (user) {
               fetchCustomer();
          }


     }, [user, refresher])

     useEffect(() => {
          let product_cost_total = 0;

          arr.forEach((item) => {
               product_cost_total += item.product_cost_price
          });
          setcosttotal(product_cost_total);
          console.log(costtotal)
     }, [gridTrigger]);

     // Fetch drawer status
     const [drawers, setdrawers] = useState([]);
     const [loading, setLoading] = useState(true)
     const [drawer_id, setdrawer_id] = useState("")
     const [isclosed, setisclosed] = useState(false)

     useEffect(() => {
          const fetchDrawerStatus = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/drawer/', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()
               if (response.ok) {
                    if (json[0].drawer_status === "OPENED") {
                         setLoading(false);
                    }
                    else { //if closed
                         setLoading(false);
                         setisclosed(true)
                    }

                    setdrawer_id(json[0]._id)
               }
          }
          if (user) {
               fetchDrawerStatus();
          }
     }, [user, refresher])







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

     useEffect(() => {
          let total = quantity_left * product_selling_price;
          setrow_total(total);
     }, [quantity_left, product_selling_price])


     useEffect(() => {
          let total = quantity_left * product_cost_price;
          setcosttotal2(total);
     }, [quantity_left, product_cost_price])


     const handleRowClickReceipt = (params) => {
          setprms(params)
          // setId(params.row.id)
          // console.log(id)
     };

     const handleRemoveItem = () => {
          const params = prms
          const newData = arr.filter((item) => item.product_code !== params.row.product_code);
          setArr(newData);
     }



     const handlechecker = () => {
          console.log(allCredits)
     }

     const handleNewTransaction = () => {
          handleRefresher()
          setArr([])
          setButtonNewTransactionDisabled(true)
          setButtonAddtoCartDisabled(false)
          setisButtonSaveTransaction(true)
          setButtonDisabled(true)
          handleTransactionId();
          settotal(0)
          setcash(0)
          setdiscounted_amount(0)
          setdiscount(0)
          setchange(0)
          setcustomer_id("")
          setcustomer_name("")
          setcustomer_nameonly("")

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
     const handleOnErrorDuplicate = () => {
          setopen_errorduplicate(true);
     };
     const handleOffErrorDuplicate = () => {
          setopen_errorduplicate(false);
     };

     const handleStockError = () => {
          setopen_stockerror(true);
     };
     const handleStockErrorOff = () => {
          setopen_stockerror(false);
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
          let num = Math.floor(Math.random() * 90000) + 10000;
          const value = "S-" + num
          setTransactionnumber(value)
     }
     /**Handle Delete */
     const handleCloseDelete = () => {
          setOpenDelete(false);
     };
     const handleOpenDelete = () => {
          setOpenDelete(true);
     };
     // const handlecash = (event) => {

     //      const cash = event.target.value

     //      if (paymenttype !== 'Credit') {
     //           let change = cash - total
     //           setchange(change);
     //           setcash(cash)
     //      }
     //      else {
     //           setcash(cash)
     //           setchange(0);
     //      }



     // };
     const handlecash = (event) => {
          const cash = event.target.value;

          if (paymenttype !== 'Credit') {
               let change;
               if (amoundue > 0) {
                    change = cash - amoundue; // Calculate change based on discounted amount if discount applied
               } else {
                    change = cash - total; // Calculate change based on total amount if no discount applied
               }
               setchange(change);
               setcash(cash);
          } else {
               setcash(cash);
               setchange(0);
          }
     };

     const handleAddItem = () => {
          const isDuplicate = arr.find(item => item.product_code === product_code);
          if (product_stock < quantity_left) {
               handleStockError()
               setTimeout(() => {
                    handleStockErrorOff();
               }, 4000);
          }
          else if (isDuplicate) {
               handleOnErrorDuplicate()
               setTimeout(() => {
                    handleOffErrorDuplicate();
               }, 4000);
          }
          else {
               const newObject = {
                    id: id,
                    stock: product_stock,
                    product_code: product_code,
                    product_name: product_name,
                    product_description: product_description,
                    product_cost_price: product_cost_price,
                    product_selling_price: product_selling_price,
                    product_quantity: quantity_left,
                    product_total: row_total,
                    product_cost_total: costtotal2

               };
               setArr([...arr, newObject]);
               setGridTrigger(!gridTrigger)
          }
          console.log('**********************', arr)
     };


     const getRowId = (arr) => {
          return arr.product_code
     }
     useEffect(() => {
          if (arr.length === 0) {
               setisButtonSaveTransaction(true)
          }
          else {
               setisButtonSaveTransaction(false)
          }
     }, [arr]);




     const handleOpenSave = () => {
          if (customer_name === "") {
               errorToast("Select a customer first")
          }
          else {
               setopenSave(true);
          }
     };
     const handleCloseSave = () => {
          setopenSave(false);


     };
     const handlePaymentTypeChange = (e) => {
          setpaymenttype(e.target.value);
          setcash('');
          setchange('')

     };

     const handlediscount = (e) => {
          const discountPercentage = parseInt(e.target.value); // Convert the selected discount to a number
          const amountdue = total - (total * discountPercentage / 100); // Calculate the discounted amount
          const discountedamount = total - amoundue

          setdiscount(e.target.value);
          setamoundue(amountdue);
          setdiscounted_amount(discountedamount)
          setcash(0)
          setchange(0)


     };
     useEffect(() => {
          const discountedamount = total - parseFloat(amoundue);
          setdiscounted_amount(discountedamount);
     }, [amoundue, total]);

     useEffect(() => {
          if (paymenttype == 'Credit') {
               setcredit_sales(amoundue)
          }
     }, [amoundue, paymenttype]);

     useEffect(() => {
          if (paymenttype == 'Cash') {
               setcash_sales(amoundue)
          }
     }, [amoundue, paymenttype]);

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
     const handleRowClick2 = (params) => {
          setId(params.row._id);
          console.log(id)

     };
     const handleUpdateStocks = async (e) => {

          for (let i = 0; i < arr.length; i++) {
               const product = {
                    product_stock: arr[i].stock - arr[i].product_quantity
               }
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/product/' + arr[i].id, {
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
          }
     }

     const handleSaveTransaction = async (e) => {

          e.preventDefault()
          handleUpdateStocks()
          if (cash >= amoundue) {
               const pos = {
                    pos_date: currentDate,
                    pos_transaction_id: transactionnumber,
                    pos_items: arr,
                    pos_cost_total: costtotal2,
                    pos_total: total,
                    pos_drawer_id: drawer_id,
                    pos_user: user.username,
                    pos_customer_name: customer_name,
                    pos_cash: cash,
                    pos_change: change,
                    pos_discount: discount,
                    pos_credit_sales: credit_sales,
                    pos_cash_sales: cash_sales

               }
               if (!user) {
                    console.log('You must be logged in first')
                    return
               }
               if (
                    arr.length == 0
               ) {
                    errorToast("Please add an item before saving a transaction")
               }
               else {

                    const response = await fetch('https://coop-back-zqr6.onrender.com/api/pos/', {
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

                         successToast("Transaction completed. Download the receipt if needed.")
                         //setArr([])
                         //handleOnSuccess();
                         setButtonDisabled(false);
                         setButtonAddtoCartDisabled(true)
                         handleCloseSave()
                         setButtonNewTransactionDisabled(false)
                         setisButtonSaveTransaction(true)
                         handleRefresher()

                    }


               }

          }
          else {
               errorToast("Amount paid should be equal or greater than the total amount")
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
               }, 4000);
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
               handleOnSuccess();
               setTimeout(() => {
                    handleRefresher()
                    handleOffSuccess();
               }, 4000);
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
               }, 4000);
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
               handleOnSuccess();
               setTimeout(() => {
                    handleRefresher()
                    handleOffSuccess();
               }, 4000);
          }

     }
     //<PDFDownloadLink fileName={transactionnumber} document={< PosPrinter data={arr} currentdate={currentDate} total={total} transactionnumber={transactionnumber} />} ></PDFDownloadLink>
     const generatePDF = () => {

          const pdf1 = new jsPDF({
               orientation: 'portrait',
               format: [100, 460], // Adjust the dimensions as needed
          });
          pdf1.setFontSize(10); // Adjust font size as needed
          pdf1.setFont('helvetica', 'normal');
          const styles = {
               fontSize: 8, // Adjust font size as needed
               font: 'helvetica', // Adjust font family as needed
               fontStyle: 'normal' // Adjust font style as needed (normal, bold, italic)
          };
          // Define table headers
          const headers = ['Name', 'QTY', 'Price', 'Total'];
          pdf1.text(`Sales Invoice (CASHIER'S COPY)`, 28, 10);
          pdf1.text('OneHappyChild', 40, 20);
          pdf1.text('8001 Bucal Rd. Brgy. Santol,', 30, 25);
          pdf1.text('Tanza, Cavite', 42, 30);
          pdf1.text('09065737483', 41, 35);
          pdf1.text('Sales Invoice #: ' + transactionnumber, 15, 50);
          pdf1.text('Date and Time of Purchase: ' + currentDate, 15, 55);
          pdf1.text('Total: P' + total, 15, 60);
          pdf1.text('Discount: ' + (discount !== 0 ? discount + "%" : "No Discount"), 15, 65);
          pdf1.text('Discounted Amount: P' + discounted_amount, 15, 70);
          pdf1.text('Cash Sales: P' + cash_sales, 15, 80);
          pdf1.text('Credit Sales: P' + credit_sales, 15, 85);
          pdf1.text('Tax 0%: P' + 0, 15, 90);
          pdf1.text('Cash/Credit: P' + cash, 15, 100);
          pdf1.text('Change: P' + change, 15, 105);
          pdf1.text('Customer: ' + customer_name, 15, 110);
          pdf1.text('Cashier: ' + user.username, 15, 115);

          // Extract data for the table body
          const body = arr.map(item => [
               // item.product_code,
               item.product_name,
               // item.product_description,
               item.product_quantity,
               item.product_selling_price,
               item.product_total
          ]);

          // Add content to the PDF using autoTable

          pdf1.autoTable({
               head: [headers],
               body: body,
               startY: 120, // Adjust the starting position below the header text
               styles: styles
          });

          pdf1.text('______________________________', 15, 420);
          pdf1.text('Item sold will not be refunded.', 15, 430);
          pdf1.text('Only Exchange will be executed within 5 days', 15, 435);
          pdf1.text('Thanks for shopping', 15, 440);
          pdf1.text('onehappylifefoundation@gmail.com', 15, 445);
          pdf1.save(`CASHIER_COPY_${transactionnumber}_receipt.pdf`);









          const pdf2 = new jsPDF({
               orientation: 'portrait',
               format: [100, 460], // Adjust the dimensions as needed
          });
          pdf2.setFontSize(10); // Adjust font size as needed
          pdf2.setFont('helvetica', 'normal');
          const styles2 = {
               fontSize: 8, // Adjust font size as needed
               font: 'helvetica', // Adjust font family as needed
               fontStyle: 'normal' // Adjust font style as needed (normal, bold, italic)
          };
          // Define table headers
          const headers2 = ['Name', 'QTY', 'Price', 'Total'];
          pdf2.text(`Sales Invoice (CUSTOMER'S COPY)`, 26, 10);
          pdf2.text('OneHappyChild', 40, 20);
          pdf2.text('8001 Bucal Rd. Brgy. Santol,', 30, 25);
          pdf2.text('Tanza, Cavite', 42, 30);
          pdf2.text('09065737483', 41, 35);
          pdf2.text('Sales Invoice #: ' + transactionnumber, 15, 50);
          pdf2.text('Date and Time of Purchase: ' + currentDate, 15, 55);
          pdf2.text('Total: P' + total, 15, 60);
          pdf2.text('Discount: ' + (discount !== 0 ? discount + "%" : "No Discount"), 15, 65);
          pdf2.text('Discounted Amount: P' + discounted_amount, 15, 70);
          pdf2.text('Cash Sales: P' + cash_sales, 15, 80);
          pdf2.text('Credit Sales: P' + credit_sales, 15, 85);
          pdf2.text('Tax 0%: P' + 0, 15, 90);
          pdf2.text('Cash/Credit: P' + cash, 15, 100);
          pdf2.text('Change: P' + change, 15, 105);
          pdf2.text('Customer: ' + customer_name, 15, 110);
          pdf2.text('Cashier: ' + user.username, 15, 115);
          // Extract data for the table body
          const body2 = arr.map(item => [

               item.product_name,

               item.product_quantity,
               item.product_selling_price,
               item.product_total
          ]);

          // Add content to the PDF using autoTable

          pdf2.autoTable({
               head: [headers2],
               body: body2,
               startY: 120, // Adjust the starting position below the header text
               styles: styles2
          });

          pdf2.text('______________________________', 15, 420);
          pdf2.text('Item sold will not be refunded.', 15, 430);
          pdf2.text('Only Exchange will be executed within 5 days', 15, 435);
          pdf2.text('Thanks for shopping', 15, 440);
          pdf2.text('onehappylifefoundation@gmail.com', 15, 445);
          pdf2.save(`CASHIER_COPY_${transactionnumber}_receipt.pdf`);
          pdf2.save(`CLIENT_COPY_${transactionnumber}_receipt.pdf`);







          const pdf3 = new jsPDF({
               orientation: 'portrait',
               format: [600, 300], // Adjust the dimensions as needed
          });
          pdf3.setFontSize(10); // Adjust font size as needed
          pdf3.setFont('helvetica', 'normal');
          const styles3 = {
               fontSize: 8, // Adjust font size as needed
               font: 'helvetica', // Adjust font family as needed
               fontStyle: 'normal' // Adjust font style as needed (normal, bold, italic)
          };
          // Define table headers
          const headers3 = ['Name', 'QTY', 'Price', 'Total'];
          pdf3.text(`Sales Invoice (ADMIN'S COPY)`, 15, 10);
          pdf3.text('OneHappyChild', 15, 20);
          pdf3.text('8001 Bucal Rd. Brgy. Santol,', 15, 25);
          pdf3.text('Tanza, Cavite', 15, 30);
          pdf3.text('09065737483', 15, 35);
          pdf3.text('Sales Invoice #: ' + transactionnumber, 15, 50);
          pdf3.text('Date and Time of Purchase: ' + currentDate, 15, 55);
          pdf3.text('Total: P' + total, 15, 60);
          pdf3.text('Discount: ' + (discount !== 0 ? discount + "%" : "No Discount"), 15, 65);
          pdf3.text('Discounted Amount: P' + discounted_amount, 15, 70);
          pdf3.text('Cash Sales: P' + cash_sales, 15, 80);
          pdf3.text('Credit Sales: P' + credit_sales, 15, 85);
          pdf3.text('Tax 0%: P' + 0, 15, 90);
          pdf3.text('Cash/Credit: P' + cash, 15, 100);
          pdf3.text('Change: P' + change, 15, 105);
          pdf3.text('Customer: ' + customer_name, 15, 110);
          pdf3.text('Cashier: ' + user.username, 15, 115);
          // Extract data for the table body
          const body3 = arr.map(item => [
               item.product_code,
               item.product_name,
               item.product_description,
               item.product_quantity,
               item.product_selling_price,
               item.product_total
          ]);

          // Add content to the PDF using autoTable

          pdf3.autoTable({
               head: [headers3],
               body: body3,
               startY: 120, // Adjust the starting position below the header text
               styles: styles3
          });
          pdf3.save(`ADMIN_COPY_${transactionnumber}_receipt.pdf`);
     };
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
               handleOnSuccess();
               handleCloseDelete();
               setTimeout(() => {
                    handleRefresher()
                    handleOffSuccess();

               }, 4000);
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
                                        </div>

                                   ) : (

                                        isclosed ? (
                                             <div>
                                                  <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
                                                       <ImageContainer src={drawer_image}></ImageContainer>
                                                  </div>
                                                  <p style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>Drawer is CLOSED. Ask admin to open the drawer.</p>
                                             </div>
                                        ) : (
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
                                                            {openStockError ? <Alert onClose={handleStockErrorOff} variant="filled" severity="error">Not enough stocks</Alert> : ""}
                                                            {openErrorDuplicate ? <Alert onClose={handleOffErrorDuplicate} variant="filled" severity="error">Item already added. If you want to update the quantity, remove and update it.</Alert> : ""}
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
                                                                      <Button disabled={isButtonAddtoCartDisabled} style={{ width: "100%", padding: "10px" }} variant="contained" color="purple" onClick={handleAddItem}>
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

                                                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                                                 <label style={{ marginBottom: "20px" }}>Date of Purchase: {currentDate}</label>
                                                                 <label style={{ marginBottom: "20px" }}>Sales Invoice #: {transactionnumber}</label>
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
                                                       {openSuccess ? <Alert onClose={handleOffSuccess} variant="filled" severity="success">Successfully Saved. Please download receipt if necessary</Alert> : ""}
                                                       {openError ? <Alert onClose={handleOffError} variant="filled" severity="error">Please fill up the form completely</Alert> : ""}

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
                                                                           flexDirection: "column",

                                                                      }}>

                                                                           <Autocomplete
                                                                                value={customer_name}
                                                                                style={{ marginRight: "10px" }}
                                                                                onSelect={handleName}
                                                                                options={customers.map((data) => data.customer_id + " - " + data.customer_name)}
                                                                                renderInput={(params) => (
                                                                                     <TextField
                                                                                          {...params}
                                                                                          required
                                                                                          label="Search Customer"
                                                                                          fullWidth
                                                                                          style={{ paddingBottom: "20px", width: "500px" }}
                                                                                     />
                                                                                )}
                                                                           />

                                                                           <div>Customer Name: {customer_nameonly}</div>
                                                                           <div>Customer ID: {customer_id}</div>

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
                                                                      <div>
                                                                           <Button disabled={isButtonSaveTransaction} style={{ width: "100%", padding: "10px", marginBottom: "5px" }} variant="contained" color="green" onClick={
                                                                                handleOpenSave}>
                                                                                Save Transaction

                                                                           </Button>
                                                                           <Button disabled={isButtonAddtoCartDisabled} style={{ width: "100%", padding: "10px", marginBottom: "5px" }} variant="contained" color="red" onClick={handleRemoveItem}>
                                                                                Remove from cart
                                                                           </Button>
                                                                           <Button disabled={isButtonNewTransactionDisabled} style={{ width: "100%", padding: "10px", marginBottom: "5px" }} variant="contained" color="purple" onClick={handleNewTransaction}>
                                                                                New Transaction
                                                                           </Button>

                                                                      </div>

                                                                      {/* <Button disabled={isButtonDisabled} style={{ width: "100%", padding: "10px", marginBottom: "5px" }} variant="contained" color="green">
                                                                           <PDFDownloadLink fileName={transactionnumber} document={< PosPrinter data={arr} currentdate={currentDate} total={total} transactionnumber={transactionnumber} />} >
                                                                                {({ loading }) => (loading ? 'Loading document...' : 'Download Receipt')}
                                                                           </PDFDownloadLink>
                                                                      </Button> */}
                                                                      <Button
                                                                           style={{ width: "100%", padding: "10px", marginBottom: "5px" }}
                                                                           variant="contained"
                                                                           color="green"
                                                                           onClick={generatePDF}
                                                                      >
                                                                           Download Receipt
                                                                      </Button>

                                                                      <Button
                                                                           style={{ width: "100%", padding: "10px", marginBottom: "5px" }}
                                                                           variant="contained"
                                                                           color="green"
                                                                           onClick={handlechecker}
                                                                      >
                                                                           checker
                                                                      </Button>

                                                                      {/* <Button style={{ marginRight: "5px", width: "100%", padding: "10px" }} variant="outlined" color="red">
                                                                
                                                            </Button> */}
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

                                                                 <Dialog
                                                                      open={openSave}
                                                                      onClose={handleCloseSave}
                                                                      aria-labelledby="alert-dialog-title"
                                                                      aria-describedby="alert-dialog-description"
                                                                 >
                                                                      <DialogTitle id="alert-dialog-title">
                                                                           <h2>{"Finalizing Transaction"}</h2>
                                                                      </DialogTitle>
                                                                      <DialogContent>

                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Amount Due"
                                                                                InputLabelProps={{
                                                                                     style: { color: "red", fontWeight: "bold" }
                                                                                }}
                                                                                style={{ paddingBottom: "20px", fontSize: "20px", marginTop: "20px" }}
                                                                                onChange={(e) => setamoundue(e.target.value)}
                                                                                value={amoundue}
                                                                                InputProps={{
                                                                                     readOnly: true,
                                                                                }}
                                                                           />
                                                                           <TextField
                                                                                id="outlined-required"
                                                                                label="Discount"
                                                                                select
                                                                                style={{ paddingBottom: "20px" }}
                                                                                fullWidth
                                                                                onChange={handlediscount}
                                                                                value={discount}
                                                                           >
                                                                                <MenuItem MenuItem value={"0"}>No Discount</MenuItem>
                                                                                <MenuItem MenuItem value={"10"}>10%</MenuItem>
                                                                                <MenuItem MenuItem value={"20"}>20%</MenuItem>
                                                                                <MenuItem MenuItem value={"30"}>30%</MenuItem>
                                                                                <MenuItem MenuItem value={"40"}>40%</MenuItem>
                                                                                <MenuItem MenuItem value={"50"}>50%</MenuItem>
                                                                           </TextField>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Discounted Amount Due"
                                                                                style={{ paddingBottom: "20px", fontSize: "40px", marginTop: "20px" }}
                                                                                onChange={(e) => setdiscounted_amount(e.target.value)}
                                                                                value={discounted_amount}
                                                                                InputProps={{
                                                                                     readOnly: true,
                                                                                }}
                                                                           />

                                                                           <TextField
                                                                                id="outlined-required"
                                                                                label="Payment Type"
                                                                                select
                                                                                style={{ paddingBottom: "20px" }}
                                                                                fullWidth
                                                                                onChange={handlePaymentTypeChange}
                                                                                value={paymenttype}
                                                                           >
                                                                                <MenuItem value={"Cash"}>Cash</MenuItem>
                                                                                <MenuItem value={"Credit"}>Credit</MenuItem>
                                                                           </TextField>
                                                                           <TextField
                                                                                fullWidth
                                                                                id="outlined-required"
                                                                                label="Enter Amount Paid"
                                                                                style={{ paddingBottom: "20px", fontSize: "40px" }}
                                                                                onChange={handlecash}
                                                                                value={cash}

                                                                           />
                                                                           {paymenttype !== 'Credit' && (
                                                                                <TextField
                                                                                     fullWidth
                                                                                     id="outlined-required"
                                                                                     label="Change"
                                                                                     style={{ paddingBottom: "20px", fontSize: "40px", color: "#991f1f" }}
                                                                                     onChange={(e) => setchange(e.target.value)}
                                                                                     value={change}
                                                                                     InputProps={{
                                                                                          readOnly: true,
                                                                                     }}
                                                                                />
                                                                           )}

                                                                      </DialogContent>
                                                                      <DialogActions>
                                                                           <Button onClick={handleSaveTransaction}>Save</Button>
                                                                           <Button onClick={handleCloseSave} autoFocus>
                                                                                Cancel
                                                                           </Button>
                                                                      </DialogActions>
                                                                 </Dialog>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>))}
                              </Card>
                         </Main>
                    </Wrapper>
               </Container >
          </div >
     )

}

export default Pos