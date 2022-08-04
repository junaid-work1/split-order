import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Modal } from 'react-bootstrap'

import { addDoc, collection } from 'firebase/firestore'
import { db } from 'firestoreConfig'
import PropTypes from 'prop-types'

import { foodModalValidate } from 'helperFunctions/validationHelper'
import { getMenus } from 'redux/feature'
import { MENU_COLLECTION } from 'firestoreCollections/constants'

const FoodModal = ({ handleClose, show, selectedRestaurant }) => {
  const [error, setError] = useState({})
  const [menuData, setMenuData] = useState({ name: '', price: '' })

  const dispatch = useDispatch()
  const menuCollection = collection(db, MENU_COLLECTION)
  const notify = message => toast(message)

  foodModalValidate(menuData.name, menuData.price)

  const handleChange = event => {
    const { name, value } = event.target
    setMenuData({ ...menuData, [name]: value })
  }

  const addMenuItem = async () => {
    const { name, price } = menuData
    const errors = foodModalValidate(menuData.name, menuData.price)
    setError(errors || {})
    if (errors) return

    const data = { name: name, price: Number(price), restaurantId: selectedRestaurant.id }
    await addDoc(menuCollection, data)
    dispatch(getMenus())
    setMenuData({ name: '', price: '' })
    handleClose()
    notify('Successfully Added!')
  }

  return (
    <Modal show={show} onHide={handleClose} className='mt-5'>
      <Modal.Header>Add New Food Item</Modal.Header>
      <Modal.Body>
        Name
        <input className='ms-3' type='text' name='name' onChange={handleChange} />
        {error.name && <p className='text-danger small ms-3 mt-2'>{error.name}</p>}
        <div className='mt-4'>
          Price
          <input className='ms-4' type='number' name='price' min='0' onChange={handleChange} />
          {error.price && <p className='text-danger small ms-3 mt-2'>{error.price}</p>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => {
            handleClose()
            setMenuData({ name: '', price: '' })
            setError({})
          }}
        >
          Cancel
        </Button>
        <Button
          variant='success'
          onClick={() => {
            addMenuItem()
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FoodModal

FoodModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  selectedRestaurant: PropTypes.object
}
