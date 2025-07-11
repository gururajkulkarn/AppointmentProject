import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          alert('Account created successfully')
        } else {
          toast.error(data.message || 'Failed to create account. Please try again later.')
        }
      } else if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          alert('Logged in successfully')
        } else {
          toast.error(data.message || 'Failed to login. Please try again later.')
        }
      }
    } catch (error) {
      console.error('Error during login/signup:', error)
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-md rounded-xl p-6 sm:p-8 text-gray-700"
      >
        <p className="text-2xl font-semibold mb-1">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="mb-4 text-sm">
          Please {state === 'Sign Up' ? 'Sign Up' : 'log in'} to book an appointment
        </p>

        {state === 'Sign Up' && (
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-sm mt-4 text-center">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Login
