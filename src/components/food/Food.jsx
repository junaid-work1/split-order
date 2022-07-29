import { getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
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

  const handleFoodModal = () => setShow(!show)
  const handleRestaurantModal = () => setVisible(!visible)

  const buttons = (
    <>
      <Button onClick={handleFoodModal}>Add Food</Button>
      <Link to='usercard'>
        <Button> Split Bill</Button>
      </Link>
    </>
  )

  const getRestaurant = async () => {
    const response = await getDocs(restaurantCollection)
    setRestaurantData(response.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  const handleChange = event => {
    const result = restaurantData?.filter(item => item.name === event.target.value && item)
    setSelectedRestaurant(...result)
    dispatch(addRestaurant(...result))
    setFlag(true)
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  return (
    <div className='row'>
      <div className='col-6 container'>
        <div className='my-3'>
          {!selectedRestaurant.id && (
            <strong className='text-danger' data-testid='select-message'>
              Select Restaurant!
            </strong>
          )}
          <select
            className='form-select mt-3'
            data-testid='select-list'
            onChange={handleChange}
            value={selectedRestaurant.name}
          >
            <option defaultValue disabled={flag}>
              select restaurants
            </option>
            {restaurantData?.map(item => (
              <option key={item.id} data-testid='select-output'>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <h4 className='mt-2'>{selectedRestaurant?.name}</h4>
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
              ?.filter(item => selectedRestaurant.id === item.restaurantId)
              ?.map(menuItem => (
                <tr key={menuItem.name}>
                  {<td>{menuItem.name}</td>}
                  {<td>{menuItem.price}</td>}
                </tr>
              ))}
          </tbody>
        </table>
        <Button onClick={handleRestaurantModal}> Add Restaurant</Button>
        {selectedRestaurant.id && buttons}
      </div>
      <FoodModal
        show={show}
        handleClose={handleFoodModal}
        selectedRestaurant={selectedRestaurant}
      />
      <RestaurantModal
        show={visible}
        handleClose={handleRestaurantModal}
        getRestaurant={getRestaurant}
      />
    </div>
  )
}

export default Food
