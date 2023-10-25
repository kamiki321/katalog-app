import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import App from './App'
import './index.css'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </React.StrictMode>,
)
