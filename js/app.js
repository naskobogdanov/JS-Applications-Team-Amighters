var app = app || {};

(function() {
    var appId= 'kid_-1QIDDx_JZ';
    var restAPI = '306345501b3e4470a8470566ab1044c2';
    var baseUrl = 'https://baas.kinvey.com';

    var headers = app.headers.load(appId, restAPI);
    var requester = app.requester.load();

    var userModel = app.userModel.load(baseUrl, requester, headers);
    var userViewBag = app.userViews.load();
    var userController = app.userController.load(userModel, userViewBag);

    var homeViewBag = app.homeViews.load();
    var homeController = app.homeController.load(homeViewBag);

    app.router = Sammy(function() {
        var selector = '#main';

        this.before(function() {
            var userId = sessionStorage['userId'];
            if(userId) {
                homeController.loadHomeMenu('#menu');
            } else {
                homeController.loadLoginMenu('#menu');
            }
        });

        this.before({except: {path:'#\/(register\/|login\/)?'}}, function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                noty({
                    theme: 'relax',
                    text: 'You should be logged in to do this action!',
                    type:'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function() {
            homeController.welcomeScreen(selector);
        });

        this.get('#/home/', function() {
            homeController.homeScreen(selector);
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.bind('login', function(e, data) {
            userController.login(data.username, data.password);
        });

        this.bind('register', function(e, data) {
            userController.register(data.username, data.password);
        });

    });

    app.router.run('#/');
}());