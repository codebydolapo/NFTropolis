import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./_config";
import { v4 as uuidv4 } from 'uuid';

export default async function storeImage(file, name) {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, `images/${file.name + uuidv4()}`);

    // makes sure a file is always appended
    if (!file) {
      reject("No file provided");
    } else {
      try {
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + parseInt(progress) + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                console.log("User doesn't have permission to access the object");
                break;
              case 'storage/canceled':
                console.log("User canceled the upload");
                break;
              case 'storage/unknown':
                console.log("Unknown error occurred, inspect error.serverResponse");
                break;
            }
            reject(error.code);
          },
          async () => {
            // Upload completed successfully, now get the download URL
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      } catch (error) {
        reject("Image upload failed");
      }
    }
  });
}
