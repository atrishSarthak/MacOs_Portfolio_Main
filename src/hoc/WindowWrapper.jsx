import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import useWindowStore from '#store/window.js';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Fixed positions for each window type - all centrally located but offset from each other
const WINDOW_POSITIONS = {
    finder: { offsetX: 0, offsetY: 0 },           // Perfect center
    leetcode: { offsetX: 50, offsetY: -50 },     // Right and up from center (moved right)
    linkedin: { offsetX: 150, offsetY: -75 },    // Further right and up (moved right + up)
    x: { offsetX: 50, offsetY: 25 },             // Right and slightly down (moved up + right)
    terminal: { offsetX: 100, offsetY: 50 },     // Right and down from center
    safari: { offsetX: -150, offsetY: 0 },       // Left of center
    resume: { offsetX: 150, offsetY: 0 },        // Right of center
    contact: { offsetX: 0, offsetY: -100 },      // Above center
    photos: { offsetX: 0, offsetY: 100 },        // Below center
    txtfile: { offsetX: -75, offsetY: -75 },     // Top-left quadrant
    imgfile: { offsetX: 75, offsetY: -75 },      // Top-right quadrant
};

// Helper function to get fixed position for each window type
const getFixedPosition = (windowKey, screenWidth, screenHeight) => {
    // Standard window dimensions for calculation
    const windowWidth = 600;
    const windowHeight = 400;
    
    // Calculate base center position
    const baseCenterX = (screenWidth - windowWidth) / 2;
    const baseCenterY = (screenHeight - windowHeight) / 2;
    
    // Get the specific offset for this window type
    const position = WINDOW_POSITIONS[windowKey] || { offsetX: 0, offsetY: 0 };
    
    // Apply the offset to the center position
    let finalX = baseCenterX + position.offsetX;
    let finalY = baseCenterY + position.offsetY;
    
    // Ensure the window stays within screen bounds with 30px margin
    const margin = 30;
    finalX = Math.max(margin, Math.min(finalX, screenWidth - windowWidth - margin));
    finalY = Math.max(margin, Math.min(finalY, screenHeight - windowHeight - margin));
    
    return { x: finalX, y: finalY };
};

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows, activeWindow, dockOrigins } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey] || {};
        const ref = useRef(null);
        const isActive = activeWindow === windowKey;
        const [isVisible, setIsVisible] = useState(isOpen);
        const [layoutReady, setLayoutReady] = useState(false);
        const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
        const dockOrigin = dockOrigins[windowKey];

        // Calculate initial position when window is about to open
        useLayoutEffect(() => {
            if (isOpen && !layoutReady) {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                
                // Get fixed position for this specific window type
                const position = getFixedPosition(windowKey, screenWidth, screenHeight);
                
                setInitialPosition(position);
            }
        }, [isOpen, layoutReady, windowKey]);

        // Sync visibility with isOpen
        useLayoutEffect(() => {
            if (isOpen) {
                setIsVisible(true);
                setLayoutReady(false);
            }
        }, [isOpen]);

        // Set layout ready after initial position is calculated
        useLayoutEffect(() => {
            if (isOpen && isVisible && dockOrigin && initialPosition.x !== 0) {
                setLayoutReady(true);
            }
        }, [isOpen, isVisible, dockOrigin, initialPosition.x]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
                zIndexBoost: false,
            })

            return () => instance.kill();
        }, [])

        const handleExitComplete = () => {
            setIsVisible(false);
            setInitialPosition({ x: 0, y: 0 }); // Reset for next open
        };

        const variants = {
            initial: () => {
                if (!dockOrigin) return { scale: 0.2, opacity: 0 };

                // Calculate delta from dock origin to final window center
                const windowWidth = 600;
                const windowHeight = 400;
                const finalWindowCenterX = initialPosition.x + windowWidth / 2;
                const finalWindowCenterY = initialPosition.y + windowHeight / 2;

                const deltaX = dockOrigin.x - finalWindowCenterX;
                const deltaY = dockOrigin.y - finalWindowCenterY;

                return {
                    x: deltaX,
                    y: deltaY,
                    scale: 0.2,
                    opacity: 0
                };
            },
            animate: {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1]
                }
            },
            exit: () => {
                if (!dockOrigin) return { scale: 0.2, opacity: 0 };

                const el = ref.current;
                if (!el) return { scale: 0.2, opacity: 0 };

                const rect = el.getBoundingClientRect();
                const deltaX = dockOrigin.x - (rect.left + rect.width / 2);
                const deltaY = dockOrigin.y - (rect.top + rect.height / 2);

                return {
                    x: deltaX,
                    y: deltaY,
                    scale: 0.2,
                    opacity: 0,
                    transition: {
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1]
                    }
                };
            }
        };

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{
                    zIndex,
                    display: isVisible ? 'block' : 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    borderRadius: 0,
                    overflow: 'visible',
                    position: 'absolute',
                    left: `${initialPosition.x}px`,
                    top: `${initialPosition.y}px`
                }}
                className='will-change-transform'
                onMouseDown={() => focusWindow(windowKey)}
            >
                <AnimatePresence onExitComplete={handleExitComplete}>
                    {isOpen && isVisible && layoutReady && (
                        <motion.div
                            className={clsx(
                                "window-frame w-full h-full origin-center",
                                isActive ? 'brightness-100' : 'brightness-90'
                            )}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Component {...props} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        );
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default WindowWrapper;
