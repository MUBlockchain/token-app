import axios from 'axios';


class QueryHandler {

    constructor() { }
    static test = 'test';

    static getHelloWorld() {
        return 'Hello World';
    }

    /**
     * Get User Profile
     * @param {string} uniqueid 
     */
    static signIn(userId) {

        var instance = axios.create({
            baseURL: 'http://app.mubc.io:3001/api/'
        });

        return instance.get('/signin', {
            params: {
                id: userId
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * 
     * @param {*} uid MiamiOH Uid
     */
    static getMUBCTokenBalance(uid) {
        console.log('API HANDLER')

        var instance = axios.create({
            baseURL: 'http://3.19.241.166:3001/api/',
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
            baseURL: 'http://app.mubc.io:3001/api/',
            timeout: 1000,
        });

        return instance.get('/item/active')
            .catch(function (error) {
                console.log(error);
            });

    }

    /**
     * Get User Profile
     * @param {string} uniqueid 
     */
    static getUserProfile(uniqueid) {

        var instance = axios.create({
            baseURL: 'http://app.mubc.io:3001/api/',
            timeout: 1000,
        });

        return instance.get('/user/' + uniqueid + '/profile')
            .catch(function (error) {
                console.log(error);
            });

    }

    /**
     * Get Annoucements
     */
    static getAnnouncements() {

        var instance = axios.create({
            baseURL: 'http://app.mubc.io:3001/api/',
            timeout: 1000,
        });

        return instance.get('/announcements')
            .catch(function (error) {
                console.log(error);
            });
    }

    static purchaseItem(serial, uid) {
        var instance = axios.create({
            baseURL: 'http://app.mubc.io:3001/api/'
        });

        return instance.get('/item/' + serial + '/purchase', {
            params: {
                uniqueid: uid
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    static registerUser(uuid, name) {
        var instance = axios.create({
            baseURL: 'http://app.mubc.io:3001/api/'
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
            baseURL: 'http://app.mubc.io:3001/api/'
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