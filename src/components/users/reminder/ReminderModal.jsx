import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { billDetailsHandler, billsHandler } from 'helperFunctions/userHelper'
import FormInput from 'components/elements/input/FormInput'
import styles from './reminder.module.css'

const ReminderModal = ({ form, handleHide, sendEmail, specificUser, visible }) => {
  const menu = useSelector(state => state.billSplitApp.menus)
  const singleUser = useSelector(state => state.billSplitApp.userData)

  const [result] = singleUser.filter(item => item.name === specificUser.name)

  if (!result) return

  const inputList = [
    { defaultValue: result.name, name: 'name', type: 'text' },
    { defaultValue: specificUser.email, name: 'email', type: 'email' }
  ]

  const bill = billsHandler(menu, result)

  const billDetails = billDetailsHandler(result)

  return (
    <Modal show={visible} onHide={handleHide}>
      <Modal.Header closeButton>Reminder</Modal.Header>
      <Modal.Body>
        <form ref={form} onSubmit={sendEmail} className={styles.reminder}>
          <div className={styles.box}>
            {inputList.map(item => (
              <>
                {item.name}
                <FormInput type={item.type} name={item.name} defaultValue={item.defaultValue} />
              </>
            ))}
          </div>
          <div className={styles.box}>
            Bill Detail
            <textarea
              name='message'
              defaultValue={`${billDetails} \n Your bill: ${bill}`}
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
