import { initializeApp } from 'firebase/app'
import { 
    getFirestore, 
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    getDoc,
    updateDoc,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth'

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
const auth = getAuth()

//collection ref
const colRef = collection(db, 'Fincher_Films')
 
//queries 
const q = query(colRef,  orderBy('createdAt'))

//realtime collection data
onSnapshot(q, (snapshot) => {
    let films = [] 

    snapshot.docs.forEach((doc) => {
        films.push({ ...doc.data(), id: doc.id })
    })
    console.log(films)
})

//adding documents
const addFilmForm = document.querySelector('.add')
addFilmForm.addEventListener('submit', (e) => { 
    e.preventDefault()

    addDoc(colRef, {
        title: addFilmForm.title.value,
        mpaa_rating: addFilmForm.mpaa_rating.value,
        year: addFilmForm.year.value,
        createdAt: serverTimestamp(),
    })
    .then(() => {
        addFilmForm.reset(  )
    })

})

//updating documents
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e. preventDefault()

    const docRef = doc(db, 'Fincher_Films', updateForm.id.value)

    updateDoc(docRef, {
        title: "updated title"
    })
    .then(() => {
        updateForm.reset( )
    })

})

//deleting documents
const deleteFilmForm = document.querySelector('.delete')
deleteFilmForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'Fincher_Films', deleteFilmForm.id.value)

    deleteDoc(docRef)
        .then(() => {
             deleteFilmForm.reset()
        })
})
 
//get a single document 
const docRef = doc(db, 'Fincher_Films', '457OvSGZEiqpRwsQcKXn')
 
onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id  )
})

//signing users up 
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value 
    const password = signupForm.password.value    

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('new user created: ', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
     
})
