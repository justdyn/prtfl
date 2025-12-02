import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryContentRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);
  const networksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate scrolling gallery
      if (galleryContentRef.current) {
        const content = galleryContentRef.current;
        const contentWidth = content.scrollWidth;
        
        // Create infinite horizontal scroll
        gsap.to(content, {
          x: -contentWidth / 2,
          duration: 30,
          ease: 'none',
          repeat: -1,
        });

        // Fade in gallery on scroll
        gsap.fromTo(
          galleryRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate tags
      const tags = footerRef.current?.querySelectorAll('.footer-tag');
      if (tags && tags.length > 0) {
        gsap.fromTo(
          tags,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate content section
      const contentSection = footerRef.current?.querySelector('.footer-content');
      if (contentSection) {
        gsap.fromTo(
          contentSection,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentSection,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate top section label with smooth bottom-to-top fade-in
      if (topSectionRef.current) {
        gsap.fromTo(
          topSectionRef.current,
          {
            opacity: 0,
            y: 60,
            clipPath: 'inset(0% 0% 100% 0%)', // Start hidden from bottom
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)', // Reveal fully
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: topSectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate navigation section with smooth bottom-to-top fade-in
      if (navigationRef.current) {
        gsap.fromTo(
          navigationRef.current,
          {
            opacity: 0,
            y: 50,
            clipPath: 'inset(0% 0% 100% 0%)', // Start hidden from bottom
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)', // Reveal fully
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: navigationRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate Quick Links with staggered bottom-to-top fade-in
      if (quickLinksRef.current) {
        const quickLinksItems = quickLinksRef.current.querySelectorAll('a');
        if (quickLinksItems.length > 0) {
          gsap.fromTo(
            quickLinksItems,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: quickLinksRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // Animate Networks with staggered bottom-to-top fade-in
      if (networksRef.current) {
        const networkItems = networksRef.current.querySelectorAll('a');
        if (networkItems.length > 0) {
          gsap.fromTo(
            networkItems,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: networksRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // Animate large copyright text with smooth scroll-linked fade and parallax
      if (copyrightRef.current) {
        // Create a timeline for smooth scroll-linked animations
        const copyrightTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5, // Smooth scrubbing (higher value = smoother)
          },
        });

        // Fade in as element enters viewport with bottom-to-top reveal
        copyrightTimeline.fromTo(
          copyrightRef.current,
          {
            opacity: 0,
            scale: 0.85,
            y: 100,
            clipPath: 'inset(0% 0% 100% 0%)', // Start hidden from bottom
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)', // Reveal fully
            ease: 'power3.out',
            duration: 0.4, // Relative duration in timeline
          }
        );

        // Fade out as element exits viewport
        copyrightTimeline.to(
          copyrightRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: -50,
            ease: 'power2.in',
            duration: 0.2,
          },
          '<0.5' // Start slightly before previous animation ends for smooth transition
        );

        // Additional smooth parallax movement
        gsap.to(copyrightRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2, // Very smooth parallax
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black w-full relative" style={{ marginBottom: 0, paddingBottom: 0, display: 'block' }}>
      {/* Top Section Label */}
      <div ref={topSectionRef} className="px-6 py-[180px] max-w-[1440px] mx-auto">
        <div className="h-px w-full bg-[rgba(187,187,187,0.2)] mb-[13px]" />
        <div className="flex items-center justify-between mb-[23px]">
          <div className="flex items-center gap-[517px]">
            <span className="text-[13.2px] font-semibold leading-[17px] tracking-[0.1px] text-white">
              © Final Section クロージング
            </span>
            <span className="text-[13.2px] font-semibold leading-[17px] tracking-[0.1px] text-white">
              (WDX® — 12)
            </span>
          </div>
          <span className="text-[13.2px] font-semibold leading-[17px] tracking-[0.1px] text-white">
            Studio Wrap
          </span>
        </div>
        <div className="h-px w-full bg-[rgba(187,187,187,0.2)]" />
        
        {/* Navigation Section */}
        <div ref={navigationRef} className="pt-6">
          <div className="h-px w-full bg-[rgba(187,187,187,0.2)] mb-6" />
          <div className="flex items-start justify-between">
            {/* Quick Links */}
            <div ref={quickLinksRef} className="flex flex-col gap-[3px]">
              <div className="text-white mb-[3px]">
                <span className="text-[13.2px] font-semibold leading-[17px] tracking-[0.1px]">
                  Quick Links
                </span>
              </div>
              <div className="flex items-center gap-0">
                <a
                  href="#home"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Home,
                </a>
                <a
                  href="#gallery"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Gallery,
                </a>
                <a
                  href="#work"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Work,
                </a>
                <a
                  href="#contact"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div ref={networksRef} className="flex flex-col gap-[3px]">
              <div className="text-white mb-[3px]">
                <span className="text-[13.2px] font-semibold leading-[17px] tracking-[0.1px]">
                  Networks
                </span>
              </div>
              <div className="flex items-center gap-0">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Instagram,
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Dribbble,
                </a>
                <a
                  href="https://framer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Framer,
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] text-[13.9px] font-semibold leading-[17px] hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section - Show full */}
      <div className="px-6 pt-0 pb-0 max-w-[1440px] mx-auto mb-0" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="relative overflow-hidden mb-0" style={{ marginBottom: 0, paddingBottom: 0, height: "407.819px", lineHeight: 0 }}>
          <p
            ref={copyrightRef}
            style={{
              boxSizing: "border-box",
              WebkitFontSmoothing: "antialiased",
              fontFamily:
                '"Inter Display", "Inter Display Placeholder", sans-serif',
              fontStyle: "normal",
              fontWeight: "600",
              color: "rgb(255, 255, 255)",
              fontSize: "453.132px",
              letterSpacing: "-21.47px",
              textTransform: "none",
              textDecorationSkipInk: "auto",
              textUnderlineOffset: "auto",
              lineHeight: "407.819px",
              textAlign: "start",
              WebkitTextStrokeWidth: "0px",
              WebkitTextStrokeColor: "rgb(255, 255, 255)",
              fontFeatureSettings:
                '"cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv07", "cv08", "cv09", "cv10", "cv12", "cv13", "ss01", "ss02", "ss07"',
              textWrapMode: "nowrap",
              textWrapStyle: "auto",
              backgroundColor: "rgb(0, 0, 0)",
              whiteSpaceCollapse: "preserve",
              cursor: "none",
              borderRadius: "0px",
              padding: "0px",
              margin: "0px",
              textDecoration: "none",
              width: "100%",
              display: "block",
              marginBottom: 0,
              paddingBottom: 0,
              verticalAlign: "bottom",
              height: "407.819px",
            }}
          >
            ©2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

