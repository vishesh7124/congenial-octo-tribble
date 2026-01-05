import { Link, useLocation } from "react-router-dom";

export function TopNavOverlay() {
  const location = useLocation();

  const linkClass = "text-pink-400 text-xl md:text-2xl font-gothic hover:text-pink-300 transition-colors cursor-pointer pointer-events-auto";
  const activeLinkClass = "text-pink-300 text-xl md:text-2xl font-gothic transition-colors cursor-pointer pointer-events-auto";

  return (
    <div 
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
    >
      <div 
        className="bg-gray-900/60 backdrop-blur-md rounded-full border-2 border-pink-500/50 
       w-[92vw] max-w-7xl px-20 py-2 shadow-2xl flex items-center justify-between"
        style={{
          boxShadow: '0 0 30px rgba(236, 72, 153, 0.4), inset 0 0 20px rgba(236, 72, 153, 0.1)',
        }}
      >
        {/* Schedule */}
        <Link 
          to="/schedule"
          className={location.pathname === "/schedule" ? activeLinkClass : linkClass}
          style={{
            textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)',
          }}
        >
          Schedule
        </Link>

        <Link 
          to="/team"
          className={location.pathname === "/team" ? activeLinkClass : linkClass}
          style={{
            textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)',
          }}
        >
          Team
        </Link>

        {/* Events */}
        <Link 
          to="/events"
          className={location.pathname === "/events" ? activeLinkClass : linkClass}
          style={{
            textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)',
          }}
        >
          Events
        </Link>

        {/* Logo - Link to Home */}
        <Link to="/" className="relative mx-6 pointer-events-auto flex items-center">
          <img
            src="/logo.png"
            alt="Aavegh Logo"
            className="h-10 md:h-14 lg:h-16 w-auto max-w-none select-none hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Competitions */}
        <Link 
          to="/competitions"
          className={location.pathname === "/competitions" ? activeLinkClass : linkClass}
          style={{
            textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)',
          }}
        >
          Competitions
        </Link>

        {/* Sponsors */}
        <Link 
          to="/sponsors"
          className={location.pathname === "/sponsors" ? activeLinkClass : linkClass}
          style={{
            textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)',
          }}
        >
          Sponsors
        </Link>

        {/* Contact Us */}
        <Link 
          to="/contact"
          className={location.pathname === "/contact" ? activeLinkClass : linkClass}
          style={{
            textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)',
          }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

