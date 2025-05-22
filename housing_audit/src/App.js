import { Route, Routes } from 'react-router-dom'; 
import Home from './components/home';  
import About from './components/about'; 
import Contact from './components/contact';  
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div>
        <Routes> 
          <Route path="/" element={<Home/>} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
    </div>
  );
}

export default App;