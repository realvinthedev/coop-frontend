
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
import Navbar from '../components/Navbar'
import { useEffect, useState } from "react"
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext } from '../hooks/useAuthContext'
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
     { field: 'employee_id', headerName: 'Employee ID', width: 130 },
     { field: 'firstname', headerName: 'Firstname', width: 300, sortable: false },
     { field: 'lastname', headerName: 'Lastname', width: 300 },
     { field: 'department', headerName: 'Department', width: 300, sortable: false },
     { field: 'base_salary', headerName: 'Base Salary', width: 300 },
     { field: 'allowance', headerName: 'Allowances', width: 300, sortable: false },
     { field: 'total_salary', headerName: 'Total', width: 300, sortable: false },

];

const Salaries = (props) => {


     /**POST REQUESTS */
     const [employee_id, setEmployee_id] = useState('')
     const [firstname, setFirstname] = useState('')
     const [lastname, setLastname] = useState('')
     const [department, setDepartment_name] = useState('')
     const [base_salary, setBase_salary] = useState(0)
     const [allowance, setAllowance] = useState(0)
     const [total_salary, setTotal_salary] = useState(0)


     const [error, setError] = useState('')
     const [query, setQuery] = useState('')
     const [id, setId] = useState('')
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
     const [openAdd, setOpenAdd] = useState(false);
     const [openWarning, setOpenWarning] = useState(false);
     const { user } = useAuthContext()

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
     const handleCalculateTotalSalary = () => {
          let total = 0;
          let base = Number(base_salary);
          let allow = Number(allowance);
          total = base + allow;
          setTotal_salary(total)
     }
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
          const salary = {
               firstname: firstname,
               lastname: lastname,
               department: department,
               base_salary: base_salary,
               allowance: allowance,
               total_salary: total_salary
          }

          if(!user){
               console.log('You must be logged in first')
              return
          }
          const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee/' + id, {
               method: 'PATCH',
               body: JSON.stringify(salary),
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
               //SHOW ALERT HERE (OPEN ALERT)
               console.log('Edited Department', json)
               window.location.reload();
          }

     }

     const handleRowClick = (params) => {
          setId(params.row._id);
          setEmployee_id(params.row.employee_id)
          setFirstname(params.row.firstname)
          setLastname(params.row.lastname)
          setDepartment_name(params.row.department)
          setBase_salary(params.row.base_salary)
          setAllowance(params.row.allowance)
          setTotal_salary(params.row.total_salary)
     };

     const [employees, setEmployee] = useState([])
     useEffect(() => {
          const fetchEmployees = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/employee', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setEmployee(json)
               }
          }
          if(user){
               fetchEmployees();
          }
       
     }, [user])
     const [dept, setDept] = useState([])
     useEffect(() => {
          const fetchDepartment = async () => {
               const response = await fetch('https://coop-back-zqr6.onrender.com/api/departments', {
                    headers: {
                         'Authorization': `Bearer ${user.token}`
                    }
               })
               const json = await response.json()

               if (response.ok) {
                    setDept(json)
               }
          }
          if(user){
               fetchDepartment();
          }
     }, [user])


     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
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
                                             rows={employees.filter((employee) =>
                                                  employee.firstname.toLowerCase().includes(query))}
                                             columns={columns}
                                             pageSize={7}
                                             rowsPerPageOptions={[5]}
                                             onRowClick={handleRowClick}

                                        />
                                        <ButtonContainer>

                                             <EditDeleteContainer>
                                                  <ThemeProvider theme={theme}>
                                                       <Button style={{ marginTop: "20px", marginRight: "5px" }} variant="outlined" color="blue" onClick={handleOpenEdit}>
                                                            Edit
                                                       </Button>
                                                  </ThemeProvider>
                                             </EditDeleteContainer>
                                        </ButtonContainer>


                                        <Dialog
                                             fullScreen={fullScreen}
                                             open={openEdit}
                                             onClose={handleCloseEdit}
                                             aria-labelledby="alert-dialog-title"
                                             aria-describedby="alert-dialog-description"
                                             fullWidth
                                             maxWidth="sm"
                                        >
                                             <DialogTitle id="alert-dialog-title">

                                                  Editing Salary
                                             </DialogTitle>
                                             <DialogContent style={{ height: '500', paddingTop: '20px' }}>

                                                  <TextField
                                                       disabled
                                                       id="outlined-required"
                                                       label="Employee ID"
                                                       fullWidth
                                                       value={employee_id}
                                                       style={{ paddingBottom: "20px" }}
                                                       InputProps={{
                                                            readOnly: true,
                                                       }}
                                                  />
                                                  <TextField
                                                       // error={firstname === ""}
                                                       required
                                                       disabled
                                                       id="outlined-required"
                                                       label="Firstname"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setFirstname(e.target.value)}
                                                       value={firstname}
                                                  />
                                                  <TextField
                                                       disabled
                                                       required
                                                       id="outlined-required"
                                                       label="Lastname"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setLastname(e.target.value)}
                                                       value={lastname}
                                                  />
                                                  <TextField
                                                       required
                                                       disabled
                                                       id="outlined-required"
                                                       label="Department"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setDepartment_name(e.target.value)}
                                                       value={department}
                                                  >
                                                  </TextField>
                                                  <TextField
                                                       type="number"
                                                       required
                                                       id="outlined-required"
                                                       label="Base Salary"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => {
                                                            setBase_salary(e.target.value)
                                                       }}
                                                       value={base_salary}
                                                       onMouseLeave={handleCalculateTotalSalary}
                                                  />
                                                  <TextField
                                                       type="number"
                                                       on
                                                       required
                                                       id="outlined-required"
                                                       label="Allowance"
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       value={allowance}
                                                       onChange={(e) => {
                                                            setAllowance(e.target.value)
                                                       }}
                                                       onMouseLeave={handleCalculateTotalSalary}
                                                  />
                                                  <TextField
                                                       disabled
                                                       id="outlined-disabled"
                                                       type="number"
                                                       required
                                                       label="Total"
                                                       InputLabelProps={{ shrink: true }}
                                                       fullWidth
                                                       style={{ paddingBottom: "20px" }}
                                                       onChange={(e) => setTotal_salary(e.target.value)}
                                                       value={total_salary}
                                                  />

                                             </DialogContent>
                                             <DialogActions>
                                                  <Button onClick={handlePatch}>Update</Button>
                                                  <Button onClick={handleCloseEdit} autoFocus>
                                                       Cancel
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
          </div>
     )
}

export default Salaries