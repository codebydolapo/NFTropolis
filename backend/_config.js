import { initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA9hzgmbEMQITED64h3rFD3W9klA4owkaU",
    authDomain: "nftropolis-e514a.firebaseapp.com",
    projectId: "nftropolis-e514a",
    storageBucket: "nftropolis-e514a.appspot.com",
    messagingSenderId: "269117787296",
    appId: "1:269117787296:web:89f52efc7096e029778dc5",
    measurementId: "G-3XKGF2DL51",
    databaseURL: "https://nftropolis-e514a-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: 'gs://nftropolis-e514a.appspot.com/'

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);



