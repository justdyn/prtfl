import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const experienceItemsRef = useRef<HTMLDivElement[]>([]);
  const scrollingBarRef = useRef<HTMLDivElement>(null);
  const scrollingContentRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: 'Clavmen Studio',
      year: '2022 - present',
      role: 'Art Director & Designer',
      location: 'Tokyo'
    },
    {
      company: 'Modular Eight',
      year: '2020 – 2022',
      role: 'Senior Developer',
      location: 'Osaka'
    },
    {
      company: 'Haus of Signal',
      year: '2018 – 2020',
      role: 'Creative Technologist',
      location: 'Berlin'
    },
    {
      company: 'Studio Orbit',
      year: '2016 – 2018',
      role: 'UI/UX Designer',
      location: 'Dallas'
    },
    {
      company: 'Novaform Labs',
      year: '2014 – 2016',
      role: 'Junior Designer',
      location: 'Kyoto'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate large heading with scale and fade
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            scale: 0.9,
            opacity: 0,
            rotation: -5,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate experience items with stagger
      const items = experienceItemsRef.current.filter(Boolean);
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate scrolling text bar
      if (scrollingContentRef.current) {
        const content = scrollingContentRef.current;
        const contentWidth = content.scrollWidth;
        
        // Create infinite scroll animation
        gsap.to(content, {
          x: -contentWidth / 2,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });

        // Fade in the bar on scroll
        gsap.fromTo(
          scrollingBarRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scrollingBarRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToItemsRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !experienceItemsRef.current.includes(el)) {
      experienceItemsRef.current.push(el);
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-black w-full relative py-20 lg:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6">
        {/* Top Section Label */}
        <div className="py-16 lg:py-20 mb-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-8 lg:gap-32">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">
                © Experience エクスペリエンス
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/60 uppercase">
                (WDX® — 05)
              </span>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/80 uppercase">
              Digital Craft
            </span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Heading Section */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1 max-w-4xl">
              <h2 
                ref={headingRef}
                className="text-7xl sm:text-8xl lg:text-9xl xl:text-[168px] font-semibold leading-[0.9] tracking-[-0.02em] text-white mix-blend-difference"
              >
                Experience.
              </h2>
            </div>
            <div 
              ref={imageRef}
              className="shrink-0 w-32 h-48 lg:w-36 lg:h-52 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden">
                <img
                  src="https://framerusercontent.com/images/Lb6dFhKJo6UvYVXUafcZv0n5E.jpg?width=1792&height=2560"
                  alt="Man Back Pose"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl" />
              {/* Logo overlay */}
              <div className="absolute -bottom-2 -left-10 w-32 h-6 mix-blend-difference z-10">
                <img
                  src="https://framerusercontent.com/images/4oaOsuXcxdhxXiQToWWNNSmbM.png?scale-down-to=512&width=513&height=91"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section - Scrolling Text Bar */}
        <div ref={scrollingBarRef} className="mb-16 lg:mb-24 -mx-6">
          <div className="relative w-full h-6 bg-white overflow-hidden">
            <div className="absolute inset-0 bg-white" />
            <div 
              ref={scrollingContentRef}
              className="flex items-center justify-center gap-16 lg:gap-32 h-full relative z-10"
            >
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Global
              </span>
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Creative Collabs
              </span>
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Studio
              </span>
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Creative Partnerships
              </span>
              {/* Duplicate for seamless loop */}
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Global
              </span>
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Creative Collabs
              </span>
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Studio
              </span>
              <span className="text-sm lg:text-base font-semibold leading-6 text-black whitespace-nowrap">
                Creative Partnerships
              </span>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-0">
          {experiences.map((exp, index) => {
            const isLast = index === experiences.length - 1;
            return (
              <div 
                key={index}
                ref={addToItemsRef}
                className={`border-t border-white/10 hover:border-white/30 transition-colors duration-300 group ${
                  isLast ? 'border-b' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-6 gap-4 sm:gap-0">
                  {/* Left Side */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16 lg:gap-32 flex-1">
                    <div className="w-full sm:w-48">
                      <span className="text-lg sm:text-xl lg:text-2xl font-normal text-white group-hover:text-white/90 transition-colors">
                        {exp.company}
                      </span>
                    </div>
                    <div className="w-full sm:w-48">
                      <span className="text-lg sm:text-xl lg:text-2xl font-normal text-white/80 group-hover:text-white/70 transition-colors">
                        {exp.year}
                      </span>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16 lg:gap-32 flex-1 justify-end">
                    <div className="w-full sm:w-48">
                      <span className="text-lg sm:text-xl lg:text-2xl font-normal text-white/80 group-hover:text-white/70 transition-colors">
                        {exp.role}
                      </span>
                    </div>
                    <div className="w-full sm:w-48 text-left sm:text-right">
                      <span className="text-lg sm:text-xl lg:text-2xl font-normal text-white/80 group-hover:text-white/70 transition-colors">
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
