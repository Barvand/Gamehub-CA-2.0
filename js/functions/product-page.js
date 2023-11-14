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
    createDescription(details);
    createPrice(details);

    function createImage(details) {
      const imageElement = document.createElement("img");
      imageElement.classList.add("product-image");
      imageElement.src = details.image;
      imageElement.alt = details.title;
      productContainer.appendChild(imageElement);
      return imageElement;
    }

    function createTitle(details) {
      const element = document.createElement("h1");
      element.classList.add("product-title");
      element.innerText = details.title;
      productContainer.appendChild(element);
      return element;
    }

    function createDescription(details) {
      const element = document.createElement("p");
      element.classList.add("product-description");
      element.innerText = details.description;
      productContainer.appendChild(element);
      return element;
    }

    function createPrice(details) {
      const elementPrice = document.createElement("p");
      elementPrice.classList.add("product-price");
      elementPrice.innerText = `$${details.price}`;
      productContainer.appendChild(elementPrice);
      return elementPrice;
    }

    // I addedd all the dataset to the anchorElement, to be able to retrieve the data out of Local storage array onto the cart page as the QueryString was causing problems on the actual cart page.
    const anchorBtn = document.createElement("a");
    anchorBtn.classList.add("addtocart-btn");
    anchorBtn.href = "cart.html";
    anchorBtn.innerText = `add to cart`;
    anchorBtn.setAttribute("data-id", details.id);
    anchorBtn.setAttribute("data-title", details.title);
    anchorBtn.setAttribute("data-image", details.image);
    anchorBtn.setAttribute("data-price", details.price);
    productContainer.appendChild(anchorBtn);

    function cartBtn() {
      anchorBtn.addEventListener("click", handleClick);
    }

    const cartButton = document.createElement("a");
    cartButton.classList.add("checkout-btn");
    cartButton.href = "cart.html";
    cartButton.innerText = `TO CHECKOUT`;
    productContainer.appendChild(cartButton);

    cartBtn();
  } catch (error) {
    console.error("Error in displayContent:", error);
    productContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
    const vanishBackBtn = document.querySelector(".container-back");
    vanishBackBtn.innerHTML = "";
  }
}
