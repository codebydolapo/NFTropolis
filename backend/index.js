const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./serviceAccount.json");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket("gs://nftropolis-e514a.appspot.com");

async function uploadFile(path, name, description) {
  const storage = storageRef.upload(path, {
    public: true,
    destination: `image/${name}`,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
        // name,
        // description
      },
    },
  });
  console.log(path)
  return storage;
}


// (async ()=>{
//   try{
//     const res = await uploadFile(`backend/images/1.png`, `1.png`);
//     console.log(res)
//     console.log("File uploaded!")
//   } catch(error){
//     console.error(error)
//   }
// })();

export default uploadFile
