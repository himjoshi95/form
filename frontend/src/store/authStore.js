import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) =>({
    admin:null,
    isAuthenticated: false,
    error:null,
    isLoading:false,
    isCheckingAuth: true,
    message: null,

    login: async(username,password) =>{
        set({ isLoading:true, error:null});
        
        try {
            const response = await axios.post(`${API_URL}/api/admin/login`,{username,password})
            set({
                isAuthenticated: true,
                admin: response.data.admin,
                error: null,
                isLoading: false,
            });            
        } catch (error) {
            set({error: error.response?.data?.message || "Error logging in", isLoading: false});
            throw error;
        }
    },

    logout: async()=>{
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/api/admin/logout`);
            set({ admin: null, isAuthenticated: false, error: null, isLoading: false });            
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    checkAuth: async()=>{
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/admin/check-auth`);
            set({ admin: response.data.admin, isAuthenticated: true, isCheckingAuth: false });            
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });            
        }
    }
}));