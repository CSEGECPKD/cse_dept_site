'use client';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ColoredSection from './ColoredSection';
import Link from 'next/link';

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
  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);

  useGSAP(
    () => {
      if (!comp.current || !animatedRef.current) return;

      gsap.from(comp.current, {
        scrollTrigger: {
          trigger: animatedRef.current,
          start: 'top 85%',
        },
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });

      const cards = [item1.current, item2.current, item3.current].filter(Boolean);
      if (cards.length > 0) {
        gsap.to(cards, {
          scrollTrigger: {
            trigger: animatedRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        });
      }
    },
    { scope: animatedRef }
  );

  return (
    <ColoredSection color="BLACK">
      <div
        className="text-black lg:max-w-screen overflow-x-hidden md:mt-24 md:pb-16 relative"
        ref={animatedRef}
      >
        <div className="lg:flex-row flex flex-col-reverse lg:px-10 xl:px-20 justify-between items-start gap-12">
          {/* Left Column: .REFERENCES 3x3 Grid */}
          <div className="lg:flex-none flex flex-col justify-center items-center w-full lg:w-auto">
            <h2 className="self-start lg:block lg:px-0 px-10 font-bold mt-[1rem] mb-[1rem] font-bebasneue text-[42px] sm:text-[56px]">
              .REFERENCES
            </h2>
            <div
              ref={comp}
              className="grid lg:grid-cols-[repeat(3,150px)] lg:grid-rows-[repeat(3,150px)] grid-cols-[repeat(3,30%)] grid-rows-[repeat(3,100px)] md:grid-rows-[repeat(3,150px)] gap-5 sm:gap-6 grid-flow-row lg:w-min w-full px-6 sm:px-10 lg:px-0 justify-center"
            >
              {imag.map((sr, index) => (
                <a
                  key={index}
                  href={sr.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="items relative flex rounded justify-center items-center lg:hover:border lg:hover:border-[#1E3A8A] transition-all overflow-hidden"
                >
                  <img
                    className="absolute h-full inset-0 w-full object-contain"
                    src={sr.hvr}
                    alt=""
                  />
                  <img
                    className="absolute inset-0 h-full w-full object-contain opacity-100 hover:duration-500 transition-all lg:hover:opacity-0"
                    src={sr.org}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: .NEW POSTS Cards */}
          <div className="lg:w-[60%] px-5 lg:px-0 w-full">
            <div className="flex lg:justify-end">
              <h2 className="text-[42px] sm:text-[56px] font-bebasneue mt-[1rem] mb-[1rem] font-bold">
                .NEW POSTS
              </h2>
            </div>
            <div className="flex gap-[2rem] w-full">
              <div className="w-full">
                <div className="flex flex-row flex-wrap lg:flex-nowrap gap-3 sm:gap-4 lg:w-auto justify-center w-full">
                  {/* Post 1 */}
                  <div
                    ref={item1}
                    className="group lg:basis-auto basis-full relative lg:h-[480px] h-[340px] lg:w-[28rem] hover:w-[42rem] w-full opacity-0 overflow-hidden transition-all duration-700 rounded-xl shadow-lg"
                  >
                    <div className="absolute bg-gradient-to-b from-black/70 to-transparent inset-x-0 z-1 w-full h-[50%]" />
                    <div className="absolute bg-gradient-to-t from-black/75 to-transparent inset-x-0 bottom-0 z-1 w-full h-[50%]" />
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src="/blog/image1.jpeg"
                      alt="Project showcase"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      <p className="text-white font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Project showcase
                      </p>
                      <div>
                        <Link
                          href="/activity/blog"
                          className="mt-2 inline-flex items-center gap-3 bg-black text-white hover:bg-white hover:text-black border border-white font-montserrat font-semibold px-4 py-2 rounded transition-all duration-300 text-sm"
                        >
                          READ MORE
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Post 2 */}
                  <div
                    ref={item2}
                    className="group lg:basis-auto basis-1/2 opacity-0 lg:hover:w-[42rem] relative lg:h-[480px] h-[340px] min-w-[47%] lg:w-[19rem] lg:min-w-min overflow-hidden transition-all duration-700 rounded-xl shadow-lg"
                  >
                    <div className="absolute bg-gradient-to-b from-black/70 to-transparent inset-x-0 z-1 w-full h-[50%]" />
                    <div className="absolute bg-gradient-to-t from-black/75 to-transparent inset-x-0 bottom-0 z-1 w-full h-[50%]" />
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src="/blog/image2.jpeg"
                      alt="World Map"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      <p className="text-white font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold">
                        World Map
                      </p>
                      <div>
                        <Link
                          href="/activity/blog"
                          className="mt-2 inline-flex items-center gap-3 bg-black text-white hover:bg-white hover:text-black border border-white font-montserrat font-semibold px-4 py-2 rounded transition-all duration-300 text-sm"
                        >
                          READ MORE
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Post 3 */}
                  <div
                    ref={item3}
                    className="group lg:basis-auto basis-1/2 lg:hover:w-[42rem] relative lg:h-[480px] h-[340px] min-w-[47%] lg:w-[19rem] lg:min-w-min opacity-0 overflow-hidden transition-all duration-700 rounded-xl shadow-lg"
                  >
                    <div className="absolute bg-gradient-to-b from-black/70 to-transparent inset-x-0 z-1 w-full h-[50%]" />
                    <div className="absolute bg-gradient-to-t from-black/75 to-transparent inset-x-0 bottom-0 z-1 w-full h-[50%]" />
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src="/blog/image3.jpeg"
                      alt="Attitude Probe"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      <p className="text-white font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Attitude Probe
                      </p>
                      <div>
                        <Link
                          href="/activity/blog"
                          className="mt-2 inline-flex items-center gap-3 bg-black text-white hover:bg-white hover:text-black border border-white font-montserrat font-semibold px-4 py-2 rounded transition-all duration-300 text-sm"
                        >
                          READ MORE
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
}
