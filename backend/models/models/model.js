var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AuthServiceConfig = new Schema({
    'Service Name': {
        type: String,
        default: ""
    },
    'Service Description': {
        type: String,
        default: ""
    },
    'Service Type': {
        type: String,
        required: true
    },
    'Service Modes': {
        type: Array
    },
    'Result Confirmation': {
        type: String,
        default: ""
    },
    'Session Timeout': {
        type: String,
        default: "0 Sec"
    },
    'Private Key Password': {
        type: String,
        default: ""
    },
    'Server Certificate': {
        type: String,
        default: ""
    },
    'Server Key': {
        type: String,
        default: ""
    },
    'CA ceritficate': {
        type: String,
        default: ""
    },
    'Verification Depth': {
        type: String,
        default: ""
    },
    'Client verification mode': {
        type: String,
        default: ""
    },
    'Use Session cache': {
        type: Boolean,
        default: false
    },
    'Session Cache timeout': {
        type: String,
        default: "0 Sec"
    },
    'OCSP URI': {
        type: String,
        default: ""
    },
    'On Exceeding SoR counter': {
        type: String,
        default: ""
    },
    'SoR Error code': {
        type: String,
        default: ""
    },
});


module.exports = mongoose.model('AuthService', AuthServiceConfig);