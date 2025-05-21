import { Route, Routes } from 'react-router-dom'; 
import Home from './components/home';   

function App() {
  return (
    <div>
      <Routes> 
        <Route path="/" element={<Home/>} /> 
        <Route path="#about" />
        <Route path="#contact" />
      </Routes>
    </div>
  );
}

export default App;