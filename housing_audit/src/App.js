import { Route, Routes } from 'react-router-dom'; 
import Home from './components/home';    
import Dashboard from './components/dashboard';

function App() {
  return (
    <div>
        <Routes> 
          <Route path="/" element={<Home/>} /> 
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;