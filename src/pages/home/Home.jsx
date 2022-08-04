import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Food from 'components/food/Food'
import { getMenus, getUsers } from 'redux/feature'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getMenus())
  }, [])

  return <Food />
}

export default Home
