import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

interface UserVehicles {
    user_id: number;
    vehicle_brand: string;
    vehicle_car_type: string;
    id: number;
    vehicle_identification_number: string;
    vehicle_license_plate: string;
    vehicle_model: string;
    vehicle_model_year: number;
    vehicle_year_of_manufacture: number;
    currentMileage: number;
}

interface VehicleData {
    vehicle_brand: string;
    vehicle_model: string;
    vehicle_model_year: number;
    vehicle_car_type: string;
    vehicle_license_plate: string;
    vehicle_year_of_manufacture: string | number;
    vehicle_identification_number: string;
    current_mileage: number;
    user_id: string | null;
}

let queryKey: any = "vehicles";

export const useVehicleList = (id: string) => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const { data, error } = await supabase
                .from(queryKey)
                .select("*")
                .eq("user_id", id); // Filter by user_id
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useVehicle = (id: string, vehicleId: string) => {
    return useQuery({
        queryKey: [queryKey, id, vehicleId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from(queryKey)
                .select("*")
                .eq("user_id", id) // Filter by user_id
                .eq("id", vehicleId)
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useInsertVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (vehicle: VehicleData) => {
            const { error, data: newVehicle } = await supabase
                .from(queryKey) // ✅ Corrected table name
                .insert([vehicle])
                .single();

            if (error) {
                console.error("❌ Error inserting vehicle:", error.message);
                throw new Error(error.message);
            }

            console.log("✅ New Vehicle Inserted:", newVehicle);
            return newVehicle;
        },
        onSuccess: async () => {
            // @ts-ignore
            await queryClient.invalidateQueries([queryKey]); // ✅ Ensure data updates
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedProduct } = await supabase
                .from(queryKey)
                .update({
                    name: data.name,
                    image: data.image,
                    price: data.price,
                })
                .eq("id", data.id)
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        async onSuccess(_, { id }) {
            // @ts-ignore
            await queryClient.invalidateQueries([queryKey]);
            // @ts-ignore
            await queryClient.invalidateQueries([queryKey, id]);
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: string) {
            const { error } = await supabase
                .from(queryKey)
                .delete()
                .eq("id", id);
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            // @ts-ignore
            await queryClient.invalidateQueries([queryKey]);
        },
    });
};
