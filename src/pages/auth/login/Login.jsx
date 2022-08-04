import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { db } from 'firestoreConfig'
import { collection, getDocs } from 'firebase/firestore'

import { loginUserHandler } from 'helperFunctions/authHelper'
import Input from 'components/elements/input/Input'
import { USER_COLLECTION } from 'firestoreCollections/constants'
import { validate } from 'helperFunctions/validationHelper'

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [generic, setGeneric] = useState({ users: [], flag: false, error: {} })

  const disptach = useDispatch()
  const nav = useNavigate()

  const userCollection = collection(db, USER_COLLECTION)
  const inputList = [
    { value: loginData.email, name: 'email', type: 'email' },
    { value: loginData.password, name: 'password', type: 'password' }
  ]

  const getUser = async () => {
    const res = await getDocs(userCollection)
    setGeneric({ ...generic, users: res.docs.map(doc => ({ ...doc.data(), id: doc.id })) })
  }

  const handleChange = event => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value.trim()
    })
  }

  validate(loginData.email, loginData.password)

  const loginUser = () => {
    const user = { email: loginData.email, password: loginData.password }
    const errors = validate(loginData.email, loginData.password)
    setGeneric({ ...generic, error: errors } || {})
    if (errors) return

    loginUserHandler(generic.users, user, setLoginData, generic, setGeneric, disptach, nav)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='mt-5 p-5 col-lg-4 col-md-6 col-sm-7 container shadow-lg p-3 bg-body rounded'>
      <div className='form-outline mb-4'>
        {inputList.map(item => (
          <Input
            type={item.type}
            name={item.name}
            handleChange={handleChange}
            value={item.value}
            error={generic.error}
            key={item.name}
          />
        ))}
      </div>
      {generic.flag && (
        <p className='text-danger'> The email or password you entered is incorrect.</p>
      )}
      <button
        type='button'
        className='btn btn-success btn-block mb-4'
        onClick={() => {
          loginUser()
        }}
      >
        Sign in
      </button>
      <div className='text-center'>
        Not a member? <Link to='/registration'>Register</Link>
      </div>
    </div>
  )
}

export default Login
