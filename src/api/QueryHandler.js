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
                console.log('getTwitterId Error', error)
            });
    }

    static signIn(publicKey, idToken) {
        console.log("FLAG")
        var instance = axios.create({
            baseURL: 'https://app.mubc.io:8080/api/',
            //headers: { 'X-Address': publicKey }
        });

        return instance.get('/signin', {
            params: {
                token: idToken
            }
        })
            .catch(function (error) {
                console.log('SignIn Error', error)
            });
    }
}

export default QueryHandler;