import { BasicResponse } from "../types/basicResponse";
import { RequesterService } from "./requesterService"

interface BlizzyServiceProtocol {
    execute(token: string, resource: string, params: any): Promise<BasicResponse>
}

interface BlizzyEnvironment {
    locale: string
    apikey: string
    baseUrl: string
}

export class BlizzyService implements BlizzyServiceProtocol {
    constructor(private environment: BlizzyEnvironment) { }

    async execute(token: string, resource: string, params: any): Promise<BasicResponse> {
        try {
            const requester = new RequesterService(this.environment, token);
            const result = await requester.request(resource, params)
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