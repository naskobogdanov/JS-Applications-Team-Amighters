var app = app || {};

app.pictureController = (function () {
    function PictureController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PictureController.prototype.showPictures = function () {
        var _this = this;
        this._model.getAllPictures()
            .then(function (pictures) {
                _this._viewBag.showPictures(pictures);
            })
    };

    PictureController.prototype.addPicture = function (data) {
        var _this = this,
            albumId = data.albumId,
            obj = app.pictureInputModel(data),
            pictureOutputModel = obj.getPictureInputModel();

        this._model.addNewPicture(pictureOutputModel)
    };

    return {
        load: function (model, viewBag) {
            return new PictureController(model, viewBag)
        }
    }
})();
