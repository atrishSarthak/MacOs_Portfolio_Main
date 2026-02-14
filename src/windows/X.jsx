import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import {
    Home, Search, Bell, Mail, User, MoreHorizontal,
    Calendar, ArrowLeft, MessageSquare,
    Repeat2, Heart, Share, BarChart2
} from "lucide-react";

// Helper components defined BEFORE X to avoid ReferenceError
const NavItem = ({ icon, text, active }) => (
    <div className={`group flex items-center xl:gap-3 p-2 xl:pr-4 w-full rounded-full transition-colors cursor-pointer ${active ? '' : 'hover:bg-[#eff3f41a]'}`}>
        <div className="flex-none">{icon}</div>
        <span className={`hidden xl:block text-[16px] mr-2 text-[#e7e9ea] truncate ${active ? 'font-bold' : 'font-normal'}`}>{text}</span>
    </div>
);

const FollowSuggestion = ({ name, handle, verified }) => (
    <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors">
        <div className="flex items-center gap-2 max-w-[calc(100%-70px)]">
            <div className="min-w-8 w-8 h-8 rounded-full bg-gray-700 flex-none"></div>
            <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 truncate w-full">
                    <span className="font-bold text-[13px] hover:underline text-[#e7e9ea] truncate">{name}</span>
                    {verified && (
                        <svg viewBox="0 0 22 22" className="w-[15px] h-[15px] flex-none fill-[#1d9bf0]">
                            <g>
                                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.687.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.246-.356.54-.555 1.17-.574 1.817.02.647.215 1.276.574 1.817.356.54.856.972 1.443 1.248-.224.606-.274 1.263-.144 1.896.129.634.433 1.218.878 1.688.47.443 1.054.75 1.687.882.635.132 1.294.083 1.902-.14.271.585.7.96 1.24 1.44.54.49 1.167.89 1.813.568.647-.02 1.275-.214 1.816-.568.541-.354.973-.852 1.246-1.44.608.223 1.266.273 1.9-.14.633-.13 1.216-.434 1.686-.88.444-.47.75-1.055.88-1.688.132-.633.083-1.29-.14-1.896.586-.274 1.084-.705 1.439-1.246.354-.54.55-1.17.568-1.816zM9.662 14.85l-3.429-3.428 1.293-1.293 2.136 2.137 5.429-5.429 1.293 1.293-6.722 6.72z"></path>
                            </g>
                        </svg>
                    )}
                </div>
                <span className="text-[#71767b] text-[13px] truncate">{handle}</span>
            </div>
        </div>
        <button className="bg-[#eff3f4] text-[#0f1419] font-bold text-[12px] px-3 py-1 rounded-full hover:bg-[#d7dbdc] transition-colors flex-none">
            Follow
        </button>
    </div>
);

const Trend = ({ category, topic }) => (
    <div className="px-3 py-2.5 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors relative">
        <div className="flex justify-between text-[#71767b] text-[11px]">
            <span className="truncate">{category}</span>
            <div className="p-1.5 rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] transition-colors -mr-2 -mt-2">
                <MoreHorizontal size={13} />
            </div>
        </div>
        <p className="font-bold text-[13px] mt-0.5 text-[#e7e9ea]">{topic}</p>
    </div>
);

const X = () => {
    const handleRedirect = () => {
        window.open("https://x.com/atrish_sarthak", "_blank");
    };

    return (
        <>
            <div id="window-header">
                <WindowControls
                    target="x"
                    onMinimize={handleRedirect}
                    onMaximize={handleRedirect}
                />
                <h2 className="w-full text-center font-bold">X</h2>
            </div>
            <div className="flex bg-black text-white font-sans overflow-hidden" style={{ height: 'calc(100% - 43px)' }}>
                {/* Sidebar - Further reduced width */}
                <div className="w-[60px] xl:w-[190px] flex flex-col items-end px-1.5 py-2 border-r border-[#2f3336]">
                    <div className="w-full xl:max-w-[170px] flex flex-col items-center xl:items-start">
                        <div className="p-1.5 w-min rounded-full hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer mb-2">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[22px] h-[22px] fill-white">
                                <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
                            </svg>
                        </div>

                        <nav className="flex flex-col gap-0.5 mb-3 w-full bg-transparent">
                            <NavItem icon={<Home size={20} strokeWidth={2.5} />} text="Home" active />
                            <NavItem icon={<Search size={20} />} text="Explore" />
                            <NavItem icon={<Bell size={20} />} text="Notifications" />
                            <NavItem icon={<Mail size={20} />} text="Messages" />
                            <NavItem icon={<User size={20} />} text="Profile" />
                            <NavItem icon={<MoreHorizontal size={20} />} text="More" />
                        </nav>

                        <button
                            onClick={handleRedirect}
                            className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold rounded-full w-[40px] h-[40px] xl:w-full xl:h-[40px] shadow-lg transition-colors flex items-center justify-center text-[13px]"
                        >
                            <span className="hidden xl:block">Visit Profile</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-white xl:hidden"><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g></svg>
                        </button>
                    </div>
                    <div className="mt-auto w-full xl:max-w-[180px] mb-3 flex items-center justify-center xl:justify-start gap-2 p-2 rounded-full hover:bg-[#1d9bf0]/10 cursor-pointer transition-colors overflow-hidden">
                        <img src="/images/X_ProfilePic.png" alt="Profile" className="w-8 h-8 rounded-full object-cover flex-none" />
                        <div className="hidden xl:block flex-1 min-w-0">
                            <p className="font-bold text-[13px] truncate leading-4">Sarthak</p>
                            <p className="text-[#71767b] text-[13px] truncate leading-4">@atrish_sarthak</p>
                        </div>
                        <MoreHorizontal size={15} className="hidden xl:block flex-none" />
                    </div>
                </div>

                {/* Main Feed - Increased width via flex-1 */}
                <div className="flex-1 flex flex-col min-w-0 border-r border-[#2f3336]">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-3 py-1 flex items-center justify-between border-b border-[#2f3336]">
                        <div className="flex items-center gap-5">
                            <div className="p-1.5 -ml-2 hover:bg-[#eff3f41a] rounded-full cursor-pointer transition-colors">
                                <ArrowLeft size={16} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-[16px] leading-4">Sarthak</h2>
                                <p className="text-[#71767b] text-[10px] leading-3">57 posts</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-y-auto w-full">
                        {/* Profile Banner & Info */}
                        <div className="relative">
                            <div className="h-[140px] bg-[#333639]">
                                <img src="/images/banner.png" className="w-full h-full object-cover" alt="Banner" />
                            </div>
                            <div className="absolute -bottom-[48px] left-3">
                                <div className="w-[96px] h-[96px] rounded-full bg-black flex items-center justify-center p-1">
                                    <img src="/images/X_ProfilePic.png" alt="Profile" className="w-full h-full rounded-full object-cover border-[3px] border-black" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end px-3 py-2 pb-6">
                            <button
                                onClick={handleRedirect}
                                className="bg-white text-black font-bold px-3 py-1 rounded-full hover:bg-gray-200 transition-colors text-[12px]"
                            >
                                Visit Profile
                            </button>
                        </div>

                        <div className="px-3">
                            <div className="flex items-center gap-1">
                                <h1 className="font-extrabold text-[16px] leading-4">Sarthak</h1>
                                <button className="ml-1 bg-transparent border border-[#536471] rounded-full px-1.5 py-0.5 text-[9px] font-bold hover:bg-[#eff3f41a] transition-colors leading-3">
                                    Get verified
                                </button>
                            </div>
                            <p className="text-[#71767b] text-[12px]">@atrish_sarthak</p>

                            <p className="mt-2 text-[12px] leading-4 text-[#e7e9ea]">
                                Building skills that compound |
                            </p>

                            <div className="flex items-center gap-1 mt-2 text-[#71767b] text-[12px]">
                                <Calendar size={14} />
                                <span>Joined December 2025</span>
                            </div>

                            <div className="flex gap-3 mt-2 text-[11px]">
                                <span className="hover:underline cursor-pointer"><span className="font-bold text-[#e7e9ea]">36</span> <span className="text-[#71767b]">Following</span></span>
                                <span className="hover:underline cursor-pointer"><span className="font-bold text-[#e7e9ea]">4</span> <span className="text-[#71767b]">Followers</span></span>
                            </div>
                        </div>

                        <div className="flex mt-2 border-b border-[#2f3336] sticky top-[45px] z-10 bg-black/80 backdrop-blur-md">
                            {['Posts', 'Replies', 'Highlights', 'Articles', 'Media', 'Likes'].map((tab, i) => (
                                <div key={tab} className="flex-1 hover:bg-[#eff3f41a] cursor-pointer transition-colors relative h-[42px]">
                                    <div className="flex items-center justify-center h-full">
                                        <span className={`text-[12px] font-medium relative h-full flex items-center ${i === 0 ? 'text-[#e7e9ea] font-bold' : 'text-[#71767b]'}`}>
                                            {tab}
                                            {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#1d9bf0]"></div>}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pinned Tweet */}
                        <div className="border-b border-[#2f3336] p-3 hover:bg-[#eff3f408] cursor-pointer transition-colors">
                            <div className="text-[11px] font-bold text-[#71767b] flex items-center gap-1 mb-1 ml-8">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3 fill-[#71767b]"><g><path d="M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5h-2v-5H3.88L7 9.76V4.5z"></path></g></svg>
                                Pinned
                            </div>
                            <div className="flex gap-2.5">
                                <div className="flex-none flex flex-col items-center">
                                    <img src="/images/X_ProfilePic.png" alt="" className="w-8 h-8 rounded-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-[13px] truncate">
                                            <span className="font-bold text-[#e7e9ea] hover:underline truncate">Sarthak</span>
                                            <span className="text-[#71767b] truncate">@atrish_sarthak · Feb 12</span>
                                        </div>
                                        <div className="p-1.5 rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] text-[#71767b] transition-colors -mr-2 flex-none">
                                            <MoreHorizontal size={15} />
                                        </div>
                                    </div>

                                    <p className="text-[13px] leading-4 mt-1 text-[#e7e9ea]">
                                        Hey <span className="text-[#1d9bf0]">@X</span>, I'm new here on a programming journey of learning and building in public with <span className="text-[#1d9bf0]">#100DaysOfCode</span> challenge.
                                    </p>

                                    <div className="flex justify-between mt-2.5 text-[#71767b] max-w-[380px]">
                                        <div className="flex items-center gap-1 group cursor-pointer">
                                            <div className="p-1.5 rounded-full group-hover:bg-[#1d9bf0]/10 group-hover:text-[#1d9bf0] transition-colors -ml-2"><MessageSquare size={15} /></div>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer">
                                            <div className="p-1.5 rounded-full group-hover:bg-[#00ba7c]/10 group-hover:text-[#00ba7c] transition-colors"><Repeat2 size={15} /></div>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer">
                                            <div className="p-1.5 rounded-full group-hover:bg-[#f91880]/10 group-hover:text-[#f91880] transition-colors"><Heart size={15} /></div>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer">
                                            <div className="p-1.5 rounded-full group-hover:bg-[#1d9bf0]/10 group-hover:text-[#1d9bf0] transition-colors"><BarChart2 size={15} /></div>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer">
                                            <div className="p-1.5 rounded-full group-hover:bg-[#1d9bf0]/10 group-hover:text-[#1d9bf0] transition-colors"><Share size={15} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Reduced width to give more space to feed */}
                <div className="hidden lg:block w-[240px] pl-[16px] pr-[8px] py-2.5 overflow-y-auto border-l border-[#2f3336]">
                    {/* Search */}
                    <div className="sticky top-0 bg-black pb-2.5 z-10 w-full">
                        <div className="relative group">
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71767b] group-focus-within:text-[#1d9bf0]">
                                <Search size={17} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-[#202327] rounded-full py-2 pl-9 pr-3 text-[13px] focus:outline-none focus:bg-black focus:ring-1 focus:ring-[#1d9bf0] placeholder:text-[#71767b] text-[#e7e9ea] border border-transparent"
                            />
                        </div>
                    </div>

                    {/* You might like */}
                    <div className="bg-[#16181c] rounded-2xl mb-3 overflow-hidden border border-[#16181c]">
                        <h2 className="font-extrabold text-[17px] px-3 py-2.5 leading-5">You might like</h2>

                        <FollowSuggestion name="ElonMusk🧋" handle="@elonmusk" verified />
                        <FollowSuggestion name="JobMetaIntern" handle="@jobmeta_intern" verified />
                        <FollowSuggestion name="TimCook" handle="@timcook" verified />

                        <div className="px-3 py-2.5 hover:bg-[rgba(15, 7, 7, 0.03)] cursor-pointer transition-colors">
                            <span className="text-[#1d9bf0] text-[13px]">Show more</span>
                        </div>
                    </div>

                    {/* What's happening */}
                    <div className="bg-[#16181c] rounded-2xl overflow-hidden border border-[#16181c] mb-3">
                        <h2 className="font-extrabold text-[17px] px-3 py-2.5 leading-5">What's happening</h2>

                        <Trend topic="#AItakeover" category="Trending" />
                        <Trend topic="#CR7theGOAT" category="Entertainment" />
                        <Trend topic="#OutOfThisWorld" category="Trending" />

                        <div className="px-3 py-2.5 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors">
                            <span className="text-[#1d9bf0] text-[13px]">Show more</span>
                        </div>
                    </div>

                    <div className="px-3 py-2.5 text-[11px] text-[#71767b] leading-3 flex flex-wrap gap-x-2.5 gap-y-1">
                        <span className="hover:underline cursor-pointer">Terms</span>
                        <span className="hover:underline cursor-pointer">Privacy</span>
                        <span className="hover:underline cursor-pointer">Cookies</span>
                        <span>© 2026 X Corp.</span>
                    </div>
                </div>
            </div>
        </>
    );
};

// Define display name for WindowWrapper
const XComponent = X;
const XWindow = WindowWrapper(XComponent, "x");

export default XWindow;
