import React, { useEffect, useState } from 'react';
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { fetchLeetCodeStats, clearLeetCodeCache } from '../utils/leetcodeApi';
import HeatmapGrid from '../components/HeatmapGrid';
import { RefreshCw, MapPin, GraduationCap, Eye, Award, Flame } from 'lucide-react';

const PROFILE_IMAGE = '/images/X_ProfilePic.png';
const PROFILE_IMAGE_ALT = '/images/X_Profile_Pic.png';
const TOTAL_EASY = 926;
const TOTAL_MEDIUM = 2007;
const TOTAL_HARD = 908;
const TOTAL_PROBLEMS = 3841;

const ProgressBar = ({ label, solved, totalSolved, color }) => {
    const pct = totalSolved > 0 ? Math.min(100, (solved / totalSolved) * 100) : 0;
    return (
        <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs shrink-0" style={{ color }}>{label}</span>
                <span className="text-[10px] text-gray-600 shrink-0">{solved}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
        </div>
    );
};

const LeetCode = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataTimestamp, setDataTimestamp] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [profileImgSrc, setProfileImgSrc] = useState(PROFILE_IMAGE);

    const loadStats = async (isRefresh = false) => {
        if (isRefresh) setIsSyncing(true);
        else setLoading(true);
        setError(null);
        try {
            const data = await fetchLeetCodeStats('Atrish07');
            setStats(data);
            setDataTimestamp(new Date());
        } catch (err) {
            setError(err.message);
        } finally {
            if (isRefresh) setIsSyncing(false);
            else setLoading(false);
        }
    };

    useEffect(() => { loadStats(false); }, []);
    const handleRefresh = () => {
        clearLeetCodeCache('Atrish07');
        loadStats(true);
    };

    const username = "Atrish07";
    const displayName = "Sarthak";

    const totalQuestions = stats?.totalQuestions ?? TOTAL_PROBLEMS;
    const totalEasy = stats?.totalEasy ?? TOTAL_EASY;
    const totalMedium = stats?.totalMedium ?? TOTAL_MEDIUM;
    const totalHard = stats?.totalHard ?? TOTAL_HARD;

    const submissionCount = React.useMemo(() => {
        if (!stats?.submissionCalendar) return 0;
        return Object.values(stats.submissionCalendar).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    }, [stats?.submissionCalendar]);

    const { activeDays, maxStreak } = React.useMemo(() => {
        if (!stats?.submissionCalendar) return { activeDays: 0, maxStreak: 0 };

        const calendarObj = typeof stats.submissionCalendar === 'string'
            ? JSON.parse(stats.submissionCalendar)
            : stats.submissionCalendar;

        const dates = Object.entries(calendarObj)
            .filter(([_, count]) => count > 0)
            .map(([timestamp]) => new Date(parseInt(timestamp) * 1000))
            .sort((a, b) => a - b);

        const activeDaysCount = dates.length;

        let currentStreak = 0;
        let maxStreakCount = 0;

        for (let i = 0; i < dates.length; i++) {
            if (i === 0) {
                currentStreak = 1;
            } else {
                const dayDiff = Math.floor((dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24));
                if (dayDiff === 1) {
                    currentStreak++;
                } else {
                    maxStreakCount = Math.max(maxStreakCount, currentStreak);
                    currentStreak = 1;
                }
            }
        }
        maxStreakCount = Math.max(maxStreakCount, currentStreak);

        return { activeDays: activeDaysCount, maxStreak: maxStreakCount };
    }, [stats?.submissionCalendar]);

    return (
        <>
            <div id="window-header">
                <WindowControls target="leetcode" />
                <h2 className="w-full text-center font-bold">LeetCode</h2>
            </div>

            <div className="flex flex-col flex-1 min-h-0 bg-[#f3f2ef] text-[#262626] font-sans overflow-hidden rounded-b-xl" style={{ height: 'calc(100% - 33px)' }}>

                {isSyncing && (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center rounded-b-xl">
                        <div className="bg-white/90 px-4 py-3 rounded-lg shadow-lg">
                            <p className="text-gray-700 font-semibold text-sm">Updating data</p>
                        </div>
                    </div>
                )}

                <div className="flex-1 min-h-0 flex flex-col overflow-hidden p-2 w-full">

                    {loading && (
                        <div className="flex flex-col items-center justify-center flex-1 gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <p className="text-gray-500 font-medium text-sm">Connecting to LeetCode servers...</p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="flex flex-col items-center justify-center flex-1 gap-4">
                            <p className="text-red-500 font-medium text-center px-2">Error: {error}</p>
                            <button onClick={handleRefresh} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition-colors">
                                Retry
                            </button>
                        </div>
                    )}

                    {stats && !loading && (
                        <>
                            {/* Top row: profile card + questions solved card + badges card */}
                            <div className="flex gap-3 flex-shrink-0 flex-wrap items-stretch">
                                <div className="bg-white rounded-lg border border-[#e0e0e0] p-2 shrink-0 w-[200px]">
                                    <div className="flex flex-col items-center">
                                        <div className="w-14 h-14 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                                            <img
                                                src={profileImgSrc}
                                                alt={displayName}
                                                className="w-full h-full object-cover"
                                                onError={() => setProfileImgSrc(profileImgSrc === PROFILE_IMAGE ? PROFILE_IMAGE_ALT : '')}
                                            />
                                            {!profileImgSrc && <span className="text-xl font-bold text-gray-400">{displayName.charAt(0)}</span>}
                                        </div>
                                        <h1 className="text-sm font-bold text-black mt-1 flex items-center gap-0.5">
                                            {displayName}
                                            <span className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                            </span>
                                        </h1>
                                        <p className="text-gray-500 text-[10px]">{username}</p>
                                        <p className="text-gray-500 text-[10px]">Rank {stats.ranking?.toLocaleString()}</p>
                                        <a href={`https://leetcode.com/u/${username}/`} target="_blank" rel="noreferrer" className="mt-1 w-full py-1.5 rounded-lg bg-[#ffc01e] hover:bg-[#e6ac00] text-[#1a1a1a] font-semibold text-[11px] text-center shadow-sm border border-[#e6b800] transition-colors">
                                            Visit Profile
                                        </a>
                                        <div className="w-full mt-1 space-y-0.5 text-left">
                                            <p className="text-[9px] text-gray-500 flex items-center gap-0.5"><MapPin size={8} /> India</p>
                                            <p className="text-[9px] text-gray-500 flex items-center gap-0.5"><GraduationCap size={8} /> MIT</p>
                                        </div>
                                        <div className="w-full mt-1 pt-1 border-t border-gray-100">
                                            <p className="text-[9px] font-semibold text-gray-600">Community</p>
                                            <p className="text-[9px] text-gray-500 flex items-center gap-0.5"><Eye size={8} /> Views 0</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-[#e0e0e0] p-3 flex-1 min-w-0 flex flex-col justify-center gap-3 max-w-[320px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-gray-800">Solved: {stats.totalSolved}</span>
                                    </div>
                                    <ProgressBar label="Easy" solved={stats.easySolved} totalSolved={stats.totalSolved} color="#00b8a3" />
                                    <ProgressBar label="Med." solved={stats.mediumSolved} totalSolved={stats.totalSolved} color="#ffc01e" />
                                    <ProgressBar label="Hard" solved={stats.hardSolved} totalSolved={stats.totalSolved} color="#ff375f" />
                                </div>

                                {/* Badges Card */}
                                <div className="bg-white rounded-lg border border-[#e0e0e0] p-3 flex flex-col gap-2 shrink-0 w-[180px]">
                                    <p className="text-xs font-semibold text-gray-700 mb-1">Badges</p>
                                    <div className="flex gap-3 justify-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                                                <Award className="w-7 h-7 text-white" />
                                            </div>
                                            <p className="text-[9px] text-gray-600 mt-1">50 Days</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
                                                <Flame className="w-7 h-7 text-white" />
                                            </div>
                                            <p className="text-[9px] text-gray-600 mt-1">150 Days</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Heatmap: takes remaining space, visible without scroll */}
                            <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg border border-[#e0e0e0] p-2 mt-2 overflow-hidden">
                                <div className="flex items-center justify-between mb-1 flex-shrink-0 flex-wrap gap-1">
                                    <span className="font-semibold text-gray-800 text-xs">
                                        {submissionCount} submissions in the past one year
                                    </span>
                                    <div className="flex items-center gap-2 text-[9px] text-gray-500">
                                        <span>Total active days: {activeDays}</span>
                                        <span>Max streak: {maxStreak}</span>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                                    <HeatmapGrid submissionCalendar={stats.submissionCalendar} compact groupByMonth />
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-0.5 flex-shrink-0 mt-1">
                                <p className="text-[9px] text-gray-400 truncate">Updated: {dataTimestamp?.toLocaleString()}</p>
                                <button onClick={handleRefresh} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full" title="Refresh">
                                    <RefreshCw size={10} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

const LeetCodeWindow = WindowWrapper(LeetCode, "leetcode");
export default LeetCodeWindow;
