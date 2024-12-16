// @ts-ignore
import { RestService } from "./rest.service.ts";

export class VehicleService extends RestService {

    constructor() {
        super("vehicles/vehicle");
    }

    // add new vehicle to user
    addVehicle(data: object) {
        this.resourceUrl = "vehicles/vehicle";

        return this.create(data);
    }

    // get all user's vehicles
    getUserVehicles(userId: string | null) {
        this.resourceUrl =
            "vehicles/userVehicles";

        return this.getOneById(Number(userId));
    }  
    
    // get all user's vehicles
    getVehiclesById(userId: string | null, vehicleId: string | null) {
        this.resourceUrl =
            "vehicles/userVehicles" + "/" + userId + "/" + vehicleId;

        return this.getAll();
    }  
    
    // get all user's vehicles
    editVehiclesById(userId: string | null, vehicleId: string | number, vehicle: object) {
        this.resourceUrl =
            "vehicles/userVehicles" + "/" + userId;

        return this.update(vehicleId, vehicle);
    }

    // // get all models by manufacturer
    // getModelsByManufacturerByName(manufacturerName) {
    //     this.resourceUrl =
    //         "tires/manufacturers/" + manufacturerName + "/tire-models";

    //     return this.getAll();
    // }

    // // get manufacturer model by tireId and all available sizes
    // getManufacturerModelById(manufacturerName, tireId) {
    //     this.resourceUrl =
    //         "tires/manufacturers/" + manufacturerName + "/tire-model/" + tireId;

    //     return this.getAll();
    // }
}
