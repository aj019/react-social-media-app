if(process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_aws');
} else {
    module.exports = require('./keys_dev');
}