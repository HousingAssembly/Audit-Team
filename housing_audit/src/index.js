import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/header'; 
import Footer from './components/footer';
import './globals.css';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> 
      <Header />  
      <App /> 
      <Footer />  
    </Router>
  </React.StrictMode>
);

reportWebVitals();