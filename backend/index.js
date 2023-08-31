const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./serviceAccount.json");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket("gs://nftropolis-e514a.appspot.com");

async function uploadFile(path, fileName) {
  const storage = storageRef.upload(path, {
    public: true,
    destination: `image/${fileName}`,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
        name: "one",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
      },
    },
  });
  return storage;
}

(async ()=>{
    try{
        const res = await uploadFile(`backend/images/1.png`, `1.png`);
        console.log(res)
        console.log("File uploaded!")
    } catch(error){
        console.error(error)
    }
})();
