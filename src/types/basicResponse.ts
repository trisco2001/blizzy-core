export interface BasicResponse {
    statusCode: number
    body: string
    headers: any
}
  
export class BasicResponses {
    static badRequest(message: string): BasicResponse {
      return BasicResponses.basicResponse(message, 400)
    }
    static authorizationNeeded(message: string): BasicResponse {
      return BasicResponses.basicResponse(message, 401)
    }
    
    static basicResponse(message: string, statusCode: number, headers: any = []): BasicResponse {
      const response: BasicResponse = {
        statusCode: statusCode,
        body: JSON.stringify({ message: message }),
        headers: headers
      }
      return response
    }
}