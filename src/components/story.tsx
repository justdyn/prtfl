import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Story: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const textSpansRef = useRef<HTMLSpanElement[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const buttonFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
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
              trigger: headerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate images with subtle parallax effect, constrained to stay within section
      // Responsive parallax amounts - reduced on smaller screens for better performance
      const getParallaxAmount = () => {
        const width = window.innerWidth;
        if (width < 640) {
          return { amount1: -10, amount2: -12, amount3: -10 };
        } else if (width < 1024) {
          return { amount1: -15, amount2: -20, amount3: -15 };
        }
        return { amount1: -30, amount2: -40, amount3: -35 };
      };

      const parallax = getParallaxAmount();

      if (image1Ref.current && sectionRef.current) {
        gsap.to(image1Ref.current, {
          y: parallax.amount1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      if (image2Ref.current && sectionRef.current) {
        gsap.to(image2Ref.current, {
          y: parallax.amount2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      if (image3Ref.current && sectionRef.current) {
        gsap.to(image3Ref.current, {
          y: parallax.amount3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Animate large text reveal with scroll-based progressive fill per letter
      // Ultra-smooth reveal using ScrollTrigger with custom interpolation
      if (textRevealRef.current) {
        const spans = textSpansRef.current.filter(Boolean);
        if (spans.length > 0) {
          // Set initial state for all spans - start with barely visible
          gsap.set(spans, {
            color: 'rgb(100,100,100)', // More visible - light gray
          });

          // Create smooth scroll-triggered animation with custom interpolation
          ScrollTrigger.create({
            trigger: textRevealRef.current,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 0.3, // Very smooth scrubbing for fluid motion
            onUpdate: (self) => {
              const progress = self.progress;
              const totalSpans = spans.length;
              
              // Smooth interpolation for each letter
              spans.forEach((span, index) => {
                // Calculate when this letter should start and end its fill
                // Creates a smooth wave effect across all letters
                const letterStart = index / totalSpans;
                const letterEnd = letterStart + (0.3 / totalSpans); // Each letter takes 30% of scroll range
                
                let letterProgress = 0;
                
                if (progress >= letterStart) {
                  if (progress >= letterEnd) {
                    letterProgress = 1; // Fully filled
                  } else {
                    // Smooth interpolation using easeOut for natural feel
                    const localProgress = (progress - letterStart) / (letterEnd - letterStart);
                    // Apply smooth easing curve (easeOutCubic)
                    letterProgress = 1 - Math.pow(1 - localProgress, 3);
                  }
                }
                
                // Interpolate color smoothly from visible gray to full white
                const startValue = 100;
                const endValue = 255;
                const currentValue = Math.round(startValue + (endValue - startValue) * letterProgress);
                span.style.color = `rgb(${currentValue}, ${currentValue}, ${currentValue})`;
              });
            },
          });
        }
      }

      // Animate description text
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: descriptionRef.current,
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
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5,
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Initialize button fill element
      if (buttonFillRef.current) {
        gsap.set(buttonFillRef.current, {
          scaleX: 0,
          scaleY: 0,
          transformOrigin: '50% 50%',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToTextSpansRef = (el: HTMLSpanElement | null) => {
    if (el) {
      textSpansRef.current.push(el);
    }
  };

  // Button hover fill animation handler
  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current || !buttonFillRef.current) return;

    const button = buttonRef.current;
    const fill = buttonFillRef.current;
    const rect = button.getBoundingClientRect();
    
    // Calculate mouse position relative to button
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Determine entry direction based on mouse position relative to center
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    let originX = '50%';
    let originY = '50%';
    
    // Determine which side the cursor entered from
    // Use a threshold to determine primary direction
    if (absX > absY) {
      // Horizontal entry (left or right)
      if (deltaX < 0) {
        // Entered from left
        originX = '0%';
        originY = `${(mouseY / rect.height) * 100}%`;
      } else {
        // Entered from right
        originX = '100%';
        originY = `${(mouseY / rect.height) * 100}%`;
      }
    } else {
      // Vertical entry (top or bottom)
      if (deltaY < 0) {
        // Entered from top
        originX = `${(mouseX / rect.width) * 100}%`;
        originY = '0%';
      } else {
        // Entered from bottom
        originX = `${(mouseX / rect.width) * 100}%`;
        originY = '100%';
      }
    }
    
    // Set transform origin and animate fill
    gsap.set(fill, {
      transformOrigin: `${originX} ${originY}`,
    });
    
    // Animate fill expanding from the entry point
    gsap.to(fill, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current || !buttonFillRef.current) return;
    
    const button = buttonRef.current;
    const fill = buttonFillRef.current;
    const rect = button.getBoundingClientRect();
    
    // Calculate exit position
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    let originX = '50%';
    let originY = '50%';
    
    // Determine exit direction
    if (absX > absY) {
      if (deltaX < 0) {
        originX = '0%';
        originY = `${(mouseY / rect.height) * 100}%`;
      } else {
        originX = '100%';
        originY = `${(mouseY / rect.height) * 100}%`;
      }
    } else {
      if (deltaY < 0) {
        originX = `${(mouseX / rect.width) * 100}%`;
        originY = '0%';
      } else {
        originX = `${(mouseX / rect.width) * 100}%`;
        originY = '100%';
      }
    }
    
    // Set transform origin for exit animation
    gsap.set(fill, {
      transformOrigin: `${originX} ${originY}`,
    });
    
    // Animate fill out
    gsap.to(fill, {
      scaleX: 0,
      scaleY: 0,
      duration: 0.4,
      ease: 'power2.in',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="box-border antialiased bg-black flex flex-col w-full min-h-screen relative overflow-hidden pt-12 sm:pt-16 md:pt-24 lg:pt-[180px] px-4 sm:px-6 lg:px-8"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="w-full max-w-[1480px] mx-auto mb-12 sm:mb-16 md:mb-20 lg:mb-[80px]"
      >
        <div className="flex flex-col gap-2 sm:gap-[10px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 md:gap-16 lg:gap-[350px]">
              <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-xs sm:text-[13px] leading-tight sm:leading-[13px] text-white whitespace-nowrap">
                © PERSONAL PROFILE プロフィール
              </h6>
              <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-xs sm:text-[13px] leading-tight sm:leading-[13px] text-white whitespace-nowrap">
                (WDX®-05)
              </h6>
            </div>
              <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-xs sm:text-[13px] leading-tight sm:leading-[13px] text-white whitespace-nowrap">
                FULLSTACK DEVELOPER
              </h6>
          </div>
          <div className="w-full h-px bg-[rgba(187,187,187,0.2)]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-[1480px] mx-auto min-h-[calc(100vh-300px)] relative overflow-hidden pt-8 sm:pt-12 md:pt-24 lg:pt-[280px] pb-24 sm:pb-32 lg:pb-[264px]">
        {/* Image 1 - Man Back Pose - Bottom Right on mobile/tablet, original position on desktop */}
        <div
          ref={image1Ref}
          className="will-change-transform w-[120px] h-[170px] xs:w-[140px] xs:h-[200px] sm:w-[180px] sm:h-[260px] md:w-[220px] md:h-[320px] lg:w-[326px] lg:h-[473px] absolute bottom-[8px] sm:bottom-[12px] md:bottom-[5%] lg:bottom-[10%] right-[8px] sm:right-[12px] md:right-[4%] lg:left-[8%] lg:right-auto max-h-[calc(50vh-20px)] sm:max-h-[calc(45vh-20px)] md:max-h-[calc(100vh-20%)] lg:max-h-[calc(100vh-20%)] overflow-hidden rounded-[8px] sm:rounded-[10px] z-0 pointer-events-none"
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 rounded-[8px] sm:rounded-[10px]">
            <img
              decoding="auto"
              width="896"
              height="1280"
              sizes="(max-width: 480px) 120px, (max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 326px"
              src="/src/assets/2.png"
              alt="Man Back Pose"
              className="box-border antialiased cursor-none block rounded-[8px] sm:rounded-[10px] object-cover object-[50%_50%] w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Image 2 - Black Man with Video - Top Right on mobile/tablet, original position on desktop */}
        <div
          ref={image2Ref}
          className="will-change-transform w-[130px] h-[190px] xs:w-[150px] xs:h-[220px] sm:w-[200px] sm:h-[290px] md:w-[280px] md:h-[410px] lg:w-[454px] lg:h-[659px] absolute top-[8px] sm:top-[12px] md:top-[8%] lg:top-[30%] right-[8px] sm:right-[12px] md:right-[3%] lg:right-[2%] max-w-[calc(100vw-20px)] sm:max-w-[calc(100vw-24px)] md:max-w-[calc(100vw-8%)] lg:max-w-[calc(100vw-4%)] max-h-[calc(50vh-20px)] sm:max-h-[calc(45vh-20px)] md:max-h-[calc(100vh-20%)] lg:max-h-[calc(100vh-20%)] overflow-hidden rounded-[8px] sm:rounded-[10px] z-0 pointer-events-none"
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 rounded-[8px] sm:rounded-[10px]">
            <img
              decoding="auto"
              width="896"
              height="1280"
              sizes="(max-width: 480px) 130px, (max-width: 640px) 150px, (max-width: 768px) 200px, (max-width: 1024px) 280px, 454px"
              src="/src/assets/4.jpg"
              alt="Black Man"
              className="box-border antialiased cursor-none block rounded-[8px] sm:rounded-[10px] object-cover object-[50%_50%] w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Image 3 - Woman - Top Left on mobile/tablet, original position on desktop */}
        <div
          ref={image3Ref}
          className="will-change-transform w-[120px] h-[170px] xs:w-[140px] xs:h-[200px] sm:w-[180px] sm:h-[260px] md:w-[220px] md:h-[320px] lg:w-[326px] lg:h-[473px] absolute top-[8px] sm:top-[12px] md:top-[5%] lg:top-[15%] left-[8px] sm:left-[12px] md:left-[4%] lg:left-[8%] max-h-[calc(100vh-30%)] sm:max-h-[calc(100vh-25%)] md:max-h-[calc(100vh-20%)] lg:max-h-[calc(100vh-20%)] overflow-hidden rounded-[8px] sm:rounded-[10px] z-0 pointer-events-none"
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 rounded-[8px] sm:rounded-[10px]">
            <img
              decoding="auto"
              width="896"
              height="1280"
              sizes="(max-width: 480px) 120px, (max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 326px"
              src="/src/assets/profile2.jpg"
              alt="Woman"
              className="box-border antialiased cursor-none block rounded-[8px] sm:rounded-[10px] object-cover object-[50%_50%] w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Large Text Reveal */}
        <div className="flex justify-center items-center w-full max-w-[1000px] relative z-10 px-4 sm:px-0">
          <div
            ref={textRevealRef}
            className="mix-blend-difference w-full max-w-[1000px] relative"
          >
            <p className="font-['inter_display',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[79px] font-medium text-white flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-6 leading-tight sm:leading-[1.2] lg:leading-[78.6px] tracking-tight sm:tracking-[-1px] lg:tracking-[-2.1px] justify-start m-0 antialiased">
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  A
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  h
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  g
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  f
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  u
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  -
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  k
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  o
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  u
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  o
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  w
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  h
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  h
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  m
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  y
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  d
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  g
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  g
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  p
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  o
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  .
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  B
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  u
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  d
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  g
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  b
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  y
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  m
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  w
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  h
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  o
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  b
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  u
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  h
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  u
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  ,
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  m
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  s
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  g
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  o
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  ,
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  d
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  x
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  p
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  t
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  i
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  o
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  l
                </span>{' '}
              </span>
              <span>
                <span ref={addToTextSpansRef} className="text-white">
                  p
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  f
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  o
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  r
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  m
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  a
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  n
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  c
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  e
                </span>
                <span ref={addToTextSpansRef} className="text-white">
                  .
                </span>{' '}
              </span>
            </p>
          </div>
        </div>

        {/* Description and Button */}
        <div className="flex flex-col items-center sm:items-end w-full max-w-[1432px] mx-auto mt-16 sm:mt-24 lg:mt-[264px] px-4 sm:pr-8 md:pr-16 lg:pr-[356px] relative z-20">
          <div
            ref={descriptionRef}
            className="mix-blend-difference flex flex-col items-start gap-6 sm:gap-8 lg:gap-10 w-full sm:w-[450px] max-w-[450px]"
          >
            <div className="relative flex flex-col justify-start w-full max-w-[450px]">
              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-[rgb(187,187,187)] text-sm sm:text-base md:text-lg lg:text-[19px] normal-case leading-relaxed sm:leading-normal lg:leading-[25.2px] text-start antialiased m-0">
                I bridge frontend innovation with backend excellence, combining
                user experience and system architecture into one{' '}
                <span className="text-white text-sm sm:text-base md:text-lg lg:text-[19px] leading-relaxed sm:leading-normal lg:leading-[25.2px]">
                  <strong className="font-bold">
                    cohesive solution
                  </strong>
                </span>{' '}
                to deliver applications that are scalable, efficient, and engineered
                to perform.
              </p>
            </div>
            <div className="w-auto sm:w-[167.1px] h-10 sm:h-11 relative">
              <a
                ref={buttonRef}
                href="./works"
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                className="flex justify-center items-center w-auto sm:w-[167.1px] h-10 sm:h-11 relative overflow-hidden rounded-full sm:rounded-[259px] px-6 sm:px-0 border border-white"
              >
                {/* Fill effect element */}
                <div
                  ref={buttonFillRef}
                  className="absolute inset-0 bg-white rounded-full sm:rounded-[259px] scale-0"
                  style={{
                    transformOrigin: '50% 50%',
                  }}
                />
                <div className="mix-blend-difference w-[167.1px] h-11 relative z-10">
                  <div className="flex items-center justify-center w-[167.1px] h-11 overflow-hidden p-3 px-[18px]">
                    <p className="flex overflow-hidden w-[131.1px] font-['Inter_Display','Inter_Display_Placeholder',sans-serif] text-[23px] uppercase select-none p-0 antialiased m-0">
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        S
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        E
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        E
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        {' '}
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        W
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        O
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        R
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        K
                      </span>
                      <span className="block backface-hidden whitespace-pre nowrap font-bold text-[23px] tracking-[-0.3px] leading-5 text-white">
                        S
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
