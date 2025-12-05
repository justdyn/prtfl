import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppLayout from "../layouts/app-layout";

gsap.registerPlugin(ScrollTrigger);

const Works: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading section with stagger
      if (headingRef.current) {
        const headingLines = headingRef.current.querySelectorAll('h1');
        gsap.fromTo(
          headingLines,
          {
            opacity: 0,
            y: 100,
            clipPath: 'inset(0% 0% 100% 0%)',
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate count
      if (countRef.current) {
        gsap.fromTo(
          countRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            delay: 0.4,
            scrollTrigger: {
              trigger: countRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate project cards with parallax and reveal effects
      projectCardsRef.current.forEach((card) => {
        if (card) {
          const image = card.querySelector('.main-image');
          const overlay = card.querySelector('.overlay-image');
          const textContent = card.querySelector('.text-content');

          // Card entrance animation
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
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Main image parallax
          if (image) {
            gsap.fromTo(
              image,
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
                  trigger: card,
                  start: 'top 85%',
                  end: 'bottom 20%',
                  scrub: 1,
                },
              }
            );
          }

          // Overlay image animation
          if (overlay) {
            gsap.fromTo(
              overlay,
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
                delay: 0.3,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }

          // Text reveal animation
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
                delay: 0.5,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !projectCardsRef.current.includes(el)) {
      projectCardsRef.current.push(el);
    }
  }, []);

  const projects = [
    {
      href: "https://inspace.itk.ac.id/",
      title: "INSPACE",
      number: "(01)",
      description: "Competition and Tikecting Talk Show Website",
      mainImage: "/src/assets/space.jpg",
      overlayImage: "/src/assets/mockup1.jpg",
      aspectRatio: "portrait",
    },
    {
      href: "https://sirtera24.com/",
      title: "SIRTERA 24",
      number: "(02)",
      description: "News and Document Making Website",
      mainImage: "/src/assets/beach.jpg",
      overlayImage: "/src/assets/mockup2.png",
      aspectRatio: "landscape",
    },
  ];

  return (
    <AppLayout>
      <section
        ref={sectionRef}
        className="box-border antialiased flex flex-col lg:flex-row flex-nowrap items-start justify-center w-full relative overflow-visible bg-black text-black text-xs leading-normal font-sans px-4 sm:px-6 py-0 min-h-screen"
      >
        {/* Sticky Left Column - Heading Section (Desktop Only) */}
        <div className="z-1 hidden lg:flex flex-row flex-nowrap items-start justify-start flex-1 shrink-0 w-full lg:w-[666px] lg:h-[612px] sticky top-[130px] overflow-hidden pt-[252px] pb-6 px-0">
          <div className="flex flex-row flex-nowrap items-end justify-start flex-1 shrink-0 w-full lg:w-[666px] lg:h-[336px] relative overflow-hidden p-0">
            <div className="contents">
              <div
                ref={headingRef}
                className="relative outline-none flex flex-col shrink-0 justify-start mix-blend-difference whitespace-nowrap grow-0 basis-auto w-full lg:w-[561.05px] lg:h-[336px] transform-none"
              >
                <h1 className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[120px] md:text-[160px] lg:text-[208px] leading-[0.8] tracking-[-0.04em] text-left whitespace-nowrap bg-transparent p-0 m-0 no-underline [font-feature-settings:'salt','ss01','ss02','ss03','ss04','ss07']">
                  All
                  <br className="box-border antialiased" />
                  Works
                </h1>
              </div>
            </div>
            <div className="flex flex-col flex-nowrap items-center justify-center grow-0 shrink-0 basis-auto gap-2.5 w-[56.5625px] h-[168.6px] relative overflow-hidden pb-[118px]">
              <div
                ref={countRef}
                className="relative outline-none flex flex-col shrink-0 justify-start mix-blend-difference whitespace-nowrap grow-0 basis-auto w-[56.5625px] h-[50.6px] transform-none"
              >
                <h3 className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[32px] md:text-[40px] lg:text-[49px] leading-[50.6px] tracking-[-0.8px] text-start whitespace-nowrap bg-transparent p-0 m-0 no-underline [font-feature-settings:'cv01','cv02','cv03','cv04','cv05','cv06','cv08','cv10','cv12','cv13','ss02','ss03','ss07']">
                  (2)
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Heading - Left-aligned at top */}
        <div className="lg:hidden w-full px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-start justify-start">
          <div ref={headingRef} className="relative w-full flex flex-col items-start justify-start">
            <div className="relative flex items-start justify-start gap-3 sm:gap-4">
              <h1 className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[60px] sm:text-[80px] md:text-[100px] leading-[0.8] tracking-[-0.04em] text-left whitespace-nowrap bg-transparent p-0 m-0 no-underline [font-feature-settings:'salt','ss01','ss02','ss03','ss04','ss07'] mix-blend-difference">
                All
                <br className="box-border antialiased" />
                Works
              </h1>
              <div ref={countRef} className="mix-blend-difference flex items-start pt-2 sm:pt-3">
                <h3 className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[24px] sm:text-[28px] md:text-[32px] leading-none tracking-[-0.8px] text-start whitespace-nowrap bg-transparent p-0 m-0 no-underline [font-feature-settings:'cv01','cv02','cv03','cv04','cv05','cv06','cv08','cv10','cv12','cv13','ss02','ss03','ss07']">
                  (2)
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Project Cards */}
        <div className="flex flex-col flex-nowrap items-center justify-center grow-0 shrink-0 basis-auto gap-2.5 w-full lg:w-[716px] relative overflow-hidden py-4 sm:py-6 pl-0 lg:pl-6 pr-0 lg:pr-6">
          <div className="flex flex-col flex-nowrap items-start justify-center grow-0 shrink-0 basis-auto gap-4 sm:gap-5 w-full lg:w-[692px] relative pt-4 sm:pt-6 lg:pt-[90px]">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.href}
                className="box-border antialiased cursor-pointer flex flex-row flex-nowrap items-center justify-start gap-2.5 w-full lg:w-[692px] h-auto lg:h-[570px] relative p-0 no-underline"
              >
                <div className="contents">
                  <div className="grow shrink-0 basis-0 w-full lg:w-[692px] h-auto lg:h-[570px] relative">
                    <div className="flex flex-col flex-nowrap items-start justify-center gap-3 sm:gap-[14px] w-full lg:w-[692px] h-auto lg:h-[570px] relative overflow-hidden p-0">
                      {/* Image Container */}
                      <div
                        ref={addToCardsRef}
                        className="will-change-auto relative w-full lg:w-[692px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[530.8px] overflow-hidden bg-black rounded-[10px] p-0"
                      >
                        {/* Main Image */}
                        <div className="z-0 absolute inset-0 overflow-hidden will-change-transform">
                          <img
                            className="main-image box-border antialiased block object-cover object-center rounded-none w-full h-full"
                            decoding="auto"
                            loading="lazy"
                            src={project.mainImage}
                            alt={project.title}
                          />
                        </div>

                        {/* Overlay Image - Centered on mobile/tablet, bottom-right on desktop */}
                        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:bottom-0 lg:right-0 w-[45%] sm:w-1/2 lg:w-[346px] h-[150px] sm:h-[200px] md:h-[225px] lg:h-[265.4px] overflow-hidden rounded-[10px] will-change-transform origin-[50%_50%]">
                          <img
                            className="overlay-image box-border antialiased block object-cover object-center rounded-none w-full h-full"
                            decoding="auto"
                            loading="lazy"
                            src={project.overlayImage}
                            alt={`${project.title} overlay`}
                          />
                        </div>

                        {/* Divider Line (hidden) */}
                        <div className="z-1 flex flex-row flex-nowrap items-center justify-center grow-0 shrink-0 basis-auto gap-[300px] w-full lg:w-[692px] h-6 min-h-6 absolute top-[50%] left-0 overflow-hidden opacity-0 transform -translate-y-3 will-change-transform p-0 pointer-events-none">
                          <div className="grow-0 shrink-0 basis-auto w-full lg:w-[692px] h-px absolute top-[11.5px] left-0 overflow-visible bg-white transform-none origin-[50%_0.5px]" />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div
                        className="text-content flex flex-row flex-nowrap items-center justify-between grow-0 shrink-0 basis-auto w-full lg:w-[692px] h-auto sm:h-[25.2px] relative overflow-hidden p-0"
                      >
                        <div className="relative outline-none flex flex-col shrink-0 justify-start whitespace-nowrap grow-0 basis-auto w-auto h-auto sm:h-[25.2px] transform-none">
                          <p className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-sm sm:text-base lg:text-[19px] leading-[1.2] sm:leading-[25.2px] text-start whitespace-nowrap bg-transparent cursor-none rounded-none p-0 m-0 no-underline">
                            {project.title}
                          </p>
                        </div>
                        <div className="relative outline-none flex flex-col shrink-0 justify-start whitespace-nowrap grow-0 basis-auto w-auto h-auto sm:h-[25.2px] transform-none">
                          <p className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-sm sm:text-base lg:text-[19px] leading-[1.2] sm:leading-[25.2px] text-start whitespace-nowrap bg-transparent cursor-none rounded-none p-0 m-0 no-underline">
                            {project.number}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Works;
