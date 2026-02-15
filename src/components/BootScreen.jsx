import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import helloStrokeAnimation from '../assets/hello_stroke_black.json';

const BootScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

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
          animationData={helloStrokeAnimation}
          loop={false}
          autoplay={true}
          style={{
            width: 320,
            height: 320
          }}
          speed={2}
          onComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
};

export default BootScreen;