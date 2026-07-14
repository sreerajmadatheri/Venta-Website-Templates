import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['Home', 'Pricing', 'About', 'Projects', 'Articles', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#1E1E24]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 border border-[#00FF88] rounded-sm rotate-45 scale-75" />
            <div className="absolute inset-0 border border-[#00FF88]/40 rounded-sm rotate-12" />
          </div>
          <span className="font-mono font-semibold text-lg tracking-wider text-[#F0F0F2]">
            Venta AI Labs
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-[#9CA3AF] hover:text-[#F0F0F2] transition-colors duration-200 font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA Link Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://calendly.com/contact-ventaailabs/30min" // ✨ Your Exact Live Link
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-sm inline-block text-center cursor-pointer"
          >
            Book A Call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#9CA3AF] hover:text-[#F0F0F2] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0B]/98 backdrop-blur-md border-b border-[#1E1E24] px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-[#9CA3AF] hover:text-[#F0F0F2] transition-colors font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          {/* Mobile CTA Link Button */}
          <a
            href="https://calendly.com/contact-ventaailabs/30min" // ✨ Your Exact Live Link
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent w-full mt-2 inline-block text-center cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            Book A Call
          </a>
        </div>
      )}
    </nav>
  );
}
