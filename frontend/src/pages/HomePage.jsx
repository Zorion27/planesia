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
    const [bgImageTranslateX, setBgImageTranslateX] = useState(0);
    const [bgImageTranslateY, setBgImageTranslateY] = useState(0);
    const [startButtonVisible, setStartButtonVisible] = useState(false);

    const parseBgPosition = (posString) => {
        const parts = posString.split(' ');
        const x = parseFloat(parts[0]);
        const y = parseFloat(parts[1]);
        return { x: isNaN(x) ? 0 : x, y: isNaN(y) ? 0 : y };
    };

    useEffect(() => {
        const calculateDogScale = () => {
            const screenHeight = window.innerHeight;
            const dogImage = document.getElementById('dogImage');
            if (dogImage && dogImage.naturalHeight) {
                const dogNaturalHeight = dogImage.naturalHeight;
                const scale = screenHeight / dogNaturalHeight;
                setDogScale(scale);
            }
        };

        const dogImage = document.getElementById('dogImage');
        let dogObserver;
        if (dogImage) {
            if (dogImage.complete) {
                calculateDogScale();
            } else {
                dogImage.onload = calculateDogScale;
            }
            dogObserver = new ResizeObserver(calculateDogScale);
            dogObserver.observe(dogImage);
            window.addEventListener('resize', calculateDogScale);
        }

        const updateBgImageTransforms = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const { x, y } = parseBgPosition(bgPos);

            const currentBgTranslateX = -(screenWidth) * (x / 100);
            const currentBgTranslateY = -(screenHeight) * (y / 100);

            setBgImageTranslateX(currentBgTranslateX);
            setBgImageTranslateY(currentBgTranslateY);
        };

        updateBgImageTransforms();
        window.addEventListener('resize', updateBgImageTransforms);

        return () => {
            if (dogImage && dogObserver) {
                dogObserver.unobserve(dogImage);
            }
            if (dogImage) {
                window.removeEventListener('resize', calculateDogScale);
            }
            window.removeEventListener('resize', updateBgImageTransforms);
        };
    }, [bgPos]);

    const updateBgImageTransformsInstant = (currentPos) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const { x, y } = parseBgPosition(currentPos);
        const calcTranslateX = -(0.8 * screenWidth) * (x / 100);
        const calcTranslateY = -(0.8 * screenHeight) * (y / 100);
        setBgImageTranslateX(calcTranslateX);
        setBgImageTranslateY(calcTranslateY);
    };


    const handleClick = () => {
        setPageCount(prev => prev + 1);
        console.log(`Page count: ${pageCount + 1}`);

        let newBgPos = bgPos;

        if (pageCount + 1 === 2) {
            setEsiaOut(true);
            setPlanTop(true);
            newBgPos = '0% 50%';
            setBgPos(newBgPos);
            setTaglineVisible(true);
            setTimeout(() => setDetailsTextVisible(true), 500);
        }

        if (pageCount + 1 === 3) {
            newBgPos = '20% 100%';
            setBgPos(newBgPos);
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
            setBgRotation(-61);
            setTimeout(() => setStartButtonVisible(true), 1000);
        }

        if (newBgPos !== bgPos) {
            updateBgImageTransformsInstant(newBgPos);
        }
    };

    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            onClick={handleClick}
            style={{
                backgroundColor: "#fff",
            }}
        >
            {/* Background Image Container */}
            <div
                className="absolute w-[300vw] h-[300vh] overflow-hidden"
                style={{ zIndex: 0 }}
            >
                <img
                    src="/bg.png" 
                    alt="Background"
                    className="absolute transition-all duration-1000 ease-in-out"
                    style={{
                        width: '90%',
                        height: '90%',
                        transform: `
                            translate(calc(${bgImageTranslateX}px + 55vw), calc(${bgImageTranslateY}px + 90vh))
                            rotate(${bgRotation}deg)
                            scale(1)
                        `,
                        transformOrigin: 'center center',
                        objectFit: 'contain'
                    }}
                />
            </div>

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
                                transform: dogExpanded ? `scale(${dogScale})` : 'scale(1)',
                                transformOrigin: 'center'
                            }}
                        />
                    </div>
                </div>

                {/* Get Started Button */}

                <button
                    className={`
                        absolute
                        px-8 py-4 
                        translate-x-[50%] left-1/2 
                        bottom-[-18vh] 
                        bg-[#F98C6A]
                        hover:bg-[#F98C6A]/90
                        focus:bg-[#F98C6A]/90
                        active:bg-[#F98C6A]/80
                        shadow-lg
                        shadow-[#F98C6A]/50
                        hover:shadow-[#F98C6A]/70   
                        rounded-full 
                        text-white 
                        font-medium 
                        text-lg
                        transform
                        hover:scale-105
                        transition-all duration-500 ease-in-out
                        ${startButtonVisible ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                        fontFamily: 'Khmer MN',
                        fontSize: 'clamp(16px, 2vw, 24px)',
                    }}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default HomePage;