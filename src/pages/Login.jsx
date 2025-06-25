import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

const {backendUrl, token, setToken} = useContext(AppContext)


const [state, setState] = useState('Sign Up')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')

const onSubmitHandler = async (e) => {
  e.preventDefault();

  try{
if(state === 'Sign Up') {
    const {data} = await axios.post(backendUrl + '/api/user/register', {
      name,
      email,
      password
    });
    if(data.success){
      localStorage.setItem('token', data.token);
      setToken(data.token);
      alert("Account created successfully");
    }
    else{
    toast.error(data.message || "Failed to create account. Please try again later.");
    }

  }

else if (state === 'Login') {
    const {data} = await axios.post(backendUrl + '/api/user/login', {
      email,
      password
    });
    if(data.success){
      localStorage.setItem('token', data.token);
      setToken(data.token);
      alert("Logged in successfully");
    }
    else{
      toast.error(data.message || "Failed to login. Please try again later.");
    }
  }

  }
  catch (error) {
    console.error("Error during login/signup:", error);
  }


}

  return (
  <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center'>
<div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[400px] sm:min-w-96 border rounded-xl text-zink-600 text-sm shadow-lg'>
<p className='text-2xl font-semibold '>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
<p>Please {state === 'Sign Up' ? "Sign Up" : "log in"}  to book appointment</p>
{state === 'Sign Up' &&  <div className='w-full'>
<p>Username</p>   
<input className='border border-zink-300 rounded w-full p-2 mt-1' type="text" placeholder='Enter Username' value={name} onChange={(e) => setName(e.target.value)} />
</div>}

<div className='w-full'>
  <p>Email</p>
<input className='border border-zink-300 rounded w-full p-2 mt-1' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
</div>
<div className='w-full'>
  <p>Password</p>
<input className='border border-zink-300 rounded w-full p-2 mt-1' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
</div>

<button type="submit" className='bg-blue-600 text-white w-full py-2 rounded-md text-base  cursor-pointer'>{state === 'Sign Up' ? "Create Accunt" : "Login"}</button>

{state === 'Sign Up' ?
<p className='text-sm mt-2'>Already have an account? <span onClick={() => setState('Login')} className='text-blue-600 cursor-pointer'>Login</span></p>
:
<p className='text-sm mt-2'>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-blue-600 cursor-pointer'>Sign Up</span></p>
}

</div>




  </form>
  )
}

export default Login