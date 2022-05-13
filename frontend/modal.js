const overlay = document.querySelector('.overlay')
const modal_container = document.querySelector('.modal')
const modalHeader = document.querySelector('.modal_header')
const modalDetail = document.querySelector('.modal_details')
const modalFooter = document.querySelector('.modal_footer > ul')
const closeBtn = document.querySelector('#close_modal')

//----------------------------------------------------------------- functions & click event for closing modal 

function closeModal() {
    modal_container.classList.remove('active')
    overlay.classList.remove('active')
    }

function removeHash () { 
    history.pushState("", document.title, window.location.pathname + window.location.search);
}

closeBtn.addEventListener('click',(e) => { 
    removeHash ()
    e.preventDefault()
    closeModal();
})

//--------------------------------------------------------------------function who opens modal 
function openModal() {
    modal_container.classList.add('active')
    overlay.classList.add('active')
}

//------------------------------------------------------------- function wo gets position off clicked image
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
    };
}

//------------------------------ function who imitates jQuery's event delegation ($(document).on)

const dispatchEvent = (Element, type, selector, handler) => {
    Element.addEventListener(type, (event) => {
        let el = event.target.closest(selector);
        if (el) handler.call(el, event); //The element is bind to this
    });
};

//------------------------------------------------------------- on Click images: open modal near it

dispatchEvent (document, 'click', '.open', function(event) {
    imgPosition = getOffset(event.target).top + 100
    modal_container.style.top = imgPosition + "px"
    openModal()
});

//------------------------------------------------------------------- function who displays info on modal
function addInfo (movie) {
    let date = movie.date_published.split('-') // gives ['2019', '11', '28']
    let newFormatedDate = date.reverse().join('-');// gives 16-05-2015

    modalHeader.innerHTML = 
    `<img alt='affiche de film' src="${movie.image_url}"/>
    <h1>${movie.title}</h1>
    <p>${movie.directors},${movie.countries}</p>
    <time class='movie_date'>${newFormatedDate}</time>
    <span>${movie.genres}</span>
    <span>${movie.duration}min</span>`

    modalDetail.innerHTML = 
    `<h2>Distribution :</h2>
    <p>${movie.actors}</p>
    <h2>Resume :</h2>
    <p>${movie.description}</p>`

    modalFooter.innerHTML = 
    `<li><span>Box office : ${movie.avg_vote}</span></li>
    <li><span class='star'>&#9733;</span></li>
    <li><span>Rated : ${movie.rated}</span></li>
    <li ><span>IMDb score : ${movie.imdb_score}</span></li>`
}

//-------------------------------------------------------------------- get movie info from Api
window.addEventListener('hashchange', async () => { 
    id = window.location.hash.slice(1)

    if (id !== "")
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/" + id)
        const movie = await response.json()
        addInfo(movie)
        return movie
    } catch (error) {
        console.log('Fetch error: ', error);
    }
})