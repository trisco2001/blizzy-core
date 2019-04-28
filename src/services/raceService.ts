import { BasicResponse } from "../types/basicResponse";
import { BlizzyService } from "./blizzyService";

export interface RaceServiceProtocol {
    getRaces(): Promise<BasicResponse>
}

export class RaceService implements RaceServiceProtocol {
    constructor(private blizzyService: BlizzyService) { }

    async getRaces(): Promise<BasicResponse> {
        try {
            const result = await this.blizzyService.execute(`wow/data/character/races`, {})
            console.log(result.body)
            return result
        } catch (error) {
            const response = error.response
            const responseText = response.status == 401 ? "Unauthorized. Check that your authorization token is still valid." : response.statusText
            return {
                statusCode: response.status,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({ error: responseText })
            }
        }
    }
}