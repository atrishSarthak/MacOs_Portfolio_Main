import useWindowStore from "#store/window.js";
import { X, Minus, Square } from 'lucide-react';

const WindowControls = ({ target, onMinimize, onMaximize }) => {
    const { closeWindow } = useWindowStore();
    
    return (
        <div id="window-controls" className="flex items-center gap-2 p-2">
            {/* Close Button - Red */}
            <div 
                className="w-3 h-3 bg-[#ff5f57] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ff4136] transition-colors group"
                onClick={() => closeWindow(target)}
            >
                <X 
                    size={8} 
                    className="text-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity" 
                    strokeWidth={2.5}
                />
            </div>
            
            {/* Minimize Button - Yellow */}
            <div 
                className="w-3 h-3 bg-[#ffbd2e] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffaa00] transition-colors group"
                onClick={onMinimize}
            >
                <Minus 
                    size={8} 
                    className="text-[#8b4500] opacity-0 group-hover:opacity-100 transition-opacity" 
                    strokeWidth={2.5}
                />
            </div>
            
            {/* Maximize Button - Green */}
            <div 
                className="w-3 h-3 bg-[#28ca42] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#20a034] transition-colors group"
                onClick={onMaximize}
            >
                <Square 
                    size={6} 
                    className="text-[#0d4f1c] opacity-0 group-hover:opacity-100 transition-opacity" 
                    strokeWidth={2}
                />
            </div>
        </div>
    );
};

export default WindowControls;
