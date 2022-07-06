import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAX_2-O1DmIWoO64ShrYuLj20tT3nqfNrI',
  authDomain: 'split-order.firebaseapp.com',
  projectId: 'split-order',
  storageBucket: 'split-order.appspot.com',
  messagingSenderId: '255633352913',
  appId: '1:255633352913:web:7039484594cf8327dfbdf0',
  measurementId: 'G-95F8RKKVZ0'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
