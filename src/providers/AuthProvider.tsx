import { Session } from "@supabase/supabase-js";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { supabase } from "../lib/supabase";

type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
    logout: () => Promise<void>
    // isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    logout: async () => {}
    // isAdmin: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // ✅ Define `fetchProfile` before using it
    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("🚨 Error fetching profile:", error);
            setProfile(null);
        } else {
            setProfile(data);
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);
            if (session && session.user.id) {
                await fetchProfile(session.user.id);
            }
            setLoading(false);
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                if (session && session.user.id) {
                    await fetchProfile(session.user.id);
                } else {
                    setProfile(null);
                    setSession(null);
                }
            }
        );

        return () => authListener.subscription.unsubscribe();
    }, []);

    // ✅ Logout function inside AuthProvider
    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("🚨 Logout error:", error);
            return;
        }

        // ✅ Reset auth state
        setSession(null);
        setProfile(null);

        // ✅ Reset navigation stack to Login screen

        console.log("✅ Successfully logged out!");
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                profile,
                loading,
                logout, // ✅ Expose logout function
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export default function AuthProvider({ children }: PropsWithChildren) {
//     const [session, setSession] = useState<Session | null>(null);
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSession = async () => {
//             const {
//                 data: { session }
//             } = await supabase.auth.getSession();
            
//             setSession(session);

//             if (session && session.user.id) {
//                 // fetch profile
//                 const { data } = await supabase
//                     .from("profiles")
//                     .select("*")
//                     .eq("id", session.user.id)
//                     .single();
//                 setProfile(data || null);
//             }

//             setLoading(false);
//         };

//         fetchSession();
//         supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session);
//         });
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 session,
//                 loading,
//                 profile,
//                 // @ts-ignore
//                 // isAdmin: profile?.group === "ADMIN",
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

export const useAuth = () => useContext(AuthContext);
