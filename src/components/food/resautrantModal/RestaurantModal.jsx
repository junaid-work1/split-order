import { useState } from 'react'

import { addDoc, collection } from 'firebase/firestore'
import { Button, Modal } from 'react-bootstrap'
import { db } from 'firestoreConfig'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { RESTAURANT_COLLECTION } from 'constants/dbNames'
import { Restaurantvalidate } from 'helperFunctions/validationHelper'

const RestaurantModal = ({ getRestaurant, handleClose, show }) => {
  const [restaurant, setRestaurant] = useState({ name: '' })
  const [error, setError] = useState(false)

  const restaurantCollections = collection(db, RESTAURANT_COLLECTION)
  const notify = message => toast(message)

  Restaurantvalidate(restaurant.name)

  const handleChange = event => {
    const { name, value } = event.target
    setRestaurant({ ...restaurant, [name]: value })
  }

  const addRestaurant = async () => {
    const errors = Restaurantvalidate(restaurant.name)
    setError(errors || {})
    if (errors) return

    handleClose()
    await addDoc(restaurantCollections, restaurant)
    getRestaurant()
    setRestaurant({ name: '' })
    notify('Successfully Added!')
    setError(false)
  }

  return (
    <Modal show={show} onHide={handleClose} className='mt-5'>
      <Modal.Header>Add New Restaurant</Modal.Header>
      <Modal.Body>
        Name
        <input className='ms-3' type='text' name='name' onChange={handleChange} />
        {error?.name && <p className='text-danger small mt-2 ms-5'>{error.name}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => {
            setRestaurant({ name: '' })
            setError(false)
            handleClose()
          }}
        >
          Cancel
        </Button>
        <Button
          variant='success'
          onClick={() => {
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
