import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';


const app = initializeApp ({
    apiKey: "AIzaSyAjbkaMBzWMcV8ZAz___H1XrBcnhhZO3uw",
    authDomain: "licenta-9f56b.firebaseapp.com",
    projectId: "licenta-9f56b",
    storageBucket: "licenta-9f56b.appspot.com",
    messagingSenderId: "326771465031",
    appId: "1:326771465031:web:c5184d132335c2bbd1ca62",
    // measurementId: <measurementId/>,


});

const storage = getStorage(app);
export default storage;