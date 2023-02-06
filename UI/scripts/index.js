const server = ''

// Header Nav
function headerNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Check if the user is already logged in
if (localStorage.getItem("loggedIn") === "true") {
  alert("Welcome back, user!");
} else {
  // Get the login form and submit button
  const loginForm = document.getElementById("login-form");
  const submitButton = document.getElementById("submit-button");

  // Add event listener to the submit button
  if(submitButton){
    submitButton.addEventListener("click", function(event) {
      event.preventDefault(); // prevent the form from submitting
  
      // Get the entered username and password
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // get existing user details from local storage
      let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      // check if email and password match any existing user
      let isAuthenticated = false;
      let currentUser;
      for (let i = 0; i < existingUsers.length; i++) {
        if (existingUsers[i].email === email && existingUsers[i].password === password) {
          isAuthenticated = true;
          currentUser = existingUsers[i];
          break;
        }
      }
  
      if (isAuthenticated) {
        // user is authenticated, allow access
        // alert("Welcome!");
        window.location.href = "admin-panel-page.html";
        sessionStorage.setItem("current-user", JSON.stringify(currentUser))
      } else {
        // user is not authenticated, advise to create an account
        // alert("Invalid email or password. Please create an account if you don't have one.");
      }
    });
  }
}


// get registration form element
let form2 = document.getElementById("registration-form");

// add event listener to form
if(form2) {
  form2.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form submission

    // get input elements
    let name = document.getElementById("new-name").value;
    let email = document.getElementById("new-email").value;
    let password = document.getElementById("new-password").value;

    // validation flag
    let isValid = true;

    // name validation
    if (name === "") {
        // alert("Name is required.");
        isValid = false;
    }

    // email validation
    if (email === "") {
        // alert("Email is required.");
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        // alert("Invalid email format.");
        isValid = false;
    }

    // password validation
    if (password === "") {
        // alert("Password is required.");
        isValid = false;
    } else if (password.length < 8) {
        // alert("Password must be at least 8 characters.");
        isValid = false;
    }

    // if validation is successful
    if (isValid) {

      const stored = JSON.parse(localStorage.getItem("users"));

      function generateUserId(name) {
        const nameArray = name.split(" ");
        
        let userId = "";
    
        for (let i = 0; i < nameArray.length; i++) {
            userId += nameArray[i].charAt(0);
        }
        
        return userId;
      }

      const userId = generateUserId(name);

      const user = {
        "name" : name,
        "email" : email,
        "password" : password,
        "user-id" : userId
      };

      if (stored === null) {
        const users = [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        stored.push(user);
        localStorage.setItem("users", JSON.stringify(stored));
      }

      // alert("Form submitted successfully!");
    }
});
}

// Log-out
const logOut = document.getElementById("log-out-link");
if (logOut){
  logOut.addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.removeItem("current-user");
    localStorage.setItem("loggedIn", "false");
    windows.location.href = "admin-sign-in-page.html"
  })
}

// get contact form element
let form1 = document.getElementById("contact-form");

// add event listener to form
if (form1) {
  form1.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form submission

    // get input elements
    let name = document.getElementById("contact-name").value;
    let email = document.getElementById("contact-email").value;
    let message = document.getElementById("contact-message").value;

    // validation flag
    let isValid = true;

    // name validation
    if (name === "") {
        // alert("Name is required.");
        isValid = false;
    }

    // email validation
    if (email === "") {
        // alert("Email is required.");
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        // alert("Invalid email format.");
        isValid = false;
    }

    // message validation
    if (message === "") {
        // alert("message is required.");
        isValid = false;
    }

    // if validation is successful
    if (isValid) {

      const stored = JSON.parse(localStorage.getItem("querries"));

      const querry = {
        "name" : name,
        "email" : email,
        "message" : message
      };

      if (stored === null) {
        const querries = [];
        querries.push(querry);
        localStorage.setItem("querries", JSON.stringify(querries));
      } else {
        stored.push(querry);
        localStorage.setItem("querries", JSON.stringify(stored));
      }

      // alert("message sent successfully!");
    }
  });
}


const storedQuerries = JSON.parse(localStorage.getItem("querries"));
const list = document.getElementById("querries-container")

if(storedQuerries) {
  storedQuerries.forEach( querry => {
    const querryContainer = document.createElement("li");
    querryContainer.className += "container querry-container grid-item";
  
    const topSection = document.createElement("div");
    topSection.className += "querry-top-section";
    topSection.innerHTML = `<h3 class="querry-name">${querry.name}</h3>`;
    querryContainer.appendChild(topSection);
    
    const lowerSection = document.createElement("div");
    lowerSection.className += "querry-lower-section";
    lowerSection.innerHTML = `<p class="querry-message">${querry.message}</p>`;
    querryContainer.appendChild(lowerSection);
  
    if (list) {
      list.appendChild(querryContainer);
    }
  });
}


// function displayQuerries(storedQuerries) {
//   for (let i = 0; i < storedQuerries.length; i++){
//     const querryContainer = document.createElement("li");
//     querryContainer.className += "container querry-container";
  
//     const topSection = document.createElement("div");
//     topSection.className += "querry-top-section";
//     topSection.innerHTML = `<h3 class="querry-name">${i.name}</h3>`;
//     querryContainer.appendChild(topSection);
    
//     const lowerSection = document.createElement("div");
//     lowerSection.className += "querry-lower-section";
//     lowerSection.innerHTML = `<p class="querry-message">${i.message}</p>`;
//     querryContainer.appendChild(lowerSection);
  
//     list.appendChild(querryContainer);
//   }
// }

// displayQuerries(storedQuerries);


// get new article form element
let form3 = document.getElementById("new-article-form");

// add event listener to form
if (form3) {
  form3.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form submission

    // get input elements
    let title = document.getElementById("article-title").value;
    let image = document.getElementById("article-image").value;
    let content = document.getElementById("article-content").value;

    // validation flag
    let isValid = true;

    // title validation
    if (title === "") {
      alert("Title is required.");
      isValid = false;
    }

    // image validation
    // if (image === "") {
    //   alert("Image is required.");
    //   isValid = false;
    // }

    // content validation
    if (content === "") {
      alert("content is required.");
      isValid = false;
    }

    // if validation is successful
    if (isValid) {

      // const stored = JSON.parse(localStorage.getItem("articles"));
      const currentUser = JSON.parse(sessionStorage.getItem("current-user"));

      const article = {
        "title" : title,
        "image" : image,
        "content" : content,
        "user-id" : currentUser["user-id"]
      };

      if (stored === null) {
        const articles = [];
        articles.push(article);
        localStorage.setItem("articles", JSON.stringify(articles));
      } else {
        stored.push(article);
        localStorage.setItem("articles", JSON.stringify(stored));
      }

      alert("Article added successfully!");
    }
  });
}

const storedArticles = JSON.parse(localStorage.getItem("articles"));
const articlesList = document.getElementById("article-cards-container")

if (storedArticles) {
  storedArticles.forEach( article => {
    const articleContainer = document.createElement("li");
    articleContainer.className += "card article-card grid-item";
    articleContainer.setAttribute("onclick", "location.href = 'article1.html'")
  
    const descriptionSection = document.createElement("div");
    descriptionSection.className += "card-details-container";
    descriptionSection.innerHTML = `
      <h3 class="card-title">${article.title}</h3>
      <p class="card-description">${article.content}</p>
    `;
    articleContainer.appendChild(descriptionSection);

    const imageSection = document.createElement("div");
    imageSection.className += "card-image-container";
    imageSection.innerHTML = `
      <img src="${article.image}" alt="" class="card-image article-card-image">
    `;
    articleContainer.appendChild(imageSection)
    
    const lowerSection = document.createElement("a");
    lowerSection.className += "card-link external-link";
    lowerSection.setAttribute("href", "article1.html");
    lowerSection.innerHTML = `
        <p>
          Read more
          <svg id="right">
              <path d="M0.5 9.35772H20.9956L14.2001 2.29941L16.4134 0L27 11L16.4134 22L14.2001 19.7006L20.9956 12.6423H0.5V9.35772Z" ></path>
          </svg>
        </p>
    `;
    articleContainer.appendChild(lowerSection);
  
    if (articlesList) {
      articlesList.appendChild(articleContainer);
    }
  });
}

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
