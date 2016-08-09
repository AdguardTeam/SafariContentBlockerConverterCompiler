var SafariContentBlockerConverter = require('./download/converter.js').SafariContentBlockerConverter;

function jsonFromFilters(rules, limit, optimize){
    try {
        return SafariContentBlockerConverter.convertArray(rules, limit, optimize);
    } catch (ex) {
        console.log('Unexpected error: ' + ex);
    }
};