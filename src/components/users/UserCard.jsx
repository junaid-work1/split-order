import { Button, Card, FormLabel } from 'react-bootstrap'
import emailjs from '@emailjs/browser'
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
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
  const notify = masg => toast(masg)

  const calculateBill = item => {
    const bill = menu?.reduce((subTotal, obj) => {
      let sum = 0
      for (const [key, value] of Object.entries(item)) {
        if (key !== 'name') {
          if (key === obj.name) {
            sum = (obj.price / 100) * (value || 0) * 100
            return subTotal + sum
          }
        }
      }
      return subTotal
    }, 0)

    return bill
  }

  const calculateTotalBill = () => {
    if (!menu) return

    const total = menu?.reduce((allTotal, obj) => {
      const sum = singleUser?.reduce((sum, item) => {
        let bills = 0
        for (const [key, value] of Object.entries(item)) {
          if (key !== 'name') {
            if (key === obj.name) {
              bills = (obj.price / 100) * (value || 0) * 100
              return sum + bills
            }
          }
        }
        return sum
      }, 0)
      return allTotal + sum
    }, 0)

    dispatch(addBill(total))
  }

  const findUser = name => {
    const [result] = user.filter(item => {
      return item.name === name
    })

    setSpecificUser(result)
  }

  const handleVisible = () => setVisible(true)

  const singleUserData = () => {
    const result = singleUser?.some(item => {
      if (item.name === userData.name) {
        return true
      }
      return false
    })
    if (!result) {
      dispatch(addUserData(userData))
      notify('Successfully added!')
      setUserData({})
    } else {
      notify('User Already added!')
      setUserData({})
    }
  }

  const sendEmail = e => {
    e.preventDefault()
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
      <Button variant='success' className='ms-3 mt-3' onClick={() => setShow(true)}>
        Add User & Food
      </Button>
      <div className='col-4 container'>
        {singleUser.length === 0 && <strong>Add Order Details!</strong>}
      </div>
      <div className='row'>
        {singleUser?.map(item => {
          return (
            <div className=' mt-5 ms-5 col-lg-3 col-md-4 col-sm-6 col-8' key={item.name}>
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
                      handleVisible()
                      findUser(item.name)
                    }}
                  >
                    Reminder
                  </Button>
                </Card.Body>
              </Card>
              <ToastContainer />
              <ReminderModal
                visible={visible}
                sendEmail={sendEmail}
                handleHide={() => setVisible(false)}
                form={form}
                specificUser={specificUser}
              />
            </div>
          )
        })}
      </div>
      <AddUserModal
        show={show}
        handleClose={() => setShow(false)}
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
