let form = $('#cropper-form');

form.on('cropped-image:complete', function(evt, data) {
    let img = data.image;

    $('#hiddenImage').val(img);
});

let cropper;
let cropperModalId = '#cropperModal';
let $jsPhotoUploadInput = $('.js-photo-upload');

$jsPhotoUploadInput.on('change', function() {
    var files = this.files;
    if (files.length > 0) {
        var photo = files[0];

        var reader = new FileReader();
        reader.onload = function(event) {
            var image = $('.js-avatar-preview')[0];
            image.src = event.target.result;

            cropper = new Cropper(image, {
                viewMode: 1,
                aspectRatio: 1,
                minContainerWidth: 400,
                minContainerHeight: 400,
                minCropBoxWidth: 271,
                minCropBoxHeight: 271,
                movable: true,
                ready: function () {
                    console.log('ready');
                    console.log(cropper.ready);
                }
            });

            $(cropperModalId).modal();
        };
        reader.readAsDataURL(photo);
    }
});

$('.js-save-cropped-avatar').on('click', function(event) {
    event.preventDefault();

    console.log(cropper.ready);

    var $button = $(this);
    $button.text('uploading...');
    $button.prop('disabled', true);

    const canvas = cropper.getCroppedCanvas();
    const base64encodedImage = canvas.toDataURL();
    $('#avatar-crop').attr('src', base64encodedImage);
    $(cropperModalId).modal('hide');

    form.trigger('cropped-image:complete', [
        {
          image: base64encodedImage
        }
    ]);
});

