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

        // Fetch fresh data with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

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
