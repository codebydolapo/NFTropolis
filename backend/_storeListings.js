import { ref, set, push } from "firebase/database";
import { database } from "./_config"
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';


export default async function _storeListings(address, tokenId, price) {
    const db = database;

    try {
        await set(push(ref(db, `Listings`)), {
            address,
            tokenId,
            price
        });
        toast.success("Added Listing address successfully")
    }
    catch (error) {
        console.log(error)
        toast.error("Metadata upload failed")
    }
}


