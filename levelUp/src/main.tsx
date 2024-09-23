import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './redux/storage.ts'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')!).render(

     <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId="824445413802-ubjorruvbt3n12uim8jvhphaf9lbsvn4.apps.googleusercontent.com">
    <BrowserRouter>
    <App />
    </BrowserRouter>
        </GoogleOAuthProvider>
        </PersistGate>
     </Provider>

)
