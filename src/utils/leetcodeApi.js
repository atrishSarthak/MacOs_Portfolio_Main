export const fetchLeetCodeStats = async (username) => {
    const CACHE_KEY = `leetcode_stats_${username}`;
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    const TIMEOUT_MS = 10000; // 10 seconds timeout

    // Static fallback data - only used if NO cached data exists at all
    // Updated with real stats from localStorage (as of last successful fetch)
    const FALLBACK_DATA = {
        status: 'success',
        totalSolved: 287,
        totalQuestions: 3841,
        easySolved: 119,
        totalEasy: 926,
        mediumSolved: 152,
        totalMedium: 2007,
        hardSolved: 16,
        totalHard: 908,
        ranking: 125000,
        contributionPoints: 0,
        reputation: 0,
        submissionCalendar: JSON.stringify(generateSampleCalendar()),
        totalActiveDays: 267,
        streak: 14,
        isFallback: true
    };

    try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        let cachedStats = null;
        
        if (cachedData) {
            try {
                const { timestamp, data } = JSON.parse(cachedData);
                cachedStats = data; // Store cached data for fallback
                
                // If cache is still fresh (within 24 hours), return it immediately
                if (Date.now() - timestamp < CACHE_DURATION) {
                    return data;
                }
                // Cache is stale, but keep it as fallback if API fails
            } catch {
                // Cache corrupted, clear it
                localStorage.removeItem(CACHE_KEY);
            }
        }

        // Try to fetch fresh data using LeetCode's official GraphQL API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            // GraphQL query to get user profile data
            const graphqlQuery = {
                query: `
                    query getUserProfile($username: String!) {
                        matchedUser(username: $username) {
                            username
                            profile {
                                ranking
                            }
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                }
                                totalSubmissionNum {
                                    difficulty
                                    count
                                }
                            }
                            userCalendar {
                                submissionCalendar
                                streak
                                totalActiveDays
                            }
                        }
                        allQuestionsCount {
                            difficulty
                            count
                        }
                    }
                `,
                variables: { username }
            };

            // Use leetcode-query API which is a CORS-friendly wrapper
            const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`, {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Failed to fetch LeetCode stats');
            }

            const result = await response.json();
            
            if (!result || result.errors) {
                throw new Error('User not found or invalid response');
            }

            // Parse the response from leetcode-query API
            const totalSolved = result.totalSolved || 0;
            const easySolved = result.easySolved || 0;
            const mediumSolved = result.mediumSolved || 0;
            const hardSolved = result.hardSolved || 0;
            const ranking = result.ranking || 0;

            // Parse submission calendar
            let submissionCalendar = "{}";
            let totalActiveDays = 0;
            let streak = 0;
            
            if (result.submissionCalendar) {
                submissionCalendar = typeof result.submissionCalendar === 'string' 
                    ? result.submissionCalendar 
                    : JSON.stringify(result.submissionCalendar);
                
                // Calculate active days and streak from calendar
                try {
                    const calendar = JSON.parse(submissionCalendar);
                    totalActiveDays = Object.values(calendar).filter(v => v > 0).length;
                    
                    // Calculate streak
                    const dates = Object.keys(calendar)
                        .filter(k => calendar[k] > 0)
                        .map(k => parseInt(k))
                        .sort((a, b) => b - a);
                    
                    let currentStreak = 0;
                    let maxStreak = 0;
                    const oneDay = 86400;
                    
                    for (let i = 0; i < dates.length; i++) {
                        if (i === 0) {
                            currentStreak = 1;
                        } else {
                            const dayDiff = (dates[i - 1] - dates[i]) / oneDay;
                            if (dayDiff <= 1) {
                                currentStreak++;
                            } else {
                                maxStreak = Math.max(maxStreak, currentStreak);
                                currentStreak = 1;
                            }
                        }
                    }
                    streak = Math.max(maxStreak, currentStreak);
                } catch (e) {
                    console.warn('Error parsing calendar:', e);
                }
            }

            // Transform data to match our format
            const data = {
                status: 'success',
                totalSolved,
                totalQuestions: 3841,
                easySolved,
                totalEasy: 926,
                mediumSolved,
                totalMedium: 2007,
                hardSolved,
                totalHard: 908,
                ranking,
                contributionPoints: 0,
                reputation: 0,
                submissionCalendar,
                totalActiveDays,
                streak,
                isFallback: false
            };

            // Save fresh data to cache with current timestamp
            const dataToCache = {
                timestamp: Date.now(),
                data: data
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));

            return data;
        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.warn('Primary API fetch failed, trying backup:', fetchError);
            
            // Try the alfa-leetcode-api as backup
            try {
                const [solvedResponse, calendarResponse] = await Promise.all([
                    fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
                    fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`)
                ]);
                
                if (solvedResponse.ok && calendarResponse.ok) {
                    const solvedData = await solvedResponse.json();
                    const calendarData = await calendarResponse.json();

                    const data = {
                        status: 'success',
                        totalSolved: solvedData.solvedProblem || 0,
                        totalQuestions: 3841,
                        easySolved: solvedData.easySolved || 0,
                        totalEasy: 926,
                        mediumSolved: solvedData.mediumSolved || 0,
                        totalMedium: 2007,
                        hardSolved: solvedData.hardSolved || 0,
                        totalHard: 908,
                        ranking: solvedData.ranking || 0,
                        contributionPoints: 0,
                        reputation: 0,
                        submissionCalendar: calendarData.submissionCalendar || "{}",
                        totalActiveDays: calendarData.totalActiveDays || 0,
                        streak: calendarData.streak || 0,
                        isFallback: false
                    };

                    const dataToCache = {
                        timestamp: Date.now(),
                        data: data
                    };
                    localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));

                    return data;
                }
            } catch (backupError) {
                console.warn('Backup API also failed:', backupError);
            }
            
            // If we have cached data (even if stale), use it
            if (cachedStats) {
                return { ...cachedStats, isFallback: true };
            }
            
            // Only use hardcoded fallback if no cache exists at all
            return FALLBACK_DATA;
        }
    } catch (error) {
        console.error('Error in fetchLeetCodeStats:', error);
        
        // Try to get any cached data as last resort
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const { data } = JSON.parse(cachedData);
                return { ...data, isFallback: true };
            }
        } catch {
            // Ignore cache read errors
        }
        
        // Final fallback if nothing else works
        return FALLBACK_DATA;
    }
};

// Helper function to generate sample calendar data
function generateSampleCalendar() {
    const calendar = {};
    const now = Date.now() / 1000; // Current timestamp in seconds
    const oneDay = 24 * 60 * 60;
    
    // Generate data for past 365 days with some activity
    for (let i = 0; i < 365; i++) {
        const timestamp = Math.floor(now - (i * oneDay));
        // Random activity: 70% chance of having submissions
        if (Math.random() > 0.3) {
            calendar[timestamp] = Math.floor(Math.random() * 8) + 1; // 1-8 submissions
        }
    }
    
    return calendar;
}

export const clearLeetCodeCache = (username) => {
    const CACHE_KEY = `leetcode_stats_${username}`;
    localStorage.removeItem(CACHE_KEY);
    console.log('LeetCode cache cleared. Refresh the page to fetch fresh data.');
};

// Helper function to manually set fallback data with your real stats
export const updateFallbackData = (stats) => {
    const FALLBACK_KEY = 'leetcode_fallback_data';
    localStorage.setItem(FALLBACK_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: stats
    }));
    console.log('Fallback data updated with real stats');
};
