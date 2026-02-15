import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import useWindowStore from '#store/window.js';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows, activeWindow, dockOrigins } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey] || {}; // Safe access
        const ref = useRef(null);
        const isActive = activeWindow === windowKey;
        const [isVisible, setIsVisible] = useState(isOpen);
        const [layoutReady, setLayoutReady] = useState(false);
        const dockOrigin = dockOrigins[windowKey];

        // Sync visibility with isOpen, but handle exit animation delay
        useLayoutEffect(() => {
            if (isOpen) {
                setIsVisible(true);
                setLayoutReady(false);
            }
        }, [isOpen]);

        useLayoutEffect(() => {
            if (isOpen && isVisible && dockOrigin && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (rect.width > 0 || rect.height > 0) {
                    setLayoutReady(true);
                }
            }
        }, [isOpen, isVisible, dockOrigin]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
                zIndexBoost: false, // We handle z-index manually via store
            })

            return () => instance.kill();
        }, [])

        const handleExitComplete = () => {
            setIsVisible(false);
        };

        // dockOrigin is already declared at top scope

        const variants = {
            initial: () => {
                if (!dockOrigin || !ref.current) return { scale: 0.5, opacity: 0 };

                // Get window dimensions
                const rect = ref.current.getBoundingClientRect();

                // Calculate delta from dock origin to window center
                // We want to start AT the dock origin
                // Current position (0,0 relative to motion div) is the window's final position
                // So initial x = dockX - windowX

                const deltaX = dockOrigin.x - (rect.left + rect.width / 2);
                const deltaY = dockOrigin.y - (rect.top + rect.height / 2);

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

                // Recalculate delta for exit (window might have moved)
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
                    overflow: 'visible'
                }}
                className='absolute will-change-transform'
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
