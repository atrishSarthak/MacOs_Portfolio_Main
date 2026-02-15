import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Maximum z-index for windows (Dock is at 9999, so windows must stay below)
const MAX_WINDOW_Z_INDEX = 9000;

export const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        activeWindow: null, // Track which window is currently active/focused

        openWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;

                // Set as active window when opened
                state.activeWindow = windowKey;

                // Increment and cap z-index
                state.nextZIndex++;
                if (state.nextZIndex > MAX_WINDOW_Z_INDEX) {
                    // Reset to initial value when hitting the cap
                    state.nextZIndex = INITIAL_Z_INDEX + 1;
                }
            }),

        closeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;

                // Clear active window if closing the active one
                if (state.activeWindow === windowKey) {
                    state.activeWindow = null;
                }
            }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.zIndex = state.nextZIndex;

            // Set this window as active
            state.activeWindow = windowKey;

            // Increment and cap z-index
            state.nextZIndex++;
            if (state.nextZIndex > MAX_WINDOW_Z_INDEX) {
                // Reset to initial value when hitting the cap
                state.nextZIndex = INITIAL_Z_INDEX + 1;
            }
        })

    }))
);

export default useWindowStore;
