import { Button, Card, FormLabel } from 'react-bootstrap'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AddUserModal from './addUser/AddUserModal'
import { addUserData } from 'redux/feature/singleUserData/singleUserSlice'
import { addBill } from 'redux/feature/totalBill/totalBillSlice'
import ReminderModal from './reminder/ReminderModal'

import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-modal/styles.css'

const UserCard = () => {
  const [show, setShow] = useState(false)
  const [specificUser, setSpecificUser] = useState({})
  const [userData, setUserData] = useState({})
  const [visible, setVisible] = useState(false)

  const form = useRef()

  const menu = useSelector(state => state.menu)
  const singleUser = useSelector(state => state.userData)
  const user = useSelector(state => state.users)

  const dispatch = useDispatch()
  const notify = message => toast(message)

  const calculateBill = item => {
    return menu?.reduce((subTotal, obj) => {
      for (const [key, value] of Object.entries(item)) {
        if (key !== 'name' && key === obj.name) {
          return subTotal + (obj.price / 100) * (value || 0) * 100
        }
      }
      return subTotal
    }, 0)
  }

  const calculateTotalBill = () => {
    if (!menu) return

    const total = menu?.reduce((allTotal, obj) => {
      const sum = singleUser?.reduce((sum, item) => {
        for (const [key, value] of Object.entries(item)) {
          if (key !== 'name' && key === obj.name) {
            return sum + (obj.price / 100) * (value || 0) * 100
          }
        }
        return sum
      }, 0)
      return allTotal + sum
    }, 0)

    dispatch(addBill(total))
  }

  const findUser = name => {
    const [result] = user.filter(item => item.name === name)
    setSpecificUser(result)
  }

  const handleAddUserModal = () => setShow(!show)
  const handleReminderModal = () => setVisible(!visible)

  const singleUserData = () => {
    const result = singleUser?.some(item => (item.name === userData.name ? true : false))

    if (!result && Object.keys(userData).length > 0 && userData.name !== '') {
      dispatch(addUserData(userData))
      notify('Successfully added!')
      setUserData({})
    } else {
      notify('User Already added!')
      setUserData({})
    }
  }

  const sendEmail = event => {
    event.preventDefault()
    handleHide()
    emailjs.sendForm('service_2uwgcxa', 'template_hzah24o', form.current, '5Hq4RD_4RiUF9I990').then(
      () => notify('Email is sent successfully!'),
      error => notify(error.text)
    )
  }

  useEffect(() => {
    calculateTotalBill()
  }, [singleUser])

  return (
    <>
      <Button variant='success' className='ms-3 mt-3' onClick={handleAddUserModal}>
        Add User & Food
      </Button>
      <div className='col-4 container'>
        {singleUser.length === 0 && <strong>Add Order Details!</strong>}
      </div>
      <div className='row'>
        {singleUser?.map(item => (
          <div className='mt-5 ms-5 col-lg-3 col-md-4 col-sm-6 col-8' key={item.name}>
            <Card>
              <Card.Body>
                <Card.Title>Bill Details</Card.Title>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Item</th>
                      <th scope='col'>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(item)?.map(([name, value]) => (
                      <tr key={name}>
                        <td>{name}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />

                <FormLabel className='ms-2 me-4'>Total: {calculateBill(item)}</FormLabel>
                <Button
                  className='ms-4 me-2'
                  variant='success'
                  onClick={() => {
                    handleReminderModal()
                    findUser(item.name)
                  }}
                >
                  Reminder
                </Button>
              </Card.Body>
            </Card>
            <ReminderModal
              visible={visible}
              sendEmail={sendEmail}
              handleHide={handleReminderModal}
              form={form}
              specificUser={specificUser}
            />
          </div>
        ))}
      </div>
      <AddUserModal
        show={show}
        handleClose={handleAddUserModal}
        singleUserData={singleUserData}
        userData={userData}
        setUserData={setUserData}
        user={user}
        menu={menu}
      />
    </>
  )
}

export default UserCard
