import React from "react";

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-pink-500/30 bg-black">

      {/* Glow Line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.8)]"></div>

      <div className="max-w-7xl mx-auto px-8 py-12 text-center">

        {/* Logo / Title */}
        <h2 
          className="text-3xl font-gothic text-pink-400 mb-2"
          style={{
            textShadow: "0 0 15px rgba(236,72,153,0.8)",
          }}
        >
          Aavegh
        </h2>

        {/* Tagline */}
        <p className="text-pink-300/70 mb-6">
          The Surge Between Worlds
        </p>

        {/* Links */}
        <div className="flex justify-center gap-8 mb-8 text-pink-300 text-sm">
          <a href="/schedule" className="hover:text-pink-400 transition">Schedule</a>
          <a href="/events" className="hover:text-pink-400 transition">Events</a>
          <a href="/team" className="hover:text-pink-400 transition">Team</a>
          <a href="/sponsors" className="hover:text-pink-400 transition">Sponsors</a>
          <a href="/contact" className="hover:text-pink-400 transition">Contact</a>
        </div>

        {/* Divider */}
        <div className="h-px bg-pink-500/20 mb-6"></div>

        {/* Copyright */}
        <p className="text-xs text-pink-300/50">
          © {new Date().getFullYear()} Aavegh. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;