import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import helloStrokeAnimation from '../assets/hello_stroke_black.json';

const BootScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const lottieRef = useRef();

  // Set animation speed using ref
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1.3);
    }
  }, []);

  const handleAnimationComplete = () => {
    // Start fade out transition
    setShouldFadeOut(true);
    
    // After fade transition completes, notify parent to unmount
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 700); // Match the CSS transition duration
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-700 ease-out ${
        shouldFadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        background: '#000000'
      }}
    >
      <div className="flex items-center justify-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={helloStrokeAnimation}
          loop={false}
          autoplay={true}
          style={{
            width: 320,
            height: 320
          }}
          onComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
};

export default BootScreen;