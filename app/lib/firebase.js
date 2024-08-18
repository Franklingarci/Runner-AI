import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCq804ZoZu_Jf5vt75MmlZnQzdOMm0U9hE",
    authDomain: "customer-support-ai-c3599.firebaseapp.com",
    projectId: "customer-support-ai-c3599",
    storageBucket: "customer-support-ai-c3599.appspot.com",
    messagingSenderId: "722340203892",
    appId: "1:722340203892:web:64e7cf9b7f34092c4bb021",
    measurementId: "G-M3W51VL6B1"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export{auth, googleProvider, githubProvider,app};
