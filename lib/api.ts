interface FetchJobsParams {
    query?: string;
    page?: string;
    num_pages?: string;
    country?: string;
    date_posted?: string;
}

// ✅ Utility to safely join base URL and path
function joinUrl(base: string, path: string) {
    return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
}

export const fetchJobs = async ({
    query = 'developer jobs in chicago',
    page = '1',
    num_pages = '1',
    country = 'us',
    date_posted = 'all'
}: FetchJobsParams = {}) => {
    try {
        const params = new URLSearchParams({
            query,
            page,
            num_pages,
            country,
            date_posted
        });

        // ✅ Use the safe joinUrl utility
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const fullUrl = joinUrl(baseUrl, 'search') + `?${params.toString()}`;

        const response = await fetch(fullUrl, {
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
};
