import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDocs } from 'firebase/firestore'

import { menuCollection } from 'pages/auth/registration/Registration'

export const getMenu = createAsyncThunk('menu/getMenu', async () => {
  const response = await getDocs(menuCollection)
  return response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
})

export const menuSlice = createSlice({
  name: 'menu',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMenu.fulfilled, (state, action) => (state = action.payload))
  }
})

export default menuSlice.reducer
