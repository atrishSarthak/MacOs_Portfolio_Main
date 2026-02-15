import React, { useLayoutEffect, useRef } from 'react'
import useWindowStore from '#store/window.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import clsx from 'clsx';

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows, activeWindow } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey] || {}; // Safe access
        const ref = useRef(null);
        const isActive = activeWindow === windowKey;
        const hasAnimatedRef = useRef(false); // Track if opening animation has run

        useGSAP(() => {
            const el = ref.current;

            // Only run the opening animation once - when window first opens
            if (!el || !isOpen || hasAnimatedRef.current) return;

            el.style.display = 'block';

            gsap.fromTo(el, {
                opacity: 0,
                scale: 0.8,
                y: 40,
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                onComplete: () => {
                    hasAnimatedRef.current = true; // Mark as animated
                }
            });
        }, [isOpen])

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
                zIndexBoost: false, // We handle z-index manually via store
            })

            return () => instance.kill();
        }, [])

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            // When window closes, reset the animation flag
            if (!isOpen) {
                hasAnimatedRef.current = false;
            }

            el.style.display = isOpen ? 'block' : 'none';
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex, display: isOpen ? 'block' : 'none' }}
                className={clsx(
                    'absolute transition-all duration-200 ease-out',
                    isActive
                        ? 'brightness-100 scale-100 shadow-2xl'
                        : 'brightness-90 scale-[0.99] shadow-md'
                )}
                onMouseDown={() => focusWindow(windowKey)}
            >
                <Component {...props} />
            </section>
        );
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};


export default WindowWrapper;
