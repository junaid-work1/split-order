import { addDoc, collection } from 'firebase/firestore'
import { Button, Modal } from 'react-bootstrap'
import { db } from 'firestoreConfig'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { RESTAURANT_COLLECTION } from 'firestoreCollections/constants'

const restaurantCollections = collection(db, RESTAURANT_COLLECTION)

const RestaurantModal = ({ handleClose, show, getRestaurant }) => {
  const [restaurant, setRestaurant] = useState({ name: '' })

  const notify = message => toast(message)

  const addRestaurant = async () => {
    if (restaurant.name === '') return
    await addDoc(restaurantCollections, restaurant)
    getRestaurant()
    setRestaurant({ name: '' })
    notify('Successfully Added!')
  }

  const handleChange = event => {
    const { name, value } = event.target
    setRestaurant({ ...restaurant, [name]: value })
  }

  return (
    <Modal show={show} onHide={handleClose} className='mt-5'>
      <Modal.Header>Add New Restaurant</Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <label className='form-lable' htmlFor='restaurantName'>
              Name
            </label>
            <input
              className='form-lable ms-3'
              id='restaurantName'
              type='text'
              name='name'
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => {
            setRestaurant({ name: '' })
            handleClose()
          }}
        >
          Cancel
        </Button>
        <Button
          variant='success'
          onClick={() => {
            handleClose()
            addRestaurant()
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RestaurantModal

RestaurantModal.propTypes = {
  handleClose: PropTypes.func,
  getRestaurant: PropTypes.func,
  show: PropTypes.bool
}
