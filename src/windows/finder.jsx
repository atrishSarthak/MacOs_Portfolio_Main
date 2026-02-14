import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import { locations } from "#constants";
import clsx from "clsx";
import useWindowStore from "#store/window";

const Finder = () => {
    const { openWindow } = useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore();

    const openItem = (item, e) => {
        if (item.fileType === "pdf") return openWindow("resume");

        if (item.kind === "folder") return setActiveLocation(item);

        if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, '_blank');

        const rect = e.currentTarget.getBoundingClientRect();
        openWindow(`${item.fileType}${item.id}`, item, { x: rect.x, y: rect.y, width: rect.width, height: rect.height });
    }

    const renderList = (items) => items.map((item) => (
        <li key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
                "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-colors",
                item.id === activeLocation.id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
            )}>
            <img src={item.icon} className="w-3.5 h-3.5" alt={item.name} />
            <p className="text-xs font-medium truncate">{item.name}</p>
        </li>
    ));

    return (
        <div className="w-[48rem] h-[28rem] bg-white border border-gray-300 shadow-2xl rounded-lg overflow-hidden font-sans text-gray-900 flex flex-col relative">
            <div id="window-header" className="h-10 flex items-center justify-between px-4 border-b border-gray-200 shrink-0 bg-[#f0f0f0]">
                <div className="flex items-center gap-3">
                    <WindowControls target="finder" />
                    <Search className="text-gray-500" size={14} />
                    <h2 className="text-xs font-semibold text-gray-700 ml-70">Finder</h2>
                </div>

                {activeLocation.projectUrl && (
                    <button
                        onClick={() => window.open(activeLocation.projectUrl, '_blank')}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-medium rounded-md shadow-sm transition-colors"
                    >
                        Visit the project
                    </button>
                )}
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-40 bg-[#f5f5f5]/80 backdrop-blur-xl border-r border-gray-200 p-3 space-y-4">
                    <div>
                        <h3 className="text-[10px] font-bold text-gray-500 mb-1 px-2 uppercase tracking-wide">Favorites</h3>
                        <ul className="space-y-1">
                            {renderList(Object.values(locations))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold text-gray-500 mb-1 px-2 uppercase tracking-wide">Projects</h3>
                        <ul className="space-y-1">
                            {renderList(locations.work.children)}
                        </ul>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white overflow-hidden flex flex-row">
                    {/* Left Column: Title + Grid */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <h1 className="text-xl font-bold text-gray-800 p-4 pb-2 px-6 shrink-0">{activeLocation.name}</h1>

                        <div className="flex-1 p-4 overflow-y-auto">
                            <ul className="grid grid-cols-2 gap-4 auto-rows-min">
                                {activeLocation?.children?.map((item) => (
                                    <li key={item.id}
                                        className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
                                        onClick={(e) => openItem(item, e)}
                                    >
                                        <img src={item.icon} alt={item.name} className="w-12 h-12 object-contain drop-shadow-sm group-hover:scale-105 transition-transform" />
                                        <p className="text-xs text-center font-medium text-gray-700 w-full break-words px-1 leading-tight">{item.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Panel (Projects Only) */}
                    {activeLocation.techStack && (
                        <div className="w-[18rem] bg-gray-50 border-l border-gray-200 px-4 pt-2 pb-24 flex flex-col gap-4 shrink-0 overflow-y-auto h-full">
                            {/* Preview Image */}
                            <img
                                src={activeLocation.previewImage}
                                alt="Preview"
                                className="w-full h-28 object-cover rounded-lg shadow-sm bg-white"
                            />

                            {/* Tech Stack */}
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                {activeLocation.techStack}
                            </p>

                            {/* Description from child #1 (txt file) */}
                            {activeLocation.children?.find(c => c.fileType === 'txt')?.description && (
                                <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
                                    {activeLocation.children.find(c => c.fileType === 'txt').description.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
