import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import {AuthContextProvider}  from './context/AuthContext/AuthContext.jsx';
import ToastContextProvider from './context/ToastContext/ToastContext.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthContextProvider>
      <ToastContextProvider>
    <App />
    </ToastContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
