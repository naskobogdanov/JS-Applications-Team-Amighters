var app = app || {};

app.pictureViews = (function () {
    function PictureViews() {
    }

    PictureViews.prototype.showPictures = function (data) {
        var _this = this;
        $.get('templates/add-picture.html', function (templ) {
            var json = {
                pictures: data
            };
            var rendered = Mustache.render(templ, json);
            $('#pictures').html(rendered);
            $('#add-picture').on('click', function () {
                var createPictureDiv = $('<div>')
                    .addClass('add-picture-form');
                var pictureName = $('<input>').attr('id', 'picture-name').addClass('picture-name');
                var uploadLabel = $('<label>').attr('for', 'picture-upload').addClass('picture-upload').text('Choose File');
                var pictureFile = $('<input>').attr({
                    type: 'file',
                    id: 'picture-upload'
                }).addClass('picture-input').change(function () {
                    var reader = new FileReader(),
                        file = this.files[0];

                    reader.addEventListener("load", function () {

                        $.sammy(function () {
                            console.log('uploading')
                            this.trigger('add-picture', {base64data: reader.result})
                        })
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                });

                createPictureDiv.append(pictureName, uploadLabel, pictureFile);
                console.log('5' + createPictureDiv);
                $('#pictures').append(createPictureDiv);
            });
        });

    };



    return {
        load: function () {
            return new PictureViews();
        }
    }
})();
