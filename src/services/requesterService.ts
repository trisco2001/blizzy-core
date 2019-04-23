import axios, { AxiosPromise } from 'axios'

interface RequesterEnvironment {
    locale: string
    baseUrl: string
}

export class RequesterService {
    constructor(readonly environment: RequesterEnvironment, readonly token: string) { }

    request(resource: string, params: any): AxiosPromise {
        params.locale = this.environment.locale;

        const options = {
            baseURL: this.environment.baseUrl,
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
            params: params
        }

        console.log(`GETTING at ${resource} with ${JSON.stringify(options)}`)
        return axios.get(resource, options)
    }
}