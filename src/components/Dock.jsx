import { dockApps } from "#constants/index.js";
import { Tooltip } from "react-tooltip";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

export const Dock = () => {
  const { windows, openWindow, closeWindow, setDockOrigin } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(
    () => {
      if (!dockRef.current) return;
      const icons = gsap.utils.toArray(".dock-icon", dockRef.current);

      const ctx = gsap.context(() => {
        icons.forEach((icon) => {
          const onEnter = () => {
            gsap.to(icon, {
              scale: 1.25, // Subtle pop-out
              y: -10, // Slight lift
              duration: 0.1, // Snappy
              ease: "power2.out",
              overwrite: true,
            });
          };

          const onLeave = () => {
            gsap.to(icon, {
              scale: 1,
              y: 0,
              duration: 0.1,
              ease: "power2.out",
              overwrite: true,
            });
          };

          icon.addEventListener("mouseenter", onEnter);
          icon.addEventListener("mouseleave", onLeave);

          // Store for cleanup
          icon._onEnter = onEnter;
          icon._onLeave = onLeave;
        });
      }, dockRef);

      return () => {
        icons.forEach((icon) => {
          if (icon._onEnter)
            icon.removeEventListener("mouseenter", icon._onEnter);
          if (icon._onLeave)
            icon.removeEventListener("mouseleave", icon._onLeave);
        });
        ctx.revert();
      };
    },
    { scope: dockRef },
  );

  const toggleApp = (e, app) => {
    if (!app.canOpen) return;

    const window = windows[app.id];

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      // Apply organic bounce to the IMAGE to coexist with hover scale on BUTTON
      const btn = e.currentTarget;
      const img = btn.querySelector("img");

      if (img) {
        gsap.to(img, {
          keyframes: [
            { y: -10, duration: 0.25, ease: "power2.out" }, // Jump
            { y: 0, duration: 0.15, ease: "power2.in" }, // Land
            { y: 6, duration: 0.14, ease: "power1.out" }, // Squash
            { y: 0, duration: 0.14, ease: "power1.in" }, // Recover
          ],
        });

        const rect = img.getBoundingClientRect();
        setDockOrigin(app.id, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        });
      }
      openWindow(app.id);
    }
  };

  return (
    <section id="dock" style={{ zIndex: 9999 }}>
      <div ref={dockRef} className="dock-container flex gap-1.5 justify-center">
        {dockApps.map(({ id, name, icon, canOpen }, index) => {
          const isAppOpen = windows[id]?.isOpen;

          return (
            <>
              <div
                key={id}
                className={`relative flex flex-col items-center justify-end gap-1 dock-app-${id}`}
              >
                <button
                  type="button"
                  className="dock-icon transition-all active:scale-95"
                  aria-label={name}
                  data-tooltip-id="dock-tooltip"
                  data-tooltip-content={name}
                  data-tooltip-delay-show={150}
                  disabled={!canOpen}
                  onClick={(e) => toggleApp(e, { id, canOpen })}
                >
                  <img
                    src={`/images/${icon}`}
                    alt={name}
                    loading="lazy"
                    className={`w-full h-full object-contain ${
                      canOpen ? "" : "opacity-60"
                    }`}
                  />
                </button>
                <span
                  className={`w-1 h-1 rounded-full bg-white/50 absolute -bottom-1 transition-opacity duration-300 ${
                    isAppOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              {index === 3 && <div className="dock-separator" />}
            </>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
