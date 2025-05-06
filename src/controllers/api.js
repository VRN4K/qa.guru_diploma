export class ChallengesApi {
    constructor(url) {
        this.url = url;
        this.token = null;
    }

    async auth(endpoint) {
        const response = fetch(this.url + endpoint, {
            method: 'POST'
        });

        this.token = (await response).headers.get('x-challenger')
        return response;
    }

    async get(endpoint, accept) {
        return await fetch(this.url + endpoint, {
            method: 'GET',
            headers: {
                'X-CHALLENGER': this.token,
                'Accept': accept || ''
            },
            body: null
        });
    }

    async post(endpoint, payload, accept, contentType) {
        return await fetch(this.url + endpoint, {
            method: 'POST',
            headers: {
                'X-CHALLENGER': this.token,
                'Accept': accept || '',
                'Content-Type': contentType || 'application/json'
            },
            body: JSON.stringify(payload) || null
    });
    }

    async put(endpoint, payload) {
        return await fetch(this.url + endpoint, {
            method: 'PUT',
            headers: {
                'X-CHALLENGER': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) || null
        });
    }

    async head(endpoint) {
        return fetch(this.url + endpoint, {
            method: 'HEAD',
            headers: {
                'X-CHALLENGER': this.token
            },
            body: null
        });
    }

    async delete(endpoint, payload) {
        return await fetch(this.url + endpoint, {
            method: 'DELETE',
            headers: {
                'X-CHALLENGER': this.token,
            },
            body: JSON.stringify(payload) || null
        });
    }

    async options(endpoint) {
        return await fetch(this.url + endpoint, {
            method: 'OPTIONS',
            headers: {
                'X-CHALLENGER': this.token,
            },
            body: null
        });
    }
}