'use client';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ColoredSection from './ColoredSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function References() {
  const imag = [
    {
      org: '/images/1.jpg',
      hvr: '/images/1h.svg',
      link: 'http://gecskp.ac.in',
    },
    {
      org: '/images/2.jpg',
      hvr: '/images/2h.svg',
      link: 'https://digipay.dtekerala.gov.in',
    },
    {
      org: '/images/3.jpg',
      hvr: '/images/3h.svg',
      link: 'https://ktu.edu.in/',
    },
    {
      org: '/images/4.png',
      hvr: '/images/4h.png',
      link: 'https://www.ktunotes.in/ktu-2019-scheme-question-papers/',
    },
    {
      org: '/images/5.jpg',
      hvr: '/images/5h.svg',
      link: 'https://ktu.edu.in/academics/scheme',
    },
    {
      org: '/images/6.jpg',
      hvr: '/images/6h.svg',
      link: 'https://ktu.edu.in/academics/scheme',
    },
    {
      org: '/images/7.jpg',
      hvr: '/images/7h.svg',
      link: 'https://digipay.dtekerala.gov.in/',
    },
    {
      org: '/images/8.jpg',
      hvr: '/images/8h.svg',
      link: 'https://gecskp.etlab.in/',
    },
    {
      org: '/images/9.jpg',
      hvr: '/images/9h.svg',
      link: 'https://gecskp.etlab.in/',
    },
  ];

  const comp = useRef(null);
  const animatedRef = useRef(null);

  useGSAP(
    () => {
      if (!comp.current || !animatedRef.current) return;

      gsap.from(comp.current, {
        scrollTrigger: {
          trigger: animatedRef.current,
          start: 'top 85%',
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    },
    { scope: animatedRef }
  );

  return (
    <ColoredSection color="BLACK">
      <div
        className="text-black lg:max-w-screen overflow-x-hidden md:mt-40 md:pb-10 relative"
        ref={animatedRef}
      >
        <div className="lg:flex-row flex flex-col-reverse lg:10 xl:px-20 justify-between">
          <div className="lg:flex-none flex flex-col justify-center items-center">
            <h2 className="self-start lg:block lg:px-0 px-10 font-bold mt-[1rem] mb-[1rem] font-bebasneue text-[56px]">
              .REFERENCES
            </h2>
            <div
              ref={comp}
              className="
                                grid
                                grid-cols-[repeat(3,30%)] grid-rows-[repeat(3,100px)]
                                gap-6
                                w-full
                                px-10
                                md:grid-cols-[repeat(3,150px)]
                                md:grid-rows-[repeat(3,150px)]
                                lg:grid-cols-[repeat(9,100px)]
                                lg:grid-rows-[repeat(1,100px)]
                            "
            >
              {imag.map((sr, index) => (
                <a
                  key={index}
                  href={sr.link}
                  className="items relative flex rounded justify-center items-center lg:hover:border-[1px] lg:hover:border-newblue"
                >
                  <img
                    className="absolute h-full inset-0 w-full"
                    src={sr.hvr}
                    alt=""
                  />
                  <img
                    className="absolute inset-0 h-full w-full opacity-100 hover:duration-500 transition-all lg:hover:opacity-0"
                    src={sr.org}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
}
