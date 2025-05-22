import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/header'; 
import Footer from './components/footer';
import './globals.css';  

const Root = () => {
  const location = useLocation();
  const shouldHideFooterHeader = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Conditionally render Header and Footer */}
      {!shouldHideFooterHeader && <Header />}
      <App />
      {!shouldHideFooterHeader && <Footer />}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
