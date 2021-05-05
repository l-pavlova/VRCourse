(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }
    else {
        result.innerHTML = "Браузърът не поддържа геолокация.";
    }
})();


function geoSuccess(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(`ширина: ${lat} дължина: ${long}`);
    window.open('https://www.openstreetmap.org/#map=12/' + lat + '/' + long);
}
