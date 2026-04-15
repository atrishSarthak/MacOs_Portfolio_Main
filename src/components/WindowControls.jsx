import useWindowStore from "#store/window.js";
import { X, Minus, Square } from "lucide-react";

const WindowControls = ({ target, onMinimize, onMaximize }) => {
  const { closeWindow } = useWindowStore();

  const handleClose = (e) => {
    e.stopPropagation();
    closeWindow(target);
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    if (onMinimize) onMinimize();
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    if (onMaximize) onMaximize();
  };

  // Check if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
  const buttonSize = isMobile ? "17px" : "14px";
  const iconSize = isMobile ? 9 : 9;

  return (
    <div id="window-controls" className="flex items-center gap-2 p-2">
      {/* Close Button - Red */}
      <div
        className="bg-[#ff5f57] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ff4136] transition-colors group"
        style={{ width: buttonSize, height: buttonSize }}
        onClick={handleClose}
      >
        <X
          size={iconSize}
          className="text-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity"
          strokeWidth={2.5}
        />
      </div>

      {/* Minimize Button - Yellow */}
      <div
        className="bg-[#ffbd2e] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffaa00] transition-colors group"
        style={{ width: buttonSize, height: buttonSize }}
        onClick={handleMinimize}
      >
        <Minus
          size={iconSize}
          className="text-[#8b4500] opacity-0 group-hover:opacity-100 transition-opacity"
          strokeWidth={2.5}
        />
      </div>

      {/* Maximize Button - Green */}
      <div
        className="bg-[#28ca42] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#20a034] transition-colors group"
        style={{ width: buttonSize, height: buttonSize }}
        onClick={handleMaximize}
      >
        <Square
          size={iconSize - 2}
          className="text-[#0d4f1c] opacity-0 group-hover:opacity-100 transition-opacity"
          strokeWidth={2}
        />
      </div>
    </div>
  );
};

export default WindowControls;
