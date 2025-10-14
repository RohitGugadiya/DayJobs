import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isLoading: false,
  jobs: [],
  user: [],
  

  checkAuth: async () => {
      try {
          console.log("Checking authenticationnnnn status...");
          const res = await axiosInstance.get("/api/auth/check");

        if (res.data && res.data.id){
            console.log("Authenticated user:", res.data);
            set({ authUser: true });
            set({ user: res.data });
        }
        else {
            console.log("No authenticated user");
            set({ authUser: null });
        }
    }
   catch (error) {
    console.error("Auth check failed:", error);
    set({ authUser: null });
  } finally {
    set({ isCheckingAuth: false });
  } 
},
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/api/auth/signup", data);

            if (res.data && res.data.id){
                set({ authUser: res.data });
                toast.success("Account created successfully");
            }

        }
        catch (error) {
             toast.error(error.response?.data?.message || "Signup failed");
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    logout: async()  =>{
        try {
            await axiosInstance.post("/api/auth/logout");
            set({ authUser: null});
            toast.success("Logged out successfully");

        }
        catch (error) {
             toast.error(error.response?.data?.message || "Logout failed");
        }   
    },

    login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      if (res.data && res.data.id) {
        set({ authUser: res.data });
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
    },

    loadJobs: async () => {
      set({ isLoading: true });
      try {
      const res = await axiosInstance.get("/api/jobs/available-jobs");
      console.log(res.data);
      set({ jobs: res.data || []})
      
    }
    catch (error) {
      toast.error("Failed to load jobs");
    }
    finally {
      
      set({ isLoading : false})
    }
  },

   handleJobAction: async (jobId, userId) => {
      try { 
        console.log(jobId, userId);
        await axiosInstance.post("/api/jobs/accept-job", {jobId, id: userId});
        toast.success(`Job  successfully`);
         get().loadJobs();
         
      } catch (error) {
        toast.error(`Failed to  job`);
        get().loadJobs();
      }
    }


}));