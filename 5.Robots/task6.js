//scorpion tail
sceneInit();
sceneObjects();
scene.remove(object);

const scorpion = [];
let size = 2;
scorpion.push(new robotElement(1 * size, 6 * size, 8 * size));
scorpion[0].rotation.z = -Math.PI / 2;
scorpion[0].position.set(-20, 1, 50);
scene.add(scorpion[0]);

for (let i = 1; i < 30; i++) {
    size *= 0.95;
    scorpion.push(new robotElement(1 * size, 6 * size, 8 * size, scorpion[i - 1]));
}

function animate() {
    const angle = 0.3 + 0.3 * Math.sin(t);
    for (let i = 1; i < 30; i++) {
        scorpion[i].rotation.z = angle;
    }

}