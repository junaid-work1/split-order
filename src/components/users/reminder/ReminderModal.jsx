import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import FormInput from 'components/elements/input/FormInput'

import styles from './reminder.module.css'

const ReminderModal = ({ visible, sendEmail, handleHide, form, specificUser }) => {
  const menu = useSelector(state => state.menu)
  const singleUser = useSelector(state => state.userData)

  const [result] = singleUser.filter(item => item.name === specificUser.name)

  if (!result) return

  const inputList = [
    { defaultValue: result.name, name: 'name', type: 'text' },
    { defaultValue: specificUser.email, name: 'email', type: 'email' }
  ]

  const bill = menu?.reduce((subTotal, obj) => {
    for (const [key, value] of Object.entries(result)) {
      if (key !== 'name' && key === obj.name) {
        return subTotal + (obj.price / 100) * (value || 0) * 100
      }
    }
    return subTotal
  }, 0)

  const billDetails = () => {
    let billMessage = []
    for (const [key, value] of Object.entries(result)) {
      billMessage.push(`${key}: ${value}`)
    }
    return billMessage
  }

  return (
    <Modal show={visible} onHide={handleHide}>
      <Modal.Header closeButton>Reminder</Modal.Header>
      <Modal.Body>
        <form ref={form} onSubmit={sendEmail} className={styles.reminder}>
          <div className={styles.box}>
            {inputList.map(item => (
              <>
                <label className='form-lable' htmlFor={item.name}>
                  {item.name}
                </label>
                <FormInput type={item.type} name={item.name} defaultValue={item.defaultValue} />
              </>
            ))}
          </div>
          <div className={styles.box}>
            <label className='form-lable' htmlFor='billDetail'>
              Bill Detail
            </label>
            <textarea
              name='message'
              id='billDetail'
              defaultValue={`${billDetails()} \n Your bill: ${bill}`}
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
