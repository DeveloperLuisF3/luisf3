import firebase from "firebase/app"
import "firebase/database"

export const firebaseConfig = {
  apiKey: "AIzaSyAopI44dYOSh0mwBURCTgEBknSBc6uE0SQ",
  authDomain: "luisf3-17814.firebaseapp.com",
  databaseURL: "https://luisf3-17814-default-rtdb.firebaseio.com",
  projectId: "luisf3-17814",
  storageBucket: "luisf3-17814.appspot.com",
  messagingSenderId: "851943661708",
  appId: "1:851943661708:web:0a0058442586b9e5c39ba9",
  measurementId: "G-QT8CWX2WSD",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

var dbContent
var database = firebase.database()
var themeRef = database.ref(`/theme/ThemeMode`)

export function getThemeData() {
  themeRef.on (
    "value", (
      snapshot => {
        console.log(snapshot.val())
        dbContent = snapshot.val()
        console.log(dbContent)
      }
    )
  )
  return dbContent
}