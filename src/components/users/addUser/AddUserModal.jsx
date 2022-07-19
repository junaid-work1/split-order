import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addIndividualBill } from 'redux/feature/singleUserBill/singleBillSlice'

const AddUserModal = ({ handleClose, menu, show, singleUserData, userData, setUserData, user }) => {
  const [idividualUser, setIdividualUser] = useState('')
  const foodItem = useRef()
  const quantity = useRef()
  const userName = useRef()

  const activeRestaurant = useSelector(state => state.activeRestaurant)
  const billOfUsers = useSelector(state => state.individualBill)

  const dispatch = useDispatch()

  const addFoodData = () => {
    if (foodItem.current.value !== '' && quantity.current.value !== '') {
      setUserData({
        ...userData,
        name: userName.current.value,
        [foodItem.current.value]: quantity.current.value
      })
      setIdividualUser({
        ...idividualUser,
        name: userName.current.value,
        [foodItem.current.value]: quantity.current.value
      })
    }
  }

  const idividualUserBill = () => {
    const bill = menu?.reduce((subTotal, obj) => {
      for (const [key, value] of Object.entries(idividualUser)) {
        if (key !== 'name') {
          if (key === obj.name) {
            return subTotal + (obj.price / 100) * (value || 0) * 100
          }
        }
      }
      return subTotal
    }, 0)

    const result = billOfUsers?.some(item => (item.name === idividualUser.name ? true : false))

    if (!result) {
      if (Object.keys(idividualUser).length > 1) {
        dispatch(addIndividualBill({ name: idividualUser.name, bill }))
        setIdividualUser({})
      }
    }

    setIdividualUser({})
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <label>User</label>
        <select className='ms-2 form-control-sm' name='name' ref={userName}>
          {user?.map(item => (
            <option value={item.name} key={item.name + 1}>
              {item?.name}
            </option>
          ))}
        </select>
      </Modal.Header>
      <Modal.Body className='d-flex'>
        <select className='form-control-sm' name='name' ref={foodItem}>
          <option defaultValue={'select'}>select food</option>
          {menu
            ?.filter(item => activeRestaurant.id === item.restaurantId)
            ?.map(item => (
              <option value={item.name} key={item.name + 1}>
                {item?.name}
              </option>
            ))}
        </select>
        <input type='number' className='form-control form-control-sm ms-4' min='0' ref={quantity} />
        <Button
          variant='success'
          className='ms-4'
          onClick={() => {
            addFoodData()
          }}
        >
          add
        </Button>
        <hr />
        <hr />
      </Modal.Body>
      <Modal.Body>
        <table className='table table-hover table-bordered'>
          <tbody>
            {Object.entries(userData)?.map(([name, value]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant='success'
          onClick={() => {
            handleClose()
            singleUserData()
            idividualUserBill()
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddUserModal

AddUserModal.propTypes = {
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  menu: PropTypes.array,
  setUserData: PropTypes.func,
  singleUserData: PropTypes.func,
  show: PropTypes.bool,
  userData: PropTypes.object,
  user: PropTypes.array
}
