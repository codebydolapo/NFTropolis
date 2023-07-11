interface Item{
    name: string,
    description: string,
    image: string,
    index: string,
    price: string
}

export const addItem = (item: Item | null | undefined)=>{
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

export const saveMinterContract = (contractInstance: undefined | any)=>{
    return{
        type: "SAVE_MINTER_CONTRACT",
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