import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import styles from './reminder.module.css'

const ReminderModal = ({ visible, sendEmail, handleHide, form, specificUser }) => {
  const singleUser = useSelector(state => state.userData)
  const menu = useSelector(state => state.menu[0])

  const [result] = singleUser.filter(item => {
    return item.name === specificUser.name
  })

  if (!result) return

  const [sandwich, pizza, burger] = menu

  const bill =
    (pizza.price / 100) * result.pizza * 100 +
    (burger.price / 100) * result.burger * 100 +
    (sandwich.price / 100) * result.sandwich * 100

  const billMessage = `pizza: ${result.pizza} burger: ${result.burger} sandwich: ${result.sandwich} Your Bill: ${bill}`

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
            <textarea name='message' defaultValue={billMessage} readOnly />
          </div>
          <input className={styles.btn} type='submit' value='Send' />
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ReminderModal

ReminderModal.propTypes = {
  form: PropTypes.object,
  handleHide: PropTypes.func,
  sendEmail: PropTypes.func,
  specificUser: PropTypes.object,
  visible: PropTypes.bool
}
