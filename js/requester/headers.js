var app = app || {};

app.headers = (function() {
    function Headers(applicationId, restAPIKey) {
        this.appId = applicationId;
        this.restAPIKey = restAPIKey;
    }

    Headers.prototype.getHeaders = function (useSessionToken) {
        var headers = {
            'X-Kinvey-Application-Id': this.appId,
            'X-Kinvey-REST-API-Key': this.restAPIKey,
            'Content-Type': 'application/json'
        };

        if (sessionStorage['sessionToken'] && useSessionToken) {
            headers['X-Kinvey-Session-Token'] = sessionStorage['sessionToken'];
        }

        return headers;
    };

    return {
        load : function (applicationId, restAPIKey) {
            return new Headers(applicationId, restAPIKey);
        },
        getCustomHeaders: function (appId, restKey, masterKey) {
            var headers = {
                'X-Kinvey-Application-Id': appId,
                'X-Kivey-REST-API-Key': restKey,
                'X-Kinvey-Master-Key' : masterKey,
                'Content-Type': 'application/json'
            };

            if (sessionStorage['sessionToken']) {
                headers['X-Kinvey-Session-Token'] = sessionStorage['sessionToken'];
            }

            return headers;
        }
    }
}());