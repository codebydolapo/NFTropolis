import storeImage from "./_storeImage";
import storeNFTData from "./_storeNFTData";
import toast from "react-hot-toast";


export default async function handleCreate(image, name, description, chain, price, externalLink) {

    if (!name && !description) {
        toast.error(`Please include ${!name ? "name" : !description ?? "description"}`)
        return
    } else {
        try {
            const fileURL = await storeImage(image, name)
            // console.log(fileURL)
            await storeNFTData(fileURL, name, description, chain, price, externalLink)
            toast.success("NFT Minted Successfully!")
            return true;
        } catch (error) {
            toast.error("NFT Minting Failed!")
            console.log(error)
            return
        }
    }

}