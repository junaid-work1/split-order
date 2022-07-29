import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDocs } from 'firebase/firestore'

import { userCollection } from 'pages/auth/registration/Registration'

export const getUser = createAsyncThunk('users/getUser', async () => {
  const response = await getDocs(userCollection)
  return response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
})

export const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => (state = action.payload))
  }
})

export default userSlice.reducer
