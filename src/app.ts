const revSummary: HTMLInputElement = document.getElementById("summary") as HTMLInputElement;
const revName: HTMLInputElement = document.getElementById("name") as HTMLInputElement;
const revBox: HTMLTextAreaElement = document.getElementById("review-box") as HTMLTextAreaElement;
const revTmp: HTMLTemplateElement = document.getElementById("tmp-comment") as HTMLTemplateElement;

// class deals with review controls
class ReviewManager {
    static displayRating() {
        let avg = RatingInfo.getAvgRating();
        let starString = "";

        // for firist-time display
        if (avg === 0 || isNaN(avg)) {
            starString += `<p id="review-score">None yet.. <a href="../view/index.html#review">Be the first one!</a></p>`;
            revTmp.innerHTML = starString;
        } else {
            // this updates the review
            switch (Math.floor(avg)) {
                case 1:
                    starString += `<span class="review-star"><img src="../img/star.png" alt="★" /></span>`;
                    break;
                case 2:
                    starString += `<span class="review-star"><img src="../img/star.png" alt="★" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="★" /></span>`;
                    break;
                case 3:
                    starString += `<span class="review-star"><img src="../img/star.png" alt="★" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="★" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="★" /></span>`;
                    break;
                case 4:
                    starString += `<span class="review-star"><img src="../img/star.png" alt="★" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="<img src="../img/star.png" alt="★" />" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="<img src="../img/star.png" alt="★" />" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="<img src="../img/star.png" alt="★" />" /></span>`;
                    break;
                case 5:
                    starString += `<span class="review-star"><img src="../img/star.png" alt="★" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="<img src="../img/star.png" alt="★" />" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="<img src="../img/star.png" alt="★" />" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="<img src="../img/star.png" alt="★" />" /></span>
                    <span class="review-star"><img src="../img/star.png" alt="<img src="../img/star.png" alt="★" />" /></span>`;
                    break;
            }

            // appends a half-star after determining whole # star count
            if (avg - Math.floor(avg) != 0) {
                starString += `
                <span class="review-star-half"></span>`;
            }

            // appens the number of starts if there are no stars
            revTmp.innerHTML = `${starString}
        <p id="review-score">${RatingInfo.getAvgRating().toFixed(1)} stars based off ${RatingInfo.getRevCount()} reviews.</p>`;
        }

        // displays stars with rating
        let clone = revTmp.content.cloneNode(true);
        let totalRate: HTMLDivElement = document.getElementById("total-rating") as HTMLDivElement
        totalRate!.replaceChild(clone, totalRate.firstChild!);
    }

    // gets stars to dusplay for user rating
    static getStars(): string {
        let stars = "";

        for (let i = 0; i < RatingInfo.getUsrRating(); i++) {
            stars += "★";
        }

        return stars;
    }

    static postReview() {
        let curr = new Date();
        revTmp.innerHTML = `<div class="review-container">`;

        // appends if short summary is filled
        if (!revSummary.value.match(/^\s*$/)) {
            revTmp.innerHTML += `\n<h5 class="usr-summary">${revSummary.value}</h5>` 
        }

        revTmp.innerHTML = `<p class ="review-star">${this.getStars()}</p>
        <em class="usr-name">${revName.value} posted on ${curr.getMonth()}/${curr.getDate()}/${curr.getFullYear()}:</em>`;

        // appends if review box is filled
        if(!revBox.value.match(/^\s*$/)) {
            revTmp.innerHTML += `\n<p class="usr-review">${revBox.value}</p>\n</div>`
        }

        let clone = revTmp.content.cloneNode(true);
        document.getElementById("other-reviews")!.appendChild(clone);
    }

    static processReview() {
        let usrRating = RatingInfo.getUsrRating();

        if (usrRating === 0) {
            alert("Don't forget to add a rating!");
        } else if (revSummary.value.length > 50) {
            alert("Summary must be less than 50 characters.");
        } else {
            RatingInfo.incRevCount();
            RatingInfo.addStarRating(usrRating);
            this.postReview();
            this.displayRating();
        }
    }
}

// for queries with rating totals
class RatingInfo {
    private static _starCount: number = 0;
    private static _reviewCount:number = 0;

    static getUsrRating(): number {
        let form: HTMLFormElement = document.getElementById("form") as HTMLFormElement
        let starRating = form.rating;

        // finds the radio button that was checked
        for (let i = 0; i < starRating!.length; i++) {
            if (starRating[i].checked) {
                return +starRating[i].value;
            }
        };

        // for no rating; probably won't be reached.
        return 0;
    }

    static addStarRating(usrRating: number) {
        RatingInfo._starCount += usrRating;
    }

    static incRevCount(): void {
        RatingInfo._reviewCount++;
    }


    static getRevCount(): number {
        return RatingInfo._reviewCount;
    }

    static getAvgRating(): number {
        return RatingInfo._starCount / RatingInfo._reviewCount;
    }
}

ReviewManager.displayRating();