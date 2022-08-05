import { configureStore } from '@reduxjs/toolkit'

import billSplitAppReducer from 'redux/reducer/index'

export const store = configureStore({
  reducer: {
    billSplitApp: billSplitAppReducer
  }
})
