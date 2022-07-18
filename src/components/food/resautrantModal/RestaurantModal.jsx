import { addDoc, collection } from 'firebase/firestore'
import { Button, Modal } from 'react-bootstrap'
import { db } from 'firestoreConfig'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'

const restaurantCollection = collection(db, 'restaurant')

const RestaurantModal = ({ handleClose, show, getRestaurant }) => {
  const [restaurant, setRestaurant] = useState({ name: '' })

  const notify = masg => toast(masg)

  const addRestaurant = async () => {
    await addDoc(restaurantCollection, restaurant)
    getRestaurant()
    notify('Successfully Added!')
  }

  const handleChange = e => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className='mt-5'>
        <Modal.Header closeButton>Add New Restaurant</Modal.Header>
        <Modal.Body>
          <div className=''>
            <div>
              <label className='form-lable'>Name</label>
              <input className='form-lable ms-3' type='text' name='name' onChange={handleChange} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
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
      <ToastContainer />
    </>
  )
}

export default RestaurantModal

RestaurantModal.propTypes = {
  handleClose: PropTypes.func,
  getRestaurant: PropTypes.func,
  show: PropTypes.bool
}
