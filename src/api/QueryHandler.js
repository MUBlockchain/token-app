import axios from 'axios';

class QueryHandler {

    constructor() { }
    
    static getTwitterId(twitterName) {
        var instance = axios.create({
            baseURL: 'https://app.mubc.io:8080/api/'
        });

        return instance.get('/twitterid', {
            params: {
                username: twitterName
            }
        })
            .catch(function (error) {
                console.log('In error')
                console.log(error);
            });
    }
}

export default QueryHandler;