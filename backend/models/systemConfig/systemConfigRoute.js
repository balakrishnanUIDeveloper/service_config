var express = require('express');
var fs = require('fs');
const passport = require('passport');
var systemConfig = require('../models/systemModel');
var router = express.Router();



router.route('/').get(passport.authenticate('jwt', { session: false }), (req, res) => {
    systemConfig.find((err, data) => {
        if (err)
            console.log(err);
        else
            res.json({ code: '0', data: data });
    });
});

router.route('/upload').post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var fstream;
    if (req.busboy) {
        req.busboy.on("file", function(fieldname, file, filename) {
            fstream = fs.createWriteStream(__dirname + '/../../public/sysConfig/' + filename);
            file.pipe(fstream);
            fstream.on('close', function() {
                res.json({
                    success: true,
                    filename: filename,
                    actualPath: '/public/sysConfig/' + filename
                });
            });
        });
        req.busboy.on('finish', function() {
            var finished = true
        });
        req.pipe(req.busboy);
    }
});

router.route('/add').post(passport.authenticate('jwt', { session: false }), (req, res) => {
    let dataCh = new systemConfig(req.body);
    dataCh.save()
        .then(data => {
            res.status(200).json({ 'message': 'New Service Configuration Added successfully', code: '0' });
        })
        .catch(err => {
            res.status(400).send({ 'message': 'Failed to create new record', code: '1' });
        });
});

router.route('/update/:id').put(passport.authenticate('jwt', { session: false }), (req, res) => {
    systemConfig.findById(req.params.id, (err, data) => {
        if (!data)
            return next(new Error({ 'message': 'Could not load document', code: '1' }));
        else {
            for (let key in data) {
                if (req.body.hasOwnProperty(key)) {
                    data[key] = req.body[key]
                }
            }
            data.save().then(data => {
                res.json({ message: data["Instance ID"] + ' Updated successfully', code: '0' });
            }).catch(err => {
                res.status(400).send({ 'message': data["Instance ID"] + ' Update failed', code: '1' });
            });
        }
    });
});


module.exports = router;