import { getDocs } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { restaurantCollection } from 'pages/auth/registration/Registration'

const Food = () => {
  const [restaurantData, setRestaurantData] = useState({})
  const menu = useSelector(state => state.menu[0])

  const getRestaurant = async () => {
    const res2 = await getDocs(restaurantCollection)
    setRestaurantData(...res2.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  return (
    <div className='row '>
      <div className='col-6 container'>
        <h4 className='mt-2 '>Restaurant: {restaurantData.name}</h4>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
            </tr>
          </thead>
          <tbody>
            {menu?.map((item, index) => {
              return (
                <tr key={item.name}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Food
