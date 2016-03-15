var app = app || {};

app.userController = (function() {
    function UserController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function(selector) {
        this._viewBag.loadLoginPage(selector);
    };

    UserController.prototype.loadRegisterPage = function(selector) {
        this._viewBag.loadRegisterPage(selector);
    };

    UserController.prototype.login = function(data) {
        this._model.login(data)
            .then(function(successData) {
                sessionStorage['sessionAuth'] = successData._kmd.authtoken;
                sessionStorage['userId'] = successData._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/menu-home'});
                });
            }).done();
    };

    UserController.prototype.register = function(data) {
        this._model.register(data)
            .then(function(successData) {
                console.log("here");
                sessionStorage['sessionAuth'] = successData._kmd.authtoken;
                sessionStorage['userId'] = successData._id;
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/menu-home'});
                });
            }).done();
    };

    UserController.prototype.logout = function() {
        this._model.logout()
            .then(function() {
                sessionStorage.clear();
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/login'});
                });
            }).done();
    };

    return {
        load : function(model, views) {
            return new UserController(model, views);
        }
    }
}());