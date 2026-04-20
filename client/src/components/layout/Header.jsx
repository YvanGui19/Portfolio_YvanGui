import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiTerminal } from "react-icons/bi";
import { useAppMode } from "../../context/AppModeContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleMode } = useAppMode();
  const location = useLocation();

  const navLinks = [
    { to: "/projects", label: "PROJETS" },
    { to: "/about", label: "PROFIL" },
    { to: "/contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? "bg-[#000000]/95 backdrop-blur-md"
            : "bg-[#000000]/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              to="/"
              className="font-heading text-[24px] sm:text-[28px] uppercase tracking-tight transition-colors group"
            >
              <span className="text-white group-hover:text-[#C2FE0B]">YVAN</span>
              <span className="text-[#C2FE0B]">GUI</span>
            </Link>

            {/* Navigation desktop - Minimal */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-mono text-[13px] tracking-[0.08em] uppercase transition-colors ${
                      isActive
                        ? "text-[#C2FE0B]"
                        : "text-white hover:text-[#C2FE0B]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Terminal button - cyan accent */}
              <button
                onClick={toggleMode}
                className="flex items-center gap-2 font-mono text-[13px] tracking-[0.08em] text-[#01FFFF] hover:text-white transition-colors cursor-pointer"
                aria-label="Mode CLI"
              >
                <BiTerminal className="w-4 h-4" />
                <span>CLI</span>
              </button>
            </nav>

            {/* Mobile buttons */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleMode}
                className="w-10 h-10 flex items-center justify-center text-[#01FFFF] cursor-pointer"
                aria-label="Mode CLI"
              >
                <BiTerminal className="w-5 h-5" />
              </button>
              <button
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - fullscreen editorial */}
      <div
        className={`fixed inset-0 bg-[#000000] z-[999] md:hidden transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Close header */}
        <div className="h-14 flex items-center justify-between px-6 sm:px-8">
          <span className="font-heading text-[32px] text-white">MENU</span>
          <button
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fermer"
          >
            <span className="w-5 h-0.5 bg-white rotate-45 translate-y-1" />
            <span className="w-5 h-0.5 bg-white -rotate-45 -translate-y-1" />
          </button>
        </div>

        {/* Navigation links - Large editorial typography */}
        <nav className="h-[calc(100%-56px)] flex flex-col justify-center px-8">
          <NavLink
            to="/"
            end
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block py-4 border-b border-white/10 ${isActive ? "text-[#C2FE0B]" : "text-white"}`
            }
          >
            <span className="font-heading text-[48px] sm:text-[64px] tracking-tight uppercase hover:text-[#C2FE0B] transition-colors">
              ACCUEIL
            </span>
          </NavLink>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block py-4 border-b border-white/10 ${isActive ? "text-[#C2FE0B]" : "text-white"}`
              }
            >
              <span className="font-heading text-[48px] sm:text-[64px] tracking-tight uppercase hover:text-[#C2FE0B] transition-colors">
                {link.label}
              </span>
            </NavLink>
          ))}

          {/* Footer info */}
          <div className="mt-auto pb-8 pt-12">
            <p className="text-editorial-label text-[#f0f0ec]">
              DEVELOPPEUR FULL STACK
            </p>
            <p className="text-editorial-label text-[#444444] mt-2">
              TOULOUSE, FRANCE
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
