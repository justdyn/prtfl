import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate navbar on mount
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          }
        );
      }

      // Stagger animation for navbar elements
      const elements = [logoRef.current, linksRef.current, infoRef.current, lineRef.current].filter(Boolean);
      
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          {
            y: -10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2,
          }
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="bg-black w-full relative">
      <div className="flex flex-row items-center justify-between px-4 sm:px-6 py-4 sm:py-[26px] max-w-[1440px] mx-auto gap-4 sm:gap-0">
        {/* Logo */}
        <Link
          ref={logoRef}
          to="/"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <div className="text-white">
            <span className="text-lg sm:text-xl md:text-[21.8px] font-normal leading-tight sm:leading-[30.6px] tracking-[-0.3px]" style={{fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontWeight: 600}}>
              DFR
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 md:gap-16 lg:gap-[270px] w-auto">
          {/* Menu Links */}
          <div ref={linksRef} className="flex flex-col gap-1 sm:gap-[3px]">
            <div className="text-white">
              <span className="text-xs sm:text-[13.2px] font-semibold leading-tight sm:leading-[17px] tracking-[0.1px]">
                Quick Links
              </span>
            </div>
            <div className="flex items-center gap-0 flex-wrap">
              <Link 
                to="/" 
                className="text-[#999999] text-xs sm:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors"
              >
                Home,
              </Link>
              <Link 
                to="/works" 
                className="text-[#999999] text-xs sm:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors"
              >
                Work,
              </Link>
              <Link 
                to="/contact" 
                className="text-[#999999] text-xs sm:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Info Section */}
          <div ref={infoRef} className="hidden sm:flex flex-col gap-1 sm:gap-[3px]">
            <div className="text-white">
              <span className="text-xs sm:text-[13.2px] font-semibold leading-tight sm:leading-[17px] tracking-[0.1px]">
                Based in Indonesia 
              </span>
            </div>
            <div className="text-[#999999]">
              <span className="text-xs sm:text-[13px] font-semibold leading-tight sm:leading-[17px] tracking-[0.1px]">
                College Student + Full-Stack Developer
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Line */}
      <div ref={lineRef} className="h-px w-full bg-[rgba(187,187,187,0.2)]" />
    </nav>
  );
};

export default Navbar;

