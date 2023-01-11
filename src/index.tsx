import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

<<<<<<< HEAD
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
=======
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
>>>>>>> 6d39b95bdc66eda2d904508f7664896f9fc6476c
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
