import { locations } from "#constants";
import clsx from "clsx";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useLocationStore from "#store/location";
import ProfileWidget from "./profile/ProfileWidget";


const projects = locations.work?.children ?? [];
const Home = () => {
    const { setActiveLocation, activeLocation } = useLocationStore();
    const { openWindow, closeWindow, windows } = useWindowStore();

    const handleToggleProjectFinder = (e, project) => {
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

        // Check if finder is open and showing this specific project
        const isFinderOpen = windows.finder?.isOpen;
        const isShowingThisProject = activeLocation?.id === project.id;
        
        if (isFinderOpen && isShowingThisProject) {
            // Close the finder if it's open with this project
            closeWindow("finder");
        } else {
            // Open finder with this project
            setActiveLocation(project);
            openWindow("finder", null, rect);
        }
    }

    const handleResumeClick = (e) => {
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

        // Toggle resume window
        if (windows.resume?.isOpen) {
            closeWindow("resume");
        } else {
            openWindow("resume", null, rect);
        }
    }

    useGSAP(() => {
        Draggable.create(".folder")
    }, []);

    return (
        <>
            <section id="home">
                <ul>
                    {projects.map((project) => {
                        const isFinderOpen = windows.finder?.isOpen;
                        const isShowingThisProject = activeLocation?.id === project.id;
                        const isActive = isFinderOpen && isShowingThisProject;
                        
                        return (
                            <li key={project.id} className={clsx("group folder",
                                project.windowPosition,
                                isActive && "opacity-75" // Visual feedback for active folder
                            )}
                                onClick={(e) => handleToggleProjectFinder(e, project)}
                            >
                                <img src="/images/folder.png" alt={project.name} />
                                <p>{project.name}</p>
                                {/* Active indicator dot like dock icons */}
                                <span
                                    className={`w-1 h-1 rounded-full bg-white/70 absolute -bottom-1 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
                                        isActive ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            </li>
                        );
                    })}
                    
                    {/* Resume Icon */}
                    <li 
                        className={clsx(
                            "group folder top-[40vh] left-30",
                            windows.resume?.isOpen && "opacity-75"
                        )}
                        onClick={handleResumeClick}
                    >
                        <img src="/images/pdf.png" alt="Resume" />
                        <p>Resume.pdf</p>
                        {/* Active indicator dot */}
                        <span
                            className={`w-1 h-1 rounded-full bg-white/70 absolute -bottom-1 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
                                windows.resume?.isOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    </li>
                </ul>
            </section>
            <ProfileWidget />
        </>
    );
}

export default Home;