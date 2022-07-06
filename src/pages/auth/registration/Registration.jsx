import { collection, addDoc } from 'firebase/firestore'
import Joi from 'joi-browser'
import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { db } from 'firestoreConfig'
import { schema } from 'validations/schemas/registrationValidation'

export const userCollection = collection(db, 'users')
export const menuCollection = collection(db, 'menu')
export const restaurantCollection = collection(db, 'restaurant')
const Registration = () => {
  const [error, setError] = useState({})
  const [flag, setFlag] = useState(false)
  const notify = () => toast('Successfull user created!')
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const validate = () => {
    const result = Joi.validate(
      {
        name: registrationData.name,
        password: registrationData.password,
        email: registrationData.email,
        confirmPassword: registrationData.confirmPassword
      },
      schema,
      {
        abortEarly: false
      }
    )
    if (result.error === null) return

    const errors = {}

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message
    }
    return errors
  }

  const handleChange = e => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const registerUser = async () => {
    const user = { ...registrationData, isAdmin: Boolean(false) }
    const errors = validate()
    setError(errors || {})
    if (errors) return
    if (registrationData.password === registrationData.confirmPassword) {
      await addDoc(userCollection, user)
      setRegistrationData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      notify()
      setFlag(false)
    } else {
      setFlag(true)
    }
  }

  return (
    <div className='row'>
      <div className='mt-5 p-5 mt-5 p-5 col-lg-4 col-md-6 col-sm-7 container shadow-lg bg-body rounded'>
        <div className='form-outline mb-4'>
          <label className='form-label'>Name</label>
          <input
            type='email'
            className='form-control '
            name='name'
            value={registrationData.name}
            onChange={handleChange}
          />
          {error.name && <p className='text-danger'>{error.name}</p>}
        </div>
        <div className='form-outline mb-4'>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={registrationData.email}
            onChange={handleChange}
          />
          {error.email && <p className='text-danger'>{error.email}</p>}
        </div>

        <div className='form-outline mb-4'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={registrationData.password}
            onChange={handleChange}
          />
          {error.password && <p className='text-danger'>{error.password}</p>}
        </div>

        <div className='form-outline mb-4'>
          <label className='form-label'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            name='confirmPassword'
            value={registrationData.confirmPassword}
            onChange={handleChange}
          />
          {error.confirmPassword && <p className='text-danger'>{error.confirmPassword}</p>}
          {flag && <p className='text-danger'> Please make sure your passwords match</p>}
        </div>

        <button
          type='button'
          className='btn btn-primary btn-block mb-4'
          onClick={() => {
            registerUser()
          }}
        >
          Register
        </button>

        <div className='text-center'>
          <p>
            Already have a account? <Link to='/login'>Sign in</Link>
          </p>
        </div>
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  )
}

export default Registration
