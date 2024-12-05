let destinazioni = [];
const URLEndpoint = "https://www.freetestapi.com/api/v1/destinations";

// Funzione per caricare i dati
function caricaDati() {
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
            mostraDestinazioni(); 
        })
        .catch(error => {
            console.error(error); 
            alert(error.message); 
        });
}


function mostraDestinazioni() {
    const swiperWrapper = document.querySelector("#swiper-wrapper"); 

 
    swiperWrapper.innerHTML = '';


    const destinazioniVisibili = destinazioni.slice(0, 8);


    destinazioniVisibili.forEach((destinazione) => {
        let slide = document.createElement("div");
        slide.classList.add("swiper-slide"); 

     
        slide.innerHTML = `
            <div class="card">
                <img src="${destinazione.image}" class="card-img-top" alt="${destinazione.name}">
                <div class="card-body">
                    <h5 class="card-title">${destinazione.name}</h5>
                    <p class="card-text">${destinazione.description}</p>
                    <a href="destinazione.html?id=${destinazione.id}" class="btn btn-primary">
                        Scopri l'offerta!
                    </a>
                </div>
            </div>
        `;

       
        swiperWrapper.appendChild(slide);
    });

    // Inizializza Swiper
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1, // Numero di card visibili per slide
        spaceBetween: 0, // Distanza tra le card
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // Modifica il numero di card per slide in base alla larghezza della finestra
            992: {
                slidesPerView: 2, // 2 card per slide per schermi più piccoli
            },
            1020: {
                slidesPerView: 3, // 3 card per slide per schermi medi
            },
            1400: {
                slidesPerView: 4, 
            },
        },
    });
}

// Esegui il caricamento dei dati quando la pagina è pronta
document.addEventListener("DOMContentLoaded", caricaDati);