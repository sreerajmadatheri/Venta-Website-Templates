import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Capabilities', href: '#product-showcase' },
  { name: 'Articles', href: '#articles' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#1E1E24]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 border border-[#00FF88] rounded-sm rotate-45 scale-75" />
            <div className="absolute inset-0 border border-[#00FF88]/40 rounded-sm rotate-12" />
          </div>
          <span className="font-mono text-xs tracking-widest font-bold text-[#F0F0F2]">VENTA AI LABS</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-xs font-mono tracking-wider text-[#9CA3AF] hover:text-[#00FF88] transition-colors"
            >
              {item.name.toUpperCase()}
            </a>
          ))}
          <a
            href="https://calendly.com/contact-ventaailabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-xs px-4 py-2 font-mono uppercase tracking-wider"
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
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-sm text-[#9CA3AF] hover:text-[#00FF88] transition-colors font-medium py-1"
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://calendly.com/contact-ventaailabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-sm inline-block text-center py-2.5 mt-2"
          >
            Book A Call
          </a>
        </div>
      )}
    </nav>
  );
}