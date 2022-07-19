import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Profile = () => {
  const activeUser = useSelector(state => state.activeUser)
  const bill = useSelector(state => state.individualBill)
  const totalBill = useSelector(state => state.totalBill)
  const users = useSelector(state => state.users)

  const [adminUser] = users.filter(item => item.isAdmin === true)
  const result = bill?.filter(item => item.name === activeUser.name && item)

  return (
    <div className='row'>
      {activeUser.isAdmin === true ? (
        <Card className='col-6 mt-5 mb-5 container'>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>Total Bill: Rs. {totalBill}</Card.Subtitle>
            {bill?.map(item => (
              <Card.Text key={item.name}>
                {item.name !== adminUser?.name && (
                  <strong>
                    {item.name} owes {adminUser?.name} : {item.bill}
                  </strong>
                )}
              </Card.Text>
            ))}
          </Card.Body>
        </Card>
      ) : (
        <Card className='col-6 mt-5 mb-5 container'>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'> {result[0]?.name}</Card.Subtitle>
            <Card.Text>
              You owes to {adminUser?.name} : {result[0]?.bill || '0'}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default Profile
