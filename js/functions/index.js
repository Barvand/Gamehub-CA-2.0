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
      gridContainer.innerHTML += `<div class="grid-item item-8">
                                 <a href="product-page.html?id=${results[i].id}">
                                   <div class="price-grid-item8">
                                     <h4>${results[i].title}</h4>
                                     <p class="game-price">$${results[i].price}</p>
                                   </div>
                                   <img src="${results[i].image}" alt="${results[i].title}" class="item8-image">
                                 </a>
                               </div>`;
    }
  } catch (error) {
    console.error("Error in displayContent:", error);
    errorContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
  }
}

export function racingImage(results) { 
  const racingDiv = document.querySelector(".item-5"); 
  racingDiv.style.backgroundImage = `url(${results[6].image})`;
}



const buttons = document.querySelectorAll("[data-carousel-button]");
let intervalId;

buttons.forEach(button => { 
  button.addEventListener("click", () => {
    clearInterval(intervalId); // Clear any existing interval on button click
    
    const offset = button.dataset.carouselButton === "next" ? 1 : -1; 
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
    
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0; 
    
    slides.children[newIndex].dataset.active = true; 
    delete activeSlide.dataset.active;
    
    // Start the automatic slide change after a button click
    // startAutoSlide(slides);
  });
});

// Function to start automatic slide change
// function startAutoSlide(slides) {
//   intervalId = setInterval(() => {
//     const activeSlide = slides.querySelector("[data-active]");
//     let newIndex = [...slides.children].indexOf(activeSlide) + 1;

//     if (newIndex >= slides.children.length) newIndex = 0;

//     slides.children[newIndex].dataset.active = true; 
//     delete activeSlide.dataset.active;
//   }, 5000); // Change slide every 5 seconds (adjust the interval as needed)
// }

// // Start automatic slide change initially
// const carousel = document.querySelector("[data-carousel]");
// const slides = carousel.querySelector("[data-slides]");
// startAutoSlide(slides);