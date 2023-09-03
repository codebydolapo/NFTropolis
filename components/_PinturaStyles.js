const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    padding: 20
  };
  
  const thumb = {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    // boxSizing: "border-box"
  };

  `relative flex rounded-sm border-[1px] border-[#eaeaea] mb-3 mr-3 w-[100] h-[100] p-2`
  
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  };
  
  const img = {
    display: "block",
    width: "auto",
    height: "100%"
  };
  
  const thumbButton = {
    position: "absolute",
    right: 10,
    bottom: 10
  };

  `absolute right-2 bottom-2`

  export {thumb, thumbButton, thumbInner, thumbsContainer, img}