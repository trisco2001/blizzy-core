import Axios from "axios";
import { BasicResponse } from "../types/basicResponse";

export interface CharacterServiceProtocol {
    getCharacterInfo(token: string, characterName: string, serverName: string): Promise<BasicResponse>
}

export class CharacterService implements CharacterServiceProtocol {
    constructor(private environment: { baseUrl: string }) { }

    async getCharacterInfo(token: string, characterName: string, serverName: string): Promise<BasicResponse> {
        try {
            const params = { token: token, resource: `wow/character/${serverName}/${characterName}`, params: {} }
            const options = {
                baseURL: this.environment.baseUrl,
                params: params
            }
            const result = await Axios.post('service', params, options)
            console.log(result.data)
            const response: BasicResponse = {
                statusCode: result.status,
                body: JSON.stringify(result.data),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            }
            return response
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