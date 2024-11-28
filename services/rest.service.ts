import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import Config from "../Config.ts";

export class RestService {
    resourceUrl: string;
    baseUrl = Config.BASE_URL;

    constructor(resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    async getAll() {
        return await fetch(this.baseUrl + this.resourceUrl, {
            method: "GET",
            headers: await this.buildDefaultHeaders(),
        })
            .then(async (result) => await result.json())
            .catch(this.handleError);
    }

    async create(data) {
        return fetch(this.baseUrl + this.resourceUrl, {
            method: "POST",
            headers: await this.buildDefaultHeaders(),
            body: JSON.stringify(data),
        })
            .then((result) => result.json())
            .catch(this.handleError);
    }

    async update(id, data) {
        return fetch(this.baseUrl + this.resourceUrl + "/" + id, {
            method: "PUT",
            headers: await this.buildDefaultHeaders(),
            body: JSON.stringify(data),
        })
            .then((result) => result.json())
            .catch(this.handleError);
    }

    async getOneById(id) {
        return fetch(this.baseUrl + this.resourceUrl + "/" + id, {
            method: "GET",
            headers: await this.buildDefaultHeaders(),
        })
            .then((result) => result.json())
            .catch(this.handleError);
    }

    async delete() {
        return fetch(this.baseUrl + this.resourceUrl, {
            method: "DELETE",
            headers: await this.buildDefaultHeaders(),
        }).catch(this.handleError);
    }

    async buildDefaultHeaders() {
        const token = await AsyncStorage.getItem("token");
        const headers = new Headers();

        headers.append("Authorization", token ? token : "");
        headers.append("Content-Type", "application/json");

        return headers;
    }

    handleError(err) {
        console.log(err);
    }
}
