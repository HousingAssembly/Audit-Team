import { Link } from 'react-router-dom';

export default function Header() { 
  return ( 
    <div className="w-full border-b-2 border-black">
      <div className="flex flex-row items-center mx-12">
        <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto"/>
        <div className="px-6 text-4xl font-medium"><span className="text-palette-red">H</span>ouse <span className="text-palette-red">A</span>udit</div>
        <div className="flex flex-row items-center space-x-32 text-lg ml-auto text-palette-text font-medium">
          <Link to="/">Home</Link>
          <Link to="#about">About Us</Link>
          <Link to="#contact">Contact</Link>
        </div>
        <button className="bg-palette-red font-medium text-lg text-white px-6 py-1 ml-24 rounded-lg m-4">Login</button>
      </div> 
    </div>
  );
}