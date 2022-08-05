import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from 'firestoreConfig'

import { MENU_COLLECTION, USER_COLLECTION } from 'constants/dbNames'

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
