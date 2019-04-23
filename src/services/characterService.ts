import { BasicResponse } from "../types/basicResponse";
import { BlizzyService } from "./blizzyService";

export interface CharacterServiceProtocol {
    getCharacterInfo(token: string, characterName: string, serverName: string): Promise<BasicResponse>
}

export class CharacterService implements CharacterServiceProtocol {
    constructor(private blizzyService: BlizzyService) { }

    async getCharacterInfo(token: string, characterName: string, serverName: string): Promise<BasicResponse> {
        try {
            const result = await this.blizzyService.execute(`wow/character/${serverName}/${characterName}`, {})
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