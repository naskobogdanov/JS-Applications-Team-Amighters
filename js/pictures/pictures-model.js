var app = app || {};

app.picturesModel = (function () {
    function PicturesModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/Pictures';
    }

    PicturesModel.prototype.getAllPictures = function () {
        var requestId = this.serviceUrl;
        console.log(requestId);
        return this.requester.get(requestId, true)
    };

    PicturesModel.prototype.addNewPicture = function (picture) {
        return this.requester.post(this.serviceUrl, picture, true)
    };

    return {
        load: function (requester) {
            return new PicturesModel(requester)
        }
    }
})();