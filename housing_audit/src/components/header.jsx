import { Link } from 'react-router-dom';

export default function Header() { 

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', `#${sectionId}`);
    }
  };

  return ( 
    <div className="w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex flex-row items-center mx-12">
        <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto"/>
        <div className="px-6 text-4xl font-medium"><span className="text-palette-red">H</span>ouse <span className="text-palette-red">A</span>udit</div>
        <div className="flex flex-row items-center space-x-32 text-lg ml-auto text-palette-text font-medium">
          <Link to="/">Home</Link>
          <Link to="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</Link>
          <Link to="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</Link>
          <Link to="/projects">Active/Future Projects</Link>
        </div>
        <Link to="/login" className="bg-palette-red font-medium text-lg text-white px-6 py-1 ml-24 rounded-lg m-4">Staff Login</Link>
      </div> 
    </div>
  );
}