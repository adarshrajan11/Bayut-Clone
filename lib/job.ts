import axios from "axios";

const JSEARCH_API_KEY = process.env.RAPIDAPI_KEY;
const JSEARCH_API_HOST = "jsearch.p.rapidapi.com";

export const fetchJobsFromAPI = async (query: string, location: string) => {
    console.log("appi Key", JSEARCH_API_KEY)
    try {
        const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
            params: {
                query: `${query} in ${location}`,
                page: '1',
                num_pages: '1',
            },
            headers: {
                'X-RapidAPI-Key': JSEARCH_API_KEY,
                'X-RapidAPI-Host': JSEARCH_API_HOST,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("JSearch API error:", error);
        throw error;
    }
};