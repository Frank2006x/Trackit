import axios from "axios";
export const markUserOnline = async () => {
  try {
    await axios.post("/api/userStats/online");
  } catch (err) {
    console.error("Failed to mark user online:", err);
  }
};
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

export const getTopUser = async () => {
  try {
    const res = await axios.get("/api/userStats");
    const allUsers = [];
    res.data.sort(
      (a: { totalXp: number }, b: { totalXp: number }) => b.totalXp - a.totalXp
    );

    for (const userStats of res.data) {
      const userDetails = await axios.get(`/api/users/${userStats.userId}`);
      allUsers.push({
        ...userStats,
        userInfo: userDetails.data,
      });
    }

    return allUsers;
  } catch (err) {
    console.error("Failed to fetch top user:", err);
    return null;
  }
};
