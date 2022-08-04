import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from 'firestoreConfig'

import { MENU_COLLECTION, USER_COLLECTION } from 'firestoreCollections/constants'

export const getUsers = createAsyncThunk('users/getUser', async () => {
  const userCollection = collection(db, USER_COLLECTION)
  const response = await getDocs(userCollection)
  return response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
})

export const getMenus = createAsyncThunk('menu/getMenu', async () => {
  const menuCollection = collection(db, MENU_COLLECTION)
  const response = await getDocs(menuCollection)
  return response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
})

export const billSplitApp = createSlice({
  name: 'billSplitApp',
  initialState: {
    users: [],
    menus: [],
    userData: [],
    totalBill: 0,
    individualBill: [],
    activeRestaurant: {},
    activeUser: {}
  },

  reducers: {
    addBill: (state, action) => {
      return (state = { ...state, totalBill: action.payload })
    },
    addactiveUser: (state, action) => {
      return (state = { ...state, activeUser: action.payload })
    },
    adduserData: (state, action) => {
      state.userData.push(action.payload)
    },
    addindividualBill: (state, action) => {
      state.individualBill.push(action.payload)
    },
    addRestaurants: (state, action) => {
      return (state = { ...state, activeRestaurant: action.payload })
    }
  },

  extraReducers: builder => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => (state = { ...state, users: action.payload }))
      .addCase(getMenus.fulfilled, (state, action) => (state = { ...state, menus: action.payload }))
  }
})

export const { addBill, addactiveUser, adduserData, addindividualBill, addRestaurants } =
  billSplitApp.actions

export default billSplitApp.reducer
