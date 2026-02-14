import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import {
    Briefcase, GraduationCap, MapPin, Users, Home,
    MessageSquare, Bell, Search, LayoutGrid, MoreHorizontal
} from 'lucide-react';

const LinkedIn = () => {
    const handleRedirect = () => {
        window.open('https://www.linkedin.com/in/sarthak-atrish-b038a01ab/', '_blank');
    };

    const NavItem = ({ icon, text, active, badge }) => (
        <div className={`flex flex-col items-center justify-center cursor-pointer min-w-[60px] ${active ? 'text-black' : 'text-[#666666] hover:text-black'}`}>
            <div className="relative">
                {icon}
                {badge && (
                    <div className="absolute -top-1 -right-1 bg-[#cc1016] text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] h-[16px] flex items-center justify-center">
                        {badge}
                    </div>
                )}
            </div>
            <span className="text-[10px] mt-0.5 hidden sm:block">{text}</span>
        </div>
    );

    return (
        <>
            <div id="window-header">
                <WindowControls
                    target="linkedin"
                    onMinimize={handleRedirect}
                    onMaximize={handleRedirect}
                />
                <h2 className="w-full text-center font-bold">LinkedIn</h2>
            </div>

            {/* LinkedIn Internal Content */}
            <div className="flex flex-col bg-[#f3f2ef] text-[#000000de] font-sans overflow-hidden" style={{ height: 'calc(100% - 33px)' }}>

                {/* Internal Header */}
                <div className="bg-white border-b border-[#e0e0e0] px-4 py-1 flex items-center justify-between shrink-0 h-[48px]">
                    <div className="flex items-center gap-2 flex-1 max-w-[380px]">
                        <div className="text-[#0a66c2]">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.74 0-2 1.55-2 2.83V19h-3v-9h3v1.07a3.48 3.48 0 012.7-1.4c2.6 0 3.68 1.83 3.68 4.38z"></path>
                            </svg>
                        </div>
                        <div className="relative flex-1 bg-[#eef3f8] rounded-[4px] h-[34px] flex items-center px-3 max-w-[280px]">
                            <Search size={16} className="text-[#666666] mr-2" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent border-none outline-none text-[14px] w-full text-black placeholder:text-[#666666]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-4 ml-2">
                        <NavItem icon={<Home size={22} fill="currentColor" />} text="Home" active />
                        <NavItem icon={<Users size={22} />} text="My Network" />
                        <NavItem icon={<Briefcase size={22} />} text="Jobs" />
                        <NavItem icon={<MessageSquare size={22} />} text="Messaging" />
                        <NavItem icon={<Bell size={22} />} text="Notifications" badge="21" />

                        <div className="flex flex-col items-center justify-center cursor-pointer min-w-[50px] border-r border-[#e0e0e0] pr-4 mr-1">
                            <img src="/images/LinkedIn_PFP.png" alt="Me" className="w-[20px] h-[20px] rounded-full object-cover" />
                            <div className="flex items-center gap-0.5">
                                <span className="text-[10px] text-[#666666]">Me</span>
                                <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10" className="text-[#666666]">
                                    <path d="M8 11L3 6h10z"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center cursor-pointer min-w-[60px] hover:text-black text-[#666666]">
                            <div className="relative">
                                <LayoutGrid size={22} />
                            </div>
                            <div className="flex items-center gap-0.5">
                                <span className="text-[10px] mt-0.5 hidden sm:block">For Business</span>
                                <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
                                    <path d="M8 11L3 6h10z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main 3-Column Layout */}
                <div className="flex-1 flex gap-4 p-4 overflow-hidden max-w-[1128px] mx-auto w-full">

                    {/* Left Sidebar - Minimal & Narrower */}
                    <div className="w-[140px] shrink-0 hidden md:flex flex-col gap-2">
                        {/* Visit Profile Button */}
                        <div className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden py-3 px-3 text-center">
                            <button
                                onClick={handleRedirect}
                                className="bg-[#0a66c2] text-white font-semibold text-[14px] px-4 py-1.5 rounded-full hover:bg-[#004182] transition-colors w-full"
                            >
                                Visit profile
                            </button>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden py-2">
                            <div className="px-3 py-1 cursor-pointer hover:bg-[#f3f2ef]">
                                <p className="text-[11px] font-semibold text-[#666]">Profile viewers</p>
                                <p className="text-[12px] font-semibold text-[#0a66c2]">42</p>
                            </div>
                            <div className="px-3 py-1 cursor-pointer hover:bg-[#f3f2ef]">
                                <p className="text-[11px] font-semibold text-[#666]">Connections</p>
                                <p className="text-[12px] font-semibold text-[#0a66c2]">500+</p>
                            </div>
                            <div className="px-3 py-1 cursor-pointer hover:bg-[#f3f2ef]">
                                <p className="text-[11px] font-semibold text-[#666]">Followers</p>
                                <p className="text-[12px] font-semibold text-[#0a66c2]">1,487</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column (Main Feed) - Wider */}
                    <div className="flex-1 min-w-0 overflow-y-auto rounded-lg no-scrollbar">
                        <div className="bg-white rounded-lg border border-[#e0e0e0] mb-2 p-3">
                            {/* Profile Banner & Info */}
                            <div className="relative">
                                <div className="h-[120px] bg-gradient-to-r from-[#0077b5] to-[#00a0dc]">
                                    <img src="/images/Linkedin_banner.png" className="w-full h-full object-cover" alt="Banner" />
                                </div>
                                <div className="absolute -bottom-[40px] left-3">
                                    <div className="w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center p-1">
                                        <img src="/images/LinkedIn_PFP.png" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end px-3 py-2 pb-5">
                                <button className="bg-transparent border-2 border-[#0a66c2] text-[#0a66c2] font-semibold px-3 py-1 rounded-full hover:bg-[#0a66c2]/10 transition-colors text-[13px]">
                                    Edit profile
                                </button>
                            </div>

                            <div className="px-3 pb-3 mt-4">
                                <h1 className="font-semibold text-[20px] leading-6">Sarthak Atrish</h1>
                                <p className="text-[14px] mt-1 leading-5">
                                    Information Technology Sophomore at Manipal Institute of Technology | E-Cell MIT
                                </p>
                                <p className="text-[#666] text-[12px] mt-2">Delhi, India · <button className="text-[#0a66c2] font-semibold hover:underline">Contact info</button></p>

                                <div className="flex items-center gap-1 mt-2 text-[12px]">
                                    <span className="text-[#0a66c2] font-semibold hover:underline cursor-pointer">500+ connections</span>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button className="bg-[#0a66c2] text-white font-semibold px-4 py-1.5 rounded-full hover:bg-[#004182] transition-colors text-[14px]">
                                        Open to
                                    </button>
                                    <button className="bg-transparent border border-[#0a66c2] text-[#0a66c2] font-semibold px-4 py-1.5 rounded-full hover:bg-[#0a66c2]/10 transition-colors text-[14px]">
                                        Add profile section
                                    </button>
                                    <button className="bg-transparent border border-[#666] text-[#666] font-semibold px-4 py-1.5 rounded-full hover:bg-[#0000000d] transition-colors text-[14px]">
                                        More
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Activity Section */}
                        <div className="bg-white rounded-lg border border-[#e0e0e0] mb-2 p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="font-semibold text-[18px]">Activity</h2>
                                    <p className="text-[13px] text-[#0a66c2] font-semibold hover:underline cursor-pointer">1,487 followers</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-[#0a66c2] border border-[#0a66c2] rounded-full px-3 py-1 text-[14px] font-semibold hover:bg-[#0a66c2]/10">Create a post</button>
                                    <button className="hover:bg-[#f3f2ef] p-1 rounded"><svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M15 2v2H1V2h14zm-1 8v2H2v-2h12zm-2 4v2H4v-2h8z"></path></svg></button>
                                </div>
                            </div>

                            <div className="mt-3 space-y-3">
                                <div className="pb-3 border-b border-[#e0e0e0]">
                                    <p className="text-[12px] text-[#666]"><span className="font-semibold text-black">Sarthak Atrish</span> commented on a post • 1w</p>
                                    <p className="text-[13px] mt-1 text-black">atrish07sarthak@gmail.com</p>
                                </div>
                                <div>
                                    <p className="text-[12px] text-[#666]"><span className="font-semibold text-black">Sarthak Atrish</span> commented on a post • 2w</p>
                                    <p className="text-[13px] mt-1 text-black">Sarthak Atrish<br />atrish07sarthak@gmail.com</p>
                                </div>
                            </div>

                            <div className="border-t border-[#e0e0e0] mt-1 pt-2">
                                <button className="w-full text-center text-[#666] font-semibold text-[14px] hover:bg-[#f3f2ef] py-1 rounded">Show all activity <span className="text-[16px]">→</span></button>
                            </div>
                        </div>

                        {/* Open to work */}
                        <div className="bg-white rounded-lg border border-[#e0e0e0] mb-2 p-4">
                            <div className="flex justify-between items-center mb-1">
                                <h2 className="font-semibold text-[16px]">Open to work</h2>
                                <button className="text-[#666] hover:bg-[#f3f2ef] p-1 rounded-full"><div className="w-6 h-6 flex items-center justify-center"><svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M14 3.03l-5 5.03L4 3 3 4.06l5 5 5-5L14 3.03zM9 10v6H7v-6H9z"></path></svg></div></button>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1"><Briefcase size={20} className="text-[#00000099]" /></div>
                                <div>
                                    <h3 className="font-semibold text-[13px] hover:underline cursor-pointer">Executive, Lead Generation Executive, Software Engineer...</h3>
                                    <p className="text-[12px] text-[#0a66c2] font-semibold mt-0.5 hover:underline cursor-pointer">See all details</p>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-white rounded-lg border border-[#e0e0e0] mb-2 p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-[18px]">Experience</h2>
                                <div className="flex gap-2">
                                    <button className="hover:bg-[#f3f2ef] p-2 rounded-full"><svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M15 2v2H1V2h14zm-1 8v2H2v-2h12zm-2 4v2H4v-2h8z"></path></svg></button>
                                    <button className="hover:bg-[#f3f2ef] p-2 rounded-full"><svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M15 2v2H1V2h14zm-1 8v2H2v-2h12zm-2 4v2H4v-2h8z"></path></svg></button>
                                </div>
                            </div>

                            <div className="flex gap-3 mb-4">
                                <div className="w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0">
                                    <img src="/images/folder.png" className="w-8 h-8 opacity-60" />
                                </div>
                                <div className="flex-1 min-w-0 border-b border-[#e0e0e0] pb-4">
                                    <h3 className="font-semibold text-[14px] hover:underline cursor-pointer">Student Organization</h3>
                                    <p className="text-[13px]">E-Cell, MIT Manipal</p>
                                    <p className="text-[12px] text-[#666] mt-0.5">2024 - Present · 1 yr</p>
                                    <p className="text-[12px] text-[#666]">Manipal, Karnataka, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white rounded-lg border border-[#e0e0e0] mb-2 p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-[18px]">Education</h2>
                                <button className="hover:bg-[#f3f2ef] p-2 rounded-full"><svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M15 2v2H1V2h14zm-1 8v2H2v-2h12zm-2 4v2H4v-2h8z"></path></svg></button>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-12 h-12 bg-[#f3f2ef] rounded flex items-center justify-center flex-shrink-0">
                                    <GraduationCap size={24} className="text-[#666]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[14px] hover:underline cursor-pointer">Manipal Institute of Technology</h3>
                                    <p className="text-[13px]">Bachelor of Technology - BTech, Information Technology</p>
                                    <p className="text-[12px] text-[#666] mt-0.5">2023 - 2027</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar - Narrower */}
                    <div className="w-[170px] shrink-0 hidden lg:block">
                        <div className="bg-white rounded-lg border border-[#e0e0e0] mb-2 overflow-hidden p-3">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold text-[12px]">Profile language</h2>
                                <button className="text-[#666]"><svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M11.97 3.03l-5 5.03L4 3 3 4.06l5 5 5-5 1.97-1.03z"></path></svg></button>
                            </div>
                            <p className="text-[11px] text-[#666]">English</p>
                        </div>

                        <div className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden p-3">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold text-[12px]">Public profile & URL</h2>
                                <button className="text-[#666]"><svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M11.97 3.03l-5 5.03L4 3 3 4.06l5 5 5-5 1.97-1.03z"></path></svg></button>
                            </div>
                            <p className="text-[11px] text-[#0a66c2] hover:underline cursor-pointer truncate">
                                linkedin.com/in/sarthak-atrish
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden p-3 mt-2">
                            <h2 className="font-semibold text-[12px] mb-2">People also viewed</h2>
                            <div className="flex gap-2 items-start mb-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                                <div className="min-w-0">
                                    <h3 className="text-[11px] font-semibold truncate">Aryan Singh</h3>
                                    <p className="text-[10px] text-[#666] line-clamp-2">Student at Other University | Developer</p>
                                    <button className="text-[11px] text-[#666] border border-[#666] rounded-full px-2 py-0.5 mt-1 hover:bg-[#0000000d]">Connect</button>
                                </div>
                            </div>
                            <div className="flex gap-2 items-start">
                                <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                                <div className="min-w-0">
                                    <h3 className="text-[11px] font-semibold truncate">Rohan Sharma</h3>
                                    <p className="text-[10px] text-[#666] line-clamp-2">Software Engineer Intern</p>
                                    <button className="text-[11px] text-[#666] border border-[#666] rounded-full px-2 py-0.5 mt-1 hover:bg-[#0000000d]">Connect</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WindowWrapper(LinkedIn, "linkedin");
