const gridContainer = document.querySelector(".grid-item8-container");
const errorContainer = document.querySelector(".flex-wrapper-deluxe");

const url = "https://api.noroff.dev/api/v1/gamehub";
/// functions index page

export async function renderHTML(results) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    gridContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
      gridContainer.innerHTML += `<div class="grid-item item-8" a href="product-page.html?id=${results[i].id}"> 
                                           <a href="product-page.html?id=${results[i].id}">
                                           <div class="price-grid-item8">
                                           <h4> ${results[i].title} </h4>
                                            <p class="game-price"> $${results[i].price} </p>
                                            <img src="${results[i].image}" alt="${results[i].title}" class="item8-image"> </a></div> </div>`;
    }
  } catch (error) {
    console.error("Error in displayContent:", error);
    errorContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
  }
}

export function randomImage(results) {
  const imageContainer = document.querySelector(".randomImage");
  const randomIndex = Math.floor(Math.random() * results.length);
  imageContainer.style.backgroundImage = `url(${results[randomIndex].image})`;
}

export function racingImage(results) { 
  const racingDiv = document.querySelector(".item-5"); 
  racingDiv.style.backgroundImage = `url(${results[6].image})`;
}

export function carouselImage(results) { 
  const carouselImage = document.querySelector(".carousel-item"); 
  carouselImage.style.backgroundImage = `url(${results[i].image})`
}


const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => { 
  button.addEventListener("click", () => {
  const offset = button.dataset.carouselButton === "next" ? 1 : -1; 
  const slides = button.closest("[data-carousel]").querySelector("[data-slides]")

  const activeSlide = slides.querySelector("[data-active]")
  let newIndex = [...slides.children].indexOf(activeSlide) + offset

  if (newIndex <0) newIndex = slides.children.length -1
  if (newIndex >= slides.children.length) newIndex = 0; 

  slides.children[newIndex].dataset.active = true; 
  delete activeSlide.dataset.active
  })
}) 