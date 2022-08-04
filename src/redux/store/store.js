import { configureStore } from '@reduxjs/toolkit'
import billSplitAppReducer from 'redux/feature/index'

export const store = configureStore({
  reducer: {
    billSplitApp: billSplitAppReducer
  }
})
