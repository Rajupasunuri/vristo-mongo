import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDNNsImg0RbaOF33i2Lhrf_gl8FZshm9Jg',
    authDomain: 'crm-web-b90b8.firebaseapp.com',
    projectId: 'crm-web-b90b8',
    storageBucket: 'crm-web-b90b8.appspot.com',
    messagingSenderId: '778092329733',
    appId: '1:778092329733:web:54062e8da5e5e06bb1556c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
