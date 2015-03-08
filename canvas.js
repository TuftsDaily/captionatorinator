var FONT = "15pt Arial";

CanvasRenderingContext2D.prototype.caption = function (img, caption) {
    this.drawImage(img, 0, 0);
    this.font = FONT;
    this.fillStyle = "white";
    this.shadowColor = "black";
    this.shadowBlur = 8;
    this.shadowOffsetX = 5;
    this.shadowOffsetY = 5;
    this.fillText(caption, 10, img.height - 10);
}

CanvasRenderingContext2D.prototype.clear = function () {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

window.onload = function () {
    var canvas = document.getElementById("my");
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    var caption = document.getElementById("caption");

    caption.onkeyup = function () {
	// kind of hacky since it redraws the image every key up
	ctx.caption(img, caption.value);
    };

    /* From robertnyman.com/2011/03/10/using-html5-canvas-drag-and-drop-and-file-api-to-offer-the-cure/. */
    img.addEventListener("load", function () {
	ctx.clear();
	canvas.height = img.height;
	canvas.width = img.width;
	ctx.caption(img, caption.value);
    }, false);
    

    /* From robertnyman.com/2011/03/10/using-html5-canvas-drag-and-drop-and-file-api-to-offer-the-cure/. */
    canvas.addEventListener("dragover", function (e) {
	e.preventDefault();
    }, false);

    /* From robertnyman.com/2011/03/10/using-html5-canvas-drag-and-drop-and-file-api-to-offer-the-cure/. */
    canvas.addEventListener("drop", function (e) {
	var files = e.dataTransfer.files;
	if (files.length > 0) {
	    var file = files[0];
	    if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
		var reader = new FileReader();
		// Note: addEventListener doesn't work in Google Chrome for this event
		reader.onload = function (e) { img.src = e.target.result; };
		reader.readAsDataURL(file);
	    }
	}
	e.preventDefault();
    }, false);
};
