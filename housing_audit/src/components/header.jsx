import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Header() { 
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setisSignUpOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      navigate("/dashboard/overview");
    }
  },[]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', `#${sectionId}`);
    }
  };

  const closeModal = () => {
    setIsLoginOpen(false); 
    setisSignUpOpen(false); 
  };

  const openLoginSignUp = () => {
    setisSignUpOpen(!isSignUpOpen);
    setIsLoginOpen(!isLoginOpen);
  };

  return ( 
    <div className="w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex flex-row items-end mx-12">
        <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto mb-2"/>
        <div className="px-6 text-4xl font-medium mb-2">
          <span className="text-palette-red font-chelsea">H</span><span className="font-chelsea">ouse</span> 
          <span className="text-palette-red font-chelsea"> A</span><span className="font-chelsea">udit</span>
        </div>
        <div className="flex flex-row items-center space-x-32 text-lg ml-auto text-zinc-500 font-bold mb-4">
          <Link to="/">Home</Link>
          <Link to="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</Link>
          <Link to="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</Link>
          <Link to="/projects">Active/Future Projects</Link>
        </div>
        <button
          className="bg-palette-red font-medium text-lg text-white px-6 py-1 ml-24 rounded-lg m-4"
          onClick={() => setIsLoginOpen(true)}
        >
          <span className="font-bold">Staff Login</span>
        </button>

        {isLoginOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center">
            <LoginForm
              openLoginSignUp={openLoginSignUp}
              closeModal={closeModal}
              onLogin={(token, user) => {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                closeModal(); 
                navigate("/dashboard/overview");
              }}
            />
          </div>
        )}

        {isSignUpOpen && ( 
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center">
            <SignUpForm openLoginSignUp={openLoginSignUp} closeModal={closeModal} />
          </div>
        )}
      </div> 
    </div>
  );
}
