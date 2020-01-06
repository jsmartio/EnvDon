import $ from 'jquery'
import axios from 'axios'

export const makeRandom = theToken => {
    return axios
    .post('/donors/randomizename2', { token: theToken })
    .then( res => {
      console.log('res: ' + res)
      return res
    })
    .catch(err => {
      console.log("ClientSide Error @ DonorFunctions > update counters" + err)
      return '++Error Loc 10e'
    })
}

export const rmDupes = (DBname, theToken) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname,
            "token": theToken
        }
        $.ajax({
        
            url: '/dba/removedupes2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

// restore from another designated DB
export const restoreFromNew = (DBname,theToken) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname,
            "token": theToken
        }
        $.ajax({
        
            url: '/dba/restorfromnew2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

// restore from SQL file
export const restoreMainDB = (DBname,theToken) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname,
            "token": theToken
        }
        $.ajax({
            url: '/dba/restormain',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            data:args1,
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

export const fromMainDbToNew = (DBname,theToken) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname,
            "token": theToken
        }
        $.ajax({
        
            url: '/dba/copyfromdb2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

export const removeDB = (DBname,theToken) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname,
            "token": theToken
        }
        $.ajax({
        
            url: '/dba/removedb2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

export const createDB = (newDbName,theToken) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "newDbName": newDbName,
            "token": theToken
        }
        $.ajax({
        
            url: '/dba/createdb2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}
  
export const getDBs = theToken => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "na": "na",
            token:theToken
        }
        $.ajax({
            url: '/dba/showdbs2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}
  
