const revSummary: HTMLInputElement = document.getElementById("summary") as HTMLInputElement;
const revName: HTMLInputElement = document.getElementById("name") as HTMLInputElement;
const revBox: HTMLTextAreaElement = document.getElementById("review-box") as HTMLTextAreaElement;
const revTmp: HTMLTemplateElement = document.getElementById("tmp-comment") as HTMLTemplateElement;
const revForm: HTMLFormElement = document.getElementById("form-btn") as HTMLFormElement;

function postReview() {
    let curr = new Date();

    revTmp.innerHTML = `<div class="review-container">
    <em class="usr-name">${revName.value} posted on ${curr.getMonth()}/${curr.getDate()}/${curr.getFullYear()}:</em>
    <h5 class="usr-summary">${revSummary.value}</h5>
    <p class="usr-review">${revBox.value}</p>
    </div>`

    let clone = revTmp.content.cloneNode(true);
    document.getElementById("other-reviews")!.appendChild(clone);

}
