import React, { useState, useRef, useEffect } from 'react';
// Rimuovi BrowserRouter da qui, è già in index.tsx
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // NON IMPORTARE BrowserRouter qui!
import { LogIn, ChevronDown, UserCircle, LogOut, Menu, X } from 'lucide-react'; 
import Home from './pages/Home';
import VisionIndividual from './pages/VisionIndividual';
import VisionPro from './pages/VisionPro';
import FastCheck from './pages/FastCheck';
import Auth from './pages/Auth';
import Profile from './pages/Profile'; 
import { useAuth } from './context/AuthContext'; // Importa useAuth qui

function App() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { currentUser, logout } = useAuth();
  
  // ✅ Adesso, `useNavigate` è valido perché `App` è figlio di `BrowserRouter`
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await logout();
      setProfileMenuOpen(false); // Chiudi il menu del profilo dopo il logout
      navigate('/'); // Naviga alla home dopo il logout
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        // Solo se il click è fuori dal menu mobile E il menu è aperto
        // E non è sul bottone hamburger (gestito da toggleMobileMenu)
        const hamburgerButton = document.getElementById('hamburger-button');
        if (hamburgerButton && !hamburgerButton.contains(event.target as Node)) {
            setIsMobileMenuOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [servicesRef, profileMenuRef, mobileMenuRef, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // Rimuovi <BrowserRouter> da qui!
    // <BrowserRouter> // <-- RIMUOVI QUESTO!
      <div className="min-h-screen bg-[url('/grid.png')] bg-repeat text-gray-900 font-['Inter']">
        <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img src="/transparent-background,-shadow-designify.png" alt="Sphere Logo" className="h-16 w-16" />
              <span className="font-semibold text-2xl">Sphere</span>
            </Link>
            {/* Hamburger Menu Icon - Visible on small screens */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} id="hamburger-button" className="text-gray-900 focus:outline-none">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation - Hidden on small screens */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/#about" className="nav-link hover:text-gray-600">Chi Siamo</Link>
              <div className="relative" ref={servicesRef}>
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)} 
                  className="nav-link hover:text-gray-600 flex items-center gap-1"
                >
                  Servizi <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <Link to="/vision-pro" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vision Pro</Link>
                    <Link to="/vision-individual" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vision Individual</Link>
                    <Link to="/fast-check" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fast Check</Link>
                    <Link to="/#services" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-100">Prossimamente...</Link>
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
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                        <Link 
                          to="/profile"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Il Mio Profilo
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
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

          {/* Mobile Menu - Absolute positioned, shown/hidden based on state */}
          {isMobileMenuOpen && (
            <div ref={mobileMenuRef} className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg py-4 z-40 flex flex-col items-center gap-4 border-b border-gray-100">
              <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="nav-link hover:text-gray-600">Chi Siamo</Link>
              <div className="relative w-full flex flex-col items-center">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)} 
                  className="nav-link hover:text-gray-600 flex items-center gap-1"
                >
                  Servizi <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100 flex flex-col items-center">
                    <Link to="/vision-pro" onClick={() => { setServicesOpen(false); setIsMobileMenuOpen(false); }} className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vision Pro</Link>
                    <Link to="/vision-individual" onClick={() => { setServicesOpen(false); setIsMobileMenuOpen(false); }} className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vision Individual</Link>
                    <Link to="/fast-check" onClick={() => { setServicesOpen(false); setIsMobileMenuOpen(false); }} className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fast Check</Link>
                    <Link to="/#services" onClick={() => { setServicesOpen(false); setIsMobileMenuOpen(false); }} className="block w-full text-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-100">Prossimamente...</Link>
                  </div>
                )}
              </div>
              <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="nav-link hover:text-gray-600">Contattaci</Link>
              
              {currentUser ? (
                <div className="relative flex flex-col items-center">
                  <button 
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                  >
                    <UserCircle className="w-6 h-6" />
                  </button>
                  {profileMenuOpen && (
                      <div className="mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100 flex flex-col items-center">
                        <Link 
                          to="/profile"
                          onClick={() => { setProfileMenuOpen(false); setIsMobileMenuOpen(false); }}
                          className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                  <LogIn className="w-4 h-4" />
                  Accedi
                </Link>
              )}
            </div>
          )}
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
    // </BrowserRouter> // <-- RIMUOVI ANCHE QUESTO!
  );
}

export default App;