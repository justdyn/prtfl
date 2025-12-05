import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Works: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingScrollRef = useRef<HTMLUListElement>(null);
  const headingContentRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<HTMLAnchorElement[]>([]);
  const scrollAnimationRef = useRef<gsap.core.Tween | null>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const buttonFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wait for DOM to be fully ready and ensure accurate measurements
      const initAnimations = () => {
        // Animate scrolling heading text with proper infinite loop
        if (headingScrollRef.current && headingContentRef.current) {
          const ul = headingScrollRef.current;
          const content = headingContentRef.current;
          
          // Force reflow to ensure accurate measurements
          void ul.offsetWidth;
          void content.offsetWidth;
          
          // Get the actual content width with proper measurement
          const contentWidth = content.getBoundingClientRect().width;
          
          // Only proceed if we have a valid width
          if (contentWidth <= 0) {
            // Retry after a short delay if width is not ready
            setTimeout(initAnimations, 50);
            return;
          }
          
          // Reset any existing transforms
          gsap.set(ul, { 
            x: 0, 
            clearProps: 'transform',
            force3D: true, // Enable GPU acceleration
          });
          
          // Kill any existing animation to prevent conflicts
          if (scrollAnimationRef.current) {
            scrollAnimationRef.current.kill();
          }
          
          // Create seamless infinite scroll
          // Since we have 4 copies of the content, we animate by exactly one content width
          // This creates a perfect seamless loop
          scrollAnimationRef.current = gsap.to(ul, {
            x: -contentWidth,
            duration: 20,
            ease: 'none',
            repeat: -1,
            immediateRender: false, // Prevent initial jump
            force3D: true, // Enable GPU acceleration for smooth performance
          });

          // Fade in animation for the heading section
          gsap.fromTo(
            headingScrollRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headingScrollRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
                once: true,
              },
            }
          );
        }

        // Animate project cards with parallax and reveal effects
        projectCardsRef.current.forEach((card, index) => {
          if (card && !card.dataset.animated) {
            // Mark as animated to prevent duplicate animations
            card.dataset.animated = 'true';
            
            const imageContainer = card.querySelector('.image-container');
            const mainImage = card.querySelector('.main-image');
            const overlayImage = card.querySelector('.overlay-image');
            const textContent = card.querySelector('.text-content');

            // Card entrance animation - smoother and more sophisticated
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 80,
                scale: 0.95,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                delay: index * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                  once: true,
                },
              }
            );

            // Main image parallax effect - smooth scroll-linked animation
            if (mainImage && imageContainer) {
              gsap.fromTo(
                mainImage,
                {
                  scale: 1.2,
                  y: 50,
                },
                {
                  scale: 1,
                  y: 0,
                  duration: 1.5,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: imageContainer,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    scrub: 1,
                  },
                }
              );
            }

            // Overlay image animation - bouncy entrance effect
            if (overlayImage) {
              gsap.fromTo(
                overlayImage,
                {
                  opacity: 0,
                  scale: 0.8,
                  x: 50,
                  y: 50,
                },
                {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  duration: 1,
                  ease: 'back.out(1.7)',
                  delay: 0.3 + (index * 0.15),
                  scrollTrigger: {
                    trigger: imageContainer || card,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                    once: true,
                  },
                }
              );
            }

            // Text reveal animation - smooth fade and slide
            if (textContent) {
              gsap.fromTo(
                textContent,
                {
                  opacity: 0,
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  delay: 0.5 + (index * 0.15),
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                    once: true,
                  },
                }
              );
            }
          }
        });
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Small delay to ensure all measurements are accurate
        setTimeout(initAnimations, 100);
      });

      // Handle window resize to recalculate animations
      const handleResize = () => {
        if (headingScrollRef.current && headingContentRef.current) {
          const ul = headingScrollRef.current;
          const content = headingContentRef.current;
          
          // Force reflow for accurate measurements
          void ul.offsetWidth;
          void content.offsetWidth;
          
          const contentWidth = content.getBoundingClientRect().width;
          
          // Only proceed if we have a valid width
          if (contentWidth <= 0) return;
          
          if (scrollAnimationRef.current) {
            scrollAnimationRef.current.kill();
          }
          
          gsap.set(ul, { 
            x: 0,
            force3D: true,
          });
          
          scrollAnimationRef.current = gsap.to(ul, {
            x: -contentWidth,
            duration: 20,
            ease: 'none',
            repeat: -1,
            immediateRender: false,
            force3D: true,
          });
        }
      };

      // Debounce resize handler
      let resizeTimeout: ReturnType<typeof setTimeout>;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
      });

      // Initialize button fill element
      if (buttonFillRef.current) {
        gsap.set(buttonFillRef.current, {
          scaleX: 0,
          scaleY: 0,
          transformOrigin: '50% 50%',
        });
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    }, sectionRef);

    return () => {
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill();
      }
      ctx.revert();
    };
  }, []);

  const addToCardsRef = useCallback((el: HTMLAnchorElement | null) => {
    if (el && !projectCardsRef.current.includes(el)) {
      projectCardsRef.current.push(el);
    }
  }, []);

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
      className="bg-black w-full max-w-[1480px] min-h-screen lg:h-auto relative pt-12 sm:pt-16 md:pt-24 lg:pt-[180px] pb-12 text-xs sm:text-[12px] leading-normal font-sans box-border antialiased cursor-none flex flex-col flex-nowrap content-start justify-center items-start gap-8 sm:gap-12 lg:gap-[50px] overflow-x-hidden overflow-y-hidden px-4 sm:px-6"
    >
      {/* Top Section Label */}
      <div className="w-full h-auto sm:h-6 relative shrink-0 grow-0 basis-auto">
        <div className="flex flex-col flex-nowrap content-center justify-center items-center gap-2 sm:gap-[10px] w-full h-auto sm:h-6 relative overflow-hidden p-0">
          <div className="flex flex-col sm:flex-row flex-nowrap grow-0 shrink-0 basis-auto content-center justify-between items-start sm:items-center w-full h-auto sm:h-[13px] relative overflow-hidden px-0 gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row flex-nowrap grow-0 shrink-0 basis-auto content-center justify-start items-start sm:items-center gap-2 sm:gap-8 md:gap-16 lg:gap-[350px] w-full sm:w-auto h-auto sm:h-[13px] relative overflow-hidden p-0">
              <div className="flex flex-row flex-nowrap grow-0 shrink-0 basis-auto content-center justify-center items-center gap-2 sm:gap-[10px] w-auto h-auto sm:h-[13px] relative overflow-hidden p-0">
                <div className="relative outline-none flex flex-col shrink-0 justify-start w-auto whitespace-nowrap grow-0 basis-auto">
                  <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-xs sm:text-[13px] leading-tight sm:leading-[13px] uppercase text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                      © Featured Projects プロジェクト
                    </h6>
                  </div>
                </div>
              <div className="flex flex-row flex-nowrap grow-0 shrink-0 basis-auto content-center justify-center items-center gap-2 sm:gap-[10px] w-auto h-auto sm:h-[13px] relative overflow-hidden p-0">
                <div className="relative outline-none flex flex-col shrink-0 justify-start w-auto whitespace-nowrap grow-0 basis-auto">
                  <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-xs sm:text-[13px] leading-tight sm:leading-[13px] uppercase text-left box-border antialiased cursor-none p-0 m-0 no-underline text-[#bbbbbb]">
                      (WDX® — 03)
                    </h6>
                  </div>
                </div>
              </div>
            <div className="flex flex-row flex-nowrap grow-0 shrink-0 basis-auto content-center justify-center items-center gap-2 sm:gap-[10px] w-auto h-auto sm:h-[13px] relative overflow-hidden p-0">
              <div className="relative outline-none flex flex-col shrink-0 justify-start w-auto whitespace-nowrap grow-0 basis-auto">
                <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-xs sm:text-[13px] leading-tight sm:leading-[13px] uppercase text-left box-border antialiased cursor-none p-0 m-0 no-underline text-[#bbbbbb]">
                    Creative Development
                  </h6>
                </div>
              </div>
            </div>
          <div className="w-full h-px relative overflow-hidden bg-[rgba(187,187,187,0.2)] grow-0 shrink-0 basis-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-nowrap grow-0 shrink-0 basis-auto content-center justify-center items-center gap-0 w-full h-auto relative overflow-hidden p-0">
        <div className="flex flex-col flex-nowrap grow-0 shrink-0 basis-auto content-start justify-center items-start gap-8 sm:gap-12 lg:gap-[50px] w-full h-auto relative overflow-hidden p-0">
          {/* Scrolling Heading Section */}
          <div className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] relative grow-0 shrink-0 basis-auto">
            <div className="flex flex-col flex-nowrap content-center justify-center items-center gap-2 sm:gap-[10px] w-full h-full relative overflow-hidden p-0">
              <div className="w-full h-full relative grow-0 shrink-0 basis-auto">
                <section className="w-full h-full max-w-full max-h-full flex items-center justify-center list-none p-2 sm:p-[10px] m-0">
                  <ul
                    ref={headingScrollRef}
                    className="box-border antialiased cursor-none flex w-full h-[calc(100%-20px)] max-w-full max-h-full items-center justify-center list-none gap-0 relative flex-row will-change-transform p-0 m-0"
                  >
                    {[...Array(4)].map((_, i) => (
                      <li key={i} aria-hidden={i > 1} className="will-change-transform">
                        <div
                          ref={i === 0 ? headingContentRef : undefined}
                          className="flex flex-row flex-nowrap content-center justify-center items-center gap-2 sm:gap-[10px] w-auto h-full relative overflow-hidden shrink-0 p-0"
                        >
                          <div className="relative outline-none flex flex-col shrink-0 justify-start mix-blend-difference whitespace-nowrap grow-0 basis-auto w-auto h-full will-change-transform">
                            <h1 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[208px] leading-tight sm:leading-[0.8] tracking-tight sm:tracking-[-4px] lg:tracking-[-8px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap"
                              style={{
                                fontFeatureSettings: '"salt", "ss01", "ss02", "ss03", "ss04", "ss07"',
                              }}
                            >
                              Featured Works© 
                            </h1>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>

          <div className="w-full h-px relative overflow-hidden bg-[rgba(187,187,187,0.2)] grow-0 shrink-0 basis-auto"></div>

          {/* Description and Button */}
          <div className="flex flex-col flex-nowrap grow-0 shrink-0 basis-auto content-start justify-center items-start gap-6 sm:gap-8 lg:gap-[40px] w-full max-w-full sm:max-w-[570px] h-auto relative overflow-hidden px-0">
            <div className="relative outline-none flex flex-col shrink-0 justify-start whitespace-normal wrap-break-word grow-0 basis-auto w-full max-w-full sm:max-w-[540px] h-auto">
              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-[#bbbbbb] text-sm sm:text-base md:text-lg lg:text-[19px] leading-relaxed sm:leading-normal lg:leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0">
                  Every project is a chance to architect full-stack solutions,
                  transforming complex requirements into{" "}
                <span className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] text-white text-sm sm:text-base md:text-lg lg:text-[19px] leading-relaxed sm:leading-normal lg:leading-[25.2px] no-underline">
                  <strong className="box-border antialiased cursor-none font-bold">
                      robust applications{" "}
                    <br className="hidden sm:block" />
                      — built with{" "}
                    </strong>
                  </span>
                  precision, efficiency, and scalable architecture that delivers
                  exceptional performance.
                </p>
              </div>
            <div className="w-auto sm:w-[167.1px] h-10 sm:h-11 relative grow-0 shrink-0 basis-auto">
                <a
                  ref={buttonRef}
                  href="./works"
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                  className="will-change-auto flex justify-center w-auto sm:w-[167.1px] h-10 sm:h-11 overflow-hidden rounded-full sm:rounded-[259px] relative no-underline box-border antialiased cursor-pointer flex-row flex-nowrap content-center items-center gap-2 sm:gap-[10px] px-6 sm:px-0 p-0 border border-white"
                >
                  {/* Fill effect element */}
                  <div
                    ref={buttonFillRef}
                    className="absolute inset-0 bg-white rounded-full sm:rounded-[259px] scale-0"
                    style={{
                      transformOrigin: '50% 50%',
                    }}
                  />
                  <div className="absolute top-[47.9875px] left-0 right-0 overflow-visible h-[6px] bg-white rounded-[30px] hidden sm:block"></div>
                  <div className="mix-blend-difference w-auto sm:w-[167.1px] h-10 sm:h-11 relative z-10">
                    <div className="flex items-center justify-center w-full h-full overflow-hidden p-3">
                      <p className="text-sm sm:text-[23px] uppercase font-bold tracking-tight sm:tracking-[-0.3px] text-white">
                        SEE WORKS
                      </p>
                    </div>
                  </div>
                </a>
            </div>
          </div>
        </div>

        {/* Projects Grid - Responsive */}
        <div className="flex flex-col flex-nowrap grow-0 shrink-0 basis-auto content-start justify-start items-start gap-0 w-full h-auto relative overflow-hidden px-0 mt-8 sm:mt-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 w-full">
            {/* Project 1 - INSPACE */}
            <a
              href="https://inspace.itk.ac.id/"
              ref={addToCardsRef}
              className="group w-full h-auto relative no-underline box-border antialiased cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-full h-auto relative">
                <div className="flex flex-col gap-3 sm:gap-4 w-full h-auto relative overflow-hidden">
                  <div className="image-container w-full aspect-4/5 md:aspect-4/5 lg:aspect-3/4 relative overflow-hidden bg-black rounded-lg sm:rounded-xl">
                    <img
                      decoding="auto"
                      loading="lazy"
                      src="/src/assets/space.jpg"
                      alt="INSPACE"
                      className="main-image w-full h-full object-cover will-change-transform"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:bottom-4 lg:right-4 w-[75%] sm:w-[70%] md:w-[70%] lg:w-[50%] aspect-square overflow-hidden rounded-lg z-10 will-change-transform">
                      <img
                        src="/src/assets/mockup3.png"
                        alt="INSPACE Detail"
                        className="overlay-image w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-content flex justify-between items-center w-full">
                    <p className="font-['Inter_Display'] font-medium text-white text-sm sm:text-base lg:text-lg">
                      INSPACE
                    </p>
                    <p className="font-['Inter_Display'] font-medium text-white text-sm sm:text-base lg:text-lg">
                      (01)
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Project 2 - SIRTERA 24 */}
            <a
              href="https://sirtera24.com/"
              ref={addToCardsRef}
              className="group w-full h-auto relative no-underline box-border antialiased cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-full h-auto relative">
                <div className="flex flex-col gap-3 sm:gap-4 w-full h-auto relative overflow-hidden">
                  <div className="image-container w-full aspect-4/5 md:aspect-4/5 lg:aspect-video relative overflow-hidden bg-black rounded-lg sm:rounded-xl">
                    <img
                      decoding="auto"
                      loading="lazy"
                      src="/src/assets/beach.jpg"
                      alt="SIRTERA 24"
                      className="main-image w-full h-full object-cover will-change-transform"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:bottom-4 lg:right-4 w-[75%] sm:w-[70%] md:w-[70%] lg:w-[55%] aspect-square sm:aspect-square md:aspect-square lg:aspect-video overflow-hidden rounded-lg z-10 will-change-transform">
                      <img
                        src="/src/assets/mockup2.png"
                        alt="SIRTERA 24 Detail"
                        className="overlay-image w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-content flex justify-between items-center w-full">
                    <p className="font-['Inter_Display'] font-medium text-white text-sm sm:text-base lg:text-lg">
                      SIRTERA 24
                    </p>
                    <p className="font-['Inter_Display'] font-medium text-white text-sm sm:text-base lg:text-lg">
                      (02)
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
