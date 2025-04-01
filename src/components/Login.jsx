import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom'
import {BASE_URL}  from '../utils/constants.js'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); //dispatch is used to send the user data to the redux store
  const navigate = useNavigate();  //navigate is used to navigate to the home page

  const handleSubmit = async() => {
    try {
      const response = await axios.post(BASE_URL+'/login',
       {email: formData.email, password: formData.password},
       { withCredentials: true });
      console.log('Login response:', response.data);
      dispatch(addUser(response.data.user));//sending the user data to the redux store once the api response is received
      return navigate('/'); // goes to home/feed page after sending the user data to the redux store
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response.data|| "Something went wrong");
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)] p-8 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] border border-base-200/50">
          {/* Logo and Title */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              DevMate
            </h1>
            <p className="text-base-content/70">Welcome back! Please login to your account.</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:shadow-[0_0_15px_rgba(var(--p),0.3)] transition-all duration-300 bg-base-200/50"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/70 group-hover:text-primary transition-colors duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:shadow-[0_0_15px_rgba(var(--p),0.3)] transition-all duration-300 bg-base-200/50"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/70 group-hover:text-primary transition-colors duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary w-full hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--p),0.5)] hover:bg-primary-focus"
            >
              Sign In
            </button>
          </div>
          <div className='text-red-500'>{error}</div>

          {/* Sign Up Link */}
          <p className="text-center mt-8 text-base-content/70">
            Don't have an account?{' '}
            <a href="#" className="text-primary hover:text-primary-focus font-medium hover:shadow-[0_0_10px_rgba(var(--p),0.3)] transition-all duration-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
