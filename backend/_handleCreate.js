import storeImage from "./_storeImage";
import storeNFTData from "./_storeNFTData";
import toast from "react-hot-toast";


export default async function _handleCreate(image, name, description, externalLink, tokenId, address) {
    if (!name && !description) {
        toast.error(`Please include ${!name ? "name" : !description ?? "description"}`)
        return
    } else {
        try {
            const fileURL = await storeImage(image, name)
            // console.log(fileURL)
            await storeNFTData(fileURL, name, description, externalLink, tokenId, address)

            toast.success("NFT Minted Successfully!")
            return true;
        } catch (error) {
            toast.error("NFT Minting Failed!")
            console.log(error)
            return
        }
    }

}