vaxInit();

renderer.shadowMap.enabled = true;
light.shadow.mapSize = new THREE.Vector2(1024 * 2, 1024 * 2);
light.position.set(-150, 300, -50);
light.castShadow = true;

camera.position.set(0, 80, 240);
camera.lookAt(new THREE.Vector3(0, 0, 0));


const gui = new dat.GUI();
//gui.domElement.style.marginRight=0;

let data = {
    alpha: 0.1,
    beta: 0.81,
    distance: 150,
    rethrow: false,
    explode:false
};

gui.add(data, 'beta', -1.6, 1.6).name('x coordinate');
gui.add(data, 'alpha', -5, 5).name('y coordinate');
gui.add(data, 'rethrow').name('rethrow');
gui.add(data, 'explode').name('Boom button');//stack overflow button with dice
var geometry = new THREE.BoxBufferGeometry(300, 4, 300),
    material = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 'lightblue' }));
var ground = new Physijs.BoxMesh(geometry, material, 0);
ground.position.set(0, -10, 0);
ground.receiveShadow = true;
scene.add(ground);

const diceGeometry = new THREE.BoxBufferGeometry(20, 20, 20);
const diceMaterial = Physijs.createMaterial(new THREE.MeshNormalMaterial());
const diceMaterialTwo = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: 0xffffff }));
const pointGeom = new THREE.CircleGeometry(2, 32);
const pointMaterial = new THREE.MeshBasicMaterial({ color: 0x091012, side: THREE.DoubleSide });//add all of them for the cube
const dice = new Physijs.BoxMesh(diceGeometry, diceMaterialTwo);
const diceTwo = new Physijs.BoxMesh(diceGeometry, diceMaterial);

rethrow(true);
const boxGeometry = new THREE.BoxBufferGeometry(130, 4, 130);
const boxMaterial = Physijs.createMaterial(new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.4, side: THREE.DoubleSide }));

createBox();

function createSpotHorizontal(x, y, z, dice) {
    const spot = new THREE.Mesh(pointGeom, pointMaterial);
    spot.position.set(x, y, z);
    spot.rotation.x = Math.PI / 2;
    spot.receiveShadow = true;
    dice.add(spot);
}

function createSpotVerticalFront(x, y, z, dice) {
    const spot = new THREE.Mesh(pointGeom, pointMaterial);
    spot.position.set(x, y, z);
    spot.receiveShadow = true;
    dice.add(spot);
}

function createSpotVerticalSide(x, y, z, dice) {
    const spot = new THREE.Mesh(pointGeom, pointMaterial);
    spot.position.set(x, y, z);
    spot.rotation.y = Math.PI / 2;
    spot.receiveShadow = true;
    dice.add(spot);
}

function createDice(dice) {
    //top - one
    createSpotHorizontal(0, 10.1, 0, dice);

    //bottom - six
    createSpotHorizontal(-5, -10.1, 5, dice);
    createSpotHorizontal(5, -10.1, 5, dice);
    createSpotHorizontal(-5, -10.1, -5, dice);
    createSpotHorizontal(5, -10.1, -5, dice);
    createSpotHorizontal(5, -10.1, 0, dice);
    createSpotHorizontal(-5, -10.1, 0, dice);

    //two
    createSpotVerticalFront(-5, 5, 10.1, dice);
    createSpotVerticalFront(5, -5, 10.1, dice);

    //five
    createSpotVerticalFront(-5, 5, -10.1, dice);
    createSpotVerticalFront(5, 5, -10.1, dice);
    createSpotVerticalFront(-5, -5, -10.1, dice);
    createSpotVerticalFront(5, -5, -10.1, dice);
    createSpotVerticalFront(0, 0, -10.1, dice);

    //tree
    createSpotVerticalSide(-10.1, 0, 0, dice);
    createSpotVerticalSide(-10.1, -5, -5, dice);
    createSpotVerticalSide(-10.1, 5, 5, dice);

    //four
    createSpotVerticalSide(10.1, -5, -5, dice);
    createSpotVerticalSide(10.1, 5, 5, dice);
    createSpotVerticalSide(10.1, 5, -5, dice);
    createSpotVerticalSide(10.1, -5, 5, dice);
}

function createBox() {
    const planeBack = new Physijs.BoxMesh(boxGeometry, boxMaterial, 0);
    const planeFront = new Physijs.BoxMesh(boxGeometry, boxMaterial, 0);
    const planeLeft = new Physijs.BoxMesh(boxGeometry, boxMaterial, 0);
    const planeRight = new Physijs.BoxMesh(boxGeometry, boxMaterial, 0);
    planeBack.position.set(0, 40, -64);
    planeBack.rotation.z = Math.PI / 2;
    planeBack.rotation.y = Math.PI / 2;
    planeFront.position.set(0, 40, +64);
    planeFront.rotation.z = Math.PI / 2;
    planeFront.rotation.y = Math.PI / 2;
    planeLeft.rotation.z = Math.PI / 2;
    planeLeft.rotation.z = Math.PI / 2;
    planeLeft.position.set(64, 40, 0);
    planeRight.rotation.z = Math.PI / 2;
    planeRight.position.set(-64, 40, 0);

    scene.add(planeFront)
    scene.add(planeBack)
    scene.add(planeLeft)
    scene.add(planeRight)
}


function animate() {

    scene.simulate(1 / 10);
    camera.position.setFromSphericalCoords(
        data.distance * 2,
        data.beta,
        -data.alpha,
    );
        if(data.rethrow){
            rethrow(false);
            data.rethrow = false;
        }
        if(data.explode){
            explode();
        }
    camera.lookAt(new THREE.Vector3(0, 30 * data.distance / 150, 0));
    scene.rotation.y = t / 10;
}


function rethrow(flag){
    if(!flag){
        scene.remove(dice);    
        scene.remove(diceTwo);    
        data.rethrow = flag;
    }
    dice.position.set(THREE.Math.randFloat(-20, 20), THREE.Math.randFloat(50, 150), THREE.Math.randFloat(-20, 20));
    //dice.rotation.x = THREE.Math.randFloat(-90, 90);
    
    createDice(dice);
    dice.position.set(THREE.Math.randFloat(0, 20), THREE.Math.randFloat(50, 140), THREE.Math.randFloat(-30, 30));
    scene.add(dice);
    dice.setAngularVelocity(new THREE.Vector3(THREE.Math.randFloat(-3, 2), THREE.Math.randFloat(-3, 2), THREE.Math.randFloat(-3, 3)));
    dice.setLinearVelocity(new THREE.Vector3(THREE.Math.randFloat(-50, 0), THREE.Math.randFloat(-30, 10), 0));
    //dice.applyForce( new THREE.Vector3(20000,0,0 ), new THREE.Vector3( 1, -1, 0 ));
    
    diceTwo.position.set(THREE.Math.randFloat(0, 30), THREE.Math.randFloat(50, 140), THREE.Math.randFloat(-30, 30));
    if (diceTwo.position.x >= dice.position.x - 10 && diceTwo.position.x <= dice.position.x + 10) {
        if (diceTwo.position.y >= dice.position.y - 15 && diceTwo.position.y <= dice.position.y + 15) {
    
            console.log('merge conflicts! ');
            diceTwo.position.set(THREE.Math.randFloat(-30, 30), THREE.Math.randFloat(50, 150), THREE.Math.randFloat(-30, 30));
        }
    }
    createDice(diceTwo);
    scene.add(diceTwo);
    diceTwo.setAngularVelocity(new THREE.Vector3(THREE.Math.randFloat(-3, 3), THREE.Math.randFloat(-3, 3), THREE.Math.randFloat(-3, 3)));
    dice.setLinearVelocity(new THREE.Vector3(THREE.Math.randFloat(0, 50), THREE.Math.randFloat(-30, 10), 0));
    diceTwo.applyForce(new THREE.Vector3(2000, 0, 0), new THREE.Vector3(1, -1, 0));
    
}

function explode(){
    const dice = new Physijs.BoxMesh(diceGeometry, diceMaterialTwo);
    const diceTwo = new Physijs.BoxMesh(diceGeometry, diceMaterial);
    dice.position.set(THREE.Math.randFloat(-20, 20), THREE.Math.randFloat(50, 150), THREE.Math.randFloat(-20, 20));
    //dice.rotation.x = THREE.Math.randFloat(-90, 90);
    
    createDice(dice);
    dice.position.set(THREE.Math.randFloat(0, 20), THREE.Math.randFloat(50, 140), THREE.Math.randFloat(-30, 30));
    scene.add(dice);
    dice.setAngularVelocity(new THREE.Vector3(THREE.Math.randFloat(-3, 2), THREE.Math.randFloat(-3, 2), THREE.Math.randFloat(-3, 3)));
    dice.setLinearVelocity(new THREE.Vector3(THREE.Math.randFloat(-50, 0), THREE.Math.randFloat(-30, 10), 0));
    //dice.applyForce( new THREE.Vector3(20000,0,0 ), new THREE.Vector3( 1, -1, 0 ));
    
    
    
    diceTwo.position.set(THREE.Math.randFloat(0, 30), THREE.Math.randFloat(50, 140), THREE.Math.randFloat(-30, 30));
    if (diceTwo.position.x >= dice.position.x - 10 && diceTwo.position.x <= dice.position.x + 10) {
        if (diceTwo.position.y >= dice.position.y - 15 && diceTwo.position.y <= dice.position.y + 15) {
    
            console.log('merge conflicts! ');
            diceTwo.position.set(THREE.Math.randFloat(-30, 30), THREE.Math.randFloat(50, 150), THREE.Math.randFloat(-30, 30));
        }
    }
    createDice(diceTwo);
    scene.add(diceTwo);
    diceTwo.setAngularVelocity(new THREE.Vector3(THREE.Math.randFloat(-3, 3), THREE.Math.randFloat(-3, 3), THREE.Math.randFloat(-3, 3)));
    dice.setLinearVelocity(new THREE.Vector3(THREE.Math.randFloat(0, 50), THREE.Math.randFloat(-30, 10), 0));
    diceTwo.applyForce(new THREE.Vector3(2000, 0, 0), new THREE.Vector3(1, -1, 0));
}

