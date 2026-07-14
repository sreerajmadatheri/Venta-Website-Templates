const quickLinks = ['Home', 'Pricing', 'About', 'Projects', 'Articles'];
const company = ['Careers', 'Blog', 'Press', 'Status', 'Security'];
const policies = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'];

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E24] bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 relative">
                <div className="absolute inset-0 border border-[#00FF88] rounded-sm rotate-45 scale-75" />
                <div className="absolute inset-0 border border-[#00FF88]/40 rounded-sm rotate-12" />
              </div>
              <span className="font-mono font-semibold text-lg tracking-wider text-[#F0F0F2]">Venta AI Labs</span>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs mb-6">
              Neural infrastructure for the enterprises building tomorrow. Deploy smarter, scale faster.
            </p>
            <div className="font-mono text-[11px] text-[#6B7280] space-y-1">
              <p>// 400 Neural Boulevard, Suite 18</p>
              <p>// San Francisco, CA 94107</p>
              <p>// contact@ventaailabs.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-[#9CA3AF] uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-[#6B7280] text-sm hover:text-[#F0F0F2] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-[#9CA3AF] uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#6B7280] text-sm hover:text-[#F0F0F2] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-[#9CA3AF] uppercase mb-5">Policies</h4>
            <ul className="space-y-3">
              {policies.map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#6B7280] text-sm hover:text-[#F0F0F2] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E1E24] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[#6B7280]">
            ©2026 Venta AI Labs AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="font-mono text-[11px] text-[#6B7280]">All systems operational</span>
          </div>
          <div className="flex items-center gap-6">
            {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
              <a key={s} href="#" className="font-mono text-[11px] text-[#6B7280] hover:text-[#00FF88] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
