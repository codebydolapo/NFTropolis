import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function DropZone() {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Do something with the files
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className = {`border-dashed  w-full h-full flex items-center justify-center cursor-pointer`}>
    {/* <div {...getRootProps()} className = {`border-2 border-dashed border-white w-full h-full`}> */}
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className = {`w-[70%] h-[70%] flex flex-col items-center justify-center`}>
            <img
              className={`md:w-[50px] md:h-[50px] rounded-full m-2 xs:w-[40px] xs:h-[40px]`}
              alt=""
              src="/icons/upload.webp"
            />
            <p>Drop the files here ...</p> 
          </div>
          :
          <div className = {`w-[70%] h-[70%] flex flex-col items-center justify-center`}>
            <img
              className={`md:w-[50px] md:h-[50px] rounded-full m-2 xs:w-[40px] xs:h-[40px]`}
              alt=""
              src="/icons/upload.webp"
            />
            <p className = {`text-center text-sm`}>Drag and drop some files here, or click to select files</p>
          </div>
      }
    </div>
  )
}

export default DropZone;