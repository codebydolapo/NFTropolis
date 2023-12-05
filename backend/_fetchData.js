import { ref, get, child } from "firebase/database";
import {database} from "./_config"


//fetching data
const dbRef = ref(database);

export default function _fetchData(){
  // get(child(dbRef, `images/${userId}`)).then((snapshot) => {
  get(child(dbRef, `NFTs`)).then((snapshot) => {
    const data = [];
    if (snapshot.exists()) {
      console.log(snapshot.val());
      //returns the collected data in array format
      for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
        const key = Object.keys(snapshot.val())[i];
        data.push(snapshot.val()[key]);
      }
      ////////////////////////////////
      return data
    } else {
      console.log("No data available"); 
    }
  }).catch((error) => {
    console.error(error);
  });
}