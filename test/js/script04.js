 //set view: latitudine, longitudine, zoom 
 var map = L.map('map-osm').setView([45.04333224299406, 7.67690082560358], 16);

 //qui vado a pescare dai server di openstreetmap i mattoncini della cartina
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
 maxZoom: 19,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
 }).addTo(map);

 //aggiungo un marker sulle stesse coordinate
 var marker = L.marker([45.04333224299406, 7.67690082560358]).addTo(map);

 //posso aggiungere un popup al marker appena creato
 marker.bindPopup("<b>Via Massimio d'Azelio 19</b>").openPopup();

 //per approfondire: https://leafletjs.com/examples.html