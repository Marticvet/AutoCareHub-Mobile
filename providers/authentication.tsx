import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

interface AuthState {
    isLoggedIn: boolean;
    userId: string | null;
    firstName: string | null;
    lastName: string | null;
    loading: boolean; // New loading state
}

interface AuthContextType {
    authState: AuthState;
    login: (
        token: string,
        userId: string,
        firstName: string,
        lastName: string,
    ) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthState {
    isLoggedIn: boolean;
    userId: string | null;
    firstName: string | null;
    lastName: string | null;
    token: string | null; // Add token field
    loading: boolean; // New loading state
}

const initialAuthState: AuthState = {
    isLoggedIn: false,
    userId: null,
    firstName: null,
    lastName: null,
    token: null, // Initialize as null
    loading: true, // Start with loading as true
};

function authReducer(state: AuthState, action: any): AuthState {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
                loading: false,
            };
        case "CLEAR_AUTH":
            return { ...initialAuthState, loading: false };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}


const AuthContext = createContext<AuthContextType>({
    authState: initialAuthState,
    login: async () => {},
    logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const saveToken = async (token: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);  // Ensure token is a string
};

const getToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token && typeof token === 'string' && token.split('.').length === 3) {
        return token;  // Valid JWT structure
    }
    return null;  // Return null if the token is invalid
};

const removeToken = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    const login = async (
        token: string,
        userId: string,
        firstName: string,
        lastName: string,
    ) => {
        try {
            await saveToken(token);  // Save token
            dispatch({
                type: "SET_AUTH",
                payload: { userId, firstName, lastName, token },
            });
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    

    const logout = async () => {
        try {
            await removeToken();
            dispatch({ type: "CLEAR_AUTH" });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = await getToken();
                if (token) {
                    const decoded: any = jwtDecode(token);  // Decode only if token is valid
                    if (decoded.exp * 1000 > Date.now()) {
                        dispatch({
                            type: "SET_AUTH",
                            payload: {
                                userId: decoded.userId,
                                firstName: decoded.firstName,
                                lastName: decoded.lastName,
                                token,  // Include token in state
                            },
                        });
                        return;
                    }
                }
                await removeToken();
                dispatch({ type: "CLEAR_AUTH" });
            } catch (error) {
                console.error("Error during auth initialization:", error);
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };
    
        initializeAuth();
    }, []);
    

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
