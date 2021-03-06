var FONT = "15pt Arial";
var SCALE = 800;
var OFFSET = 30;

CanvasRenderingContext2D.prototype.setDimensions = function (width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
};

CanvasRenderingContext2D.prototype.caption = function (img, caption, logo) {
    var width = SCALE;
    var height = SCALE * img.height / img.width;

    this.setDimensions(width, height);
    this.drawImage(img, 0, 0, width, height);

    this.shadowColor = "black";
    this.shadowBlur = 8;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.drawImage(logo,
		   width - logo.width - OFFSET,
		   height - logo.height - OFFSET);

    this.font = FONT;
    this.fillStyle = "white";
    this.shadowColor = "black";
    this.shadowBlur = 8;
    this.shadowOffsetX = 5;
    this.shadowOffsetY = 5;
    this.fillText(caption, OFFSET, height - OFFSET);
};

CanvasRenderingContext2D.prototype.clear = function () {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

window.onload = function () {
    var canvas = document.getElementById("my");
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    var logo = document.getElementById("logo");
    var caption = document.getElementById("caption");
    var sample = document.getElementById("sample");
    var sampleButton = document.getElementById("sample-button");

    sampleButton.onclick = function () {
	ctx.caption(sample, "So ya like captions...", logo);
    }

    caption.onkeyup = function () {
	// kind of hacky since it redraws the image every key up
	ctx.caption(img, caption.value, logo);
    };

    /* From robertnyman.com/2011/03/10/using-html5-canvas-drag-and-drop-and-file-api-to-offer-the-cure/. */
    img.addEventListener("load", function () {
	if (img.width < SCALE) {
	    alert("NO! UPLOAD BIGGAR IMAGE! YOU FOOOOOOOL");
	}
	else {
	    ctx.clear();
	    ctx.caption(img, caption.value, logo);
	}
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
	    if (typeof FileReader !== "undefined" &&
		file.type.indexOf("image") != -1) {
		var reader = new FileReader();
		// Note: addEventListener doesn't work in Google Chrome for this event
		reader.addEventListener("onload", function (e) {
		    img.src = e.target.result;
		});
		reader.onload = function (e) {
		    img.src = e.target.result;
		};
		reader.readAsDataURL(file);
	    }
	}
	e.preventDefault();
    }, false);
};
