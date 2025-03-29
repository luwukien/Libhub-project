import axiosInstance from "./axiosInstance";

export async function getCookie(name) {
  
  if (name === "token") {
    try {
      const response = await axiosInstance.get("/get-token", { withCredentials: true });
      if (response.data.token) {
        return response.data.token;
      }
    } catch (error) {
      console.error("Error fetching token:", error.response?.data?.message || error.message);
      return null; 
    }
  }

  return null;
}
