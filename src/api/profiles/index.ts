import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

let queryKey: string = "profiles";

interface Profile {
    id: string;
    updated_at: null | Date;
    email: string;
    avatar_url: string;
    first_name: string;
    last_name: string;
    full_name: string | null;
    selected_vehicle_id: string;
    phone_number: string;
}

export const useProfile = (id: string) => {
    return useQuery({
        queryKey: [queryKey, id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from(queryKey)
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};
