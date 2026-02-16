import React from 'react';
import ProfileCard from './ProfileCard';
import useWindowStore from '#store/window';

export default function ProfileWidget() {
  const { openWindow, closeWindow, windows } = useWindowStore();

  const handleContactClick = () => {
    // Toggle: if contact window is open, close it; otherwise open it
    if (windows.contact?.isOpen) {
      closeWindow('contact');
    } else {
      openWindow('contact');
    }
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