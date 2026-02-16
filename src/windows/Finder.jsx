import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";


const Finder = () => {
    const { openWindow } = useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore();

    // Check if the current location is a "Project" (has techStack)
    const isProject = !!activeLocation?.techStack;

    // Extract project details if applicable
    const visitLink = isProject
        ? activeLocation.children.find(c => ['url', 'link'].includes(c.fileType))?.href
        : null;

    const description = isProject
        ? activeLocation.children.find(c => c.fileType === 'txt')?.description
        : null;


    const openItem = (e, item) => {
        // Capture rect
        const iconElement = e.currentTarget.querySelector('img');
        let rect = null;
        if (iconElement) {
            const r = iconElement.getBoundingClientRect();
            rect = {
                x: r.left + r.width / 2,
                y: r.top + r.height / 2,
                width: r.width,
                height: r.height
            };
        }

        if (item.fileType === 'pdf') return openWindow("resume", null, rect);
        if (item.kind === 'folder') return setActiveLocation(item);
        if (["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "_blank");

        openWindow(`${item.fileType}${item.kind}`, item, rect);
    }

    const renderList = (items) =>
        items.map((item) => (
            <li key={item.id}
                onClick={() => setActiveLocation(item)}
                className={clsx(item.id === activeLocation.id ? "active" : "not-active")}
            >
                <img src={item.icon} className=" w-4" alt={item.name} />
                <p className=" text-xs font-medium truncate">{item.name}</p>
            </li>
        ));


    return <>
        <div id="window-header" className="flex items-center p-0 overflow-hidden h-12">
            {/* Left Block: Matches Sidebar Width */}
            <div className="w-40 h-full flex items-center pl-4 flex-shrink-0">
                <WindowControls target="finder" />
            </div>

            {/* Middle Block: Matches File Grid Width */}
            <div className="flex-1 h-full flex items-center justify-center relative">
                <span className="font-semibold text-sm text-gray-400 select-none">
                    {activeLocation?.name || 'Finder'}
                </span>
            </div>

            {/* Right Block: Matches Right Panel Width (if Project) */}
            <div className={clsx(
                "h-full flex items-center justify-end pr-4 gap-3 flex-shrink-0",
                isProject ? "w-[320px]" : "w-auto"
            )}>
                {visitLink && (
                    <a
                        href={visitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-medium px-3 py-1 rounded-[4px] shadow-sm transition-colors flex items-center"
                    >
                        Visit the project
                    </a>
                )}
                <Search className="icon" />
            </div>
        </div>

        <div className="bg-white flex h-full overflow-hidden">
            <div className="sidebar flex-shrink-0">
                <div>
                    <h3>Favorites</h3>
                    <ul>
                        {renderList(Object.values(locations))}
                    </ul>
                </div>
                <div>
                    <h3>Projects</h3>
                    <ul>
                        {renderList(locations.work.children)}
                    </ul>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="flex-1 flex overflow-hidden">
                {/* File Grid */}
                <ul className={clsx(
                    "flex-1 p-8 bg-white grid gap-6 content-start overflow-y-auto",
                    isProject ? "grid-cols-2" : "grid-cols-4"
                )}>
                    {activeLocation?.children.map((item) => (
                        <li key={item.id}
                            onClick={(e) => openItem(e, item)}
                            className="flex flex-col items-center gap-3 cursor-pointer group"
                        >
                            <img
                                src={item.icon}
                                alt={item.name}
                                className="object-contain object-center size-16 relative group-hover:scale-105 transition-transform"
                            />
                            <p className="text-center font-medium w-full text-gray-600 text-[0.7rem] break-words line-clamp-2">
                                {item.name}
                            </p>
                        </li>
                    ))}
                </ul>

                {/* Right Panel */}
                {isProject && (
                    <div className="w-[320px] h-full bg-[#FAFAFA] border-l border-gray-200 p-6 flex flex-col gap-5 overflow-y-auto flex-shrink-0 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.05)]">

                        {/* Preview Image */}
                        <div className="w-full aspect-video bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex-shrink-0">
                            <img
                                src={activeLocation.previewImage || "/images/folder.png"}
                                alt="Project Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="flex-shrink-0">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tech Stack</h3>
                            <p className="text-sm font-semibold text-gray-800 leading-snug">
                                {activeLocation.techStack || "Not specified"}
                            </p>
                        </div>

                        {/* Description */}
                        {description && (
                            <div className="flex-1">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">About</h3>
                                <div className="text-[13px] text-gray-600 leading-6 space-y-3 font-medium">
                                    {Array.isArray(description)
                                        ? description.map((line, i) => <p key={i}>{line}</p>)
                                        : <p>{description}</p>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </>
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;