import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Maximum z-index for windows (Dock is at 9999, so windows must stay below)
const MAX_WINDOW_Z_INDEX = 9000;

export const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;

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
            }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.zIndex = state.nextZIndex;

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
