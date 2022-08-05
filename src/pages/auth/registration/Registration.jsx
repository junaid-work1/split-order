import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { handleRegisterUser } from 'helperFunctions/authHelper'
import { resgistrationValidate } from 'helperFunctions/validationHelper'
import Input from 'components/elements/input/Input'

import 'react-toastify/dist/ReactToastify.css'

const Registration = () => {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [flag, setFlag] = useState(false)
  const [error, setError] = useState({})

  const nav = useNavigate()

  const inputList = [
    { value: registrationData.name, name: 'name', type: 'text' },
    { value: registrationData.email, name: 'email', type: 'email' },
    { value: registrationData.password, name: 'password', type: 'password' },
    { value: registrationData.confirmPassword, name: 'confirmPassword', type: 'password' }
  ]

  const notify = () => toast('Successfull user created!')

  resgistrationValidate(
    registrationData.name,
    registrationData.password,
    registrationData.email,
    registrationData.confirmPassword
  )

  const handleChange = event => {
    const { name, value } = event.target
    setRegistrationData({
      ...registrationData,
      [name]: value.trim()
    })
  }

  const registerUser = async () => {
    const { name, email, password } = registrationData
    const user = { name, email, password, isAdmin: Boolean(false) }
    const errors = resgistrationValidate(
      registrationData.name,
      registrationData.password,
      registrationData.email,
      registrationData.confirmPassword
    )
    setError(errors || {})
    if (errors) return

    handleRegisterUser(
      registrationData.password,
      registrationData.confirmPassword,
      user,
      setFlag,
      setRegistrationData,
      notify,
      nav
    )
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
      </div>
    </div>
  )
}

export default Registration
