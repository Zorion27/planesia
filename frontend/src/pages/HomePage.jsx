import React, { useState } from 'react';

const HomePage = () => {
  const [esiaOut, setEsiaOut] = useState(false);
  const [planTop, setPlanTop] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [detailsTextVisible, setDetailsTextVisible] = useState(false);
  const [bgPos, setBgPos] = useState('0% 0%');
  const [taglineFadeOut, setTaglineFadeOut] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [secondTaglineVisible, setSecondTaglineVisible] = useState(false);

  const handleClick = () => {
    setPageCount(prev => prev + 1);
    console.log(`Page count: ${pageCount + 1}`);  

    if (pageCount + 1 === 2) {
      setEsiaOut(true);
      setPlanTop(true);
      setBgPos('0% 25%');
      setTaglineVisible(true);
      setTimeout(() => setDetailsTextVisible(true), 500);
    }

    if (pageCount + 1 === 3) {
      setBgPos('0% 70%');
      setDetailsTextVisible(false);
      setTaglineFadeOut(true);
      setSecondTaglineVisible(true);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-no-repeat overflow-hidden"
      onClick={handleClick}
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundPosition: bgPos,
        backgroundSize: "180%",
        backgroundRepeat: "no-repeat",
        transition: 'background-position 1s ease-in-out',
        backgroundColor: "#fff"
      }}
    >
      <div className="absolute pointer-events-none"
        style={{
          top: '0px',
          right: '20vw',
          width: '25vw',
          height: '25vw',
          background: '#F98C6A',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.3,
          zIndex: 2,
        }}
      />
      <div className="absolute pointer-events-none"
        style={{
          top: '0px',
          left: '5vw',
          width: '20vw',
          height: '12vw',
          background: '#E9A350',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.4,
          zIndex: 2,
        }}
      />
      <div className="relative flex justify-center items-center w-full">
        {/* Plan text */}
        <span
          className={`
            text-black text-center
            ${planTop ? ' -translate-y-[40vh] -translate-x-[-10vh] top-16' : ''}
            transition-all duration-[1500ms] ease-in-out z-10
          `}
          style={{
            fontFamily: 'Khmer MN',
            fontWeight: 400,
            fontSize: 'clamp(50px, 6vw, 100px)',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          Plan
        </span>
        
        {/* esia text */}
        <span
          className={`
            text-black text-center ml-[-0.5vw]
            transition-all duration-[1500ms] ease-in-out z-10
            ${esiaOut ? 'translate-y-[-80vh]' : ''}
          `}
          style={{
            fontFamily: 'Khmer MN',
            fontWeight: 400,
            fontSize: 'clamp(50px, 6vw, 100px)',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          esia
        </span>

        {/* Tagline */}
        <span
          className={`
            text-black text-center absolute whitespace-nowrap left-1/2 -translate-x-1/2
            transition-all duration-[2000ms] ease-in-out z-10
            ${taglineVisible ? 'translate-y-[-25vh]' : 'translate-y-[100vh]'}
            ${taglineFadeOut ? 'opacity-0' : 'opacity-100'}
          `}
          style={{
            fontFamily: 'Khmer MN',
            fontWeight: 400,
            fontSize: 'clamp(28px, 3.5vw, 56px)',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          Your Ideas into Iconic Experiences
        </span>

        {/* New Tagline */}
        <span
          className={`
            text-black text-center absolute whitespace-nowrap left-1/2 -translate-x-1/2
            transition-all duration-[2000ms] ease-in-out z-10
            ${secondTaglineVisible ? 'translate-y-[-25vh] opacity-100' : 'translate-y-[100vh] opacity-0'}
          `}
          style={{
            fontFamily: 'Khmer MN',
            fontWeight: 400,
            fontSize: 'clamp(28px, 3.5vw, 56px)',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          Innovative and Timeless Events
        </span>

        {/* Details text */}
        <div
          className={`
            text-black absolute flex flex-col items-center translate-y-[10vh]
            transition-all duration-[2000ms] ease-in-out z-10 max-w-[40vw]
            ${detailsTextVisible ? 'translate-x-[-40vh] opacity-100' : 'translate-x-[-100vh] opacity-0'}
          `}
        >
          <p 
            className="whitespace-nowrap"
            style={{
              fontFamily: 'Marck Script',
              fontWeight: 400,
              fontSize: 'clamp(20px, 2.5vw, 40px)',
              lineHeight: '170%',
              letterSpacing: '0%',
              textAlign: 'center',
            }}
          >
            "Making every detail count"
          </p>
          <p 
            className="whitespace-nowrap"
            style={{
              fontFamily: 'Marck Script',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 32px)',
              lineHeight: '170%',
              letterSpacing: '0%',
              textAlign: 'center',
            }}
          >
            Focus on precision & the importance of each
          </p>
          <p 
            className="whitespace-nowrap"
            style={{
              fontFamily: 'Marck Script',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 32px)',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
            }}
          >
            element in creating an unforgettable event
          </p>
        </div>

        {/* First Image */}
        <div className={`
          absolute translate-y-[10vh]
          transition-all duration-[2000ms] ease-in-out z-10
          ${detailsTextVisible ? 'translate-x-[40vh] opacity-100' : 'translate-x-[100vh] opacity-0'}
        `}>
          <img 
            src="/man_landing_page.png" 
            alt="Landing page illustration"
            className="w-[45vw] h-auto max-w-[1000px] min-w-[300px]"
          />
        </div>

        {/* Second Image */}
        <div className={`
          absolute translate-y-[10vh]
          transition-all duration-[2000ms] ease-in-out z-10
          ${secondTaglineVisible ? 'translate-x-[40vh] opacity-100' : 'translate-x-[100vh] opacity-0'}
        `}>
          <img 
            src="/dog.png" 
            alt="Dog illustration"
            className="w-[45vw] h-auto max-w-[1000px] min-w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;