const appConn = require('../connect');
const Promise = require('bluebird');
const sql = require('yesql').pg

exports.runningappcode = (bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu)
            .then((conn) => {
                let query = `select 'APP'||case when max(substr(appcode, 4, length(appcode)-3)) is null then '1' 
                else cast(max(cast(substr(appcode, 4, length(appcode)-3) as int))	+1 as varchar) end as runningcode
                from setting_app`;
                conn.query(query, (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack)
                        reject(err);
                    } else {
                        resolve(res.rows[0]);
                    }
                    appConn.closeConn(conn)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

exports.createapp = (runningcode, appcode, app_thname, app_enname, app_cnname, app_jpname, app_othername, activestatus, updateusername, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu)
            .then((conn) => {
                let query = sql(
                    `INSERT INTO setting_app 
                    VALUES (:appcode, :appcode, :app_thname, :app_enname,
                    :app_cnname, :app_jpname, :app_othername,
                    :activestatus, :updateusername, now())`
                )({
                    appcode: runningcode,
                    appcode: appcode,
                    app_thname: app_thname,
                    app_enname: app_enname,
                    app_cnname: app_cnname,
                    app_jpname: app_jpname,
                    app_othername: app_othername,
                    activestatus: activestatus,
                    updateusername: updateusername
                });
                conn.query(query, (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack)
                        reject(err);
                    } else {
                        // console.log(res.rows[0]);
                        resolve(res.rows[0]);
                    }
                    appConn.closeConn(conn)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

exports.readapp = (req, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu).then((conn) => {
            let query = '';
            if (req.appcode !== undefined && req.appcode == undefined) {
                query = sql("SELECT * FROM setting_app WHERE appcode = :appcode")({
                    appcode: req.appcode
                });
            } else if (req.appcode == undefined && req.appcode !== undefined) {
                query = sql("SELECT * FROM setting_app WHERE appcode = :appcode")({
                    appcode: req.appcode
                });
            } else if (req.appcode !== undefined && req.appcode !== undefined) {
                query = sql("SELECT * FROM setting_app WHERE appcode = :appcode AND appcode = :appcode")({
                    appcode: req.appcode,
                    appcode: req.appcode
                });
            }
            conn.query(query, (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack)
                    reject(err);
                } else {
                    resolve(res.rows);
                }
                appConn.closeConn(conn)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

exports.updateapp = (appcode, appcode, app_thname, app_enname, app_cnname, app_jpname, app_othername, activestatus, updateusername, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu)
            .then((conn) => {
                let query = sql(
                    `UPDATE setting_app 
                    SET appcode = :appcode,
                    appcode = :appcode ,
                    app_thname = :app_thname, 
                    app_enname = :app_enname,
                    app_cnname = :app_cnname,
                    app_jpname = :app_jpname,
                    app_othername = :app_othername,
                    activestatus = :activestatus,
                    updateusername = :updateusername,
                    updatedatetime = now()
                    WHERE appcode = :appcode;`
                )({
                    appcode: appcode,
                    app_thname: app_thname,
                    app_enname: app_enname,
                    app_cnname: app_cnname,
                    app_jpname: app_jpname,
                    app_othername: app_othername,
                    activestatus: activestatus,
                    updateusername: updateusername
                });
                conn.query(query, (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack)
                        reject(err);
                    } else {
                        // console.log(res.rows[0]);
                        resolve(res.rows[0]);
                    }
                    appConn.closeConn(conn)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}