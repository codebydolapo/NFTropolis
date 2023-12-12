//this component contains the code for creating a new NFT
import { toast } from "react-hot-toast";
import _handleCreate from "../../backend/_handleCreate" //this function handles the firebase storage
import _storeListings from "../../backend/_storeListings";
import { nfTropolisAddress } from "../../src/nfTropolisAddress";
import { useState } from "react";


const useUploadItem = () => {

    const [address, setAddress] = useState(nfTropolisAddress);

    async function uploadItem({ file, name, description, externalLink, tokenId }: any) {
        
        try {
            console.log(nfTropolisAddress)
            await _handleCreate(file, name, description, externalLink, tokenId, nfTropolisAddress);

        }
        catch (error) {
            console.log(error);
        }


    }


    return { uploadItem }


}

export default useUploadItem;