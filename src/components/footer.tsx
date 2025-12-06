import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

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
    // Ensure ScrollTrigger is properly initialized for mobile
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

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
          // Set initial state to ensure visibility on mobile/tabs
          gsap.set(quickLinksItems, {
            opacity: 0,
            y: 30,
          });

          // Check if element is already in viewport (common on mobile)
          const rect = quickLinksRef.current.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight * 0.9;

          if (isInViewport) {
            // If already in view, animate immediately without ScrollTrigger
            gsap.to(quickLinksItems, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              delay: 0.1,
            });
          } else {
            // Use ScrollTrigger for elements not yet in view
            gsap.to(quickLinksItems, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: quickLinksRef.current,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
                refreshPriority: 1,
                // Fallback: ensure animation plays even if trigger fails
                onEnter: () => {
                  gsap.to(quickLinksItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    overwrite: true,
                  });
                },
              },
              immediateRender: false,
            });
          }
        }
      }

      // Animate Networks with staggered bottom-to-top fade-in
      if (networksRef.current) {
        const networkItems = networksRef.current.querySelectorAll('a');
        if (networkItems.length > 0) {
          // Set initial state to ensure visibility on mobile/tabs
          gsap.set(networkItems, {
            opacity: 0,
            y: 30,
          });

          // Check if element is already in viewport (common on mobile)
          const rect = networksRef.current.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight * 0.9;

          if (isInViewport) {
            // If already in view, animate immediately without ScrollTrigger
            gsap.to(networkItems, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              delay: 0.1,
            });
          } else {
            // Use ScrollTrigger for elements not yet in view
            gsap.to(networkItems, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: networksRef.current,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
                refreshPriority: 1,
                // Fallback: ensure animation plays even if trigger fails
                onEnter: () => {
                  gsap.to(networkItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    overwrite: true,
                  });
                },
              },
              immediateRender: false,
            });
          }
        }
      }

      // Animate large copyright text with smooth bottom-to-top scroll animation
      if (copyrightRef.current) {
        // Create smooth scroll-triggered animation from bottom to top
        gsap.fromTo(
          copyrightRef.current,
          {
            // Start state: positioned below viewport, hidden
            opacity: 0,
            y: 200, // Start from bottom (large positive value)
            scale: 0.8,
            filter: 'blur(15px)',
            clipPath: 'inset(0% 0% 100% 0%)', // Start hidden from bottom
          },
          {
            // End state: centered and visible
            opacity: 1,
            y: 0, // End at center
            scale: 1,
            filter: 'blur(0px)',
            clipPath: 'inset(0% 0% 0% 0%)', // Fully revealed
            ease: 'power3.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: footerRef.current, // Trigger on footer entry
              start: 'top bottom', // When footer top enters viewport bottom
              end: 'top 60%', // Animation completes when footer is 60% visible
              scrub: 1.5, // Smooth scrubbing (higher = smoother)
              markers: false, // Set to true for debugging
            },
          }
        );

        // Additional smooth parallax effect as user continues scrolling
        gsap.to(copyrightRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: 'top 80%',
            end: 'bottom top',
            scrub: 2, // Very smooth parallax
          },
        });
      }
    }, footerRef);

    // Handle resize and orientation changes for mobile/tabs
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Refresh ScrollTrigger when tab becomes visible
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Safety fallback: ensure elements are visible after a delay
    // This prevents elements from staying hidden if animations fail
    const safetyTimeout = setTimeout(() => {
      if (networksRef.current) {
        const networkItems = networksRef.current.querySelectorAll('a');
        networkItems.forEach(item => {
          const computedStyle = window.getComputedStyle(item);
          if (parseFloat(computedStyle.opacity) < 0.1) {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        });
      }
      if (quickLinksRef.current) {
        const quickLinksItems = quickLinksRef.current.querySelectorAll('a');
        quickLinksItems.forEach(item => {
          const computedStyle = window.getComputedStyle(item);
          if (parseFloat(computedStyle.opacity) < 0.1) {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        });
      }
    }, 2000); // 2 second safety net

    // Capture ref values for cleanup
    const networksElement = networksRef.current;
    const quickLinksElement = quickLinksRef.current;

    return () => {
      clearTimeout(safetyTimeout);
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Ensure ScrollTrigger is properly cleaned up
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === networksElement || 
            trigger.vars?.trigger === quickLinksElement) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-black w-full relative pb-0 mb-0 overflow-hidden">
      {/* Top Section Label */}
      <div ref={topSectionRef} className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-[180px] pb-0 max-w-[1440px] mx-auto">
        {/* Divider */}
        <div className="h-px w-full bg-[rgba(187,187,187,0.2)] mb-4 sm:mb-5 md:mb-6" />
        
        {/* Copyright and Brand Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16">
            <span className="text-[11px] xs:text-xs sm:text-[12px] md:text-[13px] lg:text-[13.2px] font-semibold leading-tight sm:leading-[17px] tracking-[0.1px] text-white whitespace-nowrap">
              © Final Section クロージング
            </span>
          </div>
        </div>
        
        {/* Navigation Section */}
        <div ref={navigationRef} className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 w-full">
          <div className="flex flex-col sm:flex-row items-start justify-start sm:justify-between gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 w-full">
            {/* Quick Links */}
            <div ref={quickLinksRef} className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 w-full sm:w-auto shrink-0">
              <h3 className="text-white mb-2 sm:mb-2.5 md:mb-3">
                <span className="text-[11px] xs:text-xs sm:text-[12px] md:text-[13px] lg:text-[13.2px] font-semibold leading-tight sm:leading-[17px] tracking-[0.1px] uppercase">
                  Quick Links
                </span>
              </h3>
              <nav className="flex items-center gap-0 flex-wrap" aria-label="Quick navigation links">
                <Link
                  to="/"
                  className="text-[#999999] text-[11px] xs:text-xs sm:text-[12.5px] md:text-[13.5px] lg:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Home,
                </Link>
                <Link
                  to="/works"
                  className="text-[#999999] text-[11px] xs:text-xs sm:text-[12.5px] md:text-[13.5px] lg:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Work,
                </Link>
                <Link
                  to="/contact"
                  className="text-[#999999] text-[11px] xs:text-xs sm:text-[12.5px] md:text-[13.5px] lg:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Social Links */}
            <div ref={networksRef} className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 w-full sm:w-auto shrink-0 mt-0">
              <h3 className="text-white mb-2 sm:mb-2.5 md:mb-3">
                <span className="text-[11px] xs:text-xs sm:text-[12px] md:text-[13px] lg:text-[13.2px] font-semibold leading-tight sm:leading-[17px] tracking-[0.1px] uppercase">
                  Networks
                </span>
              </h3>
              <nav className="flex items-center gap-0 flex-wrap" aria-label="Social network links">
                <a
                  href="https://www.instagram.com/_justdyn_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] text-[11px] xs:text-xs sm:text-[12.5px] md:text-[13.5px] lg:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Instagram,
                </a>
                <a
                  href="https://www.linkedin.com/in/dyno-fadillah-ramadhani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] text-[11px] xs:text-xs sm:text-[12.5px] md:text-[13.5px] lg:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Linkedin,
                </a>
                <a
                  href="https://github.com/justdyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] text-[11px] xs:text-xs sm:text-[12.5px] md:text-[13.5px] lg:text-[13.9px] font-semibold leading-tight sm:leading-[17px] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                >
                  Github
                </a>
              </nav>
            </div>
          </div>
          
          {/* Bottom Divider */}
          <div className="h-px w-full bg-[rgba(187,187,187,0.2)] mt-6 sm:mt-8 md:mt-10 lg:mt-12" />
        </div>

        {/* Copyright Section - Below Navigation */}
        <div className="pt-6 sm:pt-8 md:pt-12 lg:pt-16" style={{ paddingBottom: 0, marginBottom: 0 }}>
          <div className="relative" style={{ paddingBottom: 0, marginBottom: 0, overflow: 'hidden' }}>
            <div className="w-full max-w-full flex items-end justify-center" style={{ paddingBottom: 0, marginBottom: 0, lineHeight: 0 }}>
              <p
                ref={copyrightRef}
                className="
                  block
                  w-full
                  box-border
                  text-white
                  font-semibold
                  text-center
                  cursor-none
                  bg-transparent
                  antialiased
                  select-none
                  tracking-tight
                  normal-case
                  will-change-transform
                  transform-gpu
                "
                style={{
                  fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif',
                  fontWeight: 600,
                  letterSpacing: 'clamp(-16px, -0.2em, -85.88px)',
                  lineHeight: '0.85',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  fontFeatureSettings: '"cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv07", "cv08", "cv09", "cv10", "cv12", "cv13", "ss01", "ss02", "ss07"',
                  WebkitTextStrokeWidth: '0px',
                  WebkitTextStrokeColor: 'rgb(255, 255, 255)',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  fontSize: 'clamp(10rem, 20vw + 4rem, 1812.528px)',
                  margin: 0,
                  padding: 0,
                  display: 'block',
                  marginBottom: '-0.15em',
                }}
              >
                DFR
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

