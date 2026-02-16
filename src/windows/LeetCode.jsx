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
                <span className="font-medium text-[10px] text-[#1a1a1a]">{label}</span>
                <span className="text-[10px] font-semibold text-[#1a1a1a]">{solved}<span className="text-[9px] text-[#6c6c6c]">/{totalSolved}</span></span>
            </div>
            <div className="h-1 bg-[#f5f5f5] rounded-full overflow-hidden">
                <div 
                    className="h-full rounded-full transition-all duration-300" 
                    style={{ width: `${pct}%`, backgroundColor: color }} 
                />
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
        
        let calendarObj;
        try {
            calendarObj = typeof stats.submissionCalendar === 'string'
                ? JSON.parse(stats.submissionCalendar)
                : stats.submissionCalendar;
        } catch (error) {
            // Silently fall back to empty object if parsing fails
            calendarObj = {};
        }
        
        return Object.values(calendarObj).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
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

            <div className="flex flex-col flex-1 min-h-0 bg-white text-[#1a1a1a] overflow-hidden rounded-b-xl" style={{ 
                height: 'calc(100% - 33px)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>

                {isSyncing && (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center rounded-b-xl">
                        <div className="bg-white/90 px-4 py-3 rounded-lg shadow-lg">
                            <p className="text-gray-700 font-semibold text-sm">Updating data</p>
                        </div>
                    </div>
                )}

                <div className="flex-1 min-h-0 flex flex-col overflow-hidden p-4 w-full bg-[#fafafa]">

                    {loading && (
                        <div className="flex flex-col items-center justify-center flex-1 gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#ffa116] border-t-transparent"></div>
                            <p className="text-[#6c6c6c] font-medium text-sm">Loading LeetCode profile...</p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="flex flex-col items-center justify-center flex-1 gap-4">
                            <div className="text-[#ef4743] text-4xl">⚠️</div>
                            <p className="text-[#ef4743] font-medium text-center px-4 text-sm">Failed to load profile data</p>
                            <p className="text-[#6c6c6c] text-xs text-center px-4">{error}</p>
                            <button 
                                onClick={handleRefresh} 
                                className="px-4 py-2 bg-[#ffa116] hover:bg-[#ff9800] text-white rounded-md text-sm font-medium transition-colors shadow-sm"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {stats && !loading && (
                        <>
                            {/* Top row: profile card + questions solved card + badges card */}
                            <div className="flex gap-2 flex-shrink-0 flex-wrap items-stretch mb-2">
                                {/* Profile Card */}
                                <div className="bg-white rounded-lg shadow-sm border border-[#e5e5e5] p-2 shrink-0 w-[180px]">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full border-2 border-[#e5e5e5] overflow-hidden bg-[#f5f5f5] flex items-center justify-center shrink-0 mb-1">
                                            <img
                                                src={profileImgSrc}
                                                alt={displayName}
                                                className="w-full h-full object-cover"
                                                onError={() => setProfileImgSrc(profileImgSrc === PROFILE_IMAGE ? PROFILE_IMAGE_ALT : '')}
                                            />
                                            {!profileImgSrc && <span className="text-sm font-semibold text-[#6c6c6c]">{displayName.charAt(0)}</span>}
                                        </div>
                                        <div className="text-center mb-1">
                                            <h1 className="text-sm font-semibold text-[#1a1a1a] mb-0.5 flex items-center gap-1 justify-center">
                                                {displayName}
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#00af9b] flex items-center justify-center">
                                                    <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </h1>
                                            <p className="text-[#6c6c6c] text-[10px] font-medium">{username}</p>
                                            <p className="text-[#6c6c6c] text-[9px]">Rank {stats.ranking?.toLocaleString()}</p>
                                        </div>
                                        <a 
                                            href={`https://leetcode.com/u/${username}/`} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="w-full py-1 rounded-md bg-[#ffa116] hover:bg-[#ff9800] text-white font-medium text-[10px] text-center transition-colors shadow-sm mb-1"
                                        >
                                            View Profile
                                        </a>
                                        <div className="w-full space-y-0.5 text-left text-[9px] text-[#6c6c6c]">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={8} />
                                                <span>India</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <GraduationCap size={8} />
                                                <span>MIT</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye size={8} />
                                                <span>Views: 0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Problems Solved Card */}
                                <div className="bg-white rounded-lg shadow-sm border border-[#e5e5e5] p-2 flex-1 min-w-0 flex flex-col justify-center gap-1.5 max-w-[280px]">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-semibold text-[#1a1a1a]">Solved Problems</h2>
                                        <span className="text-lg font-bold text-[#1a1a1a]">{stats.totalSolved}</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <ProgressBar label="Easy" solved={stats.easySolved} totalSolved={totalEasy} color="#00af9b" />
                                        <ProgressBar label="Medium" solved={stats.mediumSolved} totalSolved={totalMedium} color="#ffa116" />
                                        <ProgressBar label="Hard" solved={stats.hardSolved} totalSolved={totalHard} color="#ef4743" />
                                    </div>
                                </div>

                                {/* Stats Card */}
                                <div className="bg-white rounded-lg shadow-sm border border-[#e5e5e5] p-2 flex flex-col gap-1.5 shrink-0 w-[160px]">
                                    <h3 className="text-xs font-semibold text-[#1a1a1a]">Statistics</h3>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-[#6c6c6c]">Submissions</span>
                                            <span className="text-[10px] font-semibold text-[#1a1a1a]">{submissionCount}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-[#6c6c6c]">Active Days</span>
                                            <span className="text-[10px] font-semibold text-[#1a1a1a]">{activeDays}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-[#6c6c6c]">Max Streak</span>
                                            <span className="text-[10px] font-semibold text-[#1a1a1a]">{maxStreak}</span>
                                        </div>
                                    </div>
                                    <div className="mt-1 pt-1 border-t border-[#e5e5e5]">
                                        <div className="flex gap-1.5 justify-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ffa116] to-[#ff9800] flex items-center justify-center shadow-sm">
                                                    <Award className="w-2.5 h-2.5 text-white" />
                                                </div>
                                                <p className="text-[7px] text-[#6c6c6c] mt-0.5">50 Days</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ef4743] to-[#d32f2f] flex items-center justify-center shadow-sm">
                                                    <Flame className="w-2.5 h-2.5 text-white" />
                                                </div>
                                                <p className="text-[7px] text-[#6c6c6c] mt-0.5">150 Days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Heatmap: takes remaining space, visible without scroll */}
                            <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg shadow-sm border border-[#e5e5e5] p-4 overflow-hidden">
                                <div className="flex items-center justify-between mb-3 flex-shrink-0 flex-wrap gap-2">
                                    <h3 className="font-semibold text-[#1a1a1a] text-base">
                                        {submissionCount} submissions in the past year
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs text-[#6c6c6c]">
                                        <span>Total active days: <strong className="text-[#1a1a1a]">{activeDays}</strong></span>
                                        <span>Max streak: <strong className="text-[#1a1a1a]">{maxStreak}</strong></span>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                                    <HeatmapGrid submissionCalendar={stats.submissionCalendar} compact groupByMonth />
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-1 flex-shrink-0 mt-3">
                                <p className="text-xs text-[#6c6c6c] truncate">
                                    Last updated: {dataTimestamp?.toLocaleString()}
                                </p>
                                <button 
                                    onClick={handleRefresh} 
                                    className="p-2 text-[#6c6c6c] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors" 
                                    title="Refresh data"
                                >
                                    <RefreshCw size={14} />
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
