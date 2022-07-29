import { addDoc } from 'firebase/firestore'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { getMenu } from 'redux/feature/menu/menuSlice'
import { menuCollection } from 'pages/auth/registration/Registration'

const FoodModal = ({ handleClose, show, selectedRestaurant }) => {
  const [menuData, setMenuData] = useState({ name: '', price: '' })
  const notify = message => toast(message)

  const dispatch = useDispatch()

  const addMenuItem = async () => {
    const { name, price } = menuData
    if (name === '' || price === '') return

    const data = { name: name, price: Number(price), restaurantId: selectedRestaurant.id }
    await addDoc(menuCollection, data)
    dispatch(getMenu())
    setMenuData({ name: '', price: '' })
    notify('Successfully Added!')
  }

  const handleChange = event => {
    const { name, value } = event.target
    setMenuData({ ...menuData, [name]: value })
  }

  return (
    <Modal show={show} onHide={handleClose} className='mt-5'>
      <Modal.Header>Add New Food Item</Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <label className='form-lable' htmlFor='foodName'>
              Name
            </label>
            <input
              className='form-lable ms-3'
              id='foodName'
              type='text'
              name='name'
              onChange={handleChange}
            />
          </div>
          <div className='mt-4'>
            <label className='form-lable' htmlFor='foodPrice'>
              Price
            </label>
            <input
              className='form-lable ms-4'
              id='foodPrice'
              type='number'
              name='price'
              min='0'
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => {
            handleClose()
            setMenuData({ name: '', price: '' })
          }}
        >
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
  )
}

export default FoodModal

FoodModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  selectedRestaurant: PropTypes.object
}
