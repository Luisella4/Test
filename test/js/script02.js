let destinazioni = [];
const URLEndpoint = "https://www.freetestapi.com/api/v1/destinations";


function caricaDati() {
  
    const datiMemorizzati = localStorage.getItem('destinazioni');
    
    if (datiMemorizzati) {
      
        destinazioni = JSON.parse(datiMemorizzati);
        console.log("Dati recuperati dal localStorage");
        mostraDestinazioni(); 
    } else {
     
        fetch(URLEndpoint)
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                } else {
                    throw new Error("Il server non risponde");
                }
            })
            .then(data => {
                destinazioni = data; 
                localStorage.setItem('destinazioni', JSON.stringify(data)); 
                console.log("Dati salvati nel localStorage");
                mostraDestinazioni(); 
            })
            .catch(error => {
                console.error(error);
                alert(error.message); 
            });
    }
}


function mostraDestinazioni() {
    const carteContainer = document.querySelector("#carte"); 

   
    carteContainer.innerHTML = '';

   
    destinazioni.forEach((destinazione, index) => {

        let card = document.createElement("div");
        card.classList.add("col-md-6", "col-xl-3", "pt-4");

  
        card.innerHTML = `
            <div class="card" id="card${index}">
                <img src="${destinazione.image}" class="card-img-top" alt="${destinazione.name}">
                <div class="card-body">
                    <h5 class="card-title">${destinazione.name}</h5>
                    <p class="card-text">${destinazione.description}</p>
                    <a href="destinazione.html" class="btn btn-primary" data-id="${destinazione.id}">
                        Scopri l'offerta!
                    </a>
                </div>
            </div>
        `;
        
 
        carteContainer.appendChild(card);

        const prenotaButton = card.querySelector("a");
        prenotaButton.addEventListener("click", (event) => {
            event.preventDefault(); 
            let id = event.target.getAttribute("data-id"); 
            if (id) {
                localStorage.setItem("numeroCitta", id); 
                console.log(`ID della destinazione salvato nel localStorage: ${id}`);
                window.location.href = "destinazione.html?id=" + id; 
            }
        });
    });
}

// Esegui il caricamento dei dati quando la pagina è pronta
document.addEventListener("DOMContentLoaded", caricaDati);
