var express = require('express');
var router = express.Router();
var fs = require('fs');
const passport = require('passport');
var AuthService = require('../models/model');

// router.get('/checkerData', , (req, res, next) => {
router.route('/').get(passport.authenticate('jwt', { session: false }), (req, res) => {
    AuthService.find((err, data) => {
        if (err)
            console.log(err);
        else
            res.json({ code: '0', data: data });
    });
});



router.route('/add').post(passport.authenticate('jwt', { session: false }), (req, res) => {
    let dataCh = new AuthService(req.body);
    dataCh.save()
        .then(data => {
            res.status(200).json({ 'message': 'New Service Configuration Added successfully', code: '0' });
        })
        .catch(err => {
            res.status(400).send({ 'message': 'Failed to create new record', code: '1' });
        });
});

router.route('/update/:id').put(passport.authenticate('jwt', { session: false }), (req, res) => {
    AuthService.findById(req.params.id, (err, data) => {
        if (!data)
            return next(new Error({ 'message': 'Could not load document', code: '1' }));
        else {
            for (let key in data) {
                if (req.body.hasOwnProperty(key)) {
                    data[key] = req.body[key]
                }
            }
            data.save().then(data => {
                res.json({ message: data['Service Type'] + ' Updated successfully', code: '0' });
            }).catch(err => {
                res.status(400).send({ 'message': data['Service Type'] + ' Update failed', code: '1' });
            });
        }
    });
});



router.route('/delete/:id').delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    AuthService.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
        if (err)
            res.json({ error: err, code: '1', message: 'Failed to Delete the record' });
        else
            res.json({ 'message': data['Service Type'] + ' type record deleted successfully', code: '0' });
    })
})
router.route('/upload').post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var fstream;
    if (req.busboy) {
        req.busboy.on("file", function(fieldname, file, filename) {
            fstream = fs.createWriteStream(__dirname + '/../../public/serviceConfig/' + fieldname + '/' + filename);
            file.pipe(fstream);
            fstream.on('close', function() {
                res.json({
                    success: true,
                    filename: filename,
                    actualPath: 'public/serviceConfig/' + fieldname + '/' + filename,
                    field: fieldname.split('-').join(' ')
                });
            });
        });
        req.busboy.on('finish', function() {
            var finished = true
        });
        req.pipe(req.busboy);
    }
});

module.exports = router;