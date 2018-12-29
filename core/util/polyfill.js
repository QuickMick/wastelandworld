window.showLoadingDialog = function () {
  document.getElementById("loading-overlay").style.display = ""; //"flex";
};

window.hideLoadingDialog = function () {
  document.getElementById("loading-overlay").style.display = "none";
};


if (window.requestAnimationFrame)
  window.requestAnimationFrame = window.requestAnimationFrame;
else if (window.msRequestAnimationFrame)
  window.requestAnimationFrame = window.msRequestAnimationFrame;
else if (window.mozRequestAnimationFrame)
  window.requestAnimationFrame = window.mozRequestAnimationFrame;
else if (window.webkitRequestAnimationFrame)
  window.requestAnimationFrame = window.webkitRequestAnimationFrame;

if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
  Range.prototype.createContextualFragment = function (html) {
    var frag = document.createDocumentFragment(),
      div = document.createElement("div");
    frag.appendChild(div);
    div.outerHTML = html;
    return frag;
  };
}