import axios, { AxiosPromise } from 'axios';

function btoa(value: string): string {
    return Buffer.from(value).toString('base64')
}

export interface AuthToken {
    access_token: string
}

export class AuthTokenService {
    readonly url = "https://us.battle.net/oauth/token?grant_type=client_credentials"
    readonly payload = "grant_type=client_credentials"
    constructor(private environment: { key: string, secret: string }) { }

    generateToken(): AxiosPromise {
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                grant_type: 'client_credentials'
            },
            auth: {
                username: this.environment.key,
                password: this.environment.secret
            }
        }
        return axios.post(this.url, null, options)
    }
}