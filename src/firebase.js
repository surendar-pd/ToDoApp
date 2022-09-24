import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCDwGox9PXC_m1e214Bt7Ta4e4t3NYNS9k",
    authDomain: "trello-e689a.firebaseapp.com",
    projectId: "trello-e689a",
    storageBucket: "trello-e689a.appspot.com",
    messagingSenderId: "1044194657877",
    appId: "1:1044194657877:web:37b8b60a436580cbcf76dc"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebaseApp.firestore();
firebase.analytics();
firebase.performance();