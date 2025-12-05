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
      company: 'PT. Wulandari Bangun Laksa (WBL)',
      year: 'January 2022 - March 2022',
      role: 'IT Support Intern',
      location: 'Indonesia'
    },
    {
      company: 'INSPACE Committee',
      year: '2024 – 2025',
      role: 'Fullstack Web Developer',
      location: 'Indonesia'
    },
    {
      company: 'Institut Teknologi Kalimantan (ITK)',
      year: 'February 2025 – January 2025',
      role: 'Asisstant Lecturer',
      location: 'Indonesia'
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

      // Animate scrolling text bar with seamless infinite loop
      if (scrollingContentRef.current) {
        const content = scrollingContentRef.current;
        
        // Wait for layout to calculate accurate widths
        const calculateAndAnimate = () => {
          // Force a reflow to ensure accurate measurements
          void content.offsetWidth;
          
          // Get all child elements
          const children = Array.from(content.children) as HTMLElement[];
          
          // We have 4 items in the first set: "Global", "Creative Collabs", "Studio", "Creative Partnerships"
          // And 4 duplicates, so we need at least 8 children
          if (children.length >= 8) {
            // Calculate the width of one complete set (first 4 items)
            // Measure from the start of first item to the start of the 5th item (duplicate)
            const firstItem = children[0];
            const duplicateStartItem = children[4];
            
            if (firstItem && duplicateStartItem) {
              // Get the exact distance between the start of first set and duplicate set
              // This includes the width of all 4 items plus the gaps between them
              const firstSetWidth = duplicateStartItem.offsetLeft - firstItem.offsetLeft;
              
              // Verify the calculation is valid
              if (firstSetWidth > 0) {
                // Set initial position to 0 with hardware acceleration for smooth performance
                gsap.set(content, { x: 0, force3D: true });
                
                // Create seamless infinite scroll animation
                // How it works:
                // 1. We animate from x: 0 to x: -firstSetWidth
                // 2. At x: -firstSetWidth, the duplicate set is visually at position 0
                //    (exactly where the original set started)
                // 3. GSAP's repeat: -1 automatically resets to x: 0
                // 4. Since the duplicate is now at position 0, the reset is visually seamless
                gsap.to(content, {
                  x: -firstSetWidth,
                  duration: 20,
                  ease: 'none', // Linear easing for constant speed
                  repeat: -1, // Infinite repeat
                  // Disable repeat refresh to prevent recalculation on each loop
                  // This ensures the animation values stay consistent for seamless looping
                  repeatRefresh: false,
                  // Use force3D for GPU acceleration (better performance, smoother animation)
                  force3D: true,
                });
              }
            }
          }
        };
        
        // Use double requestAnimationFrame to ensure DOM is fully laid out and measured
        // This is crucial for accurate width calculations, especially with:
        // - Responsive gaps (gap-8 sm:gap-12 md:gap-16 lg:gap-32)
        // - Dynamic font sizes
        // - Flexbox layout calculations
        requestAnimationFrame(() => {
          requestAnimationFrame(calculateAndAnimate);
        });
      }

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
      className="bg-black w-full relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Top Section Label */}
        <div className="py-12 sm:py-16 lg:py-20 mb-6 md:mb-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-32">
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
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
            <div className="flex-1 max-w-4xl w-full">
              <h2 
                ref={headingRef}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[168px] font-semibold leading-[0.9] tracking-[-0.02em] text-white mix-blend-difference"
              >
                Experience.
              </h2>
            </div>
          </div>
        </div>

        {/* Tags Section - Scrolling Text Bar */}
        <div ref={scrollingBarRef} className="mb-12 md:mb-16 lg:mb-24 -mx-6">
          <div className="relative w-full h-5 sm:h-6 bg-white overflow-hidden">
            <div className="absolute inset-0 bg-white" />
            <div 
              ref={scrollingContentRef}
              className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-32 h-full relative z-10"
            >
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                Full-Stack Solutions
              </span>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                Backend Engineering
              </span>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                Frontend Development
              </span>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                System Architecture
              </span>
              {/* Duplicate for seamless loop */}
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                Full-Stack Solutions
              </span>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                Backend Engineering
              </span>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                Frontend Development
              </span>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-5 sm:leading-6 text-black whitespace-nowrap">
                System Architecture
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
                <div className="flex flex-row items-start justify-between py-4 sm:py-5 md:py-6">
                  {/* Left Side - Company and Role */}
                  <div className="flex flex-col items-start flex-1 min-w-0 pr-6 sm:pr-8 md:pr-12">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-white group-hover:text-white/90 transition-colors leading-none">
                      {exp.company}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal text-white/80 group-hover:text-white/70 transition-colors leading-none mt-1 sm:mt-1.5 md:mt-2 pl-3 sm:pl-4 md:pl-6">
                      {exp.role}
                    </span>
                  </div>

                  {/* Right Side - Year and Location */}
                  <div className="flex flex-col items-end shrink-0 text-right min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px]">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-white/80 group-hover:text-white/70 transition-colors leading-none">
                      {exp.year}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal text-white/80 group-hover:text-white/70 transition-colors leading-none mt-1 sm:mt-1.5 md:mt-2 pr-3 sm:pr-4 md:pr-6">
                      {exp.location}
                    </span>
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
