/**
* The main conversion function that is called from the iOS app
* 
* @param {} rules Rules to convert
* @param {*} limit Max number of rules
* @param {*} optimize True if we should apply additional optimization
*/
var jsonFromFilters = (function () {

    /* DEPENDENCIES_CONTENT_PLACEHOLDER */

    return function (rules, limit, optimize) {
        try {
            return SafariContentBlockerConverter.convertArray(rules, limit, optimize);
        } catch (ex) {
            console.log('Unexpected error: ' + ex);
        }
    };
})();

// expose to node
if (module && module.exports) {
    module.exports.jsonFromFilters = jsonFromFilters;
}