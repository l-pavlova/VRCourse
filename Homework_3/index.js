vaxInit({ antialias: true, alpha: true });
//vaxInitParallax();
camera.position.set(0, 0, 0);
let data = {
    alpha: 50,
    beta: 25,
    gamma: 90,
};
const radius = 100;

const boxGeom = new THREE.BoxBufferGeometry(400, 400, 400);
const planeG = new THREE.BoxBufferGeometry(1000, 1000, 1);
const coneG = new THREE.CylinderGeometry(1, 10, 10, 32);
const material = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.3,
    shininess: 200,
    side: THREE.DoubleSide
});

const coneMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const box = new THREE.Mesh(boxGeom, material);
const plane = new THREE.Mesh(planeG, material);
plane.rotation.x = Math.PI / 2;
for (let i = 0; i < 100; i++) {
    let cone = new THREE.Mesh(coneG, coneMaterial);
    cone.position.x += i * 100;
    scene.add(cone);
}
//scene.add(plane);
scene.add(box);
const dragFactor = 0.2;
let time = 0,
    oldTime = 0;

window.addEventListener("deviceorientation", deviceOrientation, true);
function deviceOrientation(event) {

    /* data.alpha = event.alpha;//THREE.Math.degToRad( event.alpha ),
     data.beta = event.beta;//THREE.Math.degToRad( event.beta ),
     data.gamma = event.gamma;//THREE.Math.degToRad( event.gamma );
     time = Date.now();
     const phi = THREE.Math.degToRad(data.alpha);
     const theta = THREE.Math.degToRad(data.beta);
 
     let x = radius * Math.sin(phi) * Math.cos(theta);
     let y = radius * Math.cos(phi);
     let z = radius * Math.sin(phi) * Math.sin(theta);
     if(time > oldTime+50) {
         camera.lookAt(new THREE.Vector3(phi, theta + Math.PI/2,THREE.Math.degToRad(data.gamma)))//todo: figure out how to make them normalized
         oldTime = time;
     }*/

    var alpha = event.alpha,
        gamma = event.gamma;

    if (alpha === null) return;

    // поправяме ги, за да ни е удобно
    if (gamma >= 0)
        gamma = 90 - gamma;
    else {
        alpha = alpha + 180;
        gamma = -90 - gamma;
    }

    // правим ги на радиани
    alpha = THREE.Math.degToRad(alpha);
    gamma = THREE.Math.degToRad(gamma);

    // въртим камерата
    camera.rotation.set(gamma, alpha, 0, 'YZX');
}
//camera.position.set(0, 0, 0);

//todo: add cones
