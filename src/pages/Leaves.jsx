
import styled from 'styled-components'
import Header from '../components/Header'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react"
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
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
     { field: 'employee_id', headerName: 'Employee ID', width: 100 },
     { field: 'employee_fullname', headerName: 'Name', width: 300, sortable: false },
     { field: 'leave_type', headerName: 'Type', width: 300, sortable: false },
     { field: 'date', headerName: 'Date', width: 300, sortable: false },
     { field: 'duration', headerName: 'Duration', width: 300, sortable: false },
     { field: 'status', headerName: 'Status', width: 300, sortable: false },
     { field: 'approver', headerName: 'Approver', width: 300, sortable: false }

];

const Leaves = (props) => {


     /**POST REQUESTS */
     const [employee_id, setEmployee_id] = useState('')
     const [fullname, setFullname] = useState('')
     const [leave_type, setLeave_type] = useState('')
     const [date, setDate] = useState('')
     const [duration, setDuration] = useState('')
     const [status, setStatus] = useState('')
     const [approver, setApprover] = useState('')
     const [pendingLeaves, setPendingLeaves] = useState([]);

     const [error, setError] = useState('')
     const [query, setQuery] = useState('')
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openAdd, setOpenAdd] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);

     /**DIALOG */
     const handleOpenAdd = () => {
          setOpenAdd(true);

     };
     const handleCloseAdd = () => {
          setOpenAdd(false);
     };
     const handleCloseWarning = () => {
          setOpenWarning(false);
     };

     const handleOpenDelete = () => {
          if (id == "") {
               setOpenWarning(true)
          }
          else {
               setOpenDelete(true);
          }

     };
    
     const handleCloseDelete = () => {
          setOpenDelete(false);
     };
     const handleOpenEdit = () => {
          if (id == "") {
               setOpenWarning(true)
          }
          else {
               setOpenEdit(true);
          }

     };
     const handleCloseEdit = () => {
          setOpenEdit(false);
     };


     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


     /**EDIT DATA */
     const handlePatch = async (e) => {
          e.preventDefault()
          const leaves = {
               status: status,
               approver: approver,
               //search for this employee and minus its leaves.
          }

          const response = await fetch('https://coop-backend-v1.herokuapp.com/api/leaves/' + id, {
               method: 'PATCH',
               body: JSON.stringify(leaves),
               headers: {
                    'Content-Type': 'application/json'
               }
          })
          const json = await response.json()
          if (!response.ok) {
               setError(json.error)
          }
          else {
               //SHOW ALERT HERE (OPEN ALERT)
               window.location.reload();
          }

     }

     const handleRowClick = (params) => {
          setId(params.row._id);
          setFullname(params.row.fullname)
          setLeave_type(params.row.firstname)
          setDate(params.row.lastname)
          setDuration(params.row.department)
          setStatus(params.row.base_salary)
          setApprover(params.row.allowance)
     };

     const [leaves, setLeaves] = useState([])
     useEffect(() => {
          const fetchLeaves = async () => {
               const response = await fetch('https://coop-backend-v1.herokuapp.com/api/leaves')
               const json = await response.json()

               if (response.ok) {
                    setLeaves(json)
                    setPendingLeaves(json.filter(leave => {
                         return leave.status === 'Pending'
                    }))
               }
          }
          fetchLeaves();

     }, [])


     return (
          <Container>
               <Wrapper>
                    <Main>
                         <Header title={props.title} user={props.user} />
                         <Card>
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
                                        rows={pendingLeaves.filter((leave) =>
                                             leave.employee_id.toLowerCase().includes(query))}
                                        columns={columns}
                                        pageSize={7}
                                        rowsPerPageOptions={[5]}
                                        onRowClick={handleRowClick}
                                   />
                                   <ButtonContainer>

                                        <EditDeleteContainer>
                                             <ThemeProvider theme={theme}>
                                                  <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="green" onClick={handleOpenEdit}>
                                                       APPROVE
                                                  </Button>
                                                  <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="red" onClick={handleOpenEdit}>
                                                       REJECT
                                                  </Button>
                                             </ThemeProvider>
                                        </EditDeleteContainer>
                                   </ButtonContainer>

                                   <Dialog
                                        open={openEdit}
                                        onClose={handleCloseEdit}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                   >
                                        <DialogTitle id="alert-dialog-title">

                                             <h2>{"Approval Confirmation"}</h2>
                                        </DialogTitle>
                                        <DialogContent>
                                             <DialogContentText id="alert-dialog-description">
                                                  {`Please confirm to approve ${fullname}`}
                                             </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                             <Button onClick={handleCloseWarning} autoFocus>
                                                  Okay
                                             </Button>
                                        </DialogActions>
                                   </Dialog>



                                   <Dialog
                                        open={openWarning}
                                        onClose={handleCloseWarning}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                   >
                                        <DialogTitle id="alert-dialog-title">

                                             <h2>{"No data has been selected"}</h2>
                                        </DialogTitle>
                                        <DialogContent>
                                             <DialogContentText id="alert-dialog-description">
                                                  You need to select a data first before deleting/editing
                                             </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                             <Button onClick={handleCloseWarning} autoFocus>
                                                  Okay
                                             </Button>
                                        </DialogActions>
                                   </Dialog>
                              </div>
                         </Card>
                    </Main>
               </Wrapper>
          </Container>

     )
}

export default Leaves