import { combineReducers } from "redux"
// import { Marketplace } from '../../typechain-types/contracts/Marketplace'
// import { Minter } from '../../typechain-types/contracts/Minter'

interface Actions{
    type: string,
    item: {
        name: string,
        description: string,
        image: string | void,
        index: string,
        price: string
    }
}

const hamburgerState = (state = false, action: {type: string})=>{
    switch(action.type){
        case "HAMBURGER_ACTIVE":
            return state= true;
        case "HAMBURGER_INACTIVE":
            return state=false;
        default:
            return false
    }
}

export const itemData  = (state = {}, action: Actions)=>{
    switch(action.type){
        case "SET_ITEM":
            return action.item
        default:
            return state
    }
}

export const account = (state = "", action: {type: string, account: any} )=>{
    switch(action.type){
        case "SAVE_ACCOUNT":
            return state = action.account
        default:
            return state
    }
}

export const marketplaceContract= (state: any | undefined = "", action: {type: string, contractInstance: any | undefined})=>{
    // console.log(action.contractInstance)
    switch(action.type){
        case "SAVE_MARKETPLACE_CONTRACT":
            return state = action.contractInstance;
        default:
            return state
    }
}

export const checkoutPopupState = (state = false, action: {type: string}) =>{
    switch(action.type){
        case "ACTIVATE_POPUP":
            return true
        case "DEACTIVATE_POPUP":
            return false
        default:
            return state
    }
}
export const imageEditorPopupState = (state = false, action: {type: string}) =>{
    switch(action.type){
        case "ACTIVATE_EDITOR_POPUP":
            return true
        case "DEACTIVATE_EDITOR_POPUP":
            return false
        default:
            return state
    }
}

export const imageToBeEdited = (state = "false", action: {type: string; image: string}) =>{
    switch(action.type){
        case "SAVE_IMAGE":
            return action.image
        default:
            return state
    }
}

export const NFTData = (state = [], action: {data: Metadata | never[], type: string})=>{
        
    switch(action.type){
        case "SAVE_DATA":
            return action.data
        default:
            return state
    }
}

export const Window = (state = null, action: {Window: any, type: string})=>{
    switch (action.type){
        case "SAVE_WINDOW":
            return action.Window;
        default:
            return state
    }
}

export const allReducers = combineReducers({
    itemData,
    account,
    marketplaceContract,
    checkoutPopupState,
    imageEditorPopupState,
    imageToBeEdited,
    NFTData,
    Window,
    hamburgerState
})