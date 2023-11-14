import { getExistingGames } from "./utils.js";

const resultsContainer = document.querySelector(".container-productpage");
const errorContainer = document.querySelector(".container-wrapper");

const url = "https://api.noroff.dev/api/v1/gamehub";

// Renders HTML on the product page
export async function renderProductPage(data) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    resultsContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const product = data[i];

      const elementDiv = document.createElement("div");
      elementDiv.classList.add("item-product-page");
      resultsContainer.appendChild(elementDiv);

      const imageElement = document.createElement("img");
      imageElement.classList.add("Game-cover-image");
      imageElement.src = product.image;
      imageElement.alt = product.title;
      elementDiv.appendChild(imageElement);

      const element = document.createElement("h3");
      element.classList.add("game-title");
      element.innerText = product.title;
      elementDiv.appendChild(element);

      const elementP = document.createElement("p");
      elementP.classList.add("game-price");
      elementP.innerText = product.price;
      elementDiv.appendChild(elementP);

      function productOnSale(data) {
        const oldPrice = Math.round(data[i].discountedPrice + data[i].price);
        const oldPriceSpan = document.createElement("span");
        oldPriceSpan.classList.add("game-old-price");
        oldPriceSpan.innerText = "before $" + oldPrice;

        if (data[i].onSale === true) {
          elementP.innerText = "On Sale: $" + product.price + " ";
          elementP.appendChild(oldPriceSpan);
        } else {
          elementP.innerText = "Price: $" + product.price;
        }
        elementDiv.appendChild(elementP);
      }

      productOnSale(data);

      // I addedd all the dataset to the anchorElement, to be able to retrieve the data out of Local storage array onto the cart page as the QueryString was causing problems on the actual carts page.
      const anchorBtn = document.createElement("a");
      anchorBtn.classList.add("add-to-cart-btn");
      anchorBtn.innerText = `add to cart`;
      anchorBtn.setAttribute("data-id", product.id);
      anchorBtn.setAttribute("data-title", product.title);
      anchorBtn.setAttribute("data-image", product.image);
      anchorBtn.setAttribute("data-price", product.price);
      elementDiv.appendChild(anchorBtn);

      const anchorBtnCart = document.createElement("a");
      anchorBtnCart.classList.add("add-to-cart-btn");
      anchorBtnCart.href = "product-page.html?id=" + product.id;
      anchorBtnCart.innerText = `Product page`;
      elementDiv.appendChild(anchorBtnCart);

      function cartBtn() {
        anchorBtn.addEventListener("click", handleClick);
      }
      cartBtn();
    }
  } catch (error) {
    console.error("Error in displayContent:", error);
    errorContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
  }
}

// function that creates array for products with dataset defined and saves them in local storage.
export function handleClick() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const image = this.dataset.image;
  const price = this.dataset.price;

  const currentGames = getExistingGames();

  const gameExists = currentGames.find(function (game) {
    return game.id === id;
  });

  if (!gameExists) {
    const game = { id: id, title: title, image: image, price: price };
    currentGames.push(game);
    saveGames(currentGames);
    confirm(`${game.title} added to cart`);
  } else {
    alert(`Item already added to the cart`);
  }
}

function saveGames(games) {
  localStorage.setItem("games", JSON.stringify(games));
}
