import axios from "axios";

export const fetchStats = async () => {
  try {
    const response = await axios.get(`/api/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};
