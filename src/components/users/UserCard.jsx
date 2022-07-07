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
  const menu = useSelector(state => state.menu[0])
  const singleUser = useSelector(state => state.userData)
  const user = useSelector(state => state.users[0])

  const dispatch = useDispatch()
  const form = useRef()
  const notify = masg => toast(masg)

  const [show, setShow] = useState(false)
  const [specificUser, setSpecificUser] = useState({})
  const [userData, setUserData] = useState({
    name: '',
    pizza: '',
    burger: '',
    sandwich: ''
  })
  const [visible, setVisible] = useState(false)

  const calculateBill = item => {
    const [sandwich, pizza, burger] = menu
    let bill =
      (pizza.price / 100) * item.pizza * 100 +
      (burger.price / 100) * item.burger * 100 +
      (sandwich.price / 100) * item.sandwich * 100
    return bill
  }

  const calculateTotalBill = () => {
    if (!menu) return
    const [sandwich, pizza, burger] = menu

    const total = singleUser?.reduce((acc, obj) => {
      return (
        acc +
        (pizza.price / 100) * obj.pizza * 100 +
        (burger.price / 100) * obj.burger * 100 +
        (sandwich.price / 100) * obj.sandwich * 100
      )
    }, 0)
    dispatch(addBill(total))
  }

  const findUser = name => {
    const [result] = user.filter(item => {
      return item.name === name
    })

    setSpecificUser(result)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleHide = () => setVisible(false)
  const handleVisible = () => setVisible(true)

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const singleUserData = () => {
    if (
      userData.name !== '' &&
      userData.pizza !== '' &&
      userData.burger !== '' &&
      userData.sandwich !== ''
    ) {
      const result = singleUser?.some(item => {
        if (item.name === userData.name) {
          return true
        }
        return false
      })

      if (!result) {
        dispatch(addUserData(userData))
        notify('Successfully added!')
        setUserData({ name: '', pizza: '', burger: '', sandwich: '' })
      } else {
        notify('User Already added!')
        setUserData({ name: '', pizza: '', burger: '', sandwich: '' })
      }
    }
  }

  const sendEmail = e => {
    e.preventDefault()
    handleHide()
    emailjs.sendForm('service_2uwgcxa', 'template_hzah24o', form.current, '5Hq4RD_4RiUF9I990').then(
      () => {
        notify('Email is sent successfully!')
      },
      error => {
        notify(error.text)
      }
    )
  }

  useEffect(() => {
    calculateTotalBill()
  }, [singleUser])

  return (
    <>
      <Button variant='primary' className='ms-5' onClick={handleShow}>
        Add User
      </Button>
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
                      {Object.entries(item)?.map(([name, value]) => {
                        return (
                          <tr key={name}>
                            <td>{name}</td>
                            <td>{value}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <hr />
                  <FormLabel className='ms-2 me-4'>Total: {calculateBill(item)}</FormLabel>
                  <Button
                    className='ms-4 me-2'
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
                handleHide={handleHide}
                form={form}
                specificUser={specificUser}
              />
            </div>
          )
        })}
      </div>

      <AddUserModal
        show={show}
        handleClose={handleClose}
        handleChange={handleChange}
        singleUserData={singleUserData}
        userData={userData}
        user={user}
        menu={menu}
      />
    </>
  )
}

export default UserCard
