var app = app || {};

app.userModel = (function() {
    function UserModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'user/' + requester.appId;
    }

    UserModel.prototype.login = function(data) {
        var loginUrl = this.serviceUrl + '/login';
        return this._requester.post(loginUrl, data);
    };

    UserModel.prototype.register = function(data) {
        if (data.username.length > 3) {
            return this._requester.post(this.serviceUrl, data);
        }
        else {
            //This is temporary :)
            alert("You should enter username with at least 3 symbols!");
        }
    };

    UserModel.prototype.logout = function() {
        var logoutUrl = this.serviceUrl + '/_logout';
        return this._requester.post(logoutUrl, null, true);
    };

    return {
        load: function(requester) {
            return new UserModel(requester);
        }
    }
}());