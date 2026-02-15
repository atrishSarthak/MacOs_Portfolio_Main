import { locations } from "#constants";
import clsx from "clsx";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useLocationStore from "#store/location";


const projects = locations.work?.children ?? [];
const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const handleOpenrojectFinder = (e, project) => {
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
        setActiveLocation(project);
        openWindow("finder", null, rect);
    }

    useGSAP(() => {
        Draggable.create(".folder")
    }, []);

    return (
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className={clsx("group folder",
                        project.windowPosition)}
                        onClick={(e) => handleOpenrojectFinder(e, project)}
                    >
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Home;