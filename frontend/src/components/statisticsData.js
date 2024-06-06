// barChartData.js
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/statistics';

export const fetchStatisticsData = async (month) => {
    const params = new URLSearchParams({
        month
    });
    const response = await axios.get(`${BASE_URL}?${params.toString()}`);
    return response.data;
};
