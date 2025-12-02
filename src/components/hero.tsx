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

  const addToLinesRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !headingLinesRef.current.includes(el)) {
      headingLinesRef.current.push(el);
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-black w-full relative pt-[90px] pb-0">
      {/* Top Section - Heading and Reel */}
      <div className="flex items-start justify-between px-6 py-6 max-w-[1440px] mx-auto">
        {/* Left Side - Heading */}
        <div className="flex-1 max-w-[540px] flex flex-col gap-0 pt-4">
          <div className="h-[50.59px] overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mix-blend-difference"
            >
              <h1 className="text-[44.8px] font-medium leading-[50.6px] tracking-[-0.8px] text-white whitespace-pre-wrap">
                Pattern Dimensions
              </h1>
            </div>
          </div>
          <div className="h-[50.59px] overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mix-blend-difference"
            >
              <h1 className="text-[44.6px] font-medium leading-[50.6px] tracking-[-0.8px] text-white whitespace-pre-wrap">
                and Moments that
              </h1>
            </div>
          </div>
          <div className="h-[50.59px] flex items-center justify-center overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="flex-1 mix-blend-difference"
            >
              <h1 className="text-[46.5px] font-medium leading-[50.6px] tracking-[-0.8px] text-white whitespace-pre-wrap">
                Connect and Leave a
              </h1>
            </div>
          </div>
          <div className="h-[50.59px] overflow-hidden relative w-full">
            <div 
              ref={addToLinesRef}
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mix-blend-difference"
            >
              <h1 className="text-[48px] font-medium leading-[50.6px] tracking-[-0.8px] text-white whitespace-pre-wrap">
                Bold イメージ.
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Scrolling Text Bar */}
      <div ref={scrollingBarRef} className="absolute left-0 right-0 top-[396px]">
        <div className="relative w-full h-[24px] bg-white overflow-hidden">
          <div className="absolute inset-0 bg-white" />
          <div 
            ref={scrollingContentRef}
            className="flex items-center justify-center gap-[300px] h-full relative z-10"
          >
            <span className="text-[14.9px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Art Direction
            </span>
            <span className="text-[15px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Branding
            </span>
            <span className="text-[15px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Strategy
            </span>
            <span className="text-[15px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Web Design
            </span>
            {/* Duplicate for seamless loop */}
            <span className="text-[14.9px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Art Direction
            </span>
            <span className="text-[15px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Branding
            </span>
            <span className="text-[15px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Strategy
            </span>
            <span className="text-[15px] font-semibold leading-[24px] text-black whitespace-nowrap">
              Web Design
            </span>
          </div>
        </div>
      </div>
      <p
        style={{
          boxSizing: "border-box",
          WebkitFontSmoothing: "antialiased",
          fontFamily:
            '"Inter Display", "Inter Display Placeholder", sans-serif',
          fontStyle: "normal",
          fontWeight: "600",
          color: "rgb(255, 255, 255)",
          fontSize: "397.193px",
          letterSpacing: "-21.47px",
          textTransform: "none",
          textDecorationSkipInk: "auto",
          textUnderlineOffset: "auto",
          lineHeight: "357.474px",
          textAlign: "start",
          WebkitTextStrokeWidth: "0px",
          WebkitTextStrokeColor: "rgb(255, 255, 255)",
          fontFeatureSettings:
            '"cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv07", "cv08", "cv09", "cv10", "cv12", "cv13", "ss01", "ss02", "ss07"',
          textWrapMode: "nowrap",
          textWrapStyle: "auto",
          backgroundColor: "rgb(0, 0, 0)",
          cornerTopLeftShape: "round",
          cornerTopRightShape: "round",
          cornerBottomRightShape: "round",
          cornerBottomLeftShape: "round",
          whiteSpaceCollapse: "preserve",
          cursor: "none",
          borderRadius: "0px",
          padding: "0px",
          margin: "30px 0px 0px 0px",
          textDecoration: "none",
          width: "100%",
        }}
      >
        Akihiko™
      </p>
    </section>
  );
};

export default Hero;

