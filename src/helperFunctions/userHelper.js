export const addDataAboutFood = (
  foodItem,
  quantity,
  userName,
  setError,
  setUserData,
  userData,
  setIndividualUser,
  individualUser
) => {
  if (foodItem !== '' && quantity !== '') {
    setError(false)
    setUserData({
      ...userData,
      name: userName,
      [foodItem]: quantity
    })
    setIndividualUser({
      ...individualUser,
      name: userName,
      [foodItem]: quantity
    })
  } else {
    setError(true)
  }
}

export const individualUserBillHandler = (menu, individualUser) => {
  return menu?.reduce((subTotal, obj) => {
    for (const [key, value] of Object.entries(individualUser)) {
      if (key !== 'name' && key === obj.name) {
        return subTotal + (obj.price / 100) * (value || 0) * 100
      }
    }
    return subTotal
  }, 0)
}

export const billDetailsHandler = result => {
  let billMessage = []
  for (const [key, value] of Object.entries(result)) {
    billMessage.push(`${key}: ${value}`)
  }
  return billMessage
}

export const billsHandler = (menu, result) => {
  return menu?.reduce((subTotal, obj) => {
    for (const [key, value] of Object.entries(result)) {
      if (key !== 'name' && key === obj.name) {
        return subTotal + (obj.price / 100) * (value || 0) * 100
      }
    }
    return subTotal
  }, 0)
}
