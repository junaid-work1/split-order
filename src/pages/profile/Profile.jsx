import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Profile = () => {
  const activeUser = useSelector(state => state.activeUser)
  const bill = useSelector(state => state.individualBill)

  const result = bill?.filter(item => {
    if (item.name === activeUser.name) {
      return item
    }
  })

  return (
    <div className='row'>
      <Card className='col-6 mt-5 mb-5 container'>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Card.Text>Details </Card.Text>
          <Card.Subtitle className='mb-2 text-muted'> {result[0]?.name}</Card.Subtitle>
          <Card.Text>You owes to Admin : {result[0]?.bill || '0'} </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Profile
