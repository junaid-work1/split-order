import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

const AddUserModal = ({
  handleClose,
  handleChange,
  menu,
  show,
  singleUserData,
  userData,
  user
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <label>User :</label>
        <select name='name' value={userData.name} onChange={handleChange}>
          <option defaultValue={'select'}>select</option>
          {user?.map(item => {
            return (
              <option value={item.name} key={item.name + 1}>
                {item?.name}
              </option>
            )
          })}
        </select>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {menu?.map(item => {
            return (
              <li key={item.name + 1}>
                <label>
                  <div className='form-outline'>
                    <label className='form-label'>{item?.name}</label>
                    <input
                      type='number'
                      className='form-control form-control-sm'
                      min='0'
                      name={item.name}
                      value={userData[item.name]}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </li>
            )
          })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            handleClose()
            singleUserData()
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
  userData: PropTypes.object,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  singleUserData: PropTypes.func,
  show: PropTypes.bool,
  user: PropTypes.array,
  menu: PropTypes.array
}
