// @ts-ignore
import { RestService } from "./rest.service.ts";

export class VehicleService extends RestService {

    constructor() {
        super("vehicles/vehicle");
    }

    // get all tires manufacturers
    addVehicle(data: object) {
        this.resourceUrl = "vehicles/vehicle";

        return this.create(data);
    }

    // // get manufacturer by name
    // getManufacturerByName(manufacturerName) {
    //     this.resourceUrl =
    //         "tires/manufacturers/" + manufacturerName;

    //     return this.getAll();
    // }

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
