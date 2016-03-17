var app = app || {};

app.pictureController = (function () {
    function PictureController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PictureController.prototype.showPictures = function (data) {
        console.log('123' + data);
        var _this = this;
        this._model.getAllPictures()
            .then(function (pictures) {
                _this._viewBag.showPictures(pictures);
                for (var i = 0; i < pictures.length; i++) {
                    console.log(pictures[i].base64data);
                    var e = $('<img src="' + pictures[i].base64data + '">');
                    $('#show-pictures').append(e);
                }
            })
    };

    PictureController.prototype.addPicture = function (data) {
        var _this = this,
            albumId = data.albumId,
            obj = app.pictureInputModel(data),
            pictureOutputModel = obj.getPictureInputModel();

        this._model.addNewPicture(pictureOutputModel);

        setTimeout(function(){ location.reload(); }, 6000);

    };

    return {
        load: function (model, viewBag) {
            return new PictureController(model, viewBag)
        }
    }
})();
