import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, onSnapshot, collection, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { KEYS } from "./firebaseKeys.js";

const firebaseConfig = {
    apiKey: KEYS.API_KEY,
    authDomain: KEYS.AUTH_DOMAIN,
    projectId: KEYS.PROJECT_ID,
    storageBucket: KEYS.STORAGE_BUCKET,
    messagingSenderId: KEYS.MESSAGING_SENDER_ID,
    appId: KEYS.APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let status = false;

await onSnapshot(doc(db, 'profile', 'image'), (snapshot) => {
    if(snapshot.data().imagesrc){
        status = true;
    }
})

export { db, status };