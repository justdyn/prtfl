import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingLinesRef = useRef<HTMLDivElement[]>([]);
  const scrollingBarRef = useRef<HTMLDivElement>(null);
  const scrollingContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading lines with stagger effect
      // Use clipPath to reveal text from bottom without cutting it off
      const lines = headingLinesRef.current.filter(Boolean);
      if (lines.length > 0) {
        lines.forEach((line, index) => {
          const container = line.parentElement;
          if (container) {
            // Set initial state - clip from bottom (100% means fully clipped)
            gsap.set(container, {
              clipPath: 'inset(0% 0% 100% 0%)',
            });
            gsap.set(line, {
              opacity: 0,
            });

            // Create timeline for smooth reveal
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              },
            });

            // Reveal text by animating clip-path from 100% to 0% (bottom to top)
            tl.to(
              container,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power3.out',
              },
              index * 0.15
            );

            // Fade in text simultaneously
            tl.to(
              line,
              {
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
              },
              index * 0.15
            );
          }
        });
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
        // - Responsive gaps (gap-16 sm:gap-32 md:gap-[300px])
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

  const addToLinesRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !headingLinesRef.current.includes(el)) {
      headingLinesRef.current.push(el);
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-black w-full relative pt-12 sm:pt-16 md:pt-20 lg:pt-[90px] pb-0 overflow-hidden">
      {/* Top Section - Heading and Reel */}
      <div className="flex items-start justify-between px-4 sm:px-6 py-4 sm:py-6 max-w-[1440px] mx-auto">
        {/* Left Side - Heading */}
        <div className="flex-1 max-w-full sm:max-w-[540px] flex flex-col gap-0 pt-2 sm:pt-4">
          <div className="h-auto sm:h-[50.59px] overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="relative sm:absolute sm:top-1/2 sm:-translate-y-1/2 left-0 right-0 mix-blend-difference"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44.8px] font-medium leading-tight sm:leading-[50.6px] tracking-tight sm:tracking-[-0.8px] text-white whitespace-pre-wrap">
                Digital Architectures
              </h1>
            </div>
          </div>
          <div className="h-auto sm:h-[50.59px] overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="relative sm:absolute sm:top-1/2 sm:-translate-y-1/2 left-0 right-0 mix-blend-difference"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44.6px] font-medium leading-tight sm:leading-[50.6px] tracking-tight sm:tracking-[-0.8px] text-white whitespace-pre-wrap">
                and Solutions that
              </h1>
            </div>
          </div>
          <div className="h-auto sm:h-[50.59px] flex items-center justify-center overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="flex-1 mix-blend-difference"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46.5px] font-medium leading-tight sm:leading-[50.6px] tracking-tight sm:tracking-[-0.8px] text-white whitespace-pre-wrap">
                Transform Ideas into
              </h1>
            </div>
          </div>
          <div className="h-auto sm:h-[50.59px] overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="relative sm:absolute sm:top-1/2 sm:-translate-y-1/2 left-0 right-0 mix-blend-difference"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium leading-tight sm:leading-[50.6px] tracking-tight sm:tracking-[-0.8px] text-white whitespace-pre-wrap">
                Extraordinary 体験.
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Scrolling Text Bar */}
      <div ref={scrollingBarRef} className="relative sm:absolute left-0 right-0 top-auto sm:top-[300px] md:top-[350px] lg:top-[396px] mt-8 sm:mt-0">
        <div className="relative w-full h-5 sm:h-6 md:h-[24px] bg-white overflow-hidden">
          <div className="absolute inset-0 bg-white" />
          <div 
            ref={scrollingContentRef}
            className="flex items-center justify-center gap-16 sm:gap-32 md:gap-[300px] h-full relative z-10"
          >
            <span className="text-xs sm:text-sm md:text-[14.9px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Frontend Development
            </span>
            <span className="text-xs sm:text-sm md:text-[15px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Backend Engineering
            </span>
            <span className="text-xs sm:text-sm md:text-[15px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Full-Stack Solutions
            </span>
            <span className="text-xs sm:text-sm md:text-[15px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Cloud Architecture
            </span>
            {/* Duplicate for seamless loop */}
            <span className="text-xs sm:text-sm md:text-[14.9px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Frontend Development
            </span>
            <span className="text-xs sm:text-sm md:text-[15px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Backend Engineering
            </span>
            <span className="text-xs sm:text-sm md:text-[15px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Full-Stack Solutions
            </span>
            <span className="text-xs sm:text-sm md:text-[15px] font-semibold leading-5 sm:leading-6 md:leading-[24px] text-black whitespace-nowrap">
              Cloud Architecture
            </span>
          </div>
        </div>
      </div>
      <p
        className="text-8xl sm:text-9xl md:text-[180px] lg:text-[280px] xl:text-[397.193px] font-semibold text-white w-full px-4 sm:px-6 mt-8 sm:mt-12 md:mt-16 lg:mt-[30px]"
        style={{
          boxSizing: "border-box",
          WebkitFontSmoothing: "antialiased",
          fontFamily:
            '"Inter Display", "Inter Display Placeholder", sans-serif',
          fontStyle: "normal",
          fontWeight: "600",
          color: "rgb(255, 255, 255)",
          letterSpacing: "clamp(-2px, -0.05em, -21.47px)",
          textTransform: "none",
          lineHeight: "0.9",
          textAlign: "start",
          WebkitTextStrokeWidth: "0px",
          WebkitTextStrokeColor: "rgb(255, 255, 255)",
          fontFeatureSettings:
            '"cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv07", "cv08", "cv09", "cv10", "cv12", "cv13", "ss01", "ss02", "ss07"',
          backgroundColor: "rgb(0, 0, 0)",
          cursor: "none",
          borderRadius: "0px",
          padding: "0px",
          margin: "0px",
          textDecoration: "none",
        }}
      >
        Develop
      </p>
    </section>
  );
};

export default Hero;

