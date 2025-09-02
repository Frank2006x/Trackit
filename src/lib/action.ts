import axios from "axios";

export const initUserStats = async () => {
  try {
    await axios.post("/api/userStats");
  } catch (err) {
    console.error("Failed to init user stats:", err);
    throw err;
  }
};
