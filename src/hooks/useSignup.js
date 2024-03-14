import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
     const [error, setError] = useState(null)
     const [isLoading, setIsLoading] = useState(null)
     //const { dispatch } = useAuthContext()
     const signup = async (username, password) => {
          setIsLoading(true)
          setError(null)

          const response = await fetch('https://coop-back-zqr6.onrender.com/api/credentials/signup', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({ username, password })
          })
          const json = await response.json()

          if(!response.ok){
               setIsLoading(false)
               setError(json.error)
          }
          else{
               //saving to local storage
               //localStorage.setItem('user', JSON.stringify(json))


               //update AuthContext
               //dispatch({type: 'LOGIN', payload: json})

               setIsLoading(false)
          }
     }
     return { signup, isLoading, error }
}