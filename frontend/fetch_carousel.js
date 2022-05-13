//------------------------------------------------------------------------ fetch info movies from API 
const baseUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`
let imdb_score_min = 8

async function fetchRequest(url, genre, page = 1, movies = []) {
  try {
    const response = await fetch(`${url}&page=${page}&genre=${genre}&imdb_score_min=${imdb_score_min}`);
    let data = await response.json();

    if (page < 3) {
      movies = movies.concat(data.results)
      page++
      return fetchRequest(url, genre, page, movies)

    } else {
      return movies
    }   
  }  catch (err) {
      return console.error(err);
    }
}

//---------------------------------------------------------- function set info to local storage 

function manageLocalStorage(data, genre, Element) {
  const infoMovies = {
      id: [],
      image_url: []
  }
  for (const value of data.values()) {
    infoMovies.id.push(value.id)
    infoMovies.image_url.push(value.image_url)
  }
  localStorage.setItem(genre, JSON.stringify(infoMovies))
  if(genre) {
      const  nextMovies = JSON.parse(localStorage.getItem(genre))
      displayMovie(Element, nextMovies, genre)
  } else {
      console.log(`Key: ${genre} not found in localStorage`);
      return manageLocalStorage(data, genre, Element)
  }
  return infoMovies
}

//------------------------------------------------------------- function who displays info movies in carousel 

function displayMovie(Element, data) {
  for(i=0; i< 7 ; i++) { //replace "7" by movies.length for all movies
    
    Element.innerHTML += `
      <li  class="open">
        <a href=#${data.id[i]}>
          <img src=${data.image_url[i]}
            alt="affiche de film"
            aria-hidden="true"
            height="" width=""/>
        </a>
      </li>`
  } 
}

//------------------------------------------------------------------------ get the 7 best Movies 
let genre1 = "%20"
const container1 = document.querySelector("#carousel__ol-1")
container1.setAttribute("data-set", genre1)

fetchRequest(baseUrl,genre1).then((movies) => {
  movies.shift();
  manageLocalStorage(movies, genre1, container1)
})
//-------------------------------------------------------------------- get the 7 best animation Movies 

let genre2 = "Animation"
const container2 = document.querySelector("#carousel__ol-2")
container2.setAttribute("data-set", genre2)

fetchRequest(baseUrl, genre2).then((movies) => {
  manageLocalStorage(movies, genre2, container2)
})
//-------------------------------------------------------------------- get the 7 best action Movies 

let genre3 = "Sci-Fi"
const container3 = document.querySelector("#carousel__ol-3")
container3.setAttribute("data-set", genre3)

fetchRequest(baseUrl, genre3).then((movies) => {
  manageLocalStorage(movies, genre3, container3)
})
//-------------------------------------------------------------------- get the 7 best Sport Movies 

let genre4 = "Sport"
const container4 = document.querySelector("#carousel__ol-4")
container4.setAttribute("data-set", genre4)

fetchRequest(baseUrl, genre4).then((movies) => {
  manageLocalStorage(movies, genre4, container4)
})