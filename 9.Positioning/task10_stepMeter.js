window.addEventListener("devicemotion", handleMotion, true);//need only x n y

function handleMotion(deviceMotionEvent) {
    const acceleration = deviceMotionEvent.acceleration;
    console.log(`x acceleration only: ${acceleration.x}`);
    console.log(`y acceleration only: ${acceleration.y}`);
    console.log(`z acceleration only: ${acceleration.z}`);

    document.getElementById('check').innerHTML = `x acceleration only: ${acceleration.x}`+'<br/>'+
    `y acceleration only: ${acceleration.y}`+'<br/>'+
    `z acceleration only: ${acceleration.z}`+'<br/>';
    const accelerationG = deviceMotionEvent.accelerationIncludingGravity;
    console.log(`x acceleration with G: ${accelerationG.x}`);
    console.log(`y acceleration with G: ${accelerationG.y}`);
    console.log(`z acceleration with G: ${accelerationG.z}`);

    document.getElementById('check2').innerHTML = `x acceleration with G: ${accelerationG.x}`+'<br/>'+
    `y acceleration with G: ${accelerationG.y}`+'<br/>'+
    `z acceleration with G: ${accelerationG.z}`;
}