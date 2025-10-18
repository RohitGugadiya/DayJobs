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
  myJobs: [],
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

fetchMyJobs: async (user) => {
      if (!user?.id) return;
      try {
        set({ isLoading: true });
        const res = await axiosInstance.get(`/api/jobs/my-jobs/${user.id}`);
        set({ myJobs: res.data || [] });
        console.log("Fetched my jobs:", res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch your jobs");
      } finally {
        set({ isLoading: false });
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


    login: async (data) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post("/api/auth/login", data);
        
        if (res.data && res.data.user) {
          set({ authUser: res.data.user, user: res.data.user });
          toast.success("Logged in successfully");
        } else {
          toast.error("Invalid login response from server");
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
    },

    rejectJobAction: async (jobId) => {
      try { 
        console.log(jobId);
        await axiosInstance.post("/api/jobs/reject-job", {jobId});
        toast.success(`Job rejected successfully`);
         get().loadJobs();

      } catch (error) {
        toast.error(`Failed to reject job`);
        get().loadJobs();
      }
    },

logout: async () => {
  try {
    await axiosInstance.post("/api/auth/logout");
    set({ authUser: null, user: null });
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
},



}));