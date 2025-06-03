import axios from "axios";

export const fetchStats = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/stats"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};
