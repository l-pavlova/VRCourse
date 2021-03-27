//task 1: create balls falling and jumping back up with tween.js
vaxInit();


const ballGeom = new THREE.SphereGeometry(5, 15, 15);

const cubeGr = new THREE.Group();
scene.add(cubeGr);

const cubeGeom = new THREE.BoxGeometry(20, 20, 20);
const edges = new THREE.EdgesGeometry(cubeGeom);

const ballMaterial = new THREE.MeshLambertMaterial({ color: "blue" });

const cubeMaterial = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.3, });

const ball = new THREE.Mesh(ballGeom, ballMaterial);

const cube = new THREE.Mesh(cubeGeom, cubeMaterial);
ball.position.set(cube.position.x - 10, cube.position.y + 10, cube.position.z + 10);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
cubeGr.add(line);
cubeGr.add(cube);
cubeGr.add(ball);
scene.add(ball);
let curr;
const currNum = Math.floor(Math.random() * 3);
switch (currNum) {
    case 0: curr = 'x'; break;
    case 1: curr = 'y'; break;
    case 2: curr = 'z'; break;
};
let count = 0;
function move() {
    if (count == 0) console.log(curr);
    if (curr == 'x') {
        if (ball.position[curr] <= cube.position[curr] + 10) {
            ball.position[curr] += 0.1;
            count++;
            if (count === 200) {
                console.log('opa')
                count = 0;
                curr = 'y';
                console.log(curr);
            }
        }
        else if (ball.position[curr] < cube.position[curr]) {
            ball.position[curr] -= 0.1;
            count++;
            if (count === 200) {
                console.log('opa')
                count = 0;
                curr = 'z';
                console.log(curr);
            }
        }
    } else if (curr == 'y') {
        if (ball.position[curr] >= cube.position[curr] - 10) {
            ball.position[curr] -= 0.1;
            count++;
            if (count === 200) {
                console.log('opa')
                count = 0;
                console.log(curr);
                curr = 'z';
                console.log(curr);
            }
        }
        else if(ball.position[curr] <= cube.position[curr] + 10){
            ball.position[curr] += 0.1;
            count++;
            if (count === 200) {
                console.log('opa')
                count = 0;
                curr = 'z';
                console.log(curr);
            }
        }
    }
    else if (curr == 'z') {
        if (ball.position[curr] >= cube.position[curr] - 10) {
            ball.position[curr] -= 0.1;
            if (count === 200) {
                console.log('opa')
                count = 0;
                curr = 'x';
                console.log(curr);
            }
        }
        else if(ball.position[curr] < cube.position[curr] + 10){
            ball.position[curr] += 0.1;
            count++;
            if (count === 200) {
                console.log('opa')
                count = 0;
                curr = 'y';
                console.log(curr);
            }
        }
        count++;
    }
}
function animate() {
    
    move(); 
    //ball.rotation.y +=0.01;
    //ball.rotation.x +=0.01;
    cubeGr.rotation.y += 0.01;
    cubeGr.rotation.x += 0.01;
};