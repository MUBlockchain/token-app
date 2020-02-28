import axios from 'axios';


class QueryHandler {

    constructor() { }
    static test = 'test';

    static getHelloWorld() {
        return 'Hello World';
    }

    /**
     * 
     * @param {*} uid MiamiOH Uid
     */
    static getMUBCTokenBalance(uid) {
        console.log('API HANDLER')

        var instance = axios.create({
            baseURL: 'http://3.19.241.166:3000/api/',
            timeout: 1000,
        });

        return instance.get('/balance', {
            params: {
                uniqueid: uid
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**
     * Get list of item serials

     */
    static getItemSerials() {

        var instance = axios.create({
            baseURL: 'http://3.136.85.69:3000/api/',
            timeout: 1000,
        });

        return instance.get('/item/active')
            .catch(function (error) {
                console.log(error);
            });
            
    }


}

export default QueryHandler;