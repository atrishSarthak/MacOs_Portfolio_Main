export const fetchLeetCodeStats = async (username) => {
    const CACHE_KEY = `leetcode_stats_${username}`;
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    try {
        // Check cache
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { timestamp, data } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data; // Return cached data if valid
            }
        }

        // Fetch fresh data
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);

        if (!response.ok) {
            throw new Error('Failed to fetch LeetCode stats');
        }

        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message || 'LeetCode API returned an error');
        }

        // Wrap data with timestamp
        const dataToCache = {
            timestamp: Date.now(),
            data: data
        };

        // Save to local storage
        localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));

        return data;
    } catch (error) {
        console.error('Error in fetchLeetCodeStats:', error);
        throw error;
    }
};

export const clearLeetCodeCache = (username) => {
    const CACHE_KEY = `leetcode_stats_${username}`;
    localStorage.removeItem(CACHE_KEY);
};
