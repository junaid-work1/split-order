import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import styles from './reminder.module.css'

const ReminderModal = ({ visible, sendEmail, handleHide, form, specificUser }) => {
  const menu = useSelector(state => state.menu[0])
  const singleUser = useSelector(state => state.userData)

  let billMessage = []

  const [result] = singleUser.filter(item => {
    return item.name === specificUser.name
  })

  if (!result) return

  const bill = menu?.reduce((subTotal, obj) => {
    let sum = 0
    for (const [key, value] of Object.entries(result)) {
      if (key !== 'name') {
        if (key === obj.name) {
          sum = (obj.price / 100) * (value || 0) * 100
          return subTotal + sum
        }
      }
    }
    return subTotal
  }, 0)

  for (const [key, value] of Object.entries(result)) {
    billMessage.push(`${key} : ${value}  `)
  }

  return (
    <Modal show={visible} onHide={handleHide}>
      <Modal.Header closeButton>Reminder</Modal.Header>
      <Modal.Body>
        <form ref={form} onSubmit={sendEmail} className={styles.reminder}>
          <div className={styles.box}>
            <label className='form-lable'>Name</label>
            <input
              className='form-lable'
              type='text'
              name='name'
              defaultValue={result.name}
              readOnly
            />
          </div>
          <div className={styles.box}>
            <label className='form-lable'>Email</label>
            <input
              className='form-lable'
              type='email'
              name='email'
              defaultValue={specificUser.email}
              readOnly
            />
          </div>
          <div className={styles.box}>
            <label className='form-lable'>Bill Detail</label>
            <textarea
              name='message'
              defaultValue={`${billMessage} \n Your bill: ${bill}`}
              readOnly
            />
          </div>
          <input className={styles.btn} type='submit' value='Send' />
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ReminderModal

ReminderModal.propTypes = {
  handleHide: PropTypes.func,
  form: PropTypes.object,
  sendEmail: PropTypes.func,
  specificUser: PropTypes.object,
  visible: PropTypes.bool
}
