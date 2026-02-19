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

    const handleImageClick = (e, imageUrl, index) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log('Image clicked:', imageUrl, index); // Debug log
        
        // Create a data object for the image viewer with correct structure
        const imageData = {
            name: `${activeLocation.name} - Image ${index + 1}`,
            imageUrl: imageUrl
        };
        
        console.log('Opening image with data:', imageData); // Debug log
        openWindow('imgfile', imageData, null);
    };


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

            {/* Middle Block: Title */}
            <div className="flex-1 h-full flex items-center justify-center relative">
                <span className="font-semibold text-sm text-gray-400 select-none">
                    {activeLocation?.name || 'Finder'}
                </span>
            </div>

            {/* Right Block: Search */}
            <div className="h-full flex items-center justify-end pr-4 gap-3 flex-shrink-0">
                <Search className="icon" />
            </div>
        </div>

        <div className="bg-white flex h-full overflow-hidden">
            <div className="sidebar flex-shrink-0">
                <div className="mb-2">
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

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                {isProject ? (
                    /* Project Detail View */
                    <div className="h-full overflow-y-auto p-4 pb-16 bg-white">
                        <div className="max-w-xl mx-auto space-y-3">
                            {/* Project Images - Two Side by Side */}
                            <div className="w-full grid grid-cols-2 gap-3">
                                {(activeLocation.previewImages || [activeLocation.previewImage, "/images/placeholder.png"]).slice(0, 2).map((img, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:border-blue-400 transition-colors"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            
                                            // Get the bounding rect of the clicked image for animation
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const originRect = {
                                                x: rect.left + rect.width / 2,
                                                y: rect.top + rect.height / 2,
                                                width: rect.width,
                                                height: rect.height
                                            };
                                            
                                            const imageData = {
                                                name: `${activeLocation.name} - Image ${index + 1}`,
                                                imageUrl: img
                                            };
                                            
                                            openWindow('imgfile', imageData, originRect);
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`${activeLocation.name} - Image ${index + 1}`}
                                            className="w-full h-full object-cover pointer-events-none"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Visit Project Button */}
                            {visitLink && (
                                <div className="flex justify-center">
                                    <a
                                        href={visitLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-center text-xs font-medium px-6 py-2 rounded-lg shadow-sm transition-colors"
                                    >
                                        Visit Project
                                    </a>
                                </div>
                            )}

                            {/* Tech Stack */}
                            <div>
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tech Stack</h3>
                                <p className="text-xs font-semibold text-gray-800 leading-relaxed">
                                    {activeLocation.techStack || "Not specified"}
                                </p>
                            </div>

                            {/* About Section */}
                            {description && (
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">About</h3>
                                    <div className="text-xs text-gray-600 leading-5 space-y-2">
                                        {Array.isArray(description)
                                            ? description.map((line, i) => <p key={i}>{line}</p>)
                                            : <p>{description}</p>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* File Grid View */
                    <ul className="flex-1 p-8 bg-white grid grid-cols-4 gap-6 content-start overflow-y-auto">
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
                )}
            </div>
        </div>
    </>
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;