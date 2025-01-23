import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>
  </BrowserRouter>,

)
