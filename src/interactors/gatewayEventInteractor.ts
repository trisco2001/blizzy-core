import { APIGatewayProxyEvent } from "aws-lambda";

export interface GatewayEventInteractorProtocol {
    queryString(key: string): string | null
    path(key: string): string | null
    body(key: string): any | null
}

export class GatewayEventInteractor implements GatewayEventInteractorProtocol {
    private parsedBody: any

    constructor(private event: APIGatewayProxyEvent) {
        if (this.event.body != null) {
            this.parsedBody = JSON.parse(this.event.body)
        }
    }

    body(key: string) {
        const value = this.parsedBody[key]
        return value
    }

    queryString(key: string): string | null {
        if (this.event.queryStringParameters == null) {
            return null
        }
        return this.event.queryStringParameters[key]
    }

    path(key: string): string | null {
        if (this.event.pathParameters == null) {
            return null
        }
        return this.event.pathParameters[key]
    }
}