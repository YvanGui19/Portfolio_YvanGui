import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiTerminal } from "react-icons/bi";
import { useAppMode } from "../../context/AppModeContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleMode } = useAppMode();

  const navLinks = [
    { to: "/projects", label: "Projets" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-primary ">
            <span className="text-text">Yvan</span>
            <span className="text-primary">.</span>
            <span className="text-text">Gui</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-text-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={toggleMode}
              className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Passer en mode CLI"
            >
              <BiTerminal className="w-5 h-5" />
            </button>
          </nav>

          {/* Toggle CLI mobile + Bouton menu mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleMode}
              className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Passer en mode CLI"
            >
              <BiTerminal className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-text-muted hover:text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-text-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
