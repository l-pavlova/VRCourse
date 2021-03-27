//task 4: create balls falling and jumping back up with tween.js
vaxInit();
const ballGeom = new THREE.SphereGeometry(5, 15, 15);

const groundGeom = new THREE.BoxGeometry(150, 150, 2);


const ballMaterial = new THREE.MeshLambertMaterial({color: "blue"});

const groundMaterial = new THREE.MeshLambertMaterial({color: "black"});

const ball = new THREE.Mesh(ballGeom, ballMaterial);
ball.position.set(-20, 60, -20);
const ground1 = new THREE.Mesh(groundGeom, groundMaterial);
ground1.rotation.set(0, Math.PI/0, 0);//(60*Math.PI);
ground1.position.set(-20,  0, -20);//(60*Math.PI);

ground1.receiveShadow = true;
scene.add(ball);
scene.add(ground1);

var q = new THREE.Vector3(
    -20,  -30, -20
);

const tween1 = new TWEEN.Tween(ball.position).to(q, 3500).easing(TWEEN.Easing.Bounce.Out);
tween1.start();

function animate() {

   TWEEN.update();
    //ball.position.y -= 1;
}