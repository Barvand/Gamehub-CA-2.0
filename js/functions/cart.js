import { getExistingGames } from "./utils.js";

const games = getExistingGames();
const url = "https://api.noroff.dev/api/v1/gamehub/";

export const cartContainer = document.querySelector(".container-item-price");

// Render function.
export async function renderHtmlCart() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    cartContainer.innerHTML = "";
    const totalContainer = document.querySelector(".total-container");

    if (games.length === 0) {
      totalContainer.innerHTML = "";
      cartContainer.innerHTML =
        "<p class=empty-cart> Cart is empty, get back to shopping!</p>";
    } else {
      games.forEach((game) => {
        rendercartItem(game);
      });
    }

    function rendercartItem(game) {
      // the creation of several HTML elements.
      const cartItem = document.createElement("div");
      cartItem.classList.add("Cart-item");

      const cartImage = document.createElement("img");
      cartImage.classList.add("cart-image");
      cartImage.src = game.image;
      cartImage.alt = game.title;
      cartItem.appendChild(cartImage);

      const titleElement = document.createElement("h2");
      titleElement.classList.add("cart-title");
      titleElement.innerText = game.title;
      cartItem.appendChild(titleElement);

      const priceElement = document.createElement("p");
      priceElement.classList.add("price-cart");
      priceElement.innerText = "$" + game.price;
      cartItem.appendChild(priceElement);

      const iconDiv = document.createElement("div");
      iconDiv.classList.add("quantity");
      cartItem.appendChild(iconDiv);

      // icons
      const iconElementMinus = document.createElement("i");
      iconElementMinus.classList.add("fa-solid", "fa-minus");
      iconDiv.appendChild(iconElementMinus);

      // input
      const inputElement = document.createElement("input");
      inputElement.id = "product-quantity";
      inputElement.type = "tel";
      inputElement.value = "1";
      inputElement.readOnly = true;
      iconDiv.appendChild(inputElement);

      // icons, I wanted to add interactivity to this, but didnt manage to.
      const iconElementPlus = document.createElement("i");
      iconElementPlus.classList.add("fa-solid", "fa-plus");
      iconDiv.appendChild(iconElementPlus);

      const removeIcon = document.createElement("i");
      removeIcon.classList.add("fa-solid", "fa-xl", "fa-x");
      iconDiv.appendChild(removeIcon);

      cartContainer.appendChild(cartItem);

      // If clicked, it removes the item from the array and local storage.
      removeIcon.addEventListener("click", () => {
        const clickedItem = event.target.closest(".Cart-item");

        if (clickedItem) {
          const itemId = game.id;
          clickedItem.remove(); // Remove the div element from the DOM

          // Remove the item from localStorage
          const cartItems = JSON.parse(localStorage.getItem("games")) || [];
          const updatedCart = cartItems.filter((item) => item.id !== itemId);
          localStorage.setItem("games", JSON.stringify(updatedCart));

          // Cart is empty message
          if (updatedCart.length === 0) {
            totalContainer.innerHTML = "";
            cartContainer.innerHTML =
              "<p class=empty-cart> Cart is empty, get back to shopping!</p>";
          }
        }
      });
    }
  } catch (error) {
    console.error("Error in displayContent:", error);
    cartContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
  }
}

// displays the prices of the products in the cart adds shipping costs if order is <50$.
export function updatePrice() {
  const shippingPrice = document.querySelector(".shipping-price");
  const totalPriceContainer = document.querySelector(".update-total-price");
  const games = JSON.parse(localStorage.getItem("games"));

  // Initialize total price
  let totalCartPrice = 0;

  for (let i = 0; i < games.length; i++) {
    const price = parseFloat(games[i].price);
    totalCartPrice += price;
  }

  // Display subtotal in the totalPriceContainer
  totalPriceContainer.innerHTML = `$${totalCartPrice.toFixed(2)}`; // Display subtotal with 2 decimal places


  // Calculate the shipping price
  if (totalCartPrice > 50) {
    shippingPrice.innerHTML = "Free";
  } else {
    shippingPrice.innerHTML = "$5";
  }

  const totalPrice =
    totalCartPrice + (shippingPrice.innerHTML === "Free" ? 0 : 5);

  totalPriceContainer.innerHTML = `$${totalPrice.toFixed(2)}`; // Display the total price with 2 decimal places
}
