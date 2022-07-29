import { createSlice } from '@reduxjs/toolkit'

export const singleUserSlice = createSlice({
  name: 'userData',
  initialState: [],
  reducers: {
    addUserData: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { addUserData } = singleUserSlice.actions
export default singleUserSlice.reducer
