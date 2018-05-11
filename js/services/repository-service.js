export class RepositoryService {

    static get BASE_ENDPOINT() {
        return "http://localhost:8080/";
    }

    static get DOCUMENT_ENDPOINT() {
        return BASE_ENDPOINT + "store/owner/";
    }

    static get SPARQL_ENDPOINT() {
        return BASE_ENDPOINT + "sparql/owner/";
    }

    constructor(owner, repository) {
        this._owner = owner;
        this._repository = repository;
    }

    get owner() {
        return this._owner;
    }

    set owner(value) {
        this._owner = value;
    }

    get repository() {
        return this._repository;
    }

    set repository(value) {
        this._repository = value;
    }

    getFullDocument() {
        console.log(DataService.DOCUMENT_ENDPOINT);

        fetch(DataService.DOCUMENT_ENDPOINT + this._owner + "/" + this._repository,
            {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
            });
    }

    getQueryResult(query) {
        return fetch(DataService.SPARQL_ENDPOINT + this.owner + "/" + this._repository,
            {
                method: 'POST',
                body: query,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(jsonResponse => {
                let bindings = jsonResponse.results.bindings;
                return bindings.map(element => {
                    let obj = {};
                    Object.keys(element).map(key => {
                        obj[key] = element[key].value;
                    });

                    return obj;
                });
            });

    }
}