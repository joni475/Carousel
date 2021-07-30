const carousel = document.querySelector(".carousel")
const previousButton = carousel.querySelector(".previous-button")
const nextButton = carousel.querySelector(".next-button")
const contents = carousel.querySelector(".carousel__contents")
const dots = Array.from(carousel.querySelectorAll(".carousel__dot"))
const slides = Array.from(carousel.querySelectorAll(".carousel__slide"))
const dotsContainer = carousel.querySelector(".carousel__dots")

//Auto width indicator
const slideWidth = slides[0].getBoundingClientRect().width
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index +"px"
})


nextButton.addEventListener("click", event => {
    const currentSlide = contents.querySelector(".is-selected")
    const nextSlide = currentSlide.nextElementSibling
    const destination = getComputedStyle(nextSlide).left
    
    contents.style.left = "-" + destination
    currentSlide.classList.remove("is-selected")
    nextSlide.classList.add("is-selected")

    previousButton.removeAttribute("hidden")
    if(nextSlide.nextElementSibling === null) {
        nextButton.setAttribute("hidden", true)
    }

    //updating dot states when clicking buttons
    const currentDot = dotsContainer.querySelector(".is-selected")
    const nextDot = currentDot.nextElementSibling
    currentDot.classList.remove("is-selected")
    nextDot.classList.add("is-selected")


})

previousButton.addEventListener("click", event => {
    const currentSlide = contents.querySelector(".is-selected")
    const previousSlide = currentSlide.previousElementSibling
    const destination = getComputedStyle(previousSlide).left
    
    contents.style.left = "-" + destination
    currentSlide.classList.remove("is-selected")
    previousSlide.classList.add("is-selected")

    nextButton.removeAttribute("hidden")
    if(!previousSlide.previousElementSibling) {
        previousButton.setAttribute("hidden", true)
    }

    //updating dot states when clicking buttons
   const currentDot = dotsContainer.querySelector(".is-selected")
   const previousDot = currentDot.previousElementSibling
   currentDot.classList.remove("is-selected")
   previousDot.classList.add("is-selected")
  
   //showing/hiding previous button

})


dots.forEach(dot => {
    dot.addEventListener("click", event => {
        let clickedDotIndex

        for(let index = 0; index < dots.length; index++) {
            if(dots[index] === dot) {
                clickedDotIndex = index
            }
        }
        const slideToShow = slides[clickedDotIndex]
        const destination = getComputedStyle(slideToShow).left
        
        contents.style.left = "-" + destination

         // with out the two state - the prev and next button will not work
        slides.forEach(slide => {slide.classList.remove("is-selected")})
        slideToShow.classList.add("is-selected")

        //updating dot state
        dots.forEach(d => {d.classList.remove("is-selected")})
        dot.classList.add("is-selected")

     //showing/hiding next/previous button
    if(clickedDotIndex === 0) {
        previousButton.setAttribute("hidden", true)
        nextButton.removeAttribute("hidden")
    } else if(clickedDotIndex === dots.length -1) {
        previousButton.removeAttribute("hidden")     
        nextButton.setAttribute("hidden", true)
    } else {
        nextButton.removeAttribute("hidden")
        previousButton.removeAttribute("hidden")
    }
    })
})