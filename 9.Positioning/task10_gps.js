let seconds = 0;

(function () {

    var el = document.getElementById('seconds-counter');

    function incrementSeconds() {
        seconds += 1;
        getLocation();
        el.innerText = "You have been here for " + seconds + " seconds.";
    }
    setInterval(incrementSeconds, 1000);
})();

function getLocation() {
    var result = document.getElementById('check');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setInitial);
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }
    else {
        result.innerHTML = "Браузърът не поддържа геолокация.";
    }
}
let prevLat, prevLong;
function setInitial() {
    prevLat = position.coords.latitude;
    prevLong = position.coords.longitude;
}
function geoSuccess(position) {
    var result = document.getElementById('check');
  
    result.innerHTML += '<br>Географска ширина: ' + position.coords.latitude;
    result.innerHTML += '<br>Географска дължина: ' + position.coords.longitude;
    result.innerHTML += '<br>Вероятност: 95%';
    result.innerHTML += '<br>Точност: ' + position.coords.accuracy + ' метра';
}

