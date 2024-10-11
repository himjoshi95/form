import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import  {Toaster} from 'react-hot-toast';
import AppTest from './AppTest.jsx';
import {BrowserRouter} from 'react-router-dom';
import  {ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppTest />
      <Toaster/>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
)
