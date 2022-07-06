import { getDocs } from 'firebase/firestore'
import Joi from 'joi-browser'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { userCollection } from 'pages/auth/registration/Registration'
import { schema } from 'validations/schemas/loginValidation'

const Login = () => {
  const [error, setError] = useState({})
  const [email, setEmail] = useState('')
  const [flag, setFlag] = useState(false)
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const [users, setUsers] = useState([])

  const validate = () => {
    const result = Joi.validate(
      {
        password: password,
        email: email
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

  const getUser = async () => {
    const res = await getDocs(userCollection)
    setUsers(res.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  const loginUser = () => {
    const user = { email, password }

    const errors = validate()
    setError(errors || {})
    if (errors) return

    const result = users.some(element => {
      if (element.email === user.email && element.password === user.password) {
        setEmail('')
        setPassword('')
        return true
      }
      return false
    })

    if (result) {
      nav('/')
    }
    if (!result) {
      setFlag(true)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='mt-5 p-5 col-lg-4 col-md-6 col-sm-7  container shadow-lg p-3 bg-body rounded'>
      <div className='form-outline mb-4'>
        <label className='form-label'>Email address</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        {error.email && <div className='alert alert-danger mt-2'>{error.email}</div>}
      </div>

      <div className='form-outline mb-4'>
        <label className='form-label'>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error.password && <div className='alert alert-danger mt-2'>{error.password}</div>}
      </div>
      {flag && <p className='text-danger'> The email or password you entered is incorrect.</p>}
      <button
        type='button'
        className='btn btn-primary btn-block mb-4'
        onClick={() => {
          loginUser()
        }}
      >
        Sign in
      </button>

      <div className='text-center'>
        <p>
          Not a member? <Link to='/registration'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
