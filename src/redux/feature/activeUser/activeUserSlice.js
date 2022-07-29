import { createSlice } from '@reduxjs/toolkit'

export const activeUserSlice = createSlice({
  name: 'logedinUser',
  initialState: {},
  reducers: {
    addActiveUser: (state, action) => {
      return (state = action.payload)
    }
  }
})

export const { addActiveUser } = activeUserSlice.actions
export default activeUserSlice.reducer
