import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

const TotalBill = () => {
  const bill = useSelector(state => state.billSplitApp.individualBill)
  const totalBill = useSelector(state => state.billSplitApp.totalBill)
  const users = useSelector(state => state.billSplitApp.users)

  const [adminUser] = users.filter(item => item.isAdmin === true)

  return (
    <div className='row'>
      <Card className='col-6 mt-5 mb-5 container'>
        <Card.Body>
          <Card.Title>Total Bill</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>Rs:{totalBill}</Card.Subtitle>
          <Card.Text>You Pay : {totalBill}</Card.Text>
          {bill?.map(item => (
            <Card.Text key={item.name}>
              {item.name !== adminUser?.name && (
                <strong>
                  {item.name} owes to {adminUser?.name} : {item.bill}
                </strong>
              )}
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </div>
  )
}

export default TotalBill
