
vaxInit();
camera.position.set(50, 10, 60, 100);
camera.lookAt(new THREE.Vector3(0, 0, Math.PI / 2));
scene.background = new THREE.Color(0x485083)

const bodyXPos = 0;
const bodyYPos = 0;
const bodyZPos = 0;

const bodyGeom = new THREE.BoxGeometry(10, 10, 15);
const headGeom = new THREE.BoxGeometry(5, 5, 5);
const maneGeom = new THREE.SphereGeometry(6, 32, 32);
const tailGeom = new THREE.CylinderGeometry(0.25, 0.5, 15, 32, true, 0, 270);
const tailTopGeom = new THREE.SphereGeometry(1, 32, 32);
const eyeGeom = new THREE.SphereGeometry(0.5, 20, 20);
const outerEyeGeom = new THREE.SphereGeometry(0.6, 20, 20);
const mouthGeom = new THREE.SphereGeometry(1.2, 20, 20);
const legGeom = new THREE.CylinderGeometry(0.75, 1.5, 5, 32);
const grassGeom = new THREE.BoxGeometry(150, 150, 1);
const moustacheGeom = new THREE.CylinderGeometry(0.05, 0.05, 2, 10);

const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x48a605 });
const material = new THREE.MeshLambertMaterial({ color: 0xf9d71c });
const maneMaterial = new THREE.MeshLambertMaterial({ color: 0x875223 });
const blackMaterial = new THREE.MeshLambertMaterial({ color: 0x0f0f0f });
const whiteMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const mouthMaterial = new THREE.MeshLambertMaterial({ color: 0xe0c322 });

const grass = new THREE.Mesh(grassGeom, grassMaterial);
grass.rotation.set(Math.PI / 2, 0, 0);//(60*Math.PI);
grass.position.set(bodyXPos - 20, bodyYPos - 30, bodyZPos - 20);//(60*Math.PI);
scene.add(grass);
const bodyObj = new THREE.Group();
scene.add(bodyObj);

const body = new THREE.Mesh(bodyGeom, material);
body.position.set(bodyXPos, bodyYPos, bodyZPos);
bodyObj.add(body);

const lLeg = new THREE.Mesh(legGeom, mouthMaterial);
const rLeg = new THREE.Mesh(legGeom, mouthMaterial);
lLeg.position.set(bodyXPos - 4, bodyYPos - 3, bodyZPos + 8);
rLeg.position.set(bodyXPos + 4, bodyYPos - 3, bodyZPos + 8);
bodyObj.add(lLeg)
bodyObj.add(rLeg)

const lLegTop = new THREE.Mesh(tailTopGeom, mouthMaterial);
lLegTop.position.set(bodyXPos - 4, bodyYPos - 1.20, bodyZPos + 8);
bodyObj.add(lLegTop);

const rLegTop = new THREE.Mesh(tailTopGeom, mouthMaterial);
rLegTop.position.set(bodyXPos + 4, bodyYPos - 1.20, bodyZPos + 8);
bodyObj.add(rLegTop);

const lLegBack = new THREE.Mesh(legGeom, mouthMaterial);
const rLegBack = new THREE.Mesh(legGeom, mouthMaterial);
lLegBack.position.set(bodyXPos - 4, bodyYPos - 4, bodyZPos - 8);
lLegBack.rotation.set(Math.PI / 2, 0, 0);

rLegBack.position.set(bodyXPos + 4, bodyYPos - 4, bodyZPos - 8);
rLegBack.rotation.set(Math.PI / 2, 0, 0);

bodyObj.add(lLegBack)
bodyObj.add(rLegBack)

const headObj = new THREE.Group();
bodyObj.add(headObj);
const head = new THREE.Mesh(headGeom, material);
head.position.set(bodyXPos, bodyYPos + 6, bodyZPos + 10);
headObj.add(head);

const leftEye = new THREE.Mesh(eyeGeom, blackMaterial);
leftEye.position.set(bodyXPos - 1.5, bodyYPos + 7, bodyZPos + 12.75);
headObj.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeom, blackMaterial);
rightEye.position.set(bodyXPos + 1.5, bodyYPos + 7, bodyZPos + 12.75);
headObj.add(rightEye);

const leftOuterEye = new THREE.Mesh(outerEyeGeom, whiteMaterial);
leftOuterEye.position.set(bodyXPos - 1.5, bodyYPos + 7, bodyZPos + 12.5);
headObj.add(leftOuterEye);

const rightOuterEye = new THREE.Mesh(outerEyeGeom, whiteMaterial);
rightOuterEye.position.set(bodyXPos + 1.5, bodyYPos + 7, bodyZPos + 12.5);
headObj.add(rightOuterEye);

const mouth = new THREE.Mesh(mouthGeom, mouthMaterial);
mouth.position.set(bodyXPos, bodyYPos + 5, bodyZPos + 12.5);
headObj.add(mouth);

for (let i = 1; i < 10; i++) {
  const moust = new THREE.Mesh(moustacheGeom, blackMaterial);

  if (i % 2 == 0) {
    moust.position.set(bodyXPos - 1.5, bodyYPos + 5 + i / 10, bodyZPos + 13);
    moust.rotation.set(0, 0, Math.cos(i / 10) * Math.PI / 1.5);//-(Math.PI / 2 + i * 5)
  } else {
    moust.position.set(bodyXPos + 1.5, bodyYPos + 5 + (i - 1) / 10, bodyZPos + 13);
    moust.rotation.set(0, 0, - Math.cos((i - 1) / 10) * Math.PI / 1.5);
  }
  headObj.add(moust);
}

const nose = new THREE.Mesh(eyeGeom, blackMaterial);
nose.position.set(bodyXPos - 0.05, bodyYPos + 5, bodyZPos + 14);
headObj.add(nose);

const mane = new THREE.Mesh(maneGeom, maneMaterial);
mane.position.set(bodyXPos, bodyYPos + 6, bodyZPos + 6);
headObj.add(mane);

const tailObj = new THREE.Group();
scene.add(tailObj);

const tail = new THREE.Mesh(tailGeom, material);
tail.position.set(bodyXPos, bodyYPos + 8, bodyZPos - 8);
const tailTop = new THREE.Mesh(tailTopGeom, maneMaterial);
tailTop.position.set(bodyXPos, bodyYPos + 15, bodyZPos - 8);

tailObj.add(tailTop);
tailObj.add(tail);

const lion = new THREE.Group();
scene.add(lion);
lion.add(tailObj);
lion.add(bodyObj);
lion.add(headObj);

function animate() {

  const rotationPos = Math.sin(Date.now() * 0.001) * Math.PI / 2 * 0.5
  tailObj.rotation.z = rotationPos;

  lion.rotation.set(0, t / 3, 0);
}
