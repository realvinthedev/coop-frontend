import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize, width } from '@mui/system';
import LoginLogo from '../images/login_logo.jpg'
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';


const Container = styled.div`
    background-color: #ffffff;
    height: 100vh;
    width: 1920px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SampleLogoContainer = styled.img`
     width: 120px;
     padding-bottom: 50px;
`

const FormContainer = styled.div`
    background-color: #ffffff;
    height: 600px;
    width: 600px;
    padding-left: 150px;
    padding-right: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 100px 5px #dbdbdb;


`
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
          orange: {
               main: '#f8951d',
               contrastText: '#fff'
          }
     },
});
export const Login = () => {

     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const { login, error, isLoading } = useLogin();
     const [loading, setLoading] = useState(false); // Add loading state

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true); // Set loading to true when submitting
          try {
               await login(username, password);
          } catch (error) {
               // Handle error
          } finally {
               setLoading(false); // Set loading to false regardless of success or failure
          }
     }

     const { user } = useAuthContext();
     return (
          <Container>

               <FormContainer>
                    <SampleLogoContainer src={LoginLogo}></SampleLogoContainer>
                    <TextField
                         required
                         id="outlined-required"
                         label="Username"
                         fullWidth
                         InputLabelProps={{ shrink: true }}
                         style={{ paddingBottom: "20px" }}
                         onChange={(e) => setUsername(e.target.value)}
                         value={username}
                    />
                    <TextField

                         required
                         id="outlined-required"
                         label="Password"
                         fullWidth
                         InputLabelProps={{ shrink: true }}
                         type="password"
                         style={{ paddingBottom: "20px" }}
                         onChange={(e) => setPassword(e.target.value)}
                         value={password}
                    />
                    <ThemeProvider theme={theme}>
                         <Button
                              style={{ marginTop: "50px", padding: "15px", width: "100%" }}
                              variant="outlined"
                              color="orange"
                              onClick={handleSubmit}
                              disabled={loading} // Disable button when loading
                         >
                              {loading ? 'Logging in. Please wait...' : 'Login'}
                         </Button>

                         {error && <div>{error}</div>}
                    </ThemeProvider>
               </FormContainer>
          </Container>
     )
}
