import { create } from "zustand";
import axiosInstance from "../../utils/axiosInstance";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      console.log(res.data);
    } catch (error) {
      set({ authUser: error });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

}));
