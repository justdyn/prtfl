import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppLayout from "../layouts/app-layout";

gsap.registerPlugin(ScrollTrigger);

const Works: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading section
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
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
              trigger: headingRef.current,
              start: 'top 90%',
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
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: countRef.current,
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

  const addToCardsRef = useCallback((el: HTMLAnchorElement | null) => {
    if (el && !projectCardsRef.current.includes(el)) {
      projectCardsRef.current.push(el);
    }
  }, []);

  const projects = [
    {
      href: "./work/sonder-goods",
      title: "Sonder Goods",
      number: "(01)",
      mainImage: "https://framerusercontent.com/images/wA52DtSvQDx894hqLZv4ezfKfz8.png",
      overlayImage: "https://framerusercontent.com/images/WSIwyrpSzX4O0fiESBwPTjSWBE.png",
      mainImageWidth: 896,
      mainImageHeight: 1280,
      overlayImageWidth: 1024,
      overlayImageHeight: 1024,
      titleWidth: "120.875px",
    },
    {
      href: "./work/halo-wear",
      title: "Halo Wear",
      number: "(02)",
      mainImage: "https://framerusercontent.com/images/IhwR33YbJAKylGnbmoCW4maBHI.png",
      overlayImage: "https://framerusercontent.com/images/tkYEeCoj1udozbnzQynoaYqCI.png",
      mainImageWidth: 1408,
      mainImageHeight: 768,
      overlayImageWidth: 1280,
      overlayImageHeight: 896,
      titleWidth: "87.1875px",
    },
    {
      href: "./work/lucent-lab",
      title: "Lucent Lab",
      number: "(03)",
      mainImage: "https://framerusercontent.com/images/G891sPJdh93gPfGSBboEt88Now.png",
      overlayImage: "https://framerusercontent.com/images/YIi7jRxIe8p6gLtM1ZMNpJyVYs.jpeg",
      mainImageWidth: 768,
      mainImageHeight: 1408,
      overlayImageWidth: 1200,
      overlayImageHeight: 673,
      titleWidth: "94.175px",
    },
    {
      href: "./work/arc-bloom",
      title: "Arc & Bloom",
      number: "(04)",
      mainImage: "https://framerusercontent.com/images/kSBqNFitJQuBzXuk7tl1FqlAHhs.png",
      overlayImage: "https://framerusercontent.com/images/Jt7zqgTjQMYT15YvEkLGKiF9Cw.png",
      mainImageWidth: 1280,
      mainImageHeight: 896,
      overlayImageWidth: 1280,
      overlayImageHeight: 896,
      titleWidth: "103.912px",
    },
    {
      href: "./work/atelier-nara",
      title: "Atelier Nara",
      number: "(05)",
      mainImage: "https://framerusercontent.com/images/svmMd86RbsKfib7KzvpKAUsHrk.png",
      overlayImage: "https://framerusercontent.com/images/7WVAcnCw5jrTdcET3CmMrpU7gf0.png",
      mainImageWidth: 1024,
      mainImageHeight: 1024,
      overlayImageWidth: 1024,
      overlayImageHeight: 1024,
      titleWidth: "98.125px",
    },
  ];

  return (
    <AppLayout>
      <section
        ref={sectionRef}
        className="box-border antialiased cursor-none flex flex-row flex-nowrap gap-[50px] h-[3068px] justify-center overflow-x-visible overflow-y-visible relative w-full px-6 bg-black text-black text-xs leading-normal font-sans"
      >
        {/* Left Sidebar - Sticky Heading */}
        <div className="flex flex-row flex-nowrap gap-[10px] h-[612px] justify-start overflow-hidden sticky top-[130px] w-[666px] z-[1] pt-[252px] pb-6 flex-1 shrink-0 basis-0">
          <div className="flex flex-row flex-nowrap gap-[10px] h-[336px] justify-start overflow-hidden relative w-[666px] p-0 flex-1 shrink-0 basis-0 content-end items-end">
            <div
              ref={headingRef}
              className="relative outline-none flex-col shrink-0 justify-start flex grow-0 basis-auto h-[336px] mix-blend-difference whitespace-nowrap w-[561.05px] transform-none"
            >
              <h1
                className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-semibold text-white text-[208px] leading-[168px] tracking-[-8px] text-left whitespace-nowrap bg-transparent p-0 m-0 no-underline"
                style={{
                  fontFeatureSettings: '"salt", "ss01", "ss02", "ss03", "ss04", "ss07"',
                }}
              >
                All
                <br className="box-border antialiased" />
                Works
              </h1>
            </div>
            <div className="flex flex-col flex-nowrap gap-[10px] h-[168.6px] justify-center overflow-hidden relative w-[56.5625px] pb-[118px] shrink-0 grow-0 basis-auto content-center items-center">
              <div
                ref={countRef}
                className="relative outline-none flex-col shrink-0 justify-start flex grow-0 basis-auto h-[50.6px] mix-blend-difference whitespace-nowrap w-[56.5625px] transform-none"
              >
                <h3
                  className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[49px] leading-[50.6px] tracking-[-0.8px] text-start whitespace-nowrap bg-transparent p-0 m-0 no-underline"
                  style={{
                    fontFeatureSettings: '"cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv08", "cv10", "cv12", "cv13", "ss02", "ss03", "ss07"',
                  }}
                >
                  (5)
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Project Cards */}
        <div className="flex flex-col flex-nowrap gap-[10px] h-[3068px] justify-center overflow-hidden relative w-[716px] py-6 pl-6 shrink-0 grow-0 basis-auto content-center items-center">
          <div className="flex flex-col flex-nowrap gap-5 justify-center relative w-[692px] pt-[90px] content-start items-start shrink-0 grow-0 basis-auto">
            {projects.map((project, index) => (
              <a
                key={index}
                ref={addToCardsRef}
                href={project.href}
                className="box-border antialiased cursor-none flex flex-row flex-nowrap gap-[10px] h-[570px] justify-start relative w-[692px] p-0 no-underline shrink-0 grow-0 basis-auto content-center items-center"
              >
                <div className="flex-1 shrink-0 basis-0 h-[570px] relative w-[692px]">
                  <div className="flex flex-col flex-nowrap gap-[14px] w-[692px] h-[570px] relative overflow-hidden p-0 content-start justify-center items-start">
                    {/* Image Container */}
                    <div className="flex flex-col flex-nowrap gap-[10px] w-[692px] h-[530.8px] relative overflow-hidden bg-black rounded-[10px] p-0 flex-1 shrink-0 basis-0 content-center justify-center items-center">
                      {/* Main Background Image */}
                      <div className="z-[1] shrink-0 grow-0 basis-auto w-[692px] h-[530.8px] absolute top-0 left-0 overflow-visible will-change-transform">
                        <div className="absolute inset-0 rounded-none">
                        <img
                          decoding="auto"
                          loading="lazy"
                            width={project.mainImageWidth}
                            height={project.mainImageHeight}
                          sizes="max((min(100vw, 1480px) - 48px) * 0.5014 - 24px, 1px)"
                            srcSet={`${project.mainImage}?scale-down-to=1024 716w,${project.mainImage} 896w`}
                            src={project.mainImage}
                            alt={project.title}
                            className="box-border antialiased cursor-none block object-cover object-center rounded-none w-[692px] h-[530.8px]"
                          />
                      </div>
                    </div>
                      {/* Overlay Image */}
                      <div className="flex flex-row flex-nowrap gap-[10px] w-[346px] h-[265.4px] relative overflow-hidden rounded-[10px] p-0 shrink-0 grow-0 basis-auto content-center justify-center items-center">
                        <div className="z-[1] flex-1 shrink-0 basis-0 w-[346px] h-[265.4px] relative transform-none will-change-transform">
                          <div className="absolute inset-0 rounded-none">
                          <img
                            decoding="auto"
                            loading="lazy"
                              width={project.overlayImageWidth}
                              height={project.overlayImageHeight}
                            sizes="max(max((min(100vw, 1480px) - 48px) * 0.5014 - 24px, 1px) / 2, 1px)"
                              srcSet={`${project.overlayImage}?scale-down-to=512 512w,${project.overlayImage} ${project.overlayImageWidth}w`}
                              src={project.overlayImage}
                              alt={project.title}
                              className="box-border antialiased cursor-none block object-cover object-center rounded-none w-[346px] h-[265.4px]"
                            />
                        </div>
                      </div>
                    </div>
                      {/* Hidden Divider Line */}
                      <div className="z-[1] flex flex-row flex-nowrap gap-[300px] w-[692px] h-6 min-h-6 absolute top-[265.4px] left-0 overflow-hidden opacity-0 transform -translate-y-3 will-change-transform p-0 shrink-0 grow-0 basis-auto content-center justify-center items-center">
                        <div className="shrink-0 grow-0 basis-auto w-[692px] h-px absolute top-[11.5px] left-0 overflow-visible bg-white transform-none origin-[346px_0.5px]" />
                    </div>
                  </div>
                    {/* Text Section */}
                    <div className="flex flex-row flex-nowrap gap-0 w-[692px] h-[25.2px] relative overflow-hidden p-0 shrink-0 grow-0 basis-auto content-center justify-between items-center">
                      <div className="flex flex-col flex-nowrap gap-0 w-auto h-[25px] relative overflow-hidden p-0 shrink-0 grow-0 basis-auto content-center justify-start items-center" style={{ width: project.titleWidth }}>
                        <div className="relative outline-none flex-col shrink-0 justify-start flex grow-0 basis-auto w-full h-[25.2px] transform-none whitespace-nowrap">
                          <p className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-start whitespace-nowrap bg-transparent p-0 m-0 no-underline cursor-none">
                            {project.title}
                          </p>
                      </div>
                        <div className="relative outline-none flex-col shrink-0 justify-start flex grow-0 basis-auto w-full h-[25.2px] transform-none whitespace-nowrap">
                          <p className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-start whitespace-nowrap bg-transparent p-0 m-0 no-underline cursor-none">
                            {project.title}
                          </p>
                      </div>
                    </div>
                      <div className="relative outline-none flex-col shrink-0 justify-start flex grow-0 basis-auto w-auto h-[25.2px] transform-none whitespace-nowrap">
                        <p className="box-border antialiased font-['Inter_Display','Inter_Display_Placeholder',sans-serif] font-medium text-white text-[19px] leading-[25.2px] text-start whitespace-nowrap bg-transparent p-0 m-0 no-underline cursor-none">
                          {project.number}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            ))}
                      </div>
          <span className="box-border antialiased block shrink grow-0 basis-auto h-[3068px] overflow-visible absolute w-[716px] p-0" />
        </div>
      </section>
        </AppLayout>
    );
};

export default Works;
