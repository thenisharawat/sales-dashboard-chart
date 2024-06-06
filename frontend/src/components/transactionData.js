// transactionData.js
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/transactions';

export const fetchTransactions = async (month, page, perPage, searchTerm) => {
    const params = new URLSearchParams({
        month,
        page,
        perPage,
    });
    if (searchTerm) {
        params.append('search', searchTerm);
    }
    const response = await axios.get(`${BASE_URL}?${params.toString()}`);
    return response.data;
};
