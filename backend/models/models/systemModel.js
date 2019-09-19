var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let systemConfig = new Schema({
    'Instance ID': {
        type: String,
        default: ""
    },
    'Plmn ID': {
        type: String,
        default: ""
    },
    'SSL Certificate': {
        type: String,
        // required: ""
    },
    'Thread count': {
        type: String
    },
    'Queue Size': {
        type: String,
        default: ""
    },
    'Group ID': {
        type: String,
        default: ""
    },
    'Routing Indicator': {
        type: String,
        default: ""
    },
    'Range choice': {
        type: String,
        default: ""
    },
    'RangeInfo': {
        type: Array,
        default: []
    }
});


module.exports = mongoose.model('systemConfig', systemConfig);