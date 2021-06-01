
vaxInit();

onWindowResize();
const gui = new dat.GUI();
gui.domElement.style.marginRight = 0;
let data = {
    speed: 1,
    morphLevel: 0,
    showBody: true
}
gui.add(data, 'speed', 1, 3).name('Speed').step(1);
gui.add(data, 'morphLevel', 0, 1).name('Morph:').step(0.01);
gui.add(data, 'showBody').name('Show/hide body');
gui.open();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.minPolarAngle = 0.1;
controls.maxPolarAngle = Math.PI - 0.1;
controls.dampingFactor = 0.1;
//#region bones
const pelvis = new THREE.Bone();

const legA1 = new THREE.Bone(),
    legB1 = new THREE.Bone(),
    legC1 = new THREE.Bone(),
    legD1 = new THREE.Bone(); 

    const legA2 = new THREE.Bone(),
    legB2 = new THREE.Bone(),
    legC2 = new THREE.Bone(),
    legD2 = new THREE.Bone(); 

pelvis.position.y = 20;

legA1.position.z = 5; 
legB1.position.y = 20;
legC1.position.y = 15;
legD1.position.y = 5;

legA2.position.z = -5; 
legB2.position.y = 20;
legC2.position.y = 15;
legD2.position.y = 5;

const backA = new THREE.Bone(),
    backB = new THREE.Bone(),
    backC = new THREE.Bone(),
    backD = new THREE.Bone(); 

const neck = new THREE.Bone(),
    head = new THREE.Bone();

const armA1 = new THREE.Bone(),
    armB1 = new THREE.Bone(),
    armC1 = new THREE.Bone(),
    armD1 = new THREE.Bone();
const armA2 = new THREE.Bone(),
    armB2 = new THREE.Bone(),
    armC2 = new THREE.Bone(),
    armD2 = new THREE.Bone();

const bones = [pelvis, legA1, legB1, legC1, legD1, legA2, legB2, legC2, legD2, backA, backB, backC, backD, neck, head, armA1, armB1, armC1, armD1, armA2, armB2, armC2, armD2];
const skeleton = new THREE.Skeleton(bones);
const sphereGeometry = new THREE.SphereGeometry(9, 20, 20);
const smallerSphereGeometry = new THREE.SphereGeometry(6, 20, 20);
const biggerSphereGeometry = new THREE.SphereGeometry(11, 20, 20);
const geometry = new THREE.BoxBufferGeometry(6, 40, 6, 1, 15, 1).translate(0, -2, 4);

pelvis.add(legA1, legA2);

legA1.add(legB1);
legB1.add(legC1);
legC1.add(legD1);

legA2.add(legB2);
legB2.add(legC2);
legC2.add(legD2);

pelvis.add(backA);
backA.add(backB);
backB.add(backC);
backC.add(backD);

backD.add(neck);
neck.add(head);

backD.add(armA1, armA2);
armA1.add(armB1);
armB1.add(armC1);
armC1.add(armD1);
armA2.add(armB2);
armB2.add(armC2);
armC2.add(armD2);

pelvis.position.y = 20;

legA1.position.y = -2;
legA1.position.z = 5;
legB1.position.y = 20;
legC1.position.y = 15;
legD1.position.y = 5;

legA2.position.y = -2;
legA2.position.z = -5;
legB2.position.y = 20;
legC2.position.y = 15;
legD2.position.y = 5;


legA1.rotation.z = THREE.Math.degToRad(180);
legA2.rotation.z = THREE.Math.degToRad(180);


backA.position.y = 5;
backB.position.y = 7;
backC.position.y = 7;
backD.position.y = 5;

backA.rotation.z = THREE.Math.degToRad(10);
backB.rotation.z = THREE.Math.degToRad(-10);
backC.rotation.z = THREE.Math.degToRad(-10);
backD.rotation.z = THREE.Math.degToRad(10);

neck.position.y = 2;
head.position.y = 5;

neck.rotation.z = THREE.Math.degToRad(0);

armA1.position.y = -1;
armA1.position.z = 5;
armB1.position.y = 13;
armC1.position.y = 13;
armD1.position.y = 5;

armA1.rotation.z = THREE.Math.degToRad(180);

armA2.position.y = -1;
armA2.position.z = -5;
armB2.position.y = 13;
armC2.position.y = 13;
armD2.position.y = 5;

armA2.rotation.z = THREE.Math.degToRad(180);

var helper = new THREE.SkeletonHelper(pelvis);
scene.add(helper, pelvis);
//#endregion
var skinIndices = [],
    skinWeights = [];

const bodySkinParts = [];

const upperRightArmSetup = (skinIndices, skinWeights, index, pos) => {
    var y = pos.getY(index);
    if (y >= 27) {
        let k = THREE.Math.mapLinear(y, 27, 43, 0, 1);
        skinIndices.push(13, 15, 16, 1);
        skinWeights.push(k, 1, 1 - k, 0 * k);
    }
    else
        if (y >= 20) {
            var k = THREE.Math.mapLinear(y, 20, 27, 0, 1);
            skinIndices.push(15, 16, 17, 0);
            skinWeights.push(k, 1, 1 - k, 0);
        }
        else {
            var k = THREE.Math.mapLinear(y, 0, 20, 0, 1);
            skinIndices.push(16, 18, 0, 0);
            skinWeights.push(k, 1, 0, 0);
        }
}
const upperLeftArmSetup = (skinIndices, skinWeights, index, pos) => {
    var y = pos.getY(index);
    if (y >= 27) {
        let k = THREE.Math.mapLinear(y, 27, 43, 0, 1);
        skinIndices.push(13, 19, 20, 1);
        skinWeights.push(k, 1, 1 - k, 0 * k);
    }
    else
        if (y >= 20) {
            var k = THREE.Math.mapLinear(y, 20, 27, 0, 1);
            skinIndices.push(19, 20, 21, 0);
            skinWeights.push(k, 1, 1 - k, 0);
        }
        else {
            var k = THREE.Math.mapLinear(y, 0, 20, 0, 1);
            skinIndices.push(20, 21, 0, 0);
            skinWeights.push(k, 1, 0, 0);
        }
}
//body
const bodySetup = (skinIndices, skinWeights, index, pos) => {
    let y = pos.getY(index);
    let x = pos.getZ(index);

    if (y >= 28) {
        skinIndices.push(0, 0, 0, 0);
        skinWeights.push(1, 0, 0, 0);
    } else {
        var k = THREE.Math.mapLinear(y, 18, 28, 1, 0);
        skinIndices.push(0, 1, 5, 0);
        skinWeights.push(1, x < 0 ? 0 : k, x < 0 ? k : 0, 0);
    }
}
const leftLowerLegSetup = (skinIndices, skinWeights, index, pos) => {
    var y = pos.getY(index);
    if (y >= -2) {
        var k = THREE.Math.mapLinear(y, -2, 18, 0, 1);
        skinIndices.push(0, 5, 6, 1);
        skinWeights.push(k, 1, 1 - k, 0 * k);
    }
    else
        if (y >= -18) {
            var k = THREE.Math.mapLinear(y, -18, -2, 0, 1);
            skinIndices.push(5, 6, 7, 0);
            skinWeights.push(k, 1, 1 - k, 0);
        }
        else {
            var k = THREE.Math.mapLinear(y, -22, -18, 0, 1);
            skinIndices.push(6, 7, 0, 0);
            skinWeights.push(k, 1, 0, 0);
        }
}

const leftLowerFootSetup = (skinIndices, skinWeights, index, pos) => {
    var y = pos.getY(index);
    if (y >= -13) {
        var k = THREE.Math.mapLinear(y, -13, -2, 0, 1);
        skinIndices.push(5, 6, 7, 1);
        skinWeights.push(k, 1, 1 - k, 0 * k);
    }
    else
        if (y >= -18) {
            var k = THREE.Math.mapLinear(y, -18, -13, 0, 1);
            skinIndices.push(6, 7, 8, 0);
            skinWeights.push(k, 1, 1 - k, 0);
        }
        else {
            var k = THREE.Math.mapLinear(y, -22, -18, 0, 1);
            skinIndices.push(7, 8, 0, 0);
            skinWeights.push(k, 1, 0, 0);
        }
}

const rightLowerLegSetup = (skinIndices, skinWeights, index, pos) => {
    var y = pos.getY(index);
    if (y >= -2) {
        var k = THREE.Math.mapLinear(y, -2, 18, 0, 1);
        skinIndices.push(0, 1, 2, 1);
        skinWeights.push(k, 1, 1 - k, 0 * k);
    }
    else
        if (y >= -18) {
            var k = THREE.Math.mapLinear(y, -18, -2, 0, 1);
            skinIndices.push(1, 2, 3, 0);
            skinWeights.push(k, 1, 1 - k, 0);
        }
        else {
            var k = THREE.Math.mapLinear(y, -22, -18, 0, 1);
            skinIndices.push(2, 3, 0, 0);
            skinWeights.push(k, 1, 0, 0);
        }
}

const rightLowerFootSetup = (skinIndices, skinWeights, index, pos) => {
    var y = pos.getY(index);
    if (y >= -13) {
        var k = THREE.Math.mapLinear(y, -13, -2, 0, 1);
        skinIndices.push(1, 2, 3, 1);
        skinWeights.push(k, 1, 1 - k, 0 * k);
    }
    else
        if (y >= -18) {
            var k = THREE.Math.mapLinear(y, -18, -13, 0, 1);
            skinIndices.push(2, 3, 4, 0);
            skinWeights.push(k, 1, 1 - k, 0);
        }
        else {
            var k = THREE.Math.mapLinear(y, -22, -18, 0, 1);
            skinIndices.push(3, 4, 0, 0);
            skinWeights.push(k, 1, 0, 0);
        }
}
showBody();
let removed = false;
function animate() {

    s = Math.sin(4 * t * data.speed);
    legA1.rotation.z = THREE.Math.degToRad(210 + (50 + (10 * data.speed)) * s);
    legB1.rotation.z = THREE.Math.degToRad(-60 - 60 * s);
    legC1.rotation.z = THREE.Math.degToRad(90);

    legA2.rotation.z = THREE.Math.degToRad(210 - (50 + (10 * data.speed)) * s);
    legB2.rotation.z = THREE.Math.degToRad(-60 + 60 * s);
    legC2.rotation.z = THREE.Math.degToRad(90);

    armA1.rotation.z = THREE.Math.degToRad(180 + (30 + (5 * data.speed)) * s);
    armB1.rotation.z = THREE.Math.degToRad(60 + 10 * data.speed + 10 * s);
    armC1.rotation.z = THREE.Math.degToRad(20);

    armA2.rotation.z = THREE.Math.degToRad(180 - (30 + (5 * data.speed)) * s);
    armB2.rotation.z = THREE.Math.degToRad(60 + 10 * data.speed + 10 * s);
    armC2.rotation.z = THREE.Math.degToRad(20);

    backD.rotation.z = THREE.Math.degToRad(-4);
    pelvis.rotation.z = THREE.Math.degToRad(-10);
    pelvis.position.y = -20;
    pelvis.position.y += 7 * Math.sin(t * 8 * data.speed);

    if(data.showBody == false) {
        removeSkin(bodySkinParts);
        removed = true;
    } else if(data.showBody == true && removed) {
        location.reload();
    }
    bodySkinParts.forEach(part => part.morphTargetInfluences[0] = data.morphLevel / 5)
    controls.update();
}

function createRegionSkin(posX = 0, posY = 0, posZ, bone1, bone2, bone3, bone4, bw1, bw2, bw3, bw4, specialSetup = false, baseGeometry = sphereGeometry) {

    const geometry = new THREE.BufferGeometry().fromGeometry(baseGeometry).translate(posX, posY, posZ),
        skinIndices = [],
        skinWeights = [];

    const pos = geometry.getAttribute('position');
    for (let i = 0; i < pos.count; i++) {
        if (!specialSetup) {
            skinIndices.push(bone1, bone2, bone3, bone4);
            skinWeights.push(bw1, bw2, bw3, bw4);
        } else {
            specialSetup(skinIndices, skinWeights, i, pos);
        }
    }

    geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
    geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

    setMorphing(geometry);
    const mesh = new THREE.SkinnedMesh(
        geometry,
        new THREE.MeshPhongMaterial({
            color: '#4287f5', skinning: true, morphTargets: true,
            morphNormals: true
        }),
    );
    mesh.name = "bodey";
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    mesh.normalizeSkinWeights();
    scene.add(mesh);
    bodySkinParts.push(mesh);

}

function showBody() {
    //legs
    createRegionSkin(0, -2, -6, 0, 0, 0, 0, 0, 0, 0, 0, leftLowerLegSetup);
    createRegionSkin(0, 10, -6, 0, 5, 6, 10, 0.5, 0.5, 0.5, 0);//upper leg
    createRegionSkin(0, -13, -6, 0, 0, 0, 0, 0, 0, 0, 0, leftLowerFootSetup, smallerSphereGeometry);//foot

    createRegionSkin(0, -2, 6, 0, 0, 0, 0, 0, 0, 0, 0, rightLowerLegSetup);
    createRegionSkin(0, 10, 6, 0, 1, 2, 10, 0.5, 0.5, 0.5, 0);//upper leg
    createRegionSkin(0, -13, 6, 0, 0, 0, 0, 0, 0, 0, 0, rightLowerFootSetup, smallerSphereGeometry);//foot

    createRegionSkin(0, 47, 0, 13, 0, 0, 0, 1, 0, 0, 0, 0);//head
    createRegionSkin(0, 20, 6, 0, 0, 0, 0, 1, 0, 0, 0, 0);//right glutex
    createRegionSkin(0, 20, -6, 0, 0, 0, 0, 1, 0, 0, 0, 0);//left glutex

    //body
    createRegionSkin(0, 28, 0, 0, 1, 5, 0, 0.5, 0.25, 0.25, 0, bodySetup, biggerSphereGeometry);
    //arms
    createRegionSkin(0, 27, -14, 0, 0, 0, 0, 0, 0, 0, 0, upperLeftArmSetup);//brachioradialis
    createRegionSkin(0, 34, 12, 15, 0, 0, 0, 1, 0, 0, 0, 0);//right biceps
    createRegionSkin(0, 34, -12, 19, 0, 0, 0, 1, 0, 0, 0, 0);//left biceps

    createRegionSkin(0, 27, 14, 0, 0, 0, 0, 0, 0, 0, 0, upperRightArmSetup);//brachioradialis
    createRegionSkin(0, 20, 15, 16, 0, 0, 0, 1, 0, 0, 0, false, smallerSphereGeometry);//right lower arm flexor
    createRegionSkin(0, 20, -15, 20, 0, 0, 0, 1, 0, 0, 0, false, smallerSphereGeometry);//left lower arm flexor
}

function setMorphing(geometry) {
    const ballPositions = [],
        ballNormals = [],
        pos = geometry.getAttribute('position'),
        nor = geometry.getAttribute('normal'),
        vec = new THREE.Vector3(); 

    for (var i = 0; i < pos.count; i++) {

        vec.set(pos.getX(i), pos.getY(i), pos.getZ(i));
        vec.setLength(50 * Math.pow(3 / 4 / Math.PI, 1 / 3));
        ballPositions.push(2*vec.x,0.3*vec.y, 0.3*vec.z);
        vec.setLength(1);
        ballNormals.push(vec.x, 0.8*vec.y, vec.z);
    }

    geometry.morphAttributes.position = [
        new THREE.Float32BufferAttribute(ballPositions, 3)
    ]
    geometry.morphAttributes.normal = [
        new THREE.Float32BufferAttribute(ballNormals, 3)
    ]
}

function removeSkin(skinParts) {
    skinParts.forEach(part => {
        scene.remove(part);
        part.geometry.dispose();
        part = undefined;
    });
}