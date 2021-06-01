
vaxInit();

// интерактивно контролиране на морфинга
var gui = new dat.GUI();
gui.domElement.style.marginRight = 0;
var pose = {
    k0: 0, // влияние на плочката
    k1: 0, // влияние на сферата
};
gui.add(pose, 'k0', 0, 1).name('Плочка').step(0.01);
gui.add(pose, 'k1', 0, 1).name('Сфера').step(0.01);
gui.open();

// създаване на куб с много междинни върхове
var cubeGeometry = new THREE.BoxBufferGeometry(50, 50, 50, 100, 20, 20);

var ballPositions = [],
    ballNormals = [],
    platePositions = [],
    plateNormals = [],
    pos = cubeGeometry.getAttribute('position'),
    nor = cubeGeometry.getAttribute('normal'),
    vec = new THREE.Vector3(); // оборотни цели

// изчисляване на върховете и нормалите по сфера и плочка
for (var i = 0; i < pos.count; i++) {

    // първо плочката
    vec.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    platePositions.push(2 * vec.x, vec.y / 20 + 2 * Math.sin(vec.x), vec.z);
    if (nor.getY(i))
        plateNormals.push(nor.getX(i) - Math.sin(vec.x) / 3, nor.getY(i) - Math.cos(vec.x) / 3, nor.getZ(i));
    else
        plateNormals.push(nor.getX(i), nor.getY(i), nor.getZ(i));

    // после и сферата
    vec.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    vec.setLength(50 * Math.pow(3 / 4 / Math.PI, 1 / 3));
    ballPositions.push(1*vec.x, 1.1*vec.y, 2*vec.z);
    vec.setLength(1);
    ballNormals.push(vec.x, vec.y, vec.z);
}

// записване на върховете и нормалите като морфинг атрибути
cubeGeometry.morphAttributes.position = [
    new THREE.Float32BufferAttribute(platePositions, 3),
    new THREE.Float32BufferAttribute(ballPositions, 3)
]
cubeGeometry.morphAttributes.normal = [
    new THREE.Float32BufferAttribute(plateNormals, 3),
    new THREE.Float32BufferAttribute(ballNormals, 3)
]

// материал с включен морфинг на върхове и нормали
var material = new THREE.MeshPhongMaterial({
    color: 'cornflowerblue',
    morphTargets: true,
    morphNormals: true
});

var mesh = new THREE.Mesh(cubeGeometry, material);
scene.add(mesh);

function animate() {
    // сумарно двете вличния да не са над 1.2
    var k = pose.k0 + pose.k1;
    if (k > 1.2) {
        pose.k0 *= 1.2 / k;
        pose.k1 *= 1.2 / k;
        gui.updateDisplay();
    }

    // промяна на "силата" на морфинга
    mesh.morphTargetInfluences[0] = pose.k0;
    mesh.morphTargetInfluences[1] = pose.k1;

    mesh.rotation.x = 0.5;
    mesh.rotation.y = t / 3;
}
