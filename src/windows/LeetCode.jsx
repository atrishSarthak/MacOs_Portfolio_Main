import React, { useEffect, useState } from 'react';
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { fetchLeetCodeStats, clearLeetCodeCache } from '../utils/leetcodeApi';
import HeatmapGrid from '../components/HeatmapGrid';
import { ExternalLink, RefreshCw, Trophy, Target, Award, CheckCircle } from 'lucide-react';

const LeetCode = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataTimestamp, setDataTimestamp] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);

    const loadStats = async (isRefresh = false) => {
        if (isRefresh) {
            setIsSyncing(true);
        } else {
            setLoading(true);
        }
        setError(null);
        try {
            const data = await fetchLeetCodeStats('Atrish07');
            setStats(data);
            setDataTimestamp(new Date());
        } catch (err) {
            setError(err.message);
        } finally {
            if (isRefresh) {
                setIsSyncing(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadStats(false);
    }, []);

    const handleRefresh = () => {
        clearLeetCodeCache('Atrish07');
        loadStats(true);
    };

    const username = "Atrish07";

    return (
        <>
            <div id="window-header">
                <WindowControls target="leetcode" />
                <h2 className="w-full text-center font-bold">LeetCode</h2>
            </div>

            {/* Main Content - consistent with LinkedIn style */}
            <div className="flex flex-col bg-[#f3f2ef] text-[#262626] font-sans overflow-hidden relative" style={{ height: 'calc(100% - 33px)' }}>

                {/* Blur Overlay - shown during sync */}
                {isSyncing && (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg">
                            <p className="text-gray-700 font-semibold text-lg">Updating data</p>
                        </div>
                    </div>
                )}

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-4 w-full">

                    {loading && (
                        <div className="flex flex-col items-center justify-center h-full gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <p className="text-gray-500 font-medium">Connecting to LeetCode servers...</p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <p className="text-red-500 font-medium">Error: {error}</p>
                            <button
                                onClick={handleRefresh}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {stats && !loading && (
                        <div className="max-w-4xl mx-auto space-y-4">

                            {/* Profile Header */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#e0e0e0]">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-gray-200">
                                        <span className="text-xl font-bold text-gray-400">
                                            {username.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold flex items-center gap-2 text-black">
                                            {username}
                                            <CheckCircle size={16} className="text-blue-500 fill-blue-50" />
                                        </h1>
                                        <p className="text-gray-500 text-sm">Rank: #{stats.ranking?.toLocaleString()}</p>
                                    </div>
                                </div>
                                <a
                                    href={`https://leetcode.com/u/${username}/`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-[#2d2d2d] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#404040] transition-colors"
                                >
                                    Visit Profile <ExternalLink size={14} />
                                </a>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Solved Card */}
                                <div className="bg-white p-4 rounded-lg border border-[#e0e0e0] flex flex-col items-center justify-center gap-1">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full mb-1">
                                        <CheckCircle size={20} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">{stats.totalSolved}</h3>
                                    <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">Solved</p>
                                </div>

                                {/* Difficulty Breakdown */}
                                <div className="bg-white p-4 rounded-lg border border-[#e0e0e0] col-span-2 flex items-center justify-around">
                                    <div className="text-center">
                                        <p className="text-[#00b8a3] font-bold text-lg">{stats.easySolved}</p>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Easy</span>
                                    </div>
                                    <div className="w-[1px] h-8 bg-gray-200"></div>
                                    <div className="text-center">
                                        <p className="text-[#ffc01e] font-bold text-lg">{stats.mediumSolved}</p>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Medium</span>
                                    </div>
                                    <div className="w-[1px] h-8 bg-gray-200"></div>
                                    <div className="text-center">
                                        <p className="text-[#ff375f] font-bold text-lg">{stats.hardSolved}</p>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Hard</span>
                                    </div>
                                </div>
                            </div>

                            {/* Heatmap Section */}
                            <div className="bg-white p-4 rounded-lg border border-[#e0e0e0]">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-700 flex items-center gap-2 text-sm">
                                        <Target size={16} />
                                        Submission Map
                                    </h3>
                                    <div className="text-[10px] text-gray-400 font-medium">Last 12 Months</div>
                                </div>
                                <div className="w-full overflow-visible pb-2">
                                    <HeatmapGrid submissionCalendar={stats.submissionCalendar} />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-1">
                                <p className="text-[10px] text-gray-400">
                                    Last updated: {dataTimestamp?.toLocaleString()}
                                </p>
                                <button
                                    onClick={handleRefresh}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-all"
                                    title="Refresh Data"
                                >
                                    <RefreshCw size={12} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// Define constants for WindowWrapper
const LeetCodeComponent = LeetCode;
const LeetCodeWindow = WindowWrapper(LeetCodeComponent, "leetcode");

export default LeetCodeWindow;
