import axios from "axios";

export const fetchStats = async () => {
  try {
    console.log("Fetching from:", `${process.env.REACT_APP_BASE_URL}/api/stats`);
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/stats`
    );
    console.log("Stats API response status:", response.status);
    console.log("Stats API response data:", response.data);
    console.log("regionsArray in response:", response.data?.regionsArray);

    // Validate the response has the expected structure
    if (!response.data || typeof response.data !== 'object') {
      console.error("Invalid response format received");
      throw new Error("Invalid response format");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    // Return empty object with default structure to prevent undefined errors
    const defaultData = {
      totalUsers: 0,
      maleCount: 0,
      femaleCount: 0,
      ageGroups: { "0-30": 0, "31-45": 0, "46-60": 0, "60+": 0 },
      waitingTimes: { "0-5": 0, "5-10": 0, "10+": 0 },
      regions: {},
      regionsArray: [],
      totalWaitingPeople: 0,
      averageWaitingTime: 0
    };
    console.log("Returning default data due to error");
    return defaultData;
  }
};
