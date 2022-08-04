import { addDoc, collection } from 'firebase/firestore'
import { db } from 'firestoreConfig'

import { addactiveUser } from 'redux/feature'
import { USER_COLLECTION } from 'firestoreCollections/constants'

export const handleRegisterUser = async (
  regpassword,
  regconfirmPassword,
  user,
  setFlag,
  setRegistrationData,
  notify,
  nav
) => {
  const userCollection = collection(db, USER_COLLECTION)

  if (regpassword === regconfirmPassword) {
    await addDoc(userCollection, user)
    setRegistrationData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    notify()
    nav('/login')
    setFlag(false)
  } else {
    setFlag(true)
  }
}

export const loginUserHandler = (users, user, setLoginData, generic, setGeneric, disptach, nav) => {
  const [result] = users.filter(element => {
    if (element.email === user.email && element.password === user.password) {
      setLoginData({ email: '', password: '' })
      disptach(addactiveUser(element))

      return element
    }
  })

  if (result?.isAdmin === true) {
    nav('/')
  }
  if (result?.isAdmin === false) {
    nav('/profile')
  }
  if (!result) {
    setGeneric({ ...generic, flag: true })
  }
}
