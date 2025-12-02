import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const logosRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image with parallax effect
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            scale: 1.1,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );
      }

      // Animate heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate button
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate logos grid with stagger
      const logos = logosRef.current.filter(Boolean);
      if (logos.length > 0) {
        gsap.fromTo(
          logos,
          {
            y: 40,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: {
              amount: 0.6,
              grid: 'auto',
              from: 'start',
            },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate tags section
      const tags = sectionRef.current?.querySelectorAll('.tag-item');
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
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToLogosRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !logosRef.current.includes(el)) {
      logosRef.current.push(el);
    }
  }, []);

  const clientLogos = [
    { name: 'Client 1', logo: 'https://framerusercontent.com/images/liDp6RqOmZpoiyriU2da9i9ZRNM.png' },
    { name: 'Client 2', logo: 'https://framerusercontent.com/images/6IX9srHugK666NPKQJythMbMME.png?width=282&height=58' },
    { name: 'Client 3', logo: 'https://framerusercontent.com/images/3cl6kEyD2XtSr3RQpeBuJPLW0DA.png?width=225&height=63' },
    { name: 'Client 4', logo: 'https://framerusercontent.com/images/np97j2F8KUZ2HLiullJ6eZCAlsQ.png?width=303&height=67' },
    { name: 'Client 5', logo: 'https://framerusercontent.com/images/f0y1IAXP7xxPZoecHyx9XHFdiHA.png?width=258&height=66' },
    { name: 'Client 6', logo: 'https://framerusercontent.com/images/liDp6RqOmZpoiyriU2da9i9ZRNM.png' },
    { name: 'Client 7', logo: 'https://framerusercontent.com/images/6IX9srHugK666NPKQJythMbMME.png?width=282&height=58' },
    { name: 'Client 8', logo: 'https://framerusercontent.com/images/3cl6kEyD2XtSr3RQpeBuJPLW0DA.png?width=225&height=63' },
    { name: 'Client 9', logo: 'https://framerusercontent.com/images/np97j2F8KUZ2HLiullJ6eZCAlsQ.png?width=303&height=67' },
    { name: 'Client 10', logo: 'https://framerusercontent.com/images/f0y1IAXP7xxPZoecHyx9XHFdiHA.png?width=258&height=66' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="bg-black w-full relative py-20 lg:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Top Section Label */}
        <div className="py-16 lg:py-20 mb-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-8 lg:gap-32">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">
                © Curated Interfaces ビジュアル
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/60 uppercase">
                (WDX® — 02)
              </span>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/80 uppercase">
              Digital Designer
            </span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Tags Section */}
        <div className="mb-16 lg:mb-24">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <span className="tag-item text-sm lg:text-base font-semibold text-white/90 hover:text-white transition-colors cursor-default">
              Visual
            </span>
            <span className="tag-item text-sm lg:text-base font-semibold text-white/90 hover:text-white transition-colors cursor-default">
              Freelancer
            </span>
            <span className="tag-item text-sm lg:text-base font-semibold text-white/90 hover:text-white transition-colors cursor-default">
              Digital Nomad
            </span>
            <span className="tag-item text-sm lg:text-base font-semibold text-white/90 hover:text-white transition-colors cursor-default">
              Creative Developer
            </span>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left Side - Image */}
          <div 
            ref={imageRef}
            className="w-full lg:w-[473px] h-[500px] lg:h-[797px] relative overflow-hidden rounded-2xl lg:rounded-3xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
              <img
                src="/src/assets/profile2.jpg"
                alt="Profile"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 w-full lg:max-w-[929px] pt-8 lg:pt-12">
            {/* Heading */}
            <div className="mb-12 lg:mb-20">
              <h2 
                ref={headingRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-white mb-8 lg:mb-10 mix-blend-difference"
              >
                13+ years™ of digital form, sharp interactions, and relentless creative discipline and effort.
              </h2>
              <a
                ref={buttonRef}
                href="./contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-black transition-all duration-300 rounded-full group relative overflow-hidden"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </div>

            {/* Client Logos Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
              {clientLogos.map((client, index) => (
                <div
                  key={index}
                  ref={addToLogosRef}
                  className="h-[120px] sm:h-[140px] lg:h-[151px] border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center p-4 group relative overflow-hidden"
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Logo container */}
                  <div className="relative z-10 w-14 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>

                  {/* Corner accent */}
                  {index === 0 && (
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20" />
                  )}
                  {index === 4 && (
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20" />
                  )}
                  {index === 5 && (
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20" />
                  )}
                  {index === 9 && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
