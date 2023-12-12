//this one is used to collect the sata from the user in order to create and mint and NFT
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deactivateEditorPopup, activateEditorPopup, saveFile, saveFilePath } from "../reducers/action";
import { toast } from "react-hot-toast";
import _handleCreate from "../../backend/_handleCreate"
import useCreateAndList from "../utils/useCreateAndList";
import { nfTropolisAddress } from "../../src/nfTropolisAddress";

const useCollectData = () => {


    const dispatch = useDispatch()


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [listingStatus, setListingStatus] = useState(false)
    const [externalLink, setExternalLink] = useState('')
    const [tokenId, setTokenId] = useState(0)
    const [chain, setChain] = useState('Polygon');

    const priceRef = useRef<string | number>("");
    const tokenIdRef = useRef<string | number>("");

    const editState = useSelector((state: any) => {
        return state.imageEditorPopupState;
    });

    const filePath = useSelector((state: any) => {
      return state.filePath;
    });

    const file = useSelector((state: any) => {
        return state.file;
    });

    function flipEditState() {
        editState
            ? (() => {
                dispatch(deactivateEditorPopup());
            })()
            : (() => {
                dispatch(activateEditorPopup());
            })();
    }

    const handleNameUpdate = (event: any) => {
        setName(event.target.value);
    };

    const handleLinkUpdate = (event: any) => {
        setExternalLink(event.target.value);
    };

    const handleDescriptionUpdate = (event: any) => {
        setDescription(event.target.value);
    };

    const handlePriceUpdate = (event: any) => {
        // priceRef.current = parseInt(event.target.value)
        setPrice(parseInt(event.target.value));
    };

    const handleTokenIdUpdate = (event: any) => {
        // tokenIdRef.current = parseInt(event.target.value)
        setTokenId(parseInt(event.target.value));
    };

    function handleImageRemove() {
        dispatch(saveFilePath(""))
        dispatch(saveFile(""))
        toast("Image Removed!")
    }

    function handleImageRepick() {
        dispatch(saveFilePath(""))
        dispatch(saveFile(""))
        flipEditState()
        toast("Repick Image!")
    }

    function handleListingStatus() {
        listingStatus ? setListingStatus(false) : setListingStatus(true)
    }



    const handleChainChange = (event: any) => {
        // const handleChainChange = (_chain: string) => {
        setChain(event.target.value as string);
    }


    return {
        priceRef,
        editState,
        file,
        filePath,
        listingStatus,
        chain,
        description, 
        name, 
        price,
        tokenId,
        externalLink,
        flipEditState,
        handleChainChange,
        handleDescriptionUpdate,
        handleImageRepick,
        handleLinkUpdate,
        handleListingStatus,
        handleNameUpdate,
        handlePriceUpdate,
        handleTokenIdUpdate,
        handleImageRemove
    }

}

export default useCollectData