const url = window.location.href;

// button on the cart page that makes you return to the previous page.
export function CartReturnButton() {
  if (url.includes("cart")) {
    const returnBtnCart = document.querySelector(".back-paragraph");
    returnBtnCart.addEventListener("click", function () {
      window.history.back();
    });
  }
}

// button on the Product page that makes you return to the previous page.

export function ProductPageReturnButton() {
  if (url.includes("product-page")) {
    const returnBtn = document.querySelector(".back-paragraph");
    returnBtn.addEventListener("click", function () {
      window.history.back();
    });
  }
}
