import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Food from 'components/food/Food'
import { getUser } from 'redux/feature/getRegisterUser/userSlice'
import { getMenu } from 'redux/feature/menu/menuSlice'
import TotalBill from 'components/total-bill/TotalBill'
import UserCard from 'components/users/UserCard'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getMenu())
  }, [])

  return (
    <>
      <Food />
      <UserCard />
      <TotalBill />
    </>
  )
}

export default Home
