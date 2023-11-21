import { handleClick } from "./games.js";

const productContainer = document.querySelector(".gaming-container");
const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/gamehub/" + id;

// function that displays HTML on the product page.
export async function displayContent() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const details = await response.json();

    productContainer.innerHTML = "";

    createImage(details);
    createTitle(details);

    function createImage(details) {

      const divElement = document.createElement("div")
      divElement.classList.add("image-container"); 
      productContainer.appendChild(divElement); 

      const imageElement = document.createElement("img");
      imageElement.classList.add("product-image");
      imageElement.src = details.image;
      imageElement.alt = details.title;
      divElement.appendChild(imageElement);
      return imageElement;
    }

    function createTitle(details) {
      const divElementText = document.createElement("div")
      divElementText.classList.add("text-container"); 
      productContainer.appendChild(divElementText); 

      const elementH1 = document.createElement("h1");
      elementH1.classList.add("product-title");
      elementH1.innerText = details.title;
      divElementText.appendChild(elementH1);
      
      const elementP = document.createElement("p");
      elementP.classList.add("product-description");
      elementP.innerText = details.description;
      divElementText.appendChild(elementP);

      const elementGenre = document.createElement("p");
      elementGenre.classList.add("product-genre");
      elementGenre.innerText = `Genre: ${details.genre}`;
      divElementText.appendChild(elementGenre);

      const elementRelease = document.createElement("p");
      elementRelease.classList.add("product-genre");
      elementRelease.innerText = `Released: ${details.released}`;
      divElementText.appendChild(elementRelease);
  

      const elementPrice = document.createElement("p");
      elementPrice.classList.add("product-price");
      elementPrice.innerText = `$${details.price}`;
      divElementText.appendChild(elementPrice);


    // I addedd all the dataset to the anchorElement, to be able to retrieve the data out of Local storage array onto the cart page as the QueryString was causing problems on the actual cart page.
    const anchorBtn = document.createElement("a");
    anchorBtn.classList.add("addtocart-btn");
    anchorBtn.href = "cart.html";
    anchorBtn.innerText = `add to cart`;
    anchorBtn.setAttribute("data-id", details.id);
    anchorBtn.setAttribute("data-title", details.title);
    anchorBtn.setAttribute("data-image", details.image);
    anchorBtn.setAttribute("data-price", details.price);
    divElementText.appendChild(anchorBtn);
    
    

    function cartBtn() {
      anchorBtn.addEventListener("click", handleClick);
    }
  

    const cartButton = document.createElement("a");
    cartButton.classList.add("checkout-btn");
    cartButton.href = "cart.html";
    cartButton.innerText = `TO CHECKOUT`;
    divElementText.appendChild(cartButton);
  
    cartBtn();
  }
  } catch (error) {
    console.error("Error in displayContent:", error);
    productContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
    const vanishBackBtn = document.querySelector(".container-back");
    vanishBackBtn.innerHTML = "";
  }
}
