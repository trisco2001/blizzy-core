import { BasicResponse } from "../types/basicResponse";
import { BlizzyService } from "./blizzyService";

export interface ClassServiceProtocol {
    getClasses(): Promise<BasicResponse>
}

export class ClassService implements ClassServiceProtocol {
    constructor(private blizzyService: BlizzyService) { }

    async getClasses(): Promise<BasicResponse> {
        try {
            const result = await this.blizzyService.execute(`wow/data/character/classes`, {})
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