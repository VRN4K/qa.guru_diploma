import endpoints from "../services/endpoints";

export class ChallengesController {
    constructor(api){
        this.api = api
    }

    async createChallenger(){
        return await this.api.auth(endpoints.getToken)
    }
}