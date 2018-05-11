export class ApiService {

    static get BASE_ENDPOINT() {
        return "http://localhost:8080/";
    }

    static get REPOSITORIES_ENDPOINT() {
        return ApiService.BASE_ENDPOINT + "store/repos";
    }

    constructor() {
    }

    getAllRepositories() {
        return fetch(ApiService.REPOSITORIES_ENDPOINT,
            {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                return myJson;
            });
    }

}