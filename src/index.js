import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCAdl5SGgE5y_UY5KnASfM0ch2z2-uEzNI",
    authDomain: "fir-9-test-dcbed.firebaseapp.com",
    projectId: "fir-9-test-dcbed",
    storageBucket: "fir-9-test-dcbed.appspot.com",
    messagingSenderId: "437638549132",
    appId: "1:437638549132:web:b900350f78b6747306f5a9"
  }

  //init app 
  initializeApp(firebaseConfig)

  //init services 
  const db = getFirestore()
  
  //collection ref
  const colRef = collection(db, 'Fincher_Films')

  //get collection data 