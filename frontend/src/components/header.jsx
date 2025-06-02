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
  },[navigate]);

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
    <div className="w-full py-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex flex-row items-center mr-7">
        <Link to="/">
          <div className="flex flex-row items-center mr-7">
            <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto ml-5"/>
            <div className="text-4xl sm:mt-5 ml-1 flex flex-row">
              <div><span className="text-palette-red font-['Chelsea_Market']">H</span><span className="font-['Chelsea_Market']">ouse</span></div>
              <div><span className="text-palette-red font-['Chelsea_Market']">A</span><span className="font-['Chelsea_Market']">udit</span></div>
            </div>
          </div>
        </Link>
        <div className="flex flex-row items-center space-x-20 text-[25px] ml-auto text-zinc-500 font-bold hidden sm:flex">
          <Link to="/">Home</Link>
          <Link to="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</Link>
          <Link to="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</Link>
          <Link to="/projects">Housing Projects</Link>
        </div>
        <button
          className="bg-palette-red font-bold text-white text-[25px] h-[48px] w-fit px-6 ml-auto sm:ml-20 rounded-xl flex items-center justify-center leading-none hidden sm:flex"
          onClick={() => setIsLoginOpen(true)}
          style={{ alignSelf: 'center', lineHeight: '1', paddingBottom: '5px'}}
        >
          <span className="font-bold leading-none">Staff Login</span>
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
