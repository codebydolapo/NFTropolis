// import uploadFile from './index'


async function handleCreate(path, name, description) {
    if (path && name == "") {
      path == "" ?? toast.error("Error with path name");
      name == "" ?? toast.error("Please provide a valid filename");
    } else {
      try {
        // const res = await uploadFile(path, name, description);
        // toast.promise(res,
        //   {
        //     loading: "Loading",
        //     success: "Got the data",
        //     error: "Error when fetching",
        //   }
        // );
        // console.log("File uploaded!");
        // toast.success("NFT Minted!");
          console.log(path);
      } catch (error) {
        console.error(error);
        toast.error("Error with minting NFT");
      }
    }
  }

  export default handleCreate