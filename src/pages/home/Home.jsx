import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Food from 'components/food/Food'
import { getUser } from 'redux/feature/getRegisterUser/userSlice'
import { getMenu } from 'redux/feature/menu/menuSlice'

const Home = () => {
  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getMenu())
  }, [])

  return (
    <>
      {!activeUser.id && <p>login</p>}
      <Food />
    </>
  )
}

export default Home
