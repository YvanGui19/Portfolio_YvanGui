import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { HiHome, HiFolder, HiLightningBolt, HiBriefcase, HiMail } from "react-icons/hi";
import { BiTerminal } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { useMessages } from "../../context/MessagesContext";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: HiHome, code: "DSH" },
  { to: "/admin/projects", label: "Projets", icon: HiFolder, code: "PRJ" },
  { to: "/admin/skills", label: "Compétences", icon: HiLightningBolt, code: "SKL" },
  { to: "/admin/experiences", label: "Expériences", icon: HiBriefcase, code: "EXP" },
  { to: "/admin/messages", label: "Messages", icon: HiMail, code: "MSG", showBadge: true },
];

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { unreadCount } = useMessages();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Changer le titre pour la partie admin
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Yvan.Gui | Admin";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-dark-navy">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-navy/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-dark-navy border-r border-cyan/20 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-cyan/20">
          <Link to="/" className="block group">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 border-2 border-cyan flex items-center justify-center text-cyan font-display text-[0.7rem] font-black"
                style={{
                  clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
                }}
              >
                YG
              </div>
              <span className="font-display text-[0.9rem] font-extrabold tracking-wider">
                <span className="text-white">Yvan</span>
                <span className="text-cyan">.</span>
                <span className="text-white">Gui</span>
              </span>
            </div>
          </Link>
          <div className="font-mono text-[0.65rem] text-cyan/60 tracking-[0.2em] uppercase">
            // ADMIN_PORTAL
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <div className="font-mono text-[0.6rem] text-grey/50 tracking-[0.15em] uppercase mb-3 px-3">
            Navigation
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 font-mono text-[0.8rem] transition-all duration-200 border-l-2 ${
                  isActive
                    ? "border-cyan bg-cyan/5 text-cyan"
                    : "border-transparent text-grey hover:border-cyan/50 hover:bg-cyan/5 hover:text-off-white"
                }`
              }
            >
              <span className="text-[0.65rem] text-grey/40 group-hover:text-cyan/60 transition-colors">
                [{item.code}]
              </span>
              <item.icon className="w-4 h-4" />
              <span className="flex-1 tracking-wide">{item.label}</span>
              {item.showBadge && unreadCount > 0 && (
                <span className="bg-red text-white text-[0.65rem] font-bold px-1.5 py-0.5 min-w-[18px] text-center">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 border border-cyan/30 bg-cyan/10 flex items-center justify-center text-cyan font-mono text-[0.75rem] font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="font-mono text-[0.75rem] text-off-white">
                {user?.name || "Admin"}
              </p>
              <p className="font-mono text-[0.6rem] text-grey/60 truncate max-w-[140px]">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 font-mono text-[0.7rem] text-red border border-red/30 bg-red/10 hover:bg-red/20 hover:border-red/50 transition-all cursor-pointer tracking-wider uppercase"
          >
            ⏻ Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header mobile */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-dark-navy/95 backdrop-blur-xl border-b border-cyan/20 flex items-center justify-between px-4 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-grey hover:text-cyan transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <BiTerminal className="w-4 h-4 text-cyan" />
            <span className="font-mono text-[0.8rem] text-cyan tracking-widest uppercase">Admin</span>
          </div>
          <div className="w-9" />
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 pt-18 lg:pt-6 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
