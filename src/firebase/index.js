import firebase from 'firebase'
import "firebase/messaging"

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

const messaging = firebase.messaging()

messaging.usePublicVapidKey("BHUrOKeAgZimIEYvTBW-ll7EpbavbzaKLwsFtLgcCpt4swVBVgx7Oivbai7map40SN8U23OHqChb1khwMnYuLeg");

export { messaging }
// firebase.messaging.getToken().then(function(currentToken) {
//   if (currentToken) {
//     console.log(currentToken)
//   } else {
//     // Show permission request.
//     console.log('No Instance ID token available. Request permission to generate one.')
//     // Show permission UI.
//     // updateUIForPushPermissionRequired()
//     // setTokenSentToServer(false)
//   }
//   }).catch(function(err) {
//   console.log('An error occurred while retrieving token. ', err)
//   // showToken('Error retrieving Instance ID token. ', err);
//   // setTokenSentToServer(false);
//   })

