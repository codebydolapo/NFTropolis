import { Nft } from "alchemy-sdk"

interface Item{
    name: string,
    description: string,
    image: string | void,
    index: string,
    price: string
}

export const activateHamburger = () => {
    return { type: "HAMBURGER_ACTIVE" }
}

export const deactivateHamburger = () => {
    return { type: "HAMBURGER_INACTIVE" }
}

export const addItem = (item: NFT)=>{
    return{
        type: "SET_ITEM",
        item
    }
}

export const changeCategory = (category: any)=>{
    return {
        type: "SET_CATEGORY",
        category
    }
}

export const saveAccount = (account: any)=>{
    return{
        type: "SAVE_ACCOUNT",
        account
    }
}

export const saveMarketplaceContract = (contractInstance: undefined | any)=>{
    return{
        type: "SAVE_MARKETPLACE_CONTRACT",
        contractInstance
    }
}

export const activateCheckoutPopup = ()=>{
    return{
        type: "ACTIVATE_POPUP",
    }
}

export const deactivateCheckoutPopup = ()=>{
    return{
        type: "DEACTIVATE_POPUP"
    }
}

export const activateEditorPopup = ()=>{
    return{
        type: "ACTIVATE_EDITOR_POPUP",
    }
}

export const deactivateEditorPopup = ()=>{
    return{
        type: "DEACTIVATE_EDITOR_POPUP"
    }
}


export const saveNFTData = (data: Nft[])=>{
    return {
        type: "SAVE_DATA",
        data
    }
}


export const saveFile = (file: string)=>{
    return{
        type: "SAVE_IMAGE",
        file
    }
}

export const saveFilePath = (filePath: string)=>{
    return{
        type: "SAVE_IMAGE_PATH",
        filePath
    }
}