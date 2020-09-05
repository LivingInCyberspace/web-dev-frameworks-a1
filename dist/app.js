"use strict";
var revSummary = document.getElementById("summary");
var revName = document.getElementById("name");
var revBox = document.getElementById("review-box");
var revTmp = document.getElementById("tmp-comment");
var revForm = document.getElementById("form-btn");
function postReview() {
    var curr = new Date();
    revTmp.innerHTML = "<div class=\"review-container\">\n    <em class=\"usr-name\">" + revName.value + " posted on " + curr.getMonth() + "/" + curr.getDate() + "/" + curr.getFullYear() + ":</em>\n    <h5 class=\"usr-summary\">" + revSummary.value + "</h5>\n    <p class=\"usr-review\">" + revBox.value + "</p>\n    </div>";
    var clone = revTmp.content.cloneNode(true);
    document.getElementById("other-reviews").appendChild(clone);
}
