// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyC6VbYebtedJIF_fvoYSglZImwdCRSrN8c",
  authDomain: "anskerme-fcm.firebaseapp.com",
  databaseURL: "https://anskerme-fcm.firebaseio.com",
  projectId: "anskerme-fcm",
  storageBucket: "anskerme-fcm.appspot.com",
  messagingSenderId: "989384809387",
  appId: "1:989384809387:web:e1b0e27bf636edb0c0d0ee",
  measurementId: "G-K96KREQESF"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.


// [END initialize_firebase_in_sw]