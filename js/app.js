var app = app || {};

(function() {
    var appId= 'kid_-1QIDDx_JZ';
    var appSecret = '306345501b3e4470a8470566ab1044c2';

    var requester = app.requester.config(appId, appSecret);


    var userModel = app.userModel.load(requester);
    var userViewBag = app.userViews.load();
    var userController = app.userController.load(userModel, userViewBag);

    var homeViewBag = app.homeViews.load();
    var homeController = app.homeController.load(homeViewBag);

    var picturesModel = app.picturesModel.load(requester);
    var picturesViewBag = app.pictureViews.load();
    var picturesController = app.pictureController.load(picturesModel, picturesViewBag);


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
            picturesController.showPictures();
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
            userController.login(data);
        });

        this.bind('register', function(e, data) {
            userController.register(data);
        });

    });

    app.router.run('#/');
}());