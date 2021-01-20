import axios from 'axios';

class QueryHandler {

    constructor() { }
    
    static getTwitterId(twitterName) {
        var instance = axios.create({
            baseURL: 'http://192.168.0.113:8080/api/'
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