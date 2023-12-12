import { combineReducers } from "redux"
import { Nft } from "alchemy-sdk"

interface Actions {
    type: string,
    item: {
        name: string,
        description: string,
        image: string | void,
        index: string,
        price: string
    }
}

const hamburgerState = (state = false, action: { type: string }) => {
    switch (action.type) {
        case "HAMBURGER_ACTIVE":
            return state = true;
        case "HAMBURGER_INACTIVE":
            return state = false;
        default:
            return false
    }
}

export const itemData = (state = {}, action: Actions) => {
    switch (action.type) {
        case "SET_ITEM":
            return action.item
        default:
            return state
    }
}


export const checkoutPopupState = (state = false, action: { type: string }) => {
    switch (action.type) {
        case "ACTIVATE_POPUP":
            return true
        case "DEACTIVATE_POPUP":
            return false
        default:
            return state
    }
}
export const imageEditorPopupState = (state = false, action: { type: string }) => {
    switch (action.type) {
        case "ACTIVATE_EDITOR_POPUP":
            return true
        case "DEACTIVATE_EDITOR_POPUP":
            return false
        default:
            return state
    }
}

export const NFTData = (state = [], action: {type: string; data: Nft[]}) => {

    switch (action.type) {
        case "SAVE_DATA":
            return action.data
        default:
            return state
    }
}

export const file = (state = "", action: { type: string; file: string }) => {
    switch (action.type) {
        case "SAVE_IMAGE":
            console.log(action.file)
            return action.file
        default:
            return state
    }
}

export const filePath = (state = "", action: { type: string; filePath: string }) => {
    switch (action.type) {
        case "SAVE_IMAGE_PATH":
            console.log(action.filePath)
            return action.filePath
        default:
            return state
    }
}

export const checkoutData = (state = "", action: { type: string; checkoutData: any }) => {
    switch (action.type) {
        case "SAVE_CHECKOUT_DATA":
            console.log(action.checkoutData)
            return action.checkoutData
        default:
            return state
    }
}





export const allReducers = combineReducers({
    itemData,
    checkoutPopupState,
    imageEditorPopupState,
    NFTData,
    hamburgerState,
    file,
    filePath,
    checkoutData
})