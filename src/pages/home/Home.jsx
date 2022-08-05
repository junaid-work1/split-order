import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { getMenus, getUsers } from 'redux/actions/getUserAction'
import Food from 'components/food/Food'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getMenus())
  }, [])

  return <Food />
}

export default Home
