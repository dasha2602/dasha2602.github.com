(function ($) {

    "use strict";

    $.fn.glitch = function () {
        return this.each(function () {

            var _iw = 170,
                _ih = 150;

            var $photo = $('.photo'),
                $containerPhoto = $('.photo').parent();

            for(var i=0; i<$photo.length; i++)
            {
                var $this = $photo.eq(i);

                $containerPhoto.eq(i).html('<canvas class="glitchPhoto"></canvas>');
                var canvasId = 'canvas' + i;
                $containerPhoto.eq(i).find('canvas').attr('id', canvasId);
                $containerPhoto.eq(i).find('canvas').attr('width', _iw);
                $containerPhoto.eq(i).find('canvas').attr('height', _ih);

                var _glitchAmount = getRandInt(2, 10),
                    _brightnessAmount = getRandInt(2, 7);

                console.log(canvasId);

                var _inputImage = new Image(),
                    //_canvas = document.getElementById(canvasId),
                    _canvas = document.getElementById(canvasId),
                    _context = _canvas.getContext("2d");

                _inputImage.src = $this.attr('src');

                //glitchImage2();


                var outputBMD = new BitmapData(_iw, _ih);
                outputBMD.draw(_inputImage);

                var inputBMD = new BitmapData(_iw, _ih);
                inputBMD.draw(_inputImage);

                var maxOffset = _glitchAmount * _glitchAmount / 100 * _iw;

                for (var i = 0; i < _glitchAmount * 2; i++) {

                    var startY = getRandInt(0, _ih);
                    var chunkHeight = getRandInt(1, _ih / 4);
                    chunkHeight = Math.min(chunkHeight, _ih - startY);
                    var offset = getRandInt(-maxOffset, maxOffset);

                    if (offset == 0)
                        continue;

                    if (offset < 0) {
                        outputBMD.copyPixels(inputBMD, new Rectangle(-offset, startY, _iw + offset, chunkHeight), new Point(0, startY));
                        outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, -offset, chunkHeight), new Point(_iw + offset,startY));

                    } else {
                        outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, _iw, chunkHeight), new Point(offset, startY));
                        outputBMD.copyPixels(inputBMD, new Rectangle(_iw - offset, startY, offset, chunkHeight), new Point(0, startY));
                    }
                }

                _context.putImageData(outputBMD.data, 0, 0);

            }
//
//            function onImageLoaded() {
//                var _iw = _inputImage.width,
//                    _ih = _inputImage.height;
//
//                $("#canvas").attr('width', _iw);
//                $("#canvas").attr('height', _ih);
//
//                _context.drawImage(_inputImage, 0, 0);
//            }

            function glitchImage2() {
                //_iw = _inputImage.width;
                //_ih = _inputImage.height;

                var outputBMD = new BitmapData(_iw, _ih);
                outputBMD.draw(_inputImage);

                var inputBMD = new BitmapData(_iw, _ih);
                inputBMD.draw(_inputImage);

                var maxOffset = _glitchAmount * _glitchAmount / 100 * _iw;

                for (var i = 0; i < _glitchAmount * 2; i++) {

                    var startY = getRandInt(0, _ih);
                    var chunkHeight = getRandInt(1, _ih / 4);
                    chunkHeight = Math.min(chunkHeight, _ih - startY);
                    var offset = getRandInt(-maxOffset, maxOffset);

                    if (offset == 0)
                        continue;

                    if (offset < 0) {
                        //shift left
                        outputBMD.copyPixels(inputBMD, new Rectangle(-offset, startY, _iw + offset, chunkHeight), new Point(0, startY));
                        //wrap around
                        outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, -offset, chunkHeight), new Point(_iw + offset,startY));

                    } else {
                        //shift right
                        outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, _iw, chunkHeight), new Point(offset, startY));
                        //wrap around
                        outputBMD.copyPixels(inputBMD, new Rectangle(_iw - offset, startY, offset, chunkHeight), new Point(0, startY));
                    }
                }

//                var channel = getRandChannel();
//                outputBMD.copyChannel(inputBMD, new Rectangle(0, 0, _iw, _ih), new Point(getRandInt(-_glitchAmount * 2, _glitchAmount * 2), getRandInt(-_glitchAmount * 2, _glitchAmount * 2)), channel, channel);
//
//                //make brighter
//                //convert 1 - 10 -> 1 -> 2
//                var b = 1 + _brightnessAmount/10*1;
//                var brightMat=[
//                b, 0, 0, 0, 0,
//                0, b, 0, 0, 0,
//                0, 0, b, 0, 0,
//                0, 0, 0, 1, 0
//                ];
//
//                var zeroPoint = new Point();
//                var brightnessFilter = new ColorMatrixFilter(brightMat);
//                outputBMD.applyFilter(outputBMD, outputBMD.rect, zeroPoint, brightnessFilter);

                _context.putImageData(outputBMD.data, 0, 0);

            }

            function getRandInt(min, max) {
                return (Math.floor(Math.random() * (max - min) + min));
            }

            function getRandChannel() {
                var r = Math.random();
                if (r < .33){
                    return BitmapDataChannel.GREEN;
                }else if (r < .66){
                    return BitmapDataChannel.RED;
                }else{
                    return BitmapDataChannel.BLUE;
                }
            }

        });
    };
})(jQuery);