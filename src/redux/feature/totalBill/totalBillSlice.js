import { createSlice } from '@reduxjs/toolkit'

export const totalBillSlice = createSlice({
  name: 'totalBill',
  initialState: 0,
  reducers: {
    addBill: (state, action) => {
      return (state = action.payload)
    }
  }
})

export const { addBill } = totalBillSlice.actions
export default totalBillSlice.reducer
