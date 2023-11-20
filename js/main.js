import { fetchApi } from "/js/fetch.js";
import { renderProductPage } from "./functions/games.js";
import { renderHTML } from "/js/functions/index.js";
import { displayContent } from "./functions/product-page.js";
import { randomImage } from "./functions/index.js";
import { updatePrice } from "./functions/cart.js";
import { renderHtmlCart } from "./functions/cart.js";
import {
  CartReturnButton,
  ProductPageReturnButton,
} from "./functions/eventListeners.js";
import { racingImage } from "./functions/index.js";
import { carouselImage } from "./functions/index.js";



// this connects all functions to the API and renders the correct HTML.
async function displayCorrectFunction() {
  try {
    const data = await fetchApi();
    const url = window.location.href;

    // I organized the index page like this, as before I initialized it as if url includes INDEX and this caused some bugs and some functions not to display correctly.
    if (
      !url.includes("games-page") &&
      !url.includes("product-page") &&
      !url.includes("cart")
    ) {
      renderHTML(data);
      racingImage(data);
      randomImage(data);
      carouselImage(data)
      setInterval(() => randomImage(data), 2000);
    } else if (url.includes("games-page")) {
      renderProductPage(data);
    } else if (url.includes("product-page")) {
      displayContent();
    } else if (url.includes("cart")) {
      renderHtmlCart(data);
      updatePrice();
    }
  } catch (error) {
    console.error("Error in displayCorrectFunction:", error);
  }
}

displayCorrectFunction();

// addEventListeners for a return to previous page button, product-page and Cart
CartReturnButton();
ProductPageReturnButton();
