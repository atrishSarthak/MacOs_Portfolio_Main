import React from 'react';
import ProfileCard from './ProfileCard';

export default function ProfileWidget() {
  const handleContactClick = () => {
    window.location.href = "mailto:your@email.com";
  };

  return (
    <div 
      className="fixed top-24 right-8 z-[1000] pointer-events-auto"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <ProfileCard
        name="Sarthak Atrish"
        title="Software Engineer"
        handle="@atrish07"
        status="Available"
        avatarUrl="/images/porfilecard.png"
        onContactClick={handleContactClick}
      />
    </div>
  );
}