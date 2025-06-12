import React from 'react'

const HomePage = () => {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-no-repeat"
    >
      {/* Blurred background image layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundColor: "#fff",
          backgroundPosition: "0% 0%",
          backgroundSize: "180%",
          backgroundRepeat: "no-repeat",
          filter: "blur(1.5px)",
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: '0px',
          right: '280px',
          width: '350px',
          height: '350px',
          background: '#F98C6A',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.3,
          zIndex: 2,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '0px',
          left: '50px',
          width: '300px',
          height: '180px',
          background: '#E9A350',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.4,
          zIndex: 2,
        }}
      />
      <div className="flex translate-y-[-60px] z-10">
        <span 
          className="text-black text-center"
          style={{
            fontFamily: 'Khmer MN',
            fontWeight: 400,
            fontSize: '100px',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          Plan
        </span>
        <span 
          className="text-black text-center"
          style={{
            fontFamily: 'Khmer MN',
            fontWeight: 400,
            fontSize: '100px',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          esia
        </span>
      </div>
    </div>
  )
}

export default HomePage