// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAX_2-O1DmIWoO64ShrYuLj20tT3nqfNrI',
  authDomain: 'split-order.firebaseapp.com',
  projectId: 'split-order',
  storageBucket: 'split-order.appspot.com',
  messagingSenderId: '255633352913',
  appId: '1:255633352913:web:7039484594cf8327dfbdf0',
  measurementId: 'G-95F8RKKVZ0'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
