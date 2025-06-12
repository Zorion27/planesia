import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [esiaOut, setEsiaOut] = useState(false);
  const [planTop, setPlanTop] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [detailsTextVisible, setDetailsTextVisible] = useState(false);
  const [bgPos, setBgPos] = useState('0% 0%');
  const [taglineFadeOut, setTaglineFadeOut] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [secondTaglineVisible, setSecondTaglineVisible] = useState(false);
  const [secondTaglineFadeOut, setSecondTaglineFadeOut] = useState(false);
  const [circleVisible, setCircleVisible] = useState(false);
  const [planLeft, setPlanLeft] = useState(false);
  const [dogExpanded, setDogExpanded] = useState(false);
  const [dogScale, setDogScale] = useState(1);
  const [dogFadeOut, setDogFadeOut] = useState(false);
  const [circleRotation, setCircleRotation] = useState(0);
  const [bgRotation, setBgRotation] = useState(0);


  useEffect(() => {
    const calculateScale = () => {
      const screenHeight = window.innerHeight;
      const dogImage = document.getElementById('dogImage');
      if (dogImage) {
        const imageHeight = dogImage.getBoundingClientRect().height;
        const scale = screenHeight / imageHeight;
        console.log('Image height:', imageHeight, 'Screen height:', screenHeight, 'Scale:', scale);
        setDogScale(scale);
      }
    };

    const dogImage = document.getElementById('dogImage');
    if (dogImage) {
      if (dogImage.complete) {
        calculateScale();
      } else {
        dogImage.onload = calculateScale;
      }
    }

    const observer = new ResizeObserver(calculateScale);
    if (dogImage) {
      observer.observe(dogImage);
    }

    window.addEventListener('resize', calculateScale);

    return () => {
      if (dogImage) {
        observer.unobserve(dogImage);
      }
      window.removeEventListener('resize', calculateScale);
    };
  }, []);

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

    if (pageCount + 1 === 4) {
      setCircleVisible(true);
      setPlanLeft(true);
      setSecondTaglineFadeOut(true);
      setDogExpanded(true);
      setTimeout(() => setDogFadeOut(true), 1500);
    }

    if (pageCount + 1 === 5) {
      setCircleRotation(180);
      //setBgRotation(90);
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
        transition: 'all 1s ease-in-out',
        backgroundColor: "#fff",
        transform: `rotate(${bgRotation}deg)`
      }}
    >
      {/* Circle container */}
      <div 
        className={`
          absolute h-screen aspect-square overflow-visible 
          transition-all duration-[1000ms] ease-in-out
          ${circleVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        `} 
        style={{ 
          left: 0, 
          top: 0,
        }}
      >
        <div className="relative h-full w-full -translate-x-1/2">
          <div 
            className="absolute top-0 left-0 h-full w-full transition-all duration-[1000ms] ease-in-out"
            style={{
              transform: `rotate(${circleRotation}deg)`,
              transformOrigin: 'center'
            }}
          >
            <div 
              className="absolute top-0 left-0 h-full w-1/2 rounded-l-full"
              style={{
                backgroundColor: '#99A6D7',
              }}
            />
            <div 
              className="absolute top-0 left-1/2 h-full w-1/2 rounded-r-full"
              style={{
                backgroundColor: '#98D6D7',
              }}
            />
          </div>
        </div>
      </div>

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

      <div className="relative flex justify-center items-center w-full">
        {/* Plan text */}
        <span
          className={`
            text-black text-center
            transition-all z-10
            ${planTop ? '-translate-y-[40vh] -translate-x-[-10vh] top-16 duration-[1500ms]' : ''}
            ${planLeft ? '-translate-x-[100vw] duration-[2000ms]' : ''}
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
            ${secondTaglineVisible ? 'translate-y-[-25vh]' : 'translate-y-[100vh]'}
            ${secondTaglineFadeOut ? 'opacity-0' : 'opacity-100'}
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

        {/* Second Image (dog) */}
        <div className={`
          absolute translate-y-[15vh] translate-x-[55vh]
          transition-all duration-[2000ms] ease-in-out z-10
          ${secondTaglineVisible ? 'translate-x-[40vh] ' : 'translate-x-[160vh] '}
          ${dogExpanded ? '-translate-x-[200vh]' : ''}
          ${dogFadeOut ? 'opacity-0' : ''}
        `}>
          <div className="relative">
            <img 
              id="dogImage"
              src="/dog.png" 
              alt="Dog illustration"
              className={`
                w-[60vw] h-auto max-w-[1000px] min-w-[300px]
                transition-all duration-[2000ms] ease-in-out
              `}
              style={{
                transform: dogExpanded ? `scale(${dogScale+0.6})` : 'scale(1)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;