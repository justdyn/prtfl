import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Works: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingScrollRef = useRef<HTMLUListElement>(null);
  const headingContentRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate scrolling heading text
      if (headingScrollRef.current && headingContentRef.current) {
        const ul = headingScrollRef.current;
        const content = headingContentRef.current;
        const contentWidth = content.offsetWidth; // Use offsetWidth for actual rendered width
        
        // Set initial position (matching original transform: matrix(1, 0, 0, 1, -1293.04, 0))
        gsap.set(ul, {
          x: -1293.04,
        });
        
        // Animate infinite scroll - move by one content width
        gsap.to(ul, {
          x: -1293.04 - contentWidth,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });

        // Fade in heading on scroll
        gsap.fromTo(
          headingScrollRef.current,
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
              trigger: headingScrollRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate project cards on scroll
      projectCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el: HTMLAnchorElement | null) => {
    if (el) {
      projectCardsRef.current.push(el);
    }
  };

  return (
      <section
      ref={sectionRef}
      className="bg-black w-full max-w-[1480px] h-[3088.8px] relative pt-[180px] text-[12px] leading-normal font-sans box-border antialiased cursor-none flex flex-col flex-nowrap content-start justify-center items-start gap-[50px] overflow-x-hidden overflow-y-hidden"
    >
      {/* Top Section Label */}
      <div className="w-[1480px] h-6 relative flex-shrink-0 flex-grow-0 flex-basis-auto">
        <div className="flex flex-col flex-nowrap content-center justify-center items-center gap-[10px] w-[1480px] h-6 relative overflow-hidden p-0">
          <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-between items-center w-[1480px] h-[13px] relative overflow-hidden px-6">
            <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-start items-center gap-[350px] w-[658.362px] h-[13px] relative overflow-hidden p-0">
              <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[228.175px] h-[13px] relative overflow-hidden p-0">
                <div className="relative outline-none flex flex-col flex-shrink-0 justify-start w-[228.175px] h-[13px] whitespace-nowrap flex-grow-0 flex-basis-auto">
                  <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-[13px] leading-[13px] uppercase text-left box-border antialiased cursor-none p-0 m-0 no-underline text-white">
                      © Featured Projects プロジェクト
                    </h6>
                  </div>
                </div>
              <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[80.1875px] h-[13px] relative overflow-hidden p-0">
                <div className="relative outline-none flex flex-col flex-shrink-0 justify-start w-[80.1875px] h-[13px] whitespace-nowrap flex-grow-0 flex-basis-auto">
                  <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-[13px] leading-[13px] uppercase text-left box-border antialiased cursor-none p-0 m-0 no-underline text-[#bbbbbb]">
                      (WDX® — 03)
                    </h6>
                  </div>
                </div>
              </div>
            <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[155.262px] h-[13px] relative overflow-hidden p-0">
              <div className="relative outline-none flex flex-col flex-shrink-0 justify-start w-[155.262px] h-[13px] whitespace-nowrap flex-grow-0 flex-basis-auto">
                <h6 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-normal text-[13px] leading-[13px] uppercase text-left box-border antialiased cursor-none p-0 m-0 no-underline text-[#bbbbbb]">
                    Creative Development
                  </h6>
                </div>
              </div>
            </div>
          <div className="w-[1480px] h-px relative overflow-hidden bg-[rgba(187,187,187,0.2)] flex-grow-0 flex-shrink-0 flex-basis-auto"></div>
          </div>
        </div>

      {/* Main Content */}
      <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-0 w-[1480px] h-[2834.8px] relative overflow-hidden p-0">
        <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-center items-start gap-[50px] w-[1480px] h-[485.8px] relative overflow-hidden p-0">
          {/* Scrolling Heading Section */}
          <div className="w-[1480px] h-[200px] relative flex-grow-0 flex-shrink-0 flex-basis-auto">
            <div className="flex flex-col flex-nowrap content-center justify-center items-center gap-[10px] w-[1480px] h-[200px] relative overflow-hidden p-0">
              <div className="w-[1480px] h-[200px] relative flex-grow-0 flex-shrink-0 flex-basis-auto">
                <section className="w-[1480px] h-[200px] max-w-full max-h-full flex items-center justify-center list-none p-[10px] m-0">
                  <ul
                    ref={headingScrollRef}
                    className="box-border antialiased cursor-none flex w-[1460px] h-[180px] max-w-full max-h-full items-center justify-center list-none gap-0 relative flex-row will-change-transform p-0 m-0"
                  >
                    <li aria-hidden="false">
                      <div
                        ref={headingContentRef}
                        className="flex flex-row flex-nowrap content-center justify-center items-center gap-[10px] w-[1598.97px] h-[168px] relative overflow-hidden flex-shrink-0 p-0"
                      >
                        <div className="relative outline-none flex flex-col flex-shrink-0 justify-start mix-blend-difference whitespace-nowrap flex-grow-0 flex-basis-auto w-[1598.97px] h-[168px] will-change-transform">
                          <h1 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[208px] leading-[168px] tracking-[-8px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap"
                            style={{
                              fontFeatureSettings: '"salt", "ss01", "ss02", "ss03", "ss04", "ss07"',
                            }}
                          >
                            Featured Works© 
                          </h1>
                          </div>
                        </div>
                      </li>
                    <li aria-hidden="false" className="will-change-transform">
                      <div className="flex flex-row flex-nowrap content-center justify-center items-center gap-[10px] w-[1598.97px] h-[168px] relative overflow-hidden flex-shrink-0 p-0">
                        <div className="relative outline-none flex flex-col flex-shrink-0 justify-start mix-blend-difference whitespace-nowrap flex-grow-0 flex-basis-auto w-[1598.97px] h-[168px] will-change-transform">
                          <h1 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[208px] leading-[168px] tracking-[-8px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap"
                          style={{
                              fontFeatureSettings: '"salt", "ss01", "ss02", "ss03", "ss04", "ss07"',
                            }}
                          >
                            Featured Works© 
                          </h1>
                          </div>
                        </div>
                      </li>
                    <li aria-hidden="true" className="will-change-transform">
                      <div className="flex flex-row flex-nowrap content-center justify-center items-center gap-[10px] w-[1598.97px] h-[168px] relative overflow-hidden flex-shrink-0 p-0">
                        <div className="relative outline-none flex flex-col flex-shrink-0 justify-start mix-blend-difference whitespace-nowrap flex-grow-0 flex-basis-auto w-[1598.97px] h-[168px] will-change-transform">
                          <h1 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[208px] leading-[168px] tracking-[-8px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap"
                          style={{
                              fontFeatureSettings: '"salt", "ss01", "ss02", "ss03", "ss04", "ss07"',
                            }}
                          >
                            Featured Works© 
                          </h1>
                          </div>
                        </div>
                      </li>
                    <li aria-hidden="true" className="will-change-transform">
                      <div className="flex flex-row flex-nowrap content-center justify-center items-center gap-[10px] w-[1598.97px] h-[168px] relative overflow-hidden flex-shrink-0 p-0">
                        <div className="relative outline-none flex flex-col flex-shrink-0 justify-start mix-blend-difference whitespace-nowrap flex-grow-0 flex-basis-auto w-[1598.97px] h-[168px] will-change-transform">
                          <h1 className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[208px] leading-[168px] tracking-[-8px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap"
                          style={{
                              fontFeatureSettings: '"salt", "ss01", "ss02", "ss03", "ss04", "ss07"',
                            }}
                          >
                            Featured Works© 
                          </h1>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>

          <div className="w-[1480px] h-px relative overflow-hidden bg-[rgba(187,187,187,0.2)] flex-grow-0 flex-shrink-0 flex-basis-auto"></div>

          {/* Description and Button */}
          <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-center items-start gap-[40px] w-[570px] max-w-[570px] h-[184.8px] relative overflow-hidden px-6">
            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-normal break-words flex-grow-0 flex-basis-auto w-[522px] max-w-[540px] h-[100.8px]">
              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-[#bbbbbb] text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0">
                  Every project is a chance to blend design and development,
                  shaping bold interactive ideas into{" "}
                <span className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] text-white text-[19px] leading-[25.2px] no-underline">
                  <strong className="box-border antialiased cursor-none font-bold">
                      sleek digital{" "}
                    <br />
                      realities — built with
                    </strong>
                  </span>
                  intent, speed, and visual clarity that attracts lot of
                  peoples.
                </p>
              </div>
            <div className="w-[167.1px] h-11 relative flex-grow-0 flex-shrink-0 flex-basis-auto">
                <a
                  href="./work"
                className="will-change-auto flex justify-center w-[167.1px] h-11 overflow-hidden rounded-[259px] relative no-underline box-border antialiased cursor-none flex-row flex-nowrap content-center items-center gap-[10px] p-0"
              >
                <div className="absolute top-[47.9875px] left-0 right-0 overflow-visible h-[6px] bg-white rounded-[30px] flex-grow-0 flex-shrink-0 flex-basis-auto"></div>
                <div className="mix-blend-difference flex-grow-0 flex-shrink-0 flex-basis-auto w-[167.1px] h-11 relative">
                  <div className="flex items-center justify-center w-[167.1px] h-11 overflow-hidden p-3">
                    <p className="align-top flex overflow-hidden w-[131.1px] text-[23px] uppercase select-none text-shadow-[rgb(255,255,255)_0px_20px_0px]">
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          S
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          E
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          E
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                        {" "}
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          W
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          O
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          R
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          K
                        </span>
                      <span className="block backface-hidden whitespace-pre flex-shrink-0 font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-bold text-[23px] leading-5 tracking-[-0.3px] text-white">
                          S
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        {/* Projects Grid */}
        <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-start items-start gap-0 w-[1480px] h-[2349px] relative overflow-hidden px-6">
          <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[160px] w-[1432px] h-[2349px] relative overflow-hidden p-0">
            {/* Row 1 */}
            <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-between items-start w-[1432px] h-[849px] relative overflow-hidden p-0">
              {/* Sonder Goods */}
              <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[716px] h-[849px] relative overflow-hidden pt-[100px]">
                <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-center items-start gap-[20px] w-[716px] h-[749px] relative p-0">
                    <a
                      href="./work/sonder-goods"
                    ref={addToCardsRef}
                    className="flex-grow-0 flex-shrink-0 flex-basis-auto justify-start w-[716px] h-[749px] relative no-underline box-border antialiased cursor-none flex-row flex-nowrap content-center items-center gap-[10px] p-0"
                  >
                    <div className="flex-grow flex-shrink-0 flex-basis-0 w-[716px] h-[749px] relative">
                      <div className="flex flex-col flex-nowrap content-start justify-center items-start gap-[14px] w-[716px] h-[749px] relative overflow-hidden p-0">
                        <div className="will-change-auto flex flex-col flex-nowrap flex-grow flex-shrink-0 flex-basis-0 content-center justify-center items-center gap-[10px] w-[716px] h-[709.8px] relative overflow-hidden bg-black rounded-[10px] p-0">
                          <div className="z-[1] flex-grow-0 flex-shrink-0 flex-basis-auto w-[716px] h-[709.8px] absolute top-0 left-0 overflow-visible">
                            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                <img
                                  decoding="auto"
                                  width="896"
                                  height="1280"
                                  sizes="max((min(100vw, 1480px) - 48px) * 0.5014, 1px)"
                                srcSet="https://framerusercontent.com/images/wA52DtSvQDx894hqLZv4ezfKfz8.png?scale-down-to=1024 716w,https://framerusercontent.com/images/wA52DtSvQDx894hqLZv4ezfKfz8.png 896w"
                                  src="https://framerusercontent.com/images/wA52DtSvQDx894hqLZv4ezfKfz8.png"
                                  alt="Rocks"
                                className="w-[716px] h-[709.8px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                              />
                              </div>
                            </div>
                          <div className="will-change-auto flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[358px] h-[354.9px] relative overflow-hidden rounded-[10px] p-0">
                            <div className="z-[1] flex-grow flex-shrink-0 flex-basis-0 w-[358px] h-[354.9px] relative">
                              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                  <img
                                    decoding="auto"
                                    width="1024"
                                    height="1024"
                                    sizes="max(max((min(100vw, 1480px) - 48px) * 0.5014, 1px) / 2, 1px)"
                                  srcSet="https://framerusercontent.com/images/WSIwyrpSzX4O0fiESBwPTjSWBE.png?scale-down-to=512 512w,https://framerusercontent.com/images/WSIwyrpSzX4O0fiESBwPTjSWBE.png 1024w"
                                    src="https://framerusercontent.com/images/WSIwyrpSzX4O0fiESBwPTjSWBE.png"
                                    alt="Man"
                                  className="w-[358px] h-[354.9px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                                />
                                </div>
                              </div>
                            </div>
                            </div>
                        <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-between items-center w-[716px] h-[25.2px] relative overflow-hidden p-0">
                          <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-start items-center gap-0 w-[120.875px] h-[25px] relative overflow-hidden p-0">
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[120.875px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Sonder Goods
                                </p>
                              </div>
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[120.875px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Sonder Goods
                                </p>
                              </div>
                            </div>
                          <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[30.7125px] h-[25.2px]">
                            <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                (01)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

              {/* Halo Wear */}
              <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[501.2px] h-[390px] relative overflow-hidden p-0">
                <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-center items-start gap-[20px] w-[501.2px] h-[390px] relative p-0">
                    <a
                      href="./work/halo-wear"
                    ref={addToCardsRef}
                    className="flex-grow-0 flex-shrink-0 flex-basis-auto justify-start w-[501.2px] h-[390px] relative no-underline box-border antialiased cursor-none flex-row flex-nowrap content-center items-center gap-[10px] p-0"
                  >
                    <div className="flex-grow flex-shrink-0 flex-basis-0 w-[501.2px] h-[390px] relative">
                      <div className="flex flex-col flex-nowrap content-start justify-center items-start gap-[14px] w-[501.2px] h-[390px] relative overflow-hidden p-0">
                        <div className="will-change-auto flex flex-col flex-nowrap flex-grow flex-shrink-0 flex-basis-0 content-center justify-center items-center gap-[10px] w-[501.2px] h-[350.8px] relative overflow-hidden bg-black rounded-[10px] p-0">
                          <div className="z-[1] flex-grow-0 flex-shrink-0 flex-basis-auto w-[501.2px] h-[350.8px] absolute top-0 left-0 overflow-visible">
                            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                <img
                                  decoding="auto"
                                  width="1408"
                                  height="768"
                                  sizes="max((min(100vw, 1480px) - 48px) * 0.3506, 1px)"
                                srcSet="https://framerusercontent.com/images/IhwR33YbJAKylGnbmoCW4maBHI.png?scale-down-to=512 512w,https://framerusercontent.com/images/IhwR33YbJAKylGnbmoCW4maBHI.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/IhwR33YbJAKylGnbmoCW4maBHI.png 1408w"
                                  src="https://framerusercontent.com/images/IhwR33YbJAKylGnbmoCW4maBHI.png"
                                  alt="Man B&W"
                                className="w-[501.2px] h-[350.8px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                              />
                              </div>
                            </div>
                          <div className="will-change-auto flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[250.6px] h-[175.4px] relative overflow-hidden rounded-[10px] p-0">
                            <div className="z-[1] flex-grow flex-shrink-0 flex-basis-0 w-[250.6px] h-[175.4px] relative">
                              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                  <img
                                    decoding="auto"
                                    width="1280"
                                    height="896"
                                    sizes="max(max((min(100vw, 1480px) - 48px) * 0.3506, 1px) / 2, 1px)"
                                  srcSet="https://framerusercontent.com/images/tkYEeCoj1udozbnzQynoaYqCI.png?scale-down-to=512 512w,https://framerusercontent.com/images/tkYEeCoj1udozbnzQynoaYqCI.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/tkYEeCoj1udozbnzQynoaYqCI.png 1280w"
                                    src="https://framerusercontent.com/images/tkYEeCoj1udozbnzQynoaYqCI.png"
                                    alt="Woman Side Pose"
                                  className="w-[250.6px] h-[175.4px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                                />
                                </div>
                              </div>
                            </div>
                            </div>
                        <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-between items-center w-[501.2px] h-[25.2px] relative overflow-hidden p-0">
                          <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-start items-center gap-0 w-[87.1875px] h-[25px] relative overflow-hidden p-0">
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[87.1875px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Halo Wear
                                </p>
                              </div>
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[87.1875px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Halo Wear
                                </p>
                              </div>
                            </div>
                          <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[34.55px] h-[25.2px]">
                            <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                (02)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

            {/* Row 2 */}
            <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[1432px] h-[590px] relative overflow-hidden p-0">
              {/* Lucent Lab */}
              <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-center items-start gap-[20px] w-[458.237px] h-[590px] relative p-0">
                  <a
                    href="./work/lucent-lab"
                  ref={addToCardsRef}
                  className="flex-grow-0 flex-shrink-0 flex-basis-auto justify-start w-[458.237px] h-[590px] relative no-underline box-border antialiased cursor-none flex-row flex-nowrap content-center items-center gap-[10px] p-0"
                >
                  <div className="flex-grow flex-shrink-0 flex-basis-0 w-[458.237px] h-[590px] relative">
                    <div className="flex flex-col flex-nowrap content-start justify-center items-start gap-[14px] w-[458.237px] h-[590px] relative overflow-hidden p-0">
                      <div className="will-change-auto flex flex-col flex-nowrap flex-grow flex-shrink-0 flex-basis-0 content-center justify-center items-center gap-[10px] w-[458.237px] h-[550.8px] relative overflow-hidden bg-black rounded-[10px] p-0">
                        <div className="z-[1] flex-grow-0 flex-shrink-0 flex-basis-auto w-[458.237px] h-[550.8px] absolute top-0 left-0 overflow-visible">
                          <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                              <img
                                decoding="auto"
                                width="768"
                                height="1408"
                                sizes="max((min(100vw, 1480px) - 48px) * 0.3218, 1px)"
                              srcSet="https://framerusercontent.com/images/G891sPJdh93gPfGSBboEt88Now.png?scale-down-to=1024 558w,https://framerusercontent.com/images/G891sPJdh93gPfGSBboEt88Now.png 768w"
                                src="https://framerusercontent.com/images/G891sPJdh93gPfGSBboEt88Now.png"
                                alt="Pool"
                              className="w-[458.237px] h-[550.8px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                            />
                            </div>
                          </div>
                        <div className="will-change-auto flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[229.113px] h-[275.4px] relative overflow-hidden rounded-[10px] p-0">
                          <div className="z-[1] flex-grow flex-shrink-0 flex-basis-0 w-[229.113px] h-[275.4px] relative">
                            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                <img
                                  decoding="auto"
                                  width="1200"
                                  height="673"
                                  sizes="max(max((min(100vw, 1480px) - 48px) * 0.3218, 1px) / 2, 1px)"
                                srcSet="https://framerusercontent.com/images/YIi7jRxIe8p6gLtM1ZMNpJyVYs.jpeg?scale-down-to=512 512w,https://framerusercontent.com/images/YIi7jRxIe8p6gLtM1ZMNpJyVYs.jpeg?scale-down-to=1024 1024w,https://framerusercontent.com/images/YIi7jRxIe8p6gLtM1ZMNpJyVYs.jpeg 1200w"
                                  src="https://framerusercontent.com/images/YIi7jRxIe8p6gLtM1ZMNpJyVYs.jpeg"
                                  alt="Woman Side Pose"
                                className="w-[229.113px] h-[275.4px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                              />
                              </div>
                            </div>
                          </div>
                          </div>
                      <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-between items-center w-[458.237px] h-[25.2px] relative overflow-hidden p-0">
                        <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-start items-center gap-0 w-[94.175px] h-[25px] relative overflow-hidden p-0">
                          <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[94.175px] h-[25.2px]">
                            <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                Lucent Lab
                              </p>
                            </div>
                          <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[94.175px] h-[25.2px]">
                            <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                Lucent Lab
                              </p>
                            </div>
                          </div>
                        <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[35.1625px] h-[25.2px]">
                          <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                              (03)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

            {/* Row 3 */}
            <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-end justify-between items-end w-[1432px] h-[590px] relative overflow-hidden p-0">
              {/* Arc & Bloom */}
              <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[458.237px] h-[490px] relative overflow-hidden pt-[100px]">
                <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-center items-start gap-[20px] w-[458.237px] h-[390px] relative p-0">
                    <a
                      href="./work/arc-bloom"
                    ref={addToCardsRef}
                    className="flex-grow-0 flex-shrink-0 flex-basis-auto justify-start w-[458.237px] h-[390px] relative no-underline box-border antialiased cursor-none flex-row flex-nowrap content-center items-center gap-[10px] p-0"
                  >
                    <div className="flex-grow flex-shrink-0 flex-basis-0 w-[458.237px] h-[390px] relative">
                      <div className="flex flex-col flex-nowrap content-start justify-center items-start gap-[14px] w-[458.237px] h-[390px] relative overflow-hidden p-0">
                        <div className="will-change-auto flex flex-col flex-nowrap flex-grow flex-shrink-0 flex-basis-0 content-center justify-center items-center gap-[10px] w-[458.237px] h-[350.8px] relative overflow-hidden bg-black rounded-[10px] p-0">
                          <div className="z-[1] flex-grow-0 flex-shrink-0 flex-basis-auto w-[458.237px] h-[350.8px] absolute top-0 left-0 overflow-visible">
                            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                <img
                                  decoding="auto"
                                  width="1280"
                                  height="896"
                                  sizes="max((min(100vw, 1480px) - 48px) * 0.3218, 1px)"
                                srcSet="https://framerusercontent.com/images/kSBqNFitJQuBzXuk7tl1FqlAHhs.png?scale-down-to=512 512w,https://framerusercontent.com/images/kSBqNFitJQuBzXuk7tl1FqlAHhs.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/kSBqNFitJQuBzXuk7tl1FqlAHhs.png 1280w"
                                  src="https://framerusercontent.com/images/kSBqNFitJQuBzXuk7tl1FqlAHhs.png"
                                  alt="Woman Side Pose"
                                className="w-[458.237px] h-[350.8px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                              />
                              </div>
                            </div>
                          <div className="will-change-auto flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[229.113px] h-[175.4px] relative overflow-hidden rounded-[10px] p-0">
                            <div className="z-[1] flex-grow flex-shrink-0 flex-basis-0 w-[229.113px] h-[175.4px] relative">
                              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                  <img
                                    decoding="auto"
                                    width="1280"
                                    height="896"
                                    sizes="max(max((min(100vw, 1480px) - 48px) * 0.3218, 1px) / 2, 1px)"
                                  srcSet="https://framerusercontent.com/images/Jt7zqgTjQMYT15YvEkLGKiF9Cw.png?scale-down-to=512 512w,https://framerusercontent.com/images/Jt7zqgTjQMYT15YvEkLGKiF9Cw.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/Jt7zqgTjQMYT15YvEkLGKiF9Cw.png 1280w"
                                    src="https://framerusercontent.com/images/Jt7zqgTjQMYT15YvEkLGKiF9Cw.png"
                                    alt="Woman On The Chair"
                                  className="w-[229.113px] h-[175.4px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                                />
                                </div>
                              </div>
                            </div>
                            </div>
                        <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-between items-center w-[458.237px] h-[25.2px] relative overflow-hidden p-0">
                          <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-start items-center gap-0 w-[103.912px] h-[25px] relative overflow-hidden p-0">
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[103.912px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Arc & Bloom
                                </p>
                              </div>
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[103.912px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Arc & Bloom
                                </p>
                              </div>
                            </div>
                          <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[35.6375px] h-[25.2px]">
                            <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                (04)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

              {/* Atelier Nara */}
              <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[458.237px] h-[590px] relative overflow-hidden pt-[100px]">
                <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-start justify-center items-start gap-[20px] w-[458.237px] h-[490px] relative p-0">
                    <a
                      href="./work/atelier-nara"
                    ref={addToCardsRef}
                    className="flex-grow-0 flex-shrink-0 flex-basis-auto justify-start w-[458.237px] h-[490px] relative no-underline box-border antialiased cursor-none flex-row flex-nowrap content-center items-center gap-[10px] p-0"
                  >
                    <div className="flex-grow flex-shrink-0 flex-basis-0 w-[458.237px] h-[490px] relative">
                      <div className="flex flex-col flex-nowrap content-start justify-center items-start gap-[14px] w-[458.237px] h-[490px] relative overflow-hidden p-0">
                        <div className="will-change-auto flex flex-col flex-nowrap flex-grow flex-shrink-0 flex-basis-0 content-center justify-center items-center gap-[10px] w-[458.237px] h-[450.8px] relative overflow-hidden bg-black rounded-[10px] p-0">
                          <div className="z-[1] flex-grow-0 flex-shrink-0 flex-basis-auto w-[458.237px] h-[450.8px] absolute top-0 left-0 overflow-visible">
                            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                <img
                                  decoding="auto"
                                  width="1024"
                                  height="1024"
                                  sizes="max((min(100vw, 1480px) - 48px) * 0.3218, 1px)"
                                srcSet="https://framerusercontent.com/images/svmMd86RbsKfib7KzvpKAUsHrk.png?scale-down-to=512 512w,https://framerusercontent.com/images/svmMd86RbsKfib7KzvpKAUsHrk.png 1024w"
                                  src="https://framerusercontent.com/images/svmMd86RbsKfib7KzvpKAUsHrk.png"
                                  alt="Glass Mirror"
                                className="w-[458.237px] h-[450.8px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                              />
                              </div>
                            </div>
                          <div className="will-change-auto flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-center items-center gap-[10px] w-[229.113px] h-[225.4px] relative overflow-hidden rounded-[10px] p-0">
                            <div className="z-[1] flex-grow flex-shrink-0 flex-basis-0 w-[229.113px] h-[225.4px] relative">
                              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-none">
                                  <img
                                    decoding="auto"
                                    width="1024"
                                    height="1024"
                                    sizes="max(max((min(100vw, 1480px) - 48px) * 0.3218, 1px) / 2, 1px)"
                                  srcSet="https://framerusercontent.com/images/7WVAcnCw5jrTdcET3CmMrpU7gf0.png?scale-down-to=512 512w,https://framerusercontent.com/images/7WVAcnCw5jrTdcET3CmMrpU7gf0.png 1024w"
                                    src="https://framerusercontent.com/images/7WVAcnCw5jrTdcET3CmMrpU7gf0.png"
                                    alt="Woman"
                                  className="w-[229.113px] h-[225.4px] block box-border antialiased cursor-none object-cover object-center rounded-none"
                                />
                                </div>
                              </div>
                            </div>
                            </div>
                        <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-between items-center w-[458.237px] h-[25.2px] relative overflow-hidden p-0">
                          <div className="flex flex-col flex-nowrap flex-grow-0 flex-shrink-0 flex-basis-auto content-center justify-start items-center gap-0 w-[98.125px] h-[25px] relative overflow-hidden p-0">
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[98.125px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Atelier Nara
                                </p>
                              </div>
                            <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[98.125px] h-[25.2px]">
                              <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                  Atelier Nara
                                </p>
                              </div>
                            </div>
                          <div className="relative outline-none flex flex-col flex-shrink-0 justify-start whitespace-nowrap flex-grow-0 flex-basis-auto w-[34.75px] h-[25.2px]">
                            <p className="font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-left box-border antialiased cursor-none p-0 m-0 no-underline whitespace-nowrap">
                                (05)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Works;
