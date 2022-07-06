import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import styles from './reminder.module.css'

const ReminderModal = ({ visible, sendEmail, handleHide, form, data }) => {
  const user = useSelector(state => state.users[0])

  const billMessage = `pizza: ${data.pizza} burger: ${data.burger} sandwich: ${data.sandwich}`
  const [mailAddress] = user.filter(item => {
    return item.name === data.name
  })

  return (
    <Modal show={visible} onHide={handleHide}>
      <Modal.Header closeButton>Reminder</Modal.Header>
      <Modal.Body>
        <form ref={form} onSubmit={sendEmail} className={styles.reminder}>
          <div className={styles.box}>
            <label className='form-lable'>Name</label>
            <input className='form-lable' type='text' name='name' value={data.name} />
          </div>
          <div className={styles.box}>
            <label className='form-lable'>Email</label>
            <input className='form-lable' type='email' name='email' value={mailAddress.email} />
          </div>
          <div className={styles.box}>
            <label className='form-lable'>Bill Detail</label>
            <textarea name='message' value={billMessage} />
          </div>
          <input className={styles.btn} type='submit' value='Send' />
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ReminderModal

ReminderModal.propTypes = {
  visible: PropTypes.bool,
  sendEmail: PropTypes.func,
  handleHide: PropTypes.func,
  form: PropTypes.object,
  data: PropTypes.object
}
