import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export const fetchStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};
