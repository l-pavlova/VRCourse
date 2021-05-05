window.addEventListener("devicemotion", handleMotion, true);//need only x n y
let seconds = 0;
let steps = 0;

function handleMotion(deviceMotionEvent) {

    const acceleration = deviceMotionEvent.acceleration;
    console.log(`x acceleration only: ${acceleration.x}`);
    console.log(`y acceleration only: ${acceleration.y}`);
    console.log(`z acceleration only: ${acceleration.z}`);

    document.getElementById('check').innerHTML = `x acceleration only: ${acceleration.x}` + '<br/>' +
        `y acceleration only: ${acceleration.y}` + '<br/>' +
        `z acceleration only: ${acceleration.z}` + '<br/>';
    //+
    //`interval: ${deviceMotionEvent.interval} miliseconds`+'<br/>';
    const accelerationG = deviceMotionEvent.accelerationIncludingGravity;
    console.log(`x acceleration with G: ${accelerationG.x}`);
    console.log(`y acceleration with G: ${accelerationG.y}`);
    console.log(`z acceleration with G: ${accelerationG.z}`);

    document.getElementById('check2').innerHTML = `x acceleration with G: ${accelerationG.x}` + '<br/>' +
        `y acceleration with G: ${accelerationG.y}` + '<br/>' +
        `z acceleration with G: ${accelerationG.z}`;

    const speedu = Math.sqrt(Math.pow(acceleration.x * deviceMotionEvent.interval, 2) + Math.pow(acceleration.y * deviceMotionEvent.interval, 2));//v
    const step = 0.33;
    const timeTrack = speedu/step;
    console.log(timeTrack);

    var el = document.getElementById('seconds-counter');

    function incrementSeconds() {
        seconds += 1;
        el.innerText = "You have been here for " + seconds + " seconds.";
        if(seconds% timeTrack === 0){
            console.log('step!');
            steps++;
            document.getElementById('steps').innerHTML =steps;
        }
    }
    
    setInterval(incrementSeconds, 1000);
    //s
    //s = v*t
    //t = s/v
    //t = step/speedu -> edna krachka
}

/*(function cntr() {
    var el = document.getElementById('seconds-counter');

    function incrementSeconds() {
        seconds += 1;
        el.innerText = "You have been here for " + seconds + " seconds.";
    }
    
    setInterval(incrementSeconds, 1000);
})();*/