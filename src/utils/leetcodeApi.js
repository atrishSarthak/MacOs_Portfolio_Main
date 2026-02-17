export const fetchLeetCodeStats = async (username) => {
    const CACHE_KEY = `leetcode_stats_${username}`;
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    const TIMEOUT_MS = 10000; // 10 seconds timeout

    try {
        // Check cache
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            try {
                const { timestamp, data } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    return data; // Return cached data if valid
                }
            } catch {
                // Cache corrupted, clear and fetch fresh
                localStorage.removeItem(CACHE_KEY);
            }
        }

        // Fetch fresh data with timeout using the new API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            // Fetch both solved stats and calendar data
            const [solvedResponse, calendarResponse] = await Promise.all([
                fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
                    signal: controller.signal
                }),
                fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, {
                    signal: controller.signal
                })
            ]);
            
            clearTimeout(timeoutId);

            if (!solvedResponse.ok || !calendarResponse.ok) {
                throw new Error('Failed to fetch LeetCode stats');
            }

            const solvedData = await solvedResponse.json();
            const calendarData = await calendarResponse.json();

            // Transform data to match the old API format
            const data = {
                status: 'success',
                totalSolved: solvedData.solvedProblem || 0,
                totalQuestions: 3841, // Total LeetCode problems
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
                streak: calendarData.streak || 0
            };

            // Wrap data with timestamp
            const dataToCache = {
                timestamp: Date.now(),
                data: data
            };

            // Save to local storage
            localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));

            return data;
        } catch (fetchError) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                throw new Error('Request timed out. Please try again.');
            }
            throw fetchError;
        }
    } catch (error) {
        console.error('Error in fetchLeetCodeStats:', error);
        throw error;
    }
};

export const clearLeetCodeCache = (username) => {
    const CACHE_KEY = `leetcode_stats_${username}`;
    localStorage.removeItem(CACHE_KEY);
};
