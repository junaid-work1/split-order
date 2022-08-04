import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import PropTypes from 'prop-types'

import { addindividualBill } from 'redux/feature'
import { addDataAboutFood, individualUserBillHandler } from 'helperFunctions/userHelper'

const AddUserModal = ({
  handleClose,
  menu,
  show,
  singleUserData,
  userData,
  setUserData,
  user,
  error,
  setError
}) => {
  const [individualUser, setIndividualUser] = useState('')
  const foodItem = useRef()
  const quantity = useRef()
  const userName = useRef()

  const activeRestaurant = useSelector(state => state.billSplitApp.activeRestaurant)
  const billOfUsers = useSelector(state => state.billSplitApp.individualBill)

  const dispatch = useDispatch()

  const addFoodData = () => {
    addDataAboutFood(
      foodItem.current.value,
      quantity.current.value,
      userName.current.value,
      setError,
      setUserData,
      userData,
      setIndividualUser,
      individualUser
    )
  }

  const individualUserBill = () => {
    const bill = individualUserBillHandler(menu, individualUser)

    const result = billOfUsers?.some(item => (item.name === individualUser.name ? true : false))

    if (!result && Object.keys(individualUser).length > 1) {
      dispatch(addindividualBill({ name: individualUser.name, bill }))
      setIndividualUser({})
    }
    setIndividualUser({})
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        User
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
      </Modal.Body>
      {error && <p className='text-danger small ms-5'>input should not be empty</p>}
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
        <Button
          variant='secondary'
          onClick={() => {
            handleClose()
            setError(false)
            setUserData({})
          }}
        >
          Cancel
        </Button>
        <Button
          variant='success'
          onClick={() => {
            singleUserData()
            individualUserBill()
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
  error: PropTypes.bool,
  setError: PropTypes.func,
  setUserData: PropTypes.func,
  singleUserData: PropTypes.func,
  show: PropTypes.bool,
  userData: PropTypes.object,
  user: PropTypes.array
}
