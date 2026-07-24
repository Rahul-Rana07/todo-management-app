import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import './index.css'
import {App} from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181B",
            color: "#fff",
            border: "1px solid #333",
          },
        }}
      />
    <App />
  </AuthProvider>
 </BrowserRouter>
)
