console.log("hello")


const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
    const arrow = accordion.querySelector(".fa-arrow-down");

    accordion.addEventListener('click', () => {
        if (accordion.classList.contains("active")) {
            accordion.classList.remove("active");
            arrow.classList.remove("fa-arrow-up");
            arrow.classList.add("fa-arrow-down");
        } else {
            accordion.classList.add("active");
            arrow.classList.remove("fa-arrow-down");
            arrow.classList.add("fa-arrow-up");
        }
    });
});


console.log(answers)