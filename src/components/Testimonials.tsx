import { useState, useEffect } from 'react';
import { Star, ChevronUp, ChevronDown } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const testimonials = [
  {
    company: 'Triad Engineers',
    title: 'Finding the right customers',
    rating: 5,
    comment: "Venta helped us in finding right customers for us in need of our services. Their digital marketing experiance is very useful.",
    author: 'Sanandh',
    role: 'Managing Director',
  },
  {
    company: 'MindPro Solutions',
    title: 'Cost-effective IT infrastructure',
    rating: 5,
    comment: "Their services in the IT and consulting helped us reduce the cost of the IT infrastructure and automation processes.",
    author: 'Nitin Sharma',
    role: 'Senior Architect - IT',
  },
  {
    company: 'Lighten Electronics',
    title: 'Minimal cost growth strategy',
    rating: 5,
    comment: "They help us achieve a way forward in digital marketing with minimul cost which helped our business grow",
    author: 'Sreejith Pavandoor',
    role: 'Senior Condultant - Marketing',
  },
  {
    company: 'MMS Contracting',
    title: 'Daily tasks made effortless',
    rating: 5,
    comment: "Venta AI helped us achieve our daily task easy with their automated agents. They had a brilliant team of engineers and tech stack which helped us to achieve the same.",
    author: 'Mr. Vikraman',
    role: 'Director',
  },
  {
    company: 'Apex Analytics',
    title: 'Flawless financial ledger sync',
    rating: 5,
    comment: "The automated reconciliation engine has completely transformed our month-end operations. Multi-currency discrepancies that used to take days are now flagging and resolving in real time.",
    author: 'Sarah Jenkins',
    role: 'Head of Finance',
  },
  {
    company: 'Vanguard Media Labs',
    title: 'Massive scale for content pipeline',
    rating: 5,
    comment: "Deploying their marketing workflow agent allowed us to ingest trends and localize ad variants at a volume we couldn't dream of manually. Our campaign throughput grew 3x overnight.",
    author: 'David Vance',
    role: 'Chief Marketing Officer',
  },
  {
    company: 'Stratis Corp',
    title: 'True technology-driven value',
    rating: 5,
    comment: "They excel at helping organizations use technology to solve business problems, achieve goals, and create new value. Our operating structure is leaner and significantly more autonomous.",
    author: 'Amara Okafor',
    role: 'Principal Consultant',
  },
];

export default function Testimonials() {
  const { ref: sectionRef, visible: sectionVisible } = useReveal<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate vertically every 4.5 seconds unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
      <section className="relative py-28 px-6 border-t border-[#1E1E24]">
        <div className="max-w-7xl mx-auto">
          <div ref={sectionRef} className={`reveal ${sectionVisible ? 'visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`}>

            {/* Section Heading & Controls */}
            <div className="lg:col-span-5">
              <p className="section-label mb-2">// FEEDBACK</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
                Trusted by the pioneers
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6 max-w-sm">
                Discover how our automation workflows and IT consulting empower leading businesses across industries.
              </p>

              {/* Vertical Controls */}
              <div className="flex items-center gap-3">
                <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] text-[#9CA3AF] hover:text-[#00FF88] hover:border-[#00FF88]/40 transition-all cursor-pointer"
                    aria-label="Previous Testimonial"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                    onClick={handleNext}
                    className="p-2.5 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] text-[#9CA3AF] hover:text-[#00FF88] hover:border-[#00FF88]/40 transition-all cursor-pointer"
                    aria-label="Next Testimonial"
                >
                  <ChevronDown size={18} />
                </button>
                <span className="font-mono text-xs text-[#6B7280] ml-2">
                0{currentIndex + 1} / 0{testimonials.length}
              </span>
              </div>
            </div>

            {/* Vertical Slider Card Container */}
            <div
                className="lg:col-span-7 relative h-[280px] overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
              <div
                  className="transition-transform duration-700 ease-in-out h-full flex flex-col"
                  style={{ transform: `translateY(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((t) => (
                    <div
                        key={t.company}
                        className="h-full shrink-0 card-glow p-8 flex flex-col justify-between rounded-2xl bg-[#0D0D10] border border-[#1E1E24]"
                    >
                      <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#00FF88]/70 tracking-wider">
                      {t.company.toUpperCase()}
                    </span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                              <Star key={`${t.company}-star-${j}`} size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#F0F0F2] font-semibold text-base mb-2 leading-snug">{t.title}</h4>
                        <p className="text-[#8E939E] text-xs md:text-sm leading-relaxed italic">
                          "{t.comment}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#1E1E24] flex items-center justify-between">
                        <div>
                          <p className="text-[#F0F0F2] font-semibold text-xs">{t.author}</p>
                          <p className="text-[#6B7280] text-[10px] font-mono mt-0.5">{t.role}</p>
                        </div>
                        <span className="font-mono text-[10px] text-[#00FF88]/40">// VERIFIED PARTNER</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}