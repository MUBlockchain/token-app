import axios from 'axios';


class QueryHandler {

    constructor() { }

    /**
     * Get User Profile
     * @param {string} uniqueid 
     */
    static signIn(token) {

        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/'
        });
        
        return instance.get('/signin', {
            params: {
                id: token
            }
        })
            .catch(function (error) {
                console.log("Sigin Error: " + error.response.data);
            });
    }

    /**
     * 
     * @param {*} uid MiamiOH Uid
     */
    static getMUBCTokenBalance(uid, token) {
        console.log('API HANDLER')

        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/',
            timeout: 1000,
        });

        return instance.get('/balance', {
            params: {
                uniqueid: uid,
                token: token
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**
     * Get list of item serials
     */
    static getItemSerials(token) {

        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/',
            timeout: 2000,
        });

        return instance.get('/item/active', {
            params: {
                token: token
            }
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    /**
     * Get User Profile
     * @param {string} uniqueid 
     */
    static getUserProfile(uniqueid, token) {

        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/',
            timeout: 1000,
        });

        return instance.get('/user/' + uniqueid + '/profile', {
            params: {
                token: token
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    /**
     * Get Annoucements
     */
    static getAnnouncements(token) {
        //console.log("Get Announcements Toke: " + token)
        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/',
            timeout: 1000,
        });

        return instance.get('/announcements/list', {
            params: {
                token: token
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    static purchaseItem(serial, uid, token) {
        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/'
        });

        return instance.get('/item/' + serial + '/purchase', {
            params: {
                uniqueid: uid,
                token: token
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    static registerUser(uuid, name) {
        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/'
        });

        return instance.get('/user/register', {
            params: {
                uniqueid: uuid,
                name: name,
                executive: false
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    static mintToUser(uuid, amount, executive) {
        var instance = axios.create({
            baseURL: 'http://mubc.io:8080/api/'
        });

        return instance.get('/user/' + uuid + '/mint', {
            params: {
                quantity: amount,
                as: executive
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }


}

export default QueryHandler;