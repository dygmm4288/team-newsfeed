import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {app} from './firebase/firebase.config';

console.log("app", app);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
  </>
);
