const prevBtns = document.querySelectorAll(".arrow-left")
const nextBtns = document.querySelectorAll(".arrow-right")

//-------------------------------------------------------------------- on click next btn carousel scroll to right 

  for (var i = 0 ; i < nextBtns.length; i++) {
    nextBtns[i].addEventListener('click', event => { 
      carousel = event.target.parentElement.previousElementSibling // get ol html
      genre = carousel.dataset.set
      const carouselIndex = parseInt(getComputedStyle(carousel).getPropertyValue("--carousel-index"))//get ol css property
      carousel.style.setProperty("--carousel-index", carouselIndex + 1 )// change ol index 

      const  nextMovies = JSON.parse(localStorage.getItem(genre))
      displayMovie(carousel, nextMovies, genre)
      showPrevBtn(Element, event)
    });
  }

//------------------------------------------------------------------- on click previous btn carousel scroll to left
for (var i = 0 ; i < prevBtns.length; i++) {
prevBtns[i].addEventListener('click', event => { 
  carousel = event.target.parentElement.nextElementSibling
  carousel.style.setProperty("--carousel-index", 0 )
  hidePrevBtn(Element, event)
})
}

//-------------------------------------------------------------------- function who shows previous btn  
function showPrevBtn(Element, event) {
  Element = event.target.parentElement.parentElement.children[0].classList.add("active")
}

//-------------------------------------------------------------------- function who hides previous btn
function hidePrevBtn(Element, event) {
  Element = event.target.parentElement.parentElement.children[0].classList.remove("active")
}
