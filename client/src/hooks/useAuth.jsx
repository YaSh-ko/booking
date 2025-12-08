import { authApi } from "../services/api";
import { useState } from "react";
export const useAuth = () => {
    const [isLoading, setIsLoading ] = useState(false);
    const [error, setError] = useState(null);

    const sendCode = async (email, name) => {
        setIsLoading(true);
        try {
            const response = await authApi.sendCode(email, name);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при отправке кода");
            }

            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };


    const verifyCode = async (email, code) => {
        setIsLoading(true);
        try {
            const response = await authApi.verifyCode(email, code);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при отправке кода");
            }

            return data;

        } catch(err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false)
        }

    }

    return { sendCode, verifyCode, isLoading, error, clearError: () => setError(null)}


}