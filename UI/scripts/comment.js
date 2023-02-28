function openCommentForm() {
    document.getElementById("comment-form-container").style.display = "block";
    document.getElementById("main-article-comments-container").style.display = "none";
    document.getElementById("main-article-buttons-container").style.display = "none";
}

let commentForm = document.getElementById("comment-form");

if (commentForm) {
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault(); // prevent form submission

        // get input elements

        const message = document.getElementById("comment-message").value;

        // validation flag
        const isValid = true;

        // content validation
        if (message === "") {
        // alert("content is required.");
        isValid = false;
        }

        // if validation is successful
        if (isValid) {

        const stored = JSON.parse(localStorage.getItem("comments"));
        const currentUser = JSON.parse(sessionStorage.getItem("current-user"));

        const name = currentUser.name;
        const email = currentUser.email;

        const comment = {
            "name" : name,
            "email" : email,
            "message" : message
        };

        if (stored === null) {
            const comments = [];
            comments.push(comment);
            localStorage.setItem("comments", JSON.stringify(comments));
            alert("comment added successfully!");
            closeCommentForm();
        } else {
            stored.push(comment);
            localStorage.setItem("comments", JSON.stringify(stored));
            alert("comment added successfully!");
            closeCommentForm();
        }
        }
    });
}

const storedComments = JSON.parse(localStorage.getItem("comments"));
const commentsList = document.getElementById("main-article-comments-container");

if (storedComments) {
    storedComments.forEach( comment => {
        const commentContainer = document.createElement("li");
        commentContainer.className += "comment-container";

        const commentName = document.createElement("p");
        commentName.className += "comment-name";
        commentName.innerHTML = `${comment.name}`;

        commentContainer.appendChild(commentName);

        const commentMessage = document.createElement("p");
        commentMessage.className += "comment-message"
        commentMessage.innerHTML = `${comment.message}`;

        commentContainer.appendChild(commentMessage);

        if (commentsList) {
        commentsList.appendChild(commentContainer);
        }
    })
}

function closeCommentForm() {
    document.getElementById("comment-form-container").style.display = "none";
    document.getElementById("main-article-comments-container").style.display = "block";
    document.getElementById("main-article-buttons-container").style.display = "block";
}