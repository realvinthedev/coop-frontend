import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { ToastContainer } from 'react-toastify';

function App() {
     
     return (
          <div className="App">
               <div className='flex'>
                    <div className=''>
                         <BrowserRouter>

                              <Home />
                              {/* <Routes>
                                   <Route
                                        path="/login"
                                        element={<Login />}
                                   />
                              </Routes> */}
                              <ToastContainer />
                         </BrowserRouter>
                    </div>
               </div>
          </div>
     );
}

export default App;
