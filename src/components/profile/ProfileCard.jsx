import React from 'react';

const ProfileCard = React.memo(({ 
  name, 
  title, 
  handle, 
  status, 
  avatarUrl, 
  onContactClick 
}) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      className="relative w-72 h-96 rounded-3xl overflow-hidden transform-gpu will-change-transform transition-transform duration-500 ease-out hover:scale-[1.02]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${avatarUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
      }}
    >
      {/* Dark gradient overlay for text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      {/* Name and title overlay (moved even higher) */}
      <div className="absolute top-2 left-0 right-0 text-center z-10">
        <h2 className="text-white text-xl font-semibold tracking-tight mb-1 drop-shadow-lg">
          {name}
        </h2>
        <p className="text-white/90 text-sm font-medium drop-shadow-md">
          {title}
        </p>
      </div>

      {/* Bottom glass contact bar (smaller and more compact) */}
      <div 
        className="absolute bottom-4 left-4 right-4 z-10 rounded-xl p-3"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        {/* Handle and Status */}
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white/80 font-medium">{handle}</span>
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-sm"></div>
            <span className="text-white/90 text-[10px] font-medium">{status}</span>
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={onContactClick}
          className="w-full px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] transform-gpu will-change-transform"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          Contact
        </button>
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;