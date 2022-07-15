import { createSlice } from '@reduxjs/toolkit'

export const activeRestaurantSlice = createSlice({
  name: 'resturant',
  initialState: {},
  reducers: {
    addRestaurant: (state, action) => {
      return (state = action.payload)
    }
  }
})

export const { addRestaurant } = activeRestaurantSlice.actions
export default activeRestaurantSlice.reducer
