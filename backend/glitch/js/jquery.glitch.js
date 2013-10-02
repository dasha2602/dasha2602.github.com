(function ($) {

    "use strict";

    $.fn.glitch = function () {
        return this.each(function () {

            //console.log('glitch');

            var _iw = 220,
                _ih = 220;
            var _glitchAmount = 5;

            var _inputImage = document.getElementById("exampleImg"),
                _canvas = document.getElementById("canvas"),
                _context = _canvas.getContext("2d");

            var outputBMD = _inputImage.bitmapData;
            //var outputBMD = new BitmapData(_iw, _ih);
            //var outputBMD = _context.fillRect(0,0,_iw,_ih);
            //outputBMD.draw(_inputImage);
            //_context.drawImage(_inputImage, 0, 0);
            outputBMD.draw(_inputImage);

            var inputBMD = _inputImage.bitmapData;
            //var inputBMD = new BitmapData(_iw, _ih);
            //var inputBMD = _context.fillRect(0,0,_iw,_ih);
            //inputBMD.draw(_inputImage);
            //inputBMD.draw(_inputImage,0,0);

            _context.drawImage(_inputImage, 0, 0);

            var maxOffset = _glitchAmount * _glitchAmount / 100 * _iw;

            //----------------------------------------------------
            //randomly offset slices horizontally
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

            //_context.putImageData(outputBMD.data, 0, 0);
            //----------------------------------------------------

            //_context.drawImage(_inputImage,0,0);
            //_context.getImageData(0,0,_canvas.width,_canvas.height);


            function getRandInt(min, max) {
                return (Math.floor(Math.random() * (max - min) + min));
            }

        });
    };
})(jQuery);