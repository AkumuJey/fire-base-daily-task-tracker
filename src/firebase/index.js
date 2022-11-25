
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCAKd1W7BeknA_v7gTDOh8-8X20G4H84TY',
  authDomain: 'daily-tasks-17d7e.firebaseapp.com',
  projectId: 'daily-tasks-17d7e',
  storageBucket: 'daily-tasks-17d7e.appspot.com',
  messagingSenderId: '512862798521',
  appId: '1:512862798521:web:68e7dfdc2229600ac81168'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
export {
    db
}