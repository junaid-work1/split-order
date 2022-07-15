import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Food from 'components/food/Food'
import { getUser } from 'redux/feature/getRegisterUser/userSlice'
import { getMenu } from 'redux/feature/menu/menuSlice'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getMenu())
  }, [])

  return <Food />
}

export default Home
