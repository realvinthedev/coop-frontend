import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext } from '../hooks/useAuthContext';
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
    background-color: white;
    height: 580px;
    width: 1020px;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    justify-content: space-between;
    margin: 15px;
`

const TextContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`
const DataContainer = styled.div`
    width: 100%;
`
const ButtonContainer = styled.div`
     display: flex;
     justify-content: left;
`
const SearchContainer = styled.div`
     display: flex;
     padding-bottom: 10px;
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
    const [query, setQuery] = useState('')
    const [department_name, setDepartment_name] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [id, setId] = useState('')
    const [employee_id, setEmployee_id] = useState('')
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [approve, setApprove] = useState(false);
    const [pendingLeaves, setPendingLeaves] = useState([]);

    const { user } = useAuthContext()
    const handleRowClick = (params) => {
        setId(params.row._id);
        setEmployee_id(params.row.employee_id)
    };
    const handleCloseApprove = () => {
        setApprove(false);
    };
    const handleCloseWarning = () => {
        setOpenWarning(false);
    };

    const [leaves, setLeaves] = useState([])
    useEffect(() => {
        const fetchLeaves = async () => {
            const response = await fetch('https://coop-back-zqr6.onrender.com/api/leaves',{
                headers: {
                     'Authorization': `Bearer ${user.token}`
                }
           })
            const json = await response.json()

            if (response.ok) {
                setLeaves(json)
                setPendingLeaves(json.filter(leave => {
                    return leave.status === 'Pending'
                }))
            }
        }
        if(user){
            fetchLeaves();
        }
    }, [user])

    return (
        <Container>
            {/* {handlePending()} */}
            <DataContainer>
                <TextContainer>
                    <p style={{ color: "#8d89b4", paddingRight: "20px" }}>{props.title}</p>
                    <h1 style={{ fontSize: "35px", fontWeight: "500" }}>{props.data}</h1>
                </TextContainer>

                <SearchContainer>
                    <TextField
                        required
                        id="search"
                        label="Search"
                        fullWidth
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </SearchContainer>
                <div style={{ height: 350, width: '100%' }}>
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
                        <ThemeProvider theme={theme}>
                            <Link to="/leaves">
                                <Button style={{ marginTop: "20px", marginRight: "20px" }} variant="outlined" color="green">
                                    Go to Leaves Page
                                </Button>
                            </Link>
                        </ThemeProvider>
                    </ButtonContainer>
                    <Dialog
                        open={approve}
                        onClose={handleCloseApprove}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {`Are you sure to approve leave of ${employee_id}`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick>Delete</Button>
                            <Button onClick={handleCloseApprove}>Cancel</Button>
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
            </DataContainer>
        </Container>

    )
}




export default Leaves


/**TASKS
 * 1. DISPLAY ONLY THE STATUS PENDING
 * 2. SORT BY DATE (WHO FIRST FILE THE LEAVE)
 */