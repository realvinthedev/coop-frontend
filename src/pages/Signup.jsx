
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../components/Navbar';
import { useSignup } from '../hooks/useSignup';
import { Alert } from '@mui/material';
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
     flex-direction: column;
    padding-top: 150px;
     padding-left: 200px;
     padding-right: 200px;
   
  
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
const Signup = (props) => {


     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const [openError, setOpenError] = useState(false);
     const { signup, error, isLoading } = useSignup()

     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


     const handleSubmit = async (e) => {
          e.preventDefault()
          await signup(username, password)
          setUsername('')
          setPassword('')
          handleOnError()
     }
     const handleOnError = () => {
          setOpenError(true);
     };

     const handleOffError = () => {
          setOpenError(false);
     };
     return (
          <div style={{ display: "flex" }}>
               <Navbar></Navbar>
               <Container>
                    <Wrapper>
                         <Main>
                              <Header title={props.title} user={props.user} />
                              <Card>
                                   <FormContainer>

                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Username"
                                             fullWidth
                                             style={{ paddingBottom: "20px" }}
                                             onChange={(e) => setUsername(e.target.value)}
                                             value={username}
                                        />
                                        <TextField
                                             required
                                             id="outlined-required"
                                             label="Password"
                                             fullWidth
                                             type="password"
                                             style={{ paddingBottom: "20px" }}
                                             onChange={(e) => setPassword(e.target.value)}
                                             value={password}
                                        />
                                        <ThemeProvider theme={theme}>
                                             <Button disabled={isLoading} style={{ marginTop: "50px", padding: "15px", width: "100%" }} variant="outlined" color="green" onClick={handleSubmit}>
                                                  Signup
                                             </Button>
                                             {error && <div>{error}</div>}
                                             {openError ? <Alert onClose={handleOffError} severity="success">Successfully Added</Alert> : ""}
                                        </ThemeProvider>
                                   </FormContainer>
                              </Card>
                         </Main>
                    </Wrapper>
               </Container>
          </div>
     )
}

export default Signup