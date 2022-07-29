import { createSlice } from '@reduxjs/toolkit'

export const singleBillSlice = createSlice({
  name: 'singleBill',
  initialState: [],
  reducers: {
    addIndividualBill: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { addIndividualBill } = singleBillSlice.actions
export default singleBillSlice.reducer
