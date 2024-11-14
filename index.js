// CHIAVE API PEXELS: dHxDEQJjdfxdfZh2T1xNTUFolH7UPtAyXE4HBCfRFb9xYeLskQPr2Bwt
// {
//   Authorization: '[dHxDEQJjdfxdfZh2T1xNTUFolH7UPtAyXE4HBCfRFb9xYeLskQPr2Bwt]'
// }

const apiKey = 'dHxDEQJjdfxdfZh2T1xNTUFolH7UPtAyXE4HBCfRFb9xYeLskQPr2Bwt'
const imgLoadButton = document.getElementById('imgLoad')
const imgLoadSecondButton = document.getElementById('imgLoadSecond')
const searchImgInput = document.getElementById('searchImg')
const albumContainer = document.querySelector('.album .container')

fetch('https://api.pexels.com/v1/search?query=cars&per_page=10', {
  headers: {
    Authorization: apiKey,
  },
})
  .then((response) => {
    if (response.ok) {
      // qui finiamo se la chiamata è 100% corretta e possiamo recuperare il JSON
      // dei risultati
      console.log('Ho preso i dati')
      return response.json()
    } else {
      // qui finiamo ad esempio se l'endpoint non esiste, e in generale se la
      // Response è arrivata ma non contiene i dati per proseguire
      throw new Error('Errore nel recupero della risposta dal server')
    }
  })
  .then((data) => {
    albumContainer.innerHTML = '' // Svuota la sezione album prima di inserire nuove immagini
    data.photos.forEach((photo) => {
      const card = document.createElement('div')
      card.classList.add('col', 'col-12', 'col-md-4')
      card.innerHTML = `
        <div class="card mb-4 shadow-sm">
          <img src="${photo.src.medium}" class=" card-img-top" alt="${photo.alt}" />
          <div class="card-body">
            <h5 class="card-title">
              <a href="detail.html?id=${photo.id}" target="_blank">${photo.alt}</a>
            </h5>
            <p class="card-text">This content is a little bit longer.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
              </div>
              <small class="text-muted">${photo.id}</small>
            </div>
          </div>
        </div>
      `
      // Aggiungi event listener per pulsante "Hide"
      card
        .querySelector('.hide-btn')
        .addEventListener('click', () => card.remove())
      albumContainer.appendChild(card)
    })
  })
  .catch((error) => console.error('Errore:', error))
