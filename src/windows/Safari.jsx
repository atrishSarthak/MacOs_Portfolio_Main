import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { Search, RotateCw, ChevronLeft, ChevronRight, Share, Plus } from "lucide-react";
import { blogPosts } from "#constants";

const Safari = () => {
    return (
        <div id="safari" className="w-[850px] h-[550px] bg-[#f9f9f9] rounded-xl overflow-hidden shadow-2xl flex flex-col font-sf-pro">
            {/* Toolbar */}
            <div className="h-12 bg-[#f3f3f3] border-b border-[#dcdcdc] flex items-center px-4 gap-4 shrink-0">
                <WindowControls target="safari" />

                <div className="flex gap-4 text-gray-500">
                    <ChevronLeft size={18} className="cursor-default opacity-50" />
                    <ChevronRight size={18} className="cursor-default opacity-50" />
                </div>

                <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 bg-[#e3e3e3] h-8 rounded-md px-3 text-sm text-gray-700 relative group transition-all hover:bg-[#dbdbdb] cursor-text">
                    <Search size={14} className="text-gray-500" />
                    <span className="text-center w-full absolute left-0 text-xs">jsmastery.com</span>
                    <RotateCw size={12} className="absolute right-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex gap-4 text-gray-500">
                    <Share size={16} />
                    <Plus size={18} />
                    <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center text-[8px]">Tabs</div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white overflow-y-auto">
                <div className="max-w-4xl mx-auto p-12">
                    <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">JavaScript Mastery Blog</h1>
                    <p className="text-center text-gray-500 mb-12 text-lg">Detailed guides on modern web development</p>

                    <div className="grid gap-8">
                        {blogPosts.map((post) => (
                            <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
                                <article className="flex gap-6 items-start p-4 -mx-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                    <div className="w-48 h-32 shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 py-1">
                                        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                                            <span>Guide</span>
                                            <span>•</span>
                                            <time>{post.date}</time>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors mb-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                            Learn the fundamentals and advanced concepts to master this topic completely. Checking out this guide is the first step!
                                        </p>
                                        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            Read Article →
                                        </div>
                                    </div>
                                </article>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
