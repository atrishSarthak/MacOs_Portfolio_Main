const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "leetcode",
        name: "LeetCode",
        icon: "leetcode.png",
        canOpen: true,
    },
    {
        id: "x",
        name: "X",
        icon: "X.png",
        canOpen: true,
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: "LinkedIn.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: false,
    },
];

const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript"],
    },
    {
        category: "Mobile",
        items: ["React Native", "Expo"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Sass", "CSS"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "NestJS", "Hono"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/JavaScript-Mastery-Pro",
    },
    {
        id: 2,
        text: "Platform",
        icon: "/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://jsmastery.com/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: "/icons/twitter.svg",
        bg: "#ff866b",
        link: "https://x.com/jsmasterypro",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/gal1.png",
    },
    {
        id: 2,
        img: "/images/gal2.png",
    },
    {
        id: 3,
        img: "/images/gal3.png",
    },
    {
        id: 4,
        img: "/images/gal4.png",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Calibre",
            icon: "/images/folder.png",
            kind: "folder",
            projectType: "mobile", // mobile or website
            position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-30", // optional: Finder window position
            previewImages: ["/images/Calibre_1.png", "/images/Calibre_2.png", "/images/Calibre_3.png", "/images/Calibre_4.png"], // Array of 4 images for mobile
            techStack: "React Native • Expo • NativeWind • Sanity • Clerk • Gemini Vision API",
            children: [
                {
                    id: 1,
                    name: "Calibre-The APP",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-15",
                    description: [
                        "Calibre is a mobile fitness and nutrition tracking app that gives users a complete picture of their health through intelligent workout logging and AI-powered meal recognition.",
                        "The workout engine lets users build sessions from a structured exercise library, logging sets and reps with full progression tracking.",
                        "On the nutrition side, Calibre integrates Google Gemini's Vision API to perform real-time food recognition from a single meal photo, extracting macro breakdowns including protein, carbohydrates, and calories without any manual input.",
                        "Food data is also searchable from a full nutrition database for manual logging, with Sanity powering the content backend and Clerk handling authentication.",
                        "Built for people who want to track everything without the friction of logging everything, Calibre makes the hardest part of a fitness routine effortless by letting your camera do the nutritional math for you.",
                    ],
                },
                {
                    id: 2,
                    name: "calibre",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/atrishSarthak/FitnessApp.git",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "nike.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-1.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "Planorix",
            icon: "/images/folder.png",
            kind: "folder",
            projectType: "website", // mobile or website
            position: "top-52 right-80",
            windowPosition: "top-[13vh] left-90",
            previewImage: "/images/project-2.png",
            previewImages: ["/images/project-2.png", "/images/Planorix_image2.png"], // NEW: Array of images
            techStack: "React.js • Gemini API • Tailwind CSS • Putter.js(serverless workers)",
            children: [
                {
                    id: 1,
                    name: "Planorix.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "Planorix is an architectural visualization platform that converts 2D floor plans into photorealistic 3D renders in seconds. ",
                        "Upload your floor plans, generate realistic visualizations instantly, and manage everything through a personal dashboard. ",
                        "The platform includes media hosting, shareable project links (public or private), and side-by-side comparisons of original and rendered outputs.",
                        "Built with a modern interface and serverless infrastructure, Planorix offers fast, scalable visualization tools for architects, designers, and real estate professionals.",
                    ],
                },
                {
                    id: 2,
                    name: "Planorix.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://planorix.vercel.app/",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "planorix.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/project-2.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "ReVault",
            icon: "/images/folder.png",
            kind: "folder",
            projectType: "website", // mobile or website
            position: "top-10 left-80",
            windowPosition: "top-[27vh] left-50",
            previewImages: ["/images/ReVault_1.png", "/images/ReVault_2.png"], // NEW: Array of images
            techStack: "React • Redux • WebCrypto API • PostgreSQL • Supabase",
            children: [
                {
                    id: 1,
                    name: "ReVault.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "ReVault is a secure encrypted marketplace for buying and selling high-value digital assets including event tickets, gaming accounts, and premium content.",
                        "All transfers are protected with end-to-end encryption using AES-256-GCM, RSA-OAEP key wrapping, and SHA-256 integrity verification to ensure every transaction is tamper-proof.",
                        "RSA-PSS digital signatures authenticate every listing, while an administrative audit dashboard enables real-time compliance monitoring and security event tracking.",
                        "Built on a Supabase and PostgreSQL backend for reliable, scalable data storage, with a Redux-powered React frontend for seamless state management across the marketplace.",
                    ],
                },
                {
                    id: 2,
                    name: "food-delivery-app.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/atrishSarthak/ReVault",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "food-delivery-app.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-3.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        // ▶ Project 4
        {
            id: 8,
            name: "Vista",
            icon: "/images/folder.png",
            kind: "folder",
            projectType: "mobile", // mobile or website
            position: "top-72 right-60",
            windowPosition: "top-[35vh] left-[400px]",
            previewImages: ["/images/Vista_1.png", "/images/Vista_2.png", "/images/Vista_3.png", "/images/Vista_4.png"], // Array of 4 images for mobile
            techStack: "React Native • FastAPI • MediaPipe • rembg • Convex",
            children: [
                {
                    id: 1,
                    name: "Vista.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Vista is an AI-powered passport photo compliance app that validates photos against country-specific requirements, eliminating rejections before they happen.",
                        "The backend runs two MediaPipe models in sequence: FaceDetector for presence and count, and FaceLandmarker extracting 478 facial keypoints to compute Eye Aspect Ratio, Mouth Aspect Ratio, head rotation angle, face centering, and frame fill ratio.",
                        "Laplacian variance detects blur, rembg performs neural background segmentation, and all country compliance thresholds are served dynamically from Convex at runtime with zero hardcoding.",
                        "Built for travellers who've had photos rejected at embassies and studios, Vista turns a frustrating, opaque process into a guided, seconds-long experience that tells you exactly what's wrong and how to fix it.",
                    ],
                },
                {
                    id: 2,
                    name: "Vista-repo",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/atrishSarthak/Vista",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "vista-preview.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/Vista_1.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/adrian.jpg",
        },
        {
            id: 2,
            name: "casual-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/images/adrian-2.jpg",
        },
        {
            id: 3,
            name: "conference-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/adrian-3.jpeg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer Behind the Code",
            image: "/images/adrian.jpg",
            description: [
                "Hey, I'm Sarthak 👋I build systems where AI meets real-world impact — from intelligent fitness coaching to secure digital marketplaces.",
                "Currently pursuing B.Tech in Information Technology at Manipal Institute of Technology",
                "I spend most of my time shipping full-stack products, solving DSA problems, and experimenting with AI systems.",
                "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
            ],
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
            href: "/files/SarthakFinalResume.pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    x: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    linkedin: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    leetcode: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };