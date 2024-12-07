import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"

import App from './App.jsx'
import { Store } from './User/redux/Store.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import GlobelContext from './context/globelContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GlobelContext>

    <Provider store={Store}>
      
    <App />


    <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            bodyClassName="toastBody"
            />
    </Provider>
            </GlobelContext>
  </StrictMode>,
)
