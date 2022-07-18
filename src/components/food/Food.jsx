import { getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { addRestaurant } from 'redux/feature/restaurant/activeRestaurantSlice'
import FoodModal from './foodModal/FoodModal'
import { restaurantCollection } from 'pages/auth/registration/Registration'
import RestaurantModal from './resautrantModal/RestaurantModal'

const Button = styled.button`
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 10px;
  background: #198754;
`
const Food = () => {
  const [flag, setFlag] = useState(false)
  const [restaurantData, setRestaurantData] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState({ name: '', id: '' })
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  const menu = useSelector(state => state.menu)
  const dispatch = useDispatch()

  const buttons = (
    <>
      <Button onClick={() => setShow(true)}>Add Food</Button>
      <Link to='usercard'>
        <Button> Split Bill</Button>
      </Link>
    </>
  )
  const getRestaurant = async () => {
    const res2 = await getDocs(restaurantCollection)
    setRestaurantData(res2.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  const handleChange = e => {
    const result = restaurantData?.filter(item => {
      if (item.name === e.target.value) {
        return item
      }
    })
    setSelectedRestaurant(...result)
    dispatch(addRestaurant(...result))
    setFlag(true)
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  return (
    <div className='row '>
      <div className='col-6 container '>
        <div className='my-3'>
          {!selectedRestaurant.id && <strong style={{ color: 'red' }}> Select Restaurant!</strong>}
          <select
            className='form-select mt-3'
            onChange={handleChange}
            value={selectedRestaurant.name}
          >
            <option defaultValue disabled={flag}>
              select restaurant
            </option>
            {restaurantData?.map(item => {
              return <option key={item.id}>{item?.name}</option>
            })}
          </select>
        </div>
        <h4 className='mt-2 '>{selectedRestaurant?.name}</h4>
        <table className='table table-hover table-bordered'>
          {selectedRestaurant.id && (
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
              </tr>
            </thead>
          )}
          <tbody>
            {menu
              ?.filter(item => {
                if (selectedRestaurant.id === item.restaurantId) {
                  return item
                }
              })
              ?.map(item => {
                return (
                  <tr key={item.name}>
                    {<td>{item.name}</td>}
                    {<td>{item.price}</td>}
                  </tr>
                )
              })}
          </tbody>
        </table>
        <Button onClick={() => setVisible(true)}> Add Restaurant</Button>
        {selectedRestaurant.id && buttons}
      </div>
      <FoodModal
        show={show}
        handleClose={() => setShow(false)}
        selectedRestaurant={selectedRestaurant}
      />
      <RestaurantModal
        show={visible}
        handleClose={() => setVisible(false)}
        getRestaurant={getRestaurant}
      />
    </div>
  )
}

export default Food
