import { createSlice } from '@reduxjs/toolkit'

import { getMenus, getUsers } from 'redux/actions/getUserAction'

export const billSplitApp = createSlice({
  name: 'billSplitApp',
  initialState: {
    users: [],
    menus: [],
    userData: [],
    individualBill: [],
    activeRestaurant: {},
    activeUser: {},
    totalBill: 0,
    pending: false,
    error: {}
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

  extraReducers: {
    [getUsers.pending]: state => (state = { ...state, pending: 'loading' }),
    [getUsers.fulfilled]: (state, action) =>
      (state = { ...state, pending: false, users: action.payload }),
    [getUsers.rejected]: (state, action) =>
      (state = { ...state, pending: false, users: [], error: action.payload }),

    [getMenus.pending]: state => (state = { ...state, pending: 'loading' }),
    [getMenus.fulfilled]: (state, action) =>
      (state = { ...state, pending: false, menus: action.payload }),
    [getMenus.rejected]: (state, action) =>
      (state = { ...state, pending: false, users: [], error: action.payload })
  }
})

export const { addBill, addactiveUser, adduserData, addindividualBill, addRestaurants } =
  billSplitApp.actions

export default billSplitApp.reducer
