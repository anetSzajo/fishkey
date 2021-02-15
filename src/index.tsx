import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBuRCrDlitRA071nka9mQUI74OvC7RjwrI",
    authDomain: "fishkey-1f7b9.firebaseapp.com",
    projectId: "fishkey-1f7b9",
    storageBucket: "fishkey-1f7b9.appspot.com",
    messagingSenderId: "144061389132",
    appId: "1:144061389132:web:9b43ca7886b66ffe5b57e9",
    measurementId: "G-Z061NGR99V"
};

// @ts-ignore
ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
    </FirebaseAppProvider>,
    document.getElementById('root')
);

reportWebVitals();
