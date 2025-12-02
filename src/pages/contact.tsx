import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppLayout from "../layouts/app-layout";

gsap.registerPlugin(ScrollTrigger);

// Placeholder icon components - replace with actual icons if available
const Icon1: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Icon2: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.9079 12.2385 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61993 14.1902 8.22768 13.4229 8.09402 12.5922C7.96035 11.7615 8.09202 10.9099 8.47029 10.1584C8.84856 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73513 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Icon3: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2131 21.3522 21.4012C21.1472 21.5894 20.905 21.733 20.6409 21.8228C20.3768 21.9126 20.0965 21.9466 19.82 21.922C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49997 10.2412 2.44824 7.27099 2.12 4.18C2.09557 3.90347 2.12981 3.62307 2.21996 3.35898C2.31011 3.09489 2.45403 2.85274 2.64249 2.64781C2.83095 2.44288 3.06018 2.27949 3.31531 2.16811C3.57044 2.05673 3.84609 2 4.125 2H7.125C7.68177 1.99522 8.22449 2.16708 8.67773 2.48961C9.13097 2.81214 9.47173 3.26979 9.65 3.8C9.909 4.67 10.264 5.5 10.71 6.29C10.8931 6.62419 10.9811 7.00119 10.965 7.38C10.9489 7.75881 10.8292 8.12564 10.62 8.44L8.79 10.79C10.4021 13.4855 13.0045 16.0879 15.7 17.7L18.05 15.87C18.3644 15.6608 18.7312 15.5411 19.11 15.525C19.4888 15.5089 19.8658 15.5969 20.2 15.78C20.9924 16.2228 21.8195 16.5761 22.67 16.84L22.68 16.84H22.69L22.7 16.85L22.71 16.86L22.72 16.87C22.8136 16.9556 22.8868 17.0603 22.9347 17.1771C22.9826 17.2939 23.0041 17.4201 23.0001 17.5471C22.9961 17.6741 22.9666 17.7988 22.9136 17.9129C22.8606 18.027 22.7852 18.1278 22.6922 18.2088C22.5992 18.2898 22.4905 18.3492 22.3731 18.3833C22.2557 18.4174 22.1322 18.4255 22.011 18.407C21.8898 18.3885 21.7734 18.3437 21.67 18.275L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Icon4: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="L22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingTextRef = useRef<HTMLDivElement>(null);
  const scrollingContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contactLinksRef = useRef<HTMLDivElement>(null);
  const largeTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate scrolling text bar
      if (scrollingContentRef.current) {
        const content = scrollingContentRef.current;
        const contentWidth = content.scrollWidth;
        
        gsap.to(scrollingContentRef.current, {
          x: -contentWidth / 2,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });

        // Fade in scrolling bar on scroll
        gsap.fromTo(
          scrollingTextRef.current,
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
              trigger: scrollingTextRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate image on scroll
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
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

      // Animate contact links on scroll
      if (contactLinksRef.current) {
        const links = contactLinksRef.current.querySelectorAll('a');
        gsap.fromTo(
          links,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactLinksRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate large "Contact Now" text
      if (largeTextRef.current) {
        gsap.fromTo(
          largeTextRef.current,
          {
            opacity: 0,
            scale: 0.9,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: largeTextRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <AppLayout>
      <div
        ref={containerRef}
        className="bg-black text-[12px] leading-normal font-sans box-border antialiased cursor-none flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-end items-end justify-between overflow-hidden relative w-full px-6 h-[336px]"
      >
        {/* Scrolling Text Bar */}
        <div
          ref={scrollingTextRef}
          className="absolute bottom-[30px] left-[740px] w-[1480px] h-6 flex-grow-0 flex-shrink-0 flex-basis-auto"
          style={{
            transform: 'matrix(1, 0, 0, 1, -740, 0)',
          }}
        >
          <div className="flex flex-row flex-nowrap content-center justify-center items-center gap-[300px] w-[1480px] h-6 relative overflow-hidden bg-white p-0">
            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[21.625px] h-6">
              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-black whitespace-nowrap">
                Fly
              </p>
            </div>
            <div
              ref={scrollingContentRef}
              className="flex flex-row flex-nowrap content-center justify-center items-center gap-[300px]"
            >
              <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[54.275px] h-6">
                <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-black whitespace-nowrap">
                  Call Me
                </p>
              </div>
              <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[96.175px] h-6">
                <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-black whitespace-nowrap">
                  24/7 Support
                </p>
              </div>
              <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[56.125px] h-6">
                <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-black whitespace-nowrap">
                  Remote
                </p>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[54.275px] h-6">
                <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-black whitespace-nowrap">
                Call Me
              </p>
            </div>
              <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[96.175px] h-6">
                <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-black whitespace-nowrap">
                24/7 Support
              </p>
            </div>
              <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[56.125px] h-6">
                <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-black whitespace-nowrap">
                Remote
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div
          ref={imageRef}
          className="flex-grow flex-shrink-0 flex-basis-0 content-center items-center justify-center flex flex-row flex-nowrap gap-[10px] h-[336px] max-w-[490px] overflow-hidden relative w-[490px] will-change-auto rounded-[10px] p-0"
        >
          <div className="flex-grow-0 flex-shrink-0 flex-basis-auto h-[403.2px] left-0 overflow-hidden absolute top-0 w-[490px] z-[1] will-change-transform">
            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
              <img
                decoding="auto"
                width="896"
                height="1280"
                sizes="min(max((min(100vw, 1480px) - 248px) / 2, 1px), 490px)"
                srcSet="https://framerusercontent.com/images/BChNf0ssn5x1I9kAk4vwX8qT5o.png?scale-down-to=1024 716w,https://framerusercontent.com/images/BChNf0ssn5x1I9kAk4vwX8qT5o.png 896w"
                src="https://framerusercontent.com/images/BChNf0ssn5x1I9kAk4vwX8qT5o.png"
                alt="Woman Staircase"
                className="w-[490px] h-[403.2px] block box-border antialiased cursor-none object-cover object-center rounded-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Links Section */}
        <div
          ref={contactLinksRef}
          className="flex-grow flex-shrink-0 flex-basis-0 content-start items-start justify-center flex flex-col flex-nowrap gap-[30px] h-[290px] max-w-[500px] overflow-hidden relative w-[500px] pb-[120px]"
        >
          <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-[170px] overflow-hidden relative w-[500px] p-0">
            {/* Office Link */}
            <div className="flex-grow-0 flex-shrink-0 flex-basis-auto h-[35px] relative w-[500px]">
              <a
                href="https://www.framer.com/@westhill-studio/"
                target="_blank"
                rel="noopener"
                className="box-border antialiased cursor-none flex flex-col flex-nowrap content-start items-start gap-[10px] h-[35px] justify-center overflow-hidden relative w-[500px] opacity-100 p-0 no-underline"
              >
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-6 overflow-hidden relative w-[500px] p-0">
                  <div className="flex-grow flex-shrink-0 flex-basis-0 content-center items-center justify-start flex flex-col flex-nowrap gap-[10px] h-6 overflow-visible relative w-[466px] p-0">
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]">
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        Office: Tokyo, Japan.
                      </p>
                    </div>
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]">
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        Office: Tokyo, Japan.
                      </p>
                    </div>
                  </div>
                  <div className="relative h-6 w-6 flex-shrink-0" aria-hidden="true">
                    <div className="w-6 h-6">
                      <Icon1 style={{}} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-px overflow-visible relative w-[500px] bg-[rgba(187,187,187,0.2)] p-0">
                  <div className="bottom-0 flex-grow-0 flex-shrink-0 flex-basis-auto h-px left-[-6px] overflow-hidden absolute w-px z-[1] bg-white origin-[0.5px_0.5px]"></div>
                </div>
              </a>
            </div>

            {/* Instagram Link */}
            <div className="flex-grow-0 flex-shrink-0 flex-basis-auto h-[35px] relative w-[500px]">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener"
                className="box-border antialiased cursor-none flex flex-col flex-nowrap content-start items-start gap-[10px] h-[35px] justify-center overflow-hidden relative w-[500px] opacity-100 p-0 no-underline"
              >
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-6 overflow-hidden relative w-[500px] p-0">
                  <div className="flex-grow flex-shrink-0 flex-basis-0 content-center items-center justify-start flex flex-col flex-nowrap gap-[10px] h-6 overflow-visible relative w-[466px] p-0">
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]">
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        Follow me on Instagram
                      </p>
                    </div>
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]">
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        Follow me on Instagram
                      </p>
                    </div>
                  </div>
                  <div className="relative h-6 w-6 flex-shrink-0" aria-hidden="true">
                    <div className="w-6 h-6">
                      <Icon2 style={{}} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-px overflow-visible relative w-[500px] bg-[rgba(187,187,187,0.2)] p-0">
                  <div className="bottom-0 flex-grow-0 flex-shrink-0 flex-basis-auto h-px left-[-6px] overflow-hidden absolute w-px z-[1] bg-white origin-[0.5px_0.5px]"></div>
                </div>
              </a>
            </div>

            {/* Phone Link */}
            <div className="flex-grow-0 flex-shrink-0 flex-basis-auto h-[35px] relative w-[500px]">
              <a
                href="tel:+1 14945 78297"
                target="_blank"
                rel="noopener"
                className="box-border antialiased cursor-none flex flex-col flex-nowrap content-start items-start gap-[10px] h-[35px] justify-center overflow-hidden relative w-[500px] opacity-100 p-0 no-underline"
              >
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-6 overflow-hidden relative w-[500px] p-0">
                  <div className="flex-grow flex-shrink-0 flex-basis-0 content-center items-center justify-start flex flex-col flex-nowrap gap-[10px] h-6 overflow-visible relative w-[466px] p-0">
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]"
                      style={{ transform: 'matrix(1, 0, 0, 1, 0, -0.192135)' }}
                    >
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        +1 34566 4565
                      </p>
                    </div>
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]"
                      style={{ transform: 'matrix(1, 0, 0, 1, 0, -0.192135)' }}
                    >
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        +1 34566 4565
                      </p>
                    </div>
                  </div>
                  <div className="relative h-6 w-6 flex-shrink-0" aria-hidden="true">
                    <div className="w-6 h-6">
                      <Icon3 style={{}} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-px overflow-visible relative w-[500px] bg-[rgba(187,187,187,0.2)] p-0">
                  <div className="bottom-0 flex-grow-0 flex-shrink-0 flex-basis-auto h-px left-[-6px] overflow-hidden absolute w-px z-[1] bg-white origin-[0.5px_0.5px]"
                    style={{ transform: 'matrix(3.87638, 0, 0, 1, 1.43819, 0)' }}
                  ></div>
                </div>
              </a>
            </div>

            {/* Email Link */}
            <div className="flex-grow-0 flex-shrink-0 flex-basis-auto h-[35px] relative w-[500px]">
              <a
                href="mailto:dummy@mail.com"
                target="_blank"
                rel="noopener"
                className="box-border antialiased cursor-none flex flex-col flex-nowrap content-start items-start gap-[10px] h-[35px] justify-center overflow-hidden relative w-[500px] opacity-100 p-0 no-underline"
              >
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-6 overflow-hidden relative w-[500px] p-0">
                  <div className="flex-grow flex-shrink-0 flex-basis-0 content-center items-center justify-start flex flex-col flex-nowrap gap-[10px] h-6 overflow-visible relative w-[466px] p-0">
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]"
                      style={{ transform: 'matrix(1, 0, 0, 1, 0, -0.444084)' }}
                    >
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        sayhi@akihiko.com
                      </p>
                    </div>
                    <div className="relative outline-none flex flex-col flex-shrink-0 justify-start flex-grow-0 flex-basis-auto h-6 mix-blend-difference whitespace-normal break-words w-[466px] origin-[233px_12px]"
                      style={{ transform: 'matrix(1, 0, 0, 1, 0, -0.444084)' }}
                    >
                      <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-base leading-6 text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                        sayhi@akihiko.com
                      </p>
                    </div>
                  </div>
                  <div className="relative h-6 w-6 flex-shrink-0" aria-hidden="true">
                    <div className="w-6 h-6">
                      <Icon4 style={{}} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center items-center justify-center gap-[10px] h-px overflow-visible relative w-[500px] bg-[rgba(187,187,187,0.2)] p-0">
                  <div className="bottom-0 flex-grow-0 flex-shrink-0 flex-basis-auto h-px left-[-6px] overflow-hidden absolute w-px z-[1] bg-white origin-[0.5px_0.5px]"
                    style={{ transform: 'matrix(7.6482, 0, 0, 1, 3.3241, 0)' }}
                  ></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large "Contact Now" Text */}
      <p
        ref={largeTextRef}
        className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[236.319px] leading-[212.687px] tracking-[-12.47px] text-left whitespace-nowrap cursor-none p-0 m-0 no-underline w-full bg-black"
        style={{
          fontFeatureSettings: '"cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv07", "cv08", "cv09", "cv10", "cv12", "cv13", "ss01", "ss02", "ss07"',
        }}
      >
        Contact Now
      </p>
    </AppLayout>
  );
};

export default Contact;
