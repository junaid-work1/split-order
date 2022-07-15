import { addDoc, collection } from 'firebase/firestore'
import { Button, Modal } from 'react-bootstrap'
import { db } from 'firestoreConfig'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'

const menuCollection = collection(db, 'menu')

const FoodModal = ({ handleClose, show, selectedRestaurant }) => {
  const [menuData, setMenuData] = useState({ name: '', price: 0 })

  const notify = masg => toast(masg)

  const addMenuItem = async () => {
    const { name, price } = menuData
    const data = { name: name, price: Number(price), restaurantId: selectedRestaurant.id }
    await addDoc(menuCollection, data)
    notify('Successfully Added!')
  }

  const handleChange = e => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className='mt-5'>
        <Modal.Header closeButton>Add New Food Item</Modal.Header>
        <Modal.Body>
          <div className=''>
            <div>
              <label className='form-lable'>Name</label>
              <input className='form-lable ms-3' type='text' name='name' onChange={handleChange} />
            </div>
            <div className='mt-4'>
              <label className='form-lable '>Price</label>
              <input
                className='form-lable ms-4'
                type='number'
                name='price'
                min='0'
                onChange={handleChange}
              />
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
              addMenuItem()
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

export default FoodModal

FoodModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  selectedRestaurant: PropTypes.object
}
