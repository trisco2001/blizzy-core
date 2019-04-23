import { BasicResponse } from "../types/basicResponse";
import { RequesterService } from "./requesterService"

interface BlizzyServiceProtocol {
    execute(resource: string, params: any): Promise<BasicResponse>
}

export class BlizzyService implements BlizzyServiceProtocol {
    constructor(private requesterService: RequesterService) { }

    async execute(resource: string, params: any): Promise<BasicResponse> {
        try {
            const result = await this.requesterService.request(resource, params)
            const response: BasicResponse = {
                statusCode: result.status,
                body: JSON.stringify(result.data),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            };
            return response;
        } catch (error) {
            const response = error.response;
            const responseText = response.status == 401 ? "An unauthorized status was configured. Check that your authorization token is still valid." : response.statusText
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