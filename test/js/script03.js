// Recupera l'ID della destinazione dalla URL o dal localStorage
const urlParams = new URLSearchParams(window.location.search);
const numeroCitta = urlParams.get("id") || localStorage.getItem("numeroCitta");

if (!numeroCitta) {
    console.error("Nessun ID trovato nella URL o nel localStorage.");
    document.querySelector("#body").innerHTML = "<p>Errore: nessuna destinazione selezionata.</p>";
} else {
    console.log(`ID recuperato: ${numeroCitta}`);

    // Costruisci il link API per ottenere i dettagli della destinazione selezionata
    const link = `https://www.freetestapi.com/api/v1/destinations/${numeroCitta}`;

    fetch(link)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Il server non risponde");
            }
        })
        .then(data => {
            if (!data) {
                throw new Error("Dati non trovati per l'ID: " + numeroCitta);
            }

          
            let htmlPage = creaPagina(data);
            document.querySelector("#body").innerHTML = htmlPage;

          
            aggiornaSfondoCitta(data.image);
        })
        .catch(error => {
            console.error("Errore durante il fetch:", error);
            document.querySelector("#body").innerHTML = `<p>Errore durante il caricamento dei dati: ${error.message}</p>`;
        });
}


function creaPagina(citta) {
   
    let attractions = citta.top_attractions
        .map(attraction => `<li>${attraction}</li>`)
        .join("");

    let localDishes = citta.local_dishes
        .map(localDish => `<li>${localDish}</li>`)
        .join("");

    let activities = citta.activities
        .map(activity => `<li>${activity}</li>`)
        .join("");

 
    return `

    <div id="sky">
     <div class="cont py-3 px-3">
         <header class="city-header text-white">

          <div class="container">
          <section class="row">
                <div class="col-lg-6">
                <h2 class="titoloViaggio my-3">${citta.name}, ${citta.country}, ${citta.continent}</h2> 
                </div>
               </div>
                </div>
                
                </div>
                
                <div class="cont2 py-3 px-3 text-white">
                <div class="container">
                <section class="mt-4 row">
                <div class="col-lg-3">
                <h4>Population</h4>
                <p>${citta.population}</p>
                
                </div>
                
                <div class="col-lg-3">
                
                <h4>Currency</h4>
                <p>${citta.currency}</p>
                
                </div>
                
                <div class="col-lg-3">
                
                <h4>Language</h4>
                <p>${citta.language}</p>
                </div>
                
                <div class="col-lg-3">
                <h4>Best Time to Visit</h4>
                <p>${citta.best_time_to_visit}</p>
                </div>
                </div>
                </div>
                </header>
                </section>
                



                <div class="container">
                <h4 class=" mt-5">Description</h4>
            <p class=" pb-5 ">${citta.description}</p>
          
                <section class="mt-4 row my-4">
                <div class="col-lg-6">
                  <h4 class="mb-3">Recommended activities </h4>
              
                    <h5>Top Attractions</h5>
                    <ul>${attractions}</ul>
                    
                    <h5>Local Dishes</h5>
                    <ul>${localDishes}</ul>
                    
                    <h5>Activities</h5>
                    <ul>${activities}</ul>
                    </div>
                    
                    <div class="col-lg-6">
                    <form>
                    <h4 class="mb-3"> Book your dream vacation now!</h4>
                    <div class="mb-3">
                    <label for="nomeCognome" class="form-label">Nome e Cognome</label>
                    <input type="text" class="form-control" id="nomeCognome" required>
                    </div>
                    <div class="mb-3">
                    <label for="inputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" required>
                    </div>

                    <div class="mb-3">
                    <label for="inputCarta" class="form-label">Numero di Carta</label>
                    <input type="carta" class="form-control" id="inputCarta" aria-describedby="cartaHelp" required>
                    </div>

                    <div class="row">
                  <div class="col-lg-6 mb-3">
                  <label for="scadenza" class="form-label">Scadenza</label>
                   
                   <input type="month" class="form-control" id="inputScadenza" aria-describedby="scadenzaHelp" required>
                       </div>

                   <div class="col-lg-6 mb-3">
                    <label for="inputCVV" class="form-label">CVV</label>
                     <!-- Usa 'number' per il CVV (3 o 4 cifre) -->
                     <input type="number" class="form-control" id="inputCvv" aria-describedby="cvvHelp" required min="100" max="9999">
                     </div>
                    </div>
                    
                    
                    <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" required>
                    <label class="form-check-label" for="exampleCheck1">Accetto le condizioni</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Acquista</button>
                    </div>
                    </section>
                    </form>
                    </div>
        </div>
    </div>
      </div>
    </div>
  `;
}

// Funzione per aggiornare lo sfondo dell'elemento #sky con l'immagine della città
function aggiornaSfondoCitta(urlImmagine) {
    const skyElement = document.getElementById('sky');
    
    if (skyElement) {
        // Imposta l'immagine come sfondo
        skyElement.style.backgroundImage = `url(${urlImmagine})`;
        skyElement.style.backgroundRepeat = 'no-repeat';
        skyElement.style.backgroundAttachment = 'fixed';
        skyElement.style.backgroundPosition = 'center';
        skyElement.style.backgroundSize = 'cover';
        skyElement.style.height = '80vh';
        
    } else {
        console.error('Elemento #sky non trovato');
    }
}


