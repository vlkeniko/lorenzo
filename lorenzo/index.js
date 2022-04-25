//const { createImmediatelyInvokedArrowFunction } = require("typescript");

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
    });

    directionsRenderer.setMap(map);
    document.getElementById("runCalc").addEventListener("click", function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
    document.getElementById('tomeg').addEventListener('keyup', calcPrice);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    function getAddress(prefix) {
        var result = [];
        const fields = ['Orszag', 'Ir', 'Megye', 'Varos', 'Utca'];
        fields.forEach((field => result.push(document.getElementById(prefix+field).value)))
        return result.join(' ');
    }

    const fromAddress = getAddress('feladas');
    const toAddrress = getAddress('atvetel');
    if(!fromAddress || !toAddrress) {
        alert('Hiányzó cím!');
        return;
    }

    directionsService
        .route({
            origin: {
                query: fromAddress,
            },
            destination: {
                query: toAddrress,
            },
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
            const distanceObj = response.routes[0].legs[0].distance;
            document.getElementById('outputTav').innerText = distanceObj.text;
            distance = distanceObj.value;
            calcPrice();
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}

var distance = 0;
function calcPrice() {
    const tomeg = document.getElementById('tomeg').value;
    document.getElementById('outputAr').innerText = Math.ceil(tomeg * (distance / 1000) * 0.01 + 10) + ' Euro';
}

window.initMap = initMap;
