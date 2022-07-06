import { configureStore } from '@reduxjs/toolkit'
import menuReducer from 'redux/feature/menu/menuSlice'
import singleUserReducer from 'redux/feature/singleUserData/singleUserSlice'
import userReducer from 'redux/feature/getRegisterUser/userSlice'
import totalBillReducer from 'redux/feature/totalBill/totalBillSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    menu: menuReducer,
    userData: singleUserReducer,
    totalBill: totalBillReducer
  }
})
