import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LogIn, ChevronDown, UserCircle, LogOut, Menu, X } from 'lucide-react'; 
import Home from './pages/Home';
import VisionIndividual from './pages/VisionIndividual';
import VisionPro from './pages/VisionPro';
import FastCheck from './pages/FastCheck';
import Auth from './pages/Auth';
import Profile from './pages/Profile'; 
import { useAuth } from './context/AuthContext';

function App() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // Separato per mobile
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false); // Separato per mobile
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await logout();
      setProfileMenuOpen(false);
      setMobileProfileOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/'); 
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  // Funzione per chiudere tutti i menu
  const closeAllMenus = () => {
    setServicesOpen(false);
    setProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileProfileOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Chiudi menu Servizi desktop se click fuori
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setServicesOpen(false);
      }
      
      // Chiudi menu Profilo desktop se click fuori
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
      
      // Chiudi menu Mobile se click fuori, escludendo il pulsante hamburger
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(target) && 
        isMobileMenuOpen &&
        hamburgerButtonRef.current && 
        !hamburgerButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
        setMobileServicesOpen(false);
        setMobileProfileOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Chiudi gli altri menu quando apri/chiudi il menu mobile
    if (!isMobileMenuOpen) {
      setServicesOpen(false); 
      setProfileMenuOpen(false);
      setMobileServicesOpen(false);
      setMobileProfileOpen(false);
    }
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  const toggleMobileProfile = () => {
    setMobileProfileOpen(!mobileProfileOpen);
  };

  return (
    <div className="min-h-screen bg-[url('/grid.png')] bg-repeat text-gray-900 font-['Inter']">
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <img src="/transparent-background,-shadow-designify.png" alt="Sphere Logo" className="h-16 w-16" />
            <span className="font-semibold text-2xl">Sphere</span>
          </Link>
          
          {/* Hamburger Menu Icon - Visible on small screens */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              ref={hamburgerButtonRef}
              className="text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors z-50 relative"
              type="button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation - Hidden on small screens */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/#about" className="nav-link hover:text-gray-600">Chi Siamo</Link>
            <div className="relative" ref={servicesRef}>
              <button 
                onClick={() => setServicesOpen(!servicesOpen)} 
                className={`nav-link flex items-center gap-1 transition-colors ${
                  servicesOpen ? 'text-gray-600 bg-gray-100 px-2 py-1 rounded' : 'hover:text-gray-600'
                }`}
              >
                Servizi <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100 overflow-hidden transform origin-top animate-fade-in-down">
                  <Link to="/vision-pro" onClick={closeAllMenus} className="dropdown-item">Vision Pro</Link>
                  <Link to="/vision-individual" onClick={closeAllMenus} className="dropdown-item">Vision Individual</Link>
                  <Link to="/fast-check" onClick={closeAllMenus} className="dropdown-item">Fast Check</Link>
                  <Link to="/#services" onClick={closeAllMenus} className="dropdown-item text-gray-400 cursor-not-allowed">Prossimamente...</Link>
                </div>
              )}
            </div>
            <Link to="/#contact" className="nav-link hover:text-gray-600">Contattaci</Link>
            
            {currentUser ? (
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                >
                  <UserCircle className="w-6 h-6" />
                </button>
                {profileMenuOpen && (
                  <div className="absolute text-center top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100 overflow-hidden transform origin-top animate-fade-in-down">
                    <Link 
                      to="/profile"
                      onClick={closeAllMenus}
                      className="dropdown-item"
                    >
                      Il Mio Profilo
                    </Link>
                    <button
                          onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                          className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Esci
                      </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                <LogIn className="w-4 h-4" />
                Accedi
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile Menu - Migliorato con sottomenu integrati */}
        <div 
          ref={mobileMenuRef} 
          className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-40 border-b border-gray-100 
            transition-all duration-300 ease-out overflow-hidden ${
              isMobileMenuOpen 
                ? 'max-h-screen opacity-100 translate-y-0' 
                : 'max-h-0 opacity-0 -translate-y-2'
            }`}
        >
          <div className="py-4 flex flex-col">
            {/* Chi Siamo */}
            <Link 
              to="/#about" 
              onClick={closeAllMenus} 
              className="px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors text-center"
            >
              Chi Siamo
            </Link>
            
            {/* Servizi con sottomenu */}
            <div className="w-full">
              <button 
                onClick={toggleMobileServices}
                className={`w-full px-6 py-3 text-gray-900 transition-colors flex items-center justify-center gap-2 ${
                  mobileServicesOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
              >
                Servizi 
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Sottomenu Servizi */}
              <div className={`overflow-hidden transition-all duration-300 ease-out ${
                mobileServicesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-gray-200">
                  <Link 
                    to="/vision-pro" 
                    onClick={closeAllMenus} 
                    className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center"
                  >
                    Vision Pro
                  </Link>
                  <Link 
                    to="/vision-individual" 
                    onClick={closeAllMenus} 
                    className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center"
                  >
                    Vision Individual
                  </Link>
                  <Link 
                    to="/fast-check" 
                    onClick={closeAllMenus} 
                    className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center"
                  >
                    Fast Check
                  </Link>
                  <div className="block px-8 py-2 text-gray-400 cursor-not-allowed text-center">
                    Prossimamente...
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contattaci */}
            <Link 
              to="/#contact" 
              onClick={closeAllMenus} 
              className="px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors text-center"
            >
              Contattaci
            </Link>
            
            {/* Profilo o Login */}
            {currentUser ? (
              <div className="w-full border-t border-gray-200 mt-2 pt-2">
                <button 
                  onClick={toggleMobileProfile}
                  className={`w-full px-6 py-3 text-gray-900 transition-colors flex items-center justify-center gap-2 ${
                    mobileProfileOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  Profilo
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Sottomenu Profilo */}
                <div className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileProfileOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="">
                    <Link 
                      to="/profile"
                      onClick={closeAllMenus}
                      className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center"
                    >
                      Il Mio Profilo
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Esci
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-6 py-3 border-t border-gray-200 mt-2 pt-4">
                <Link 
                  to="/auth" 
                  onClick={closeAllMenus} 
                  className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors w-full"
                >
                  <LogIn className="w-4 h-4" />
                  Accedi
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vision-individual" element={<VisionIndividual />} />
        <Route path="/vision-pro" element={<VisionPro />} />
        <Route path="/fast-check" element={<FastCheck />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </div>
  );
}

export default App;