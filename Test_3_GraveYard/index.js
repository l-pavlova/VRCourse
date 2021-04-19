vaxInitAnaglyph();

scene.background = new THREE.Color(0x333263)
const gui = new dat.GUI();
let CURRENT = 0;
let data = {
    alpha: 0.1,
    beta: 1.2,
    goToChurch: false,
    distance: 150
};


gui.add(data, 'beta', -1.6, 1.6).name('po x');
gui.add(data, 'alpha', -5, 5).name('po y');
gui.add(data, 'goToChurch');


const grTexture = new THREE.TextureLoader().load("textures/ground_texture.jpg");
grTexture.wrapS = THREE.RepeatWrapping;
grTexture.wrapT = THREE.RepeatWrapping;
grTexture.repeat.set(1, 100);


const trTexture = new THREE.TextureLoader().load("textures/grass.jpg");
trTexture.wrapS = THREE.RepeatWrapping;
trTexture.wrapT = THREE.RepeatWrapping;
trTexture.repeat.set(1, 1);

const mTexture = new THREE.TextureLoader().load("textures/moon.jpg");
mTexture.wrapS = THREE.RepeatWrapping;
mTexture.wrapT = THREE.RepeatWrapping;
mTexture.repeat.set(1, 1);


const rTexture = new THREE.TextureLoader().load("textures/roof.png");
rTexture.wrapS = THREE.RepeatWrapping;
rTexture.wrapT = THREE.RepeatWrapping;
rTexture.repeat.set(1, 1);

const crTexture = new THREE.TextureLoader().load("textures/crown_texture.jpg");
crTexture.wrapS = THREE.RepeatWrapping;
crTexture.wrapT = THREE.RepeatWrapping;
crTexture.repeat.set(1, 1);


const SIDE = 180;
const groundGeometry = new THREE.BoxBufferGeometry(300, 2, 30000);
const groundMaterial = new THREE.MeshBasicMaterial({ map: grTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.set(0, -10, 0);
ground.receiveShadow = true;
const groundSideBase = new THREE.BoxBufferGeometry(300000, 2, 30000),
    groundSideMaterial = new THREE.MeshPhongMaterial({ color: "gray" });

const groundElementsGroup = new THREE.Group();
scene.add(groundElementsGroup);
groundElementsGroup.add(ground);

addGroundAndMoon();

const graveStoneGeomLower = new THREE.BoxBufferGeometry(30, 60, 8),
    graveStoneMaterial = new THREE.MeshPhongMaterial({ color: 0xa1a3a6 });//0xa1a3a6

const bushGeom = new THREE.SphereGeometry(30, 30, 30),
    bushMat = new THREE.MeshPhongMaterial({ map: trTexture });;

const graveGeom = new THREE.CylinderGeometry(20, 20, 120);

const churchHouseGeom = new THREE.BoxBufferGeometry(100, 100, 200);
const church = new THREE.Mesh(churchHouseGeom, graveStoneMaterial);
church.rotation.set(0, -Math.PI / 4, 0);
church.position.set(0, 0, -2500);
const churchDoorGeom = new THREE.BoxBufferGeometry(20, 60, 2);
const churchDoor = new THREE.Mesh(churchDoorGeom, new THREE.MeshPhongMaterial({color: 0x5e4f43}));
church.add(churchDoor);
churchDoor.position.z = 100;
const roofShape = new THREE.Shape();
roofShape.moveTo(0, 0);
roofShape.lineTo(60, 40);
roofShape.lineTo(120, 0);
roofShape.lineTo(0, 0);

const extrudeSettings = {
    steps: 2,
    depth: 200,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
};

const rgeometry = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
const roofMaterial = new THREE.MeshPhongMaterial({ map: rTexture });
const roof = new THREE.Mesh(rgeometry, roofMaterial);
scene.add(church);
church.add(roof);
roof.position.set(-60, 50, -100)

const crossVerticalG = new THREE.BoxBufferGeometry(5, 50, 5);
const crossHorizontalG = new THREE.BoxBufferGeometry(5, 30, 5);
const crossV = new THREE.Mesh(crossVerticalG, graveStoneMaterial);
const crossH = new THREE.Mesh(crossHorizontalG, graveStoneMaterial);
crossV.position.set(60, 60, 195);
crossH.position.set(60, 70, 195);
crossH.rotation.z = Math.PI / 2;

roof.add(crossV)
roof.add(crossH)
addAllStones();
const threes = [];
for (let i = 0; i < 50; i++) {
    threes.push(addThree(i, 0));
}
var nextT1 = 1;


camera.position.setFromSphericalCoords(
    data.distance * 2,
    data.beta,
    -data.alpha,
);

function animate() {
    //threes.forEach(tr => tr.setAngularVelocity(tr.getAngularVelocity().multiplyScalar(0.95)));
    const rotationPos = Math.sin(Date.now() * 0.0005) * Math.PI / 4 * 0.5
    
    threes.forEach(tr => {
        tr.rotation.x = rotationPos,
        tr.rotation.z = rotationPos/2})

        if(data.goToChurch){
        if(camera.position.z > church.position.z + 300) {
            camera.position.z -=5;
            if(camera.position.z == -2000){
                const threes = [];
                for (let i = 0; i < 50; i++) {
                    threes.push(addThree(i, 2000));
                }
            }
        }    
    }
    else{
        camera.lookAt(new THREE.Vector3(0, 30 * data.distance / 150, 0));
        camera.position.setFromSphericalCoords(
            data.distance * 2,
            data.beta,
            -data.alpha,
        );
    }
}

function addCross(obj) {
    const crossG = new THREE.PlaneGeometry(2, 30, 20);
    const crossGU = new THREE.PlaneGeometry(2, 15, 32);
    const crossM = new THREE.MeshBasicMaterial({ color: 'gray', side: THREE.DoubleSide });
    const crossO = new THREE.Mesh(crossG, crossM);
    crossO.position.set(0, 10, -5);
    const crossU = new THREE.Mesh(crossGU, crossM);
    crossU.rotation.set(0, 0, Math.PI / 2);
    crossU.position.set(0, 15, -5);
    obj.add(crossO);
    obj.add(crossU);
}

//извинявам се за спагетите 🍝
function addAllStones() {
    for (let i = 0; i <= 20; i++) {
        const graveLower = addStone();

        const bush = new THREE.Mesh(bushGeom, bushMat);
        const grave = new THREE.Mesh(graveGeom, groundMaterial);
        grave.rotation.set(0, 0, Math.PI / 2);

        if (i % 3 == 0) {
            graveLower.position.set(graveLower.position.x + 10 * i, 0, graveLower.position.z - 100 * i)
            graveLower.add(grave)
            grave.position.set(0, -5 * i, 60)
            grave.rotation.set(Math.PI / 2, 0, 0);
            bush.position.set(SIDE + 40 + THREE.Math.randFloat(10, 30) * i, 10, -THREE.Math.randFloat(30, 580) * i);
        }

        else if (i % 4 == 0) {
            graveLower.position.set(graveLower.position.x + 80 + 30 * i, 0, -THREE.Math.randFloat(-10, 2500))
            bush.position.set(SIDE + THREE.Math.randFloat(20, 70) * i, 10, -THREE.Math.randFloat(-10, 100) * i);
            graveLower.add(grave)
            grave.position.set(0, -10, -60)
            grave.rotation.set(Math.PI / 2, 0, 0);
        }
        else if (i % 5 == 0) {
            graveLower.position.set(graveLower.position.x + 160 + 70 * i, 0, -THREE.Math.randFloat(-10, 2500))
            bush.position.set(SIDE + THREE.Math.randFloat(40, 60) * i, 10, -THREE.Math.randFloat(0, 100) * i);
            graveLower.add(grave)
            grave.position.set(0, 0, -60)
            grave.rotation.set(Math.PI / 2, 0, 0);
        }
        else {
            bush.position.set(SIDE + THREE.Math.randFloat(-60, 80) * i, 10, -50 - THREE.Math.randFloat(0, 1000) * i);
            graveLower.add(grave)
            grave.position.set(0, -5 * i, 60)
            grave.rotation.set(Math.PI / 2, 0, 0);
        }

        groundElementsGroup.add(bush);
        addCross(graveLower);
    }

    for (let i = 0; i <= 20; i++) {
        const graveLower = addStoneRight();
        const grave = new THREE.Mesh(graveGeom, groundMaterial);
        grave.rotation.set(0, 0, Math.PI / 2);
        const bush = new THREE.Mesh(bushGeom, bushMat);
        const graveStoneUpperGeom = new THREE.CylinderGeometry(2, 22, 20, 4);
        const graveUpper = new THREE.Mesh(graveStoneUpperGeom, graveStoneMaterial);
        if (i % 3 == 0) {
            graveLower.position.set(graveLower.position.x - 17 * i, 0, -THREE.Math.randFloat(-10, 2500))
            bush.position.set(-SIDE - 50 - THREE.Math.randFloat(60, 80) * i, 10, -THREE.Math.randFloat(30, 190) * i)
            graveLower.add(grave)
            grave.position.set(0, -5 * i, 60)
            grave.rotation.set(Math.PI / 2, 0, 0);
        }
        else if (i % 4 == 0) {
            graveLower.position.set(graveLower.position.x - 80 - 30 * i, 0, graveLower.position.z - 76 * i)
            bush.position.set(-SIDE - 50 - THREE.Math.randFloat(20, 80) * i, 10, -THREE.Math.randFloat(10, 120) * i)
            graveLower.add(grave)
            grave.position.set(0, -5 * i, -60)
            grave.rotation.set(Math.PI / 2, 0, 0);

        }
        else if (i % 5 == 0) {
            graveLower.position.set(graveLower.position.x - 160 - 70 * i, 0, graveLower.position.z - 76 * i)
            bush.position.set(-SIDE - 50 - THREE.Math.randFloat(20, 80) * i, 10, -THREE.Math.randFloat(100, 170) * i)
            graveLower.add(grave)
            grave.position.set(0, -5 * i, -60)
            grave.rotation.set(Math.PI / 2, 0, 0);
        }
        else {
            bush.position.set(-SIDE - 50 - THREE.Math.randFloat(-100, 80) * i, 10, -THREE.Math.randFloat(300, 500) * i)
            graveLower.add(grave)
            grave.position.set(0, -5 * i, 60)
            grave.rotation.set(Math.PI / 2, 0, 0);
        }
        if (i % 3 == 0) {

        }
        groundElementsGroup.add(bush)
        addCross(graveLower);
    }
}


function addStone() {
    const graveLower = new THREE.Mesh(graveStoneGeomLower, graveStoneMaterial);
    graveLower.position.set(180, 0, 0);
    graveLower.rotation.set(0, Math.PI / 2 + Math.PI / 4, 0);
    groundElementsGroup.add(graveLower);
    return graveLower;
}

function addStoneRight() {
    const graveLower = new THREE.Mesh(graveStoneGeomLower, graveStoneMaterial);
    graveLower.position.set(-180, 0, 0);
    graveLower.rotation.set(0, -(Math.PI / 2 + Math.PI / 4), 0);
    groundElementsGroup.add(graveLower);

    return graveLower;
}

function addGroundAndMoon() {
    const groundSide = new THREE.Mesh(groundSideBase, groundSideMaterial);
    groundSide.position.set(0, -11, 0);
    groundSide.receiveShadow = true;
    groundElementsGroup.add(groundSide);

    const moonGeom = new THREE.SphereGeometry(50, 50, 50);
    const moonM = new THREE.MeshPhongMaterial({
        map: mTexture, emissive: new THREE.Color().setHSL(3 * 1 / 16, 1, 0.5),
        emissiveIntensity: 0.7
    });
    const moon = new THREE.Mesh(moonGeom, moonM);
    moon.position.set(-400, 500, -3300)
    scene.add(moon);
}
//тука се сетих да го оправям вече ама рефакторинга за 4тото контролно ще стане 😅
function addThree(i, CURRENT) {
    const trGroup = new THREE.Group();
    scene.add(trGroup);
    const y = THREE.Math.randFloat(50, 70);
    const r = THREE.Math.randFloat(30, 45);
    const threeStemGeom = new THREE.BoxBufferGeometry(5, 5, y);

    const threeStem = new THREE.Mesh(threeStemGeom, new THREE.MeshBasicMaterial({ color: 0x613510 }));

    const threeCrownGeom = new THREE.SphereGeometry(r, 10, THREE.Math.randFloat(3, 40), 50);

    const fmaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({ map: crTexture }), 1, 1);

    const threeCrown = new Physijs.BoxMesh(threeCrownGeom, fmaterial, 10);
    threeCrown.castShadow = true;

    trGroup.add(threeCrown);

   
    threeStem.rotation.x = Math.PI / 2;
    trGroup.add(threeStem);
    threeCrown.position.y = y + r / 8;
    if (i % 2 == 0)
        trGroup.position.set(THREE.Math.randFloat(SIDE, SIDE + 500), 0, -THREE.Math.randFloat(25, 4000))
    else
        trGroup.position.set(THREE.Math.randFloat(-SIDE, -SIDE - 500), 0, -THREE.Math.randFloat(25, 4000))
    return trGroup;
}

 /*var constraint = new Physijs.HingeConstraint(
        threeCrown, // First object to be constrained
        null, // OPTIONAL second object - if omitted then physijs_mesh_1 will be constrained to the scene
        new THREE.Vector3( 0, 70, 0 ), // point in the scene to apply the constraint
        new THREE.Vector3( 1, 0, 0 ) // Axis along which the hinge lies - in this case it is the X axis
    );
    scene.addConstraint( constraint );*/
    
