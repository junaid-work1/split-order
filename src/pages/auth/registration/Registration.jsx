import { collection, addDoc } from 'firebase/firestore'
import { db } from 'firestoreConfig'
import Joi from 'joi-browser'
import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { schema } from 'validations/schemas/registrationValidation'
import Input from 'components/elements/input/Input'

import 'react-toastify/dist/ReactToastify.css'

export const userCollection = collection(db, 'users')
export const menuCollection = collection(db, 'menu')
export const restaurantCollection = collection(db, 'restaurant')

const Registration = () => {
  const [error, setError] = useState({})
  const [flag, setFlag] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const inputList = [
    { value: registrationData.name, name: 'name', type: 'text' },
    { value: registrationData.email, name: 'email', type: 'email' },
    { value: registrationData.password, name: 'password', type: 'password' },
    { value: registrationData.confirmPassword, name: 'confirmPassword', type: 'password' }
  ]

  const notify = () => toast('Successfull user created!')

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
    const { name, email, password } = registrationData
    const user = { name, email, password, isAdmin: Boolean(false) }
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
          {inputList.map(item => (
            <Input
              type={item.type}
              name={item.name}
              handleChange={handleChange}
              value={item.value}
              error={error}
              key={item.name}
            />
          ))}
          {flag && <p className='text-danger'> Please make sure your passwords match</p>}
        </div>
        <button
          type='button'
          className='btn btn-success btn-block mb-4'
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
