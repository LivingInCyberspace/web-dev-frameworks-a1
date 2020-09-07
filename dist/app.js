"use strict";
var revSummary = document.getElementById("summary");
var revName = document.getElementById("name");
var revBox = document.getElementById("review-box");
var revTmp = document.getElementById("tmp-comment");
// class deals with review controls
var ReviewManager = /** @class */ (function () {
    function ReviewManager() {
    }
    ReviewManager.displayRating = function () {
        var avg = RatingInfo.getAvgRating();
        var starString = "";
        if (avg === 0 || isNaN(avg)) {
            starString += "<p id=\"review-score\">None yet.. <a href=\"../view/index.html#review\">Be the first one!</a></p>";
            revTmp.innerHTML = starString;
        }
        else {
            switch (Math.floor(avg)) {
                case 1:
                    starString += "<span class=\"review-star\">\u2605</span>";
                    break;
                case 2:
                    starString += "<span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>";
                    break;
                case 3:
                    starString += "<span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>";
                    break;
                case 4:
                    starString += "<span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>";
                    break;
                case 5:
                    starString += "<span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>\n                    <span class=\"review-star\">\u2605</span>";
                    break;
            }
            // appends a half-star after determining whole # star count
            if (avg - Math.floor(avg) != 0) {
                starString += "\n                <span class=\"review-star\">&#11242;</span>";
            }
            // appens the number of starts if there are no stars
            revTmp.innerHTML = starString + "\n        <p id=\"review-score\">" + RatingInfo.getAvgRating().toFixed(1) + " stars based off " + RatingInfo.getRevCount() + " reviews.</p>";
        }
        // displays stars with rating
        var clone = revTmp.content.cloneNode(true);
        var totalRate = document.getElementById("total-rating");
        totalRate.replaceChild(clone, totalRate.firstChild);
    };
    // gets stars to dusplay for user rating
    ReviewManager.getStars = function () {
        var stars = "";
        for (var i = 0; i < RatingInfo.getUsrRating(); i++) {
            stars += "★";
        }
        return stars;
    };
    ReviewManager.postReview = function () {
        var curr = new Date();
        revTmp.innerHTML = "<div class=\"review-container\">\n        <h5 class=\"usr-summary\">" + revSummary.value + "</h5>\n        <p class =\"review-star\">" + this.getStars() + "</p>\n        <em class=\"usr-name\">" + revName.value + " posted on " + curr.getMonth() + "/" + curr.getDate() + "/" + curr.getFullYear() + ":</em>\n        <p class=\"usr-review\">" + revBox.value + "</p>\n        </div>";
        var clone = revTmp.content.cloneNode(true);
        document.getElementById("other-reviews").appendChild(clone);
    };
    ReviewManager.processReview = function () {
        var usrRating = RatingInfo.getUsrRating();
        if (usrRating === 0) {
            alert("Don't forget to add a rating!");
        }
        else if (revSummary.value.length > 50) {
            alert("Summary must be less than 50 characters.");
        }
        else {
            RatingInfo.incRevCount();
            RatingInfo.addStarRating(usrRating);
            this.postReview();
            this.displayRating();
        }
    };
    return ReviewManager;
}());
// for queries with rating totals
var RatingInfo = /** @class */ (function () {
    function RatingInfo() {
    }
    RatingInfo.getUsrRating = function () {
        var form = document.getElementById("form");
        var starRating = form.rating;
        // finds the radio button that was checked
        for (var i = 0; i < starRating.length; i++) {
            if (starRating[i].checked) {
                return +starRating[i].value;
            }
        }
        ;
        // for no rating; probably won't be reached.
        return 0;
    };
    RatingInfo.addStarRating = function (usrRating) {
        RatingInfo._starCount += usrRating;
    };
    RatingInfo.incRevCount = function () {
        RatingInfo._reviewCount++;
    };
    RatingInfo.getRevCount = function () {
        return RatingInfo._reviewCount;
    };
    RatingInfo.getAvgRating = function () {
        return RatingInfo._starCount / RatingInfo._reviewCount;
    };
    RatingInfo._starCount = 0;
    RatingInfo._reviewCount = 0;
    return RatingInfo;
}());
ReviewManager.displayRating();
