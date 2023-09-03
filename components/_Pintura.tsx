import React, { useState, useEffect, Component, useCallback } from "react";
import {
  // thumb,
  // thumbButton,
  thumbInner,
  // thumbsContainer,
  img,
} from "./_PinturaStyles";

// React Dropzone
import { useDropzone } from "react-dropzone";

// Pintura Image Editor
// import "./pintura/pintura.css";
import { openDefaultEditor } from "./pintura/pintura";

// This function is called when the user taps the edit button.
// It opens the editor and returns the modified file when done
const editImage = (
  image: never | any,
  done: { (output: any): void; (arg0: any): void }
) => {
  const imageFile = image.pintura ? image.pintura.file : image;
  const imageState = image.pintura ? image.pintura.data : {};

  const editor: any = openDefaultEditor({
    src: imageFile,
    imageState,
  });

  editor.on("close", () => {
    // the user cancelled editing the image
  });

  editor.on("process", ({ dest, imageState }: any) => {
    Object.assign(dest, {
      pintura: { file: imageFile, data: imageState },
    });
    done(dest);
  });
};

function _Pintura() {
  const [files, setFiles] = useState<any>([]);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Do something with the files
    let reader = new FileReader();
    acceptedFiles.forEach((file: Blob) => {
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        setFiles(URL.createObjectURL(file));
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const thumbs = files.map((file: any, index: string | number) => (
    // <div style={thumb} key={file.name}>
    <div
      className={`relative flex rounded-sm border-[1px] border-[#eaeaea] mb-3 mr-3 w-[100] h-[100] p-2`}
      key={file.name}
    >
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
      <button
        // style={thumbButton}
        className={`absolute right-2 bottom-2`}
        onClick={() =>
          editImage(file, (output) => {
            const updatedFiles = [...files];

            // replace original image with new image
            updatedFiles[Number(index)] = output;

            // revoke preview URL for old image
            if (file.preview) URL.revokeObjectURL(file.preview);

            // set new preview URL
            Object.assign(output, {
              preview: URL.createObjectURL(output),
            });

            // update view
            setFiles(updatedFiles);
          })
        }
      >
        Edit
      </button>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      files.forEach((file: { preview: string }) =>
        URL.revokeObjectURL(file.preview)
      );
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {files ? (
          // selectedImages?.map((file: any)=>(
          <div
            className={`w-[100%] h-[100%] flex items-center justify-center relative `}
          >
            <img
              src={files}
              className={`max-w-[95%] max-h-[95%] border-[1px] border-white`}
              alt=""
            />
          </div>
        ) : (
          // ))
          <div
            className={`w-[70%] h-[70%] flex flex-col items-center justify-center`}
          >
            <img
              className={`md:w-[50px] rounded-full m-2 xs:w-[70px]`}
              alt=""
              src="/icons/upload.webp"
            />
            <p className={`text-center text-sm`}>
              Drag and drop some files here, or click to select files
            </p>
          </div>
        )}
      </div>
      <aside className="">{thumbs}</aside>
      {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
    </section>
  );
}

export default _Pintura;
