const apiServer = "https://my-brand-backend-production-72fa.up.railway.app/api/"

let storedArticles

// get new article form element
let form3 = document.getElementById("new-article-form");

// add event listener to form
if (form3) {
  form3.addEventListener("submit", async (event) => {
    event.preventDefault(); // prevent form submission

    // get input elements
    const title = document.getElementById("article-title").value;
    const imageInput = document.querySelector('input[name="image"]');
    const image = imageInput.value
    const content = document.getElementById("article-content").value;

    console.log(image)

    // validation flag
    let isValid = true;

    // title validation
    if (title === "") {
      alert("Title is required.");
      isValid = false;
    }

    // image validation
    if (image === "") {
      alert("Image is required.");
      isValid = false;
    }

    // content validation
    if (content === "") {
      alert("content is required.");
      isValid = false;
    }

    // if validation is successful
    if (isValid) {

      let articleAdded;

      const currentAdminToken = await localStorage.getItem('x-access-token')

      const newArticle = {
          "title" : title,
          "image" : image,
          "content" : content
      };

      await fetch(apiServer + 'articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token' : JSON.parse(currentAdminToken)
          },
          body: JSON.stringify(newArticle)
      })
      .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('message:', data);
        articleAdded = true;
      })
      .catch(error => {
          console.error('Error adding new article:', error);
      });

      if(articleAdded) {
          window.location.href = form3.getAttribute("action");
      }

    }
  });
}


async function getArticles () {
  await fetch(apiServer + 'articles',
  {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
      console.log(data);
      storedArticles = data
  })
  .catch(error => {
      console.error('Error adding new admin:', error);
  });

  console.log(storedArticles)

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
}