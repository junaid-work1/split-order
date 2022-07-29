import activeRestaurantReducer from 'redux/feature/restaurant/activeRestaurantSlice'
import activeUserReducer from 'redux/feature/activeUser/activeUserSlice'
import { configureStore } from '@reduxjs/toolkit'
import totalBillReducer from 'redux/feature/totalBill/totalBillSlice'
import menuReducer from 'redux/feature/menu/menuSlice'
import singleUserReducer from 'redux/feature/singleUserData/singleUserSlice'
import singleBillReducer from 'redux/feature/singleUserBill/singleBillSlice'
import userReducer from 'redux/feature/getRegisterUser/userSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    menu: menuReducer,
    userData: singleUserReducer,
    totalBill: totalBillReducer,
    individualBill: singleBillReducer,
    activeRestaurant: activeRestaurantReducer,
    activeUser: activeUserReducer
  }
})
