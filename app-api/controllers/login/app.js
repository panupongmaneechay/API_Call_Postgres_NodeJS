const APIModel = require('../../models/login/app');
const app_config = require('../../../config/app-api.json')
const bu = Object.keys(app_config)[0]


exports.createapp = (req, res) => {
    APIModel.runningappcode(bu).then((recordset) => {
            if ((recordset !== undefined) && (Object.values(recordset).length > 0)) {
                let runningcode = recordset['runningcode'] || '';
                if (runningcode != '' || runningcode !== undefined) {
                    let appcode = req.body.appcode || '';
                    let app_thname = req.body.app_thname || '';
                    let app_enname = req.body.app_enname || '';
                    let app_cnname = req.body.app_cnname || '';
                    let app_jpname = req.body.app_jpname || '';
                    let app_othername = req.body.app_othername || '';
                    let activestatus = req.body.activestatus || '';
                    let updateusername = req.body.updateusername || '';
                    // res.status(200).json({
                    //     status: true,
                    //     message:"Create Success",
                    //     data:{
                    //       runningcode:runningcode,
                    //       req:req.body
                    //     }
                    // });
                    APIModel.createapp(runningcode, appcode, app_thname, app_enname, app_cnname, app_jpname, app_othername, activestatus, updateusername, bu).then((recordsetCreate) => {
                            res.status(200).json({
                                status: true,
                                message: "Create Success",
                                data: {
                                    appcode,
                                    "appcode": runningcode,
                                    "req": req.body
                                }
                            });
                        })
                        .catch((err) => {
                            res.status(404).json({
                                status: false,
                                err
                            });
                        });
                } else {
                    res.status(200).json({
                        status: true,
                        message: "Create Unsuccess"
                    });
                }
            } else {
                res.status(200).json({
                    status: true,
                    message: "Create Unsuccess"
                });
            }
        })
        .catch((err) => {
            res.status(404).json({
                status: false,
                err
            });
        });
};

exports.readapp = (req, res) => {
    let appcode = req.body.appcode;
    if (appcode !== undefined || appcode !== undefined) {
        APIModel.readapp(req.body, bu).then((recordset) => {
                if ((recordset !== undefined) && (Object.values(recordset).length > 0)) {
                    let data = recordset.map(obj => {
                        return {
                            
                            appcode: obj.appcode,
                            thname: obj.app_thname,
                            enname: obj.app_enname,
                            cnname: obj.app_cnname,
                            jpname: obj.app_jpname,
                            othername: obj.app_othername,
                            activestatus: obj.activestatus,
                            updateuser: obj.updateusername,
                            updatedatetime : obj.updatedatetime
                        }
                    })
                    res.status(200).json({
                        status: true,
                        message: "Query Success",
                        data
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        message: "Query Success",
                        data: []
                    });
                }
            })
            .catch((err) => {
                res.status(404).json({
                    status: false,
                    err
                });
            });
    } else {
        res.status(200).json({
            status: false,
            message: "Query Unsuccess",
        });
    }
};

exports.updateapp = (req, res) => {
    let appcode = req.body.appcode || '';
    let app_thname = req.body.app_thname || '';
    let app_enname = req.body.app_enname || '';
    let app_cnname = req.body.app_cnname || '';
    let app_jpname = req.body.app_jpname || '';
    let app_othername = req.body.app_othername || '';
    let activestatus = req.body.activestatus || '';
    let updateusername = req.body.updateusername || '';
    APIModel.updateapp(appcode, app_thname, app_enname, app_cnname, app_jpname, app_othername, activestatus, updateusername, bu).then((recordset) => {
            res.status(200).json({
                status: true,
                message: "Update Success",
                data: {
                    appcode,
                    "req": req.body
                }
            });
        })
        .catch((err) => {
            res.status(404).json({
                status: false,
                err
            });
        });
};