import { authApi } from "../services/api";
import { useState } from "react";
export const useAuth = () => {
    const [isLoading, setIsLoading ] = useState(false);
    const [error, setError] = useState(null);

    const sendCode = async (email, name) => {
        setIsLoading(true);
        try {
            const response = await authApi.sendCode(email, name);
            if(response.ok) {
                
                return response.json();
            }
        } catch(err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const verifyCode = async (email, code) => {
        setIsLoading(true);
        try {
            const response = await authApi.verifyCode(email, code);
        
            if(response.ok) {
                const data = await response.json();

                console.log(data);
                return data;
            } 

        } catch(err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false)
        }

    }

    return { sendCode, verifyCode, isLoading, error, clearError: () => setError(null)}


}