var displayCaption = function displayCaptionF (ctx, img, caption) {
    ctx.font = "15pt Arial";
    ctx.fillStyle = "white";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fillText(caption, 10, img.height - 10);
}

var clearCanvas = function clearCanvasF (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.onload = function () {
    var canvas = document.getElementById("my");
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    var caption = document.getElementById("caption");

    caption.onkeyup = function () {
	// kind of hacky since it redraws every key up
	ctx.drawImage(img, 0, 0);
	displayCaption(ctx, img, caption.value);
    };

    img.addEventListener("load", function () {
	clearCanvas(canvas, ctx);
	canvas.height = img.height;
	canvas.width = img.width;
	ctx.drawImage(img, 0, 0);
	displayCaption(ctx, img, caption.value);
    }, false);
    

    canvas.addEventListener("dragover", function (evt) {
	evt.preventDefault();
    }, false);

    canvas.addEventListener("drop", function (evt) {
	var files = evt.dataTransfer.files;
	if (files.length > 0) {
	    var file = files[0];
	    if (typeof FileReader !== "undefined" &&
		file.type.indexOf("image") != -1) {
		var reader = new FileReader();
		// Note: addEventListener doesn't work in Google Chrome for this event
		reader.onload = function (evt) { img.src = evt.target.result; };
		reader.readAsDataURL(file);
	    }
	}
	evt.preventDefault();
    }, false);
};
