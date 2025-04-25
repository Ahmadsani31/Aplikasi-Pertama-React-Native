import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, AuthContextType, LoginData } from '../types/auth.d';
import { authService } from '../api/auth';
import { storeToken, removeToken, getToken } from '../utils/token';
import { string } from 'yup';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

console.log(isLoading);

    // Cek status login saat pertama load
    useEffect(() => {
        const loadUser = async () => {
            setIsLoading(true);
            try {
                const token = await getToken();
                if (token) {
                    const response = await authService.getUser(token);
                    // console.log('====================================');
                    // console.log(response.data.user);
                    // console.log('====================================');
                    setUser(response.data.user);
                }
            } catch (err) {
                console.error('Failed to load user:', err);
                logout()
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (data:LoginData) => {
        setIsLoading(true);
        console.log('is auth', data);
        
        try {
            const response = await authService.login(data);
            // console.log('response context',response.data.token);
            
            await storeToken(response.data.token);
            setUser(response.data.user);
            setError(null);
        } catch (err: any) {
            console.log('error',err.response?.data);
            // setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, username: string, password: string, passwordConfirmation: string) => {
        setIsLoading(true);
        try {
            const response = await authService.register({ name, email, username, password, password_confirmation: passwordConfirmation });
            await storeToken(response.data.token);
            setUser(response.data.user);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await removeToken();
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};