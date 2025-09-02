export const markUserOnline = async () => {
  try {
    await axios.post("/api/userStats/online");
  } catch (err) {
    console.error("Failed to mark user online:", err);
  }
};
import axios from "axios";
export const getUserStats = async () => {
  try {
    const res = await axios.get("/api/userStats/stats");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch user stats:", err);
    return null;
  }
};

export const initUserStats = async () => {
  try {
    await axios.post("/api/userStats");
  } catch (err) {
    console.error("Failed to init user stats:", err);
    throw err;
  }
};
