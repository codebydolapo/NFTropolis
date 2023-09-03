import styles from "../styles/create.module.css";
import { useState } from "react";

function AssetsBody() {

  return (
    <>
      <div className={`w-[100vw] ${styles.container}`}>
        <div
          className={`w-[100%] h-[100%] md:py-[5rem] xs:py-3 overflow-y-scroll overflow-x-hidden flex flex-col items-center ${styles.backdrop}`}
        >
          <div
            className={`md:w-[40rem] md:h-auto rounded-lg flex flex-col items-center justify-around xs:w-[100vw] xs:h-auto`}
          >

          </div>
        </div>
      </div>

      {/* <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <img src={file} /> */}
    </>
  );
}

export default AssetsBody;
