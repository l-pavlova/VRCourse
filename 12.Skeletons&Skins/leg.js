vaxInit();

// основна кост
var pelvis = new THREE.Bone();

// кости на единия крак
var legA1 = new THREE.Bone(),
    legB1 = new THREE.Bone(),
    legC1 = new THREE.Bone(),
    legD1 = new THREE.Bone(); // фиктивна кост

// кости на другия крак
var legA2 = new THREE.Bone(),
    legB2 = new THREE.Bone(),
    legC2 = new THREE.Bone(),
    legD2 = new THREE.Bone(); // фиктивна кост

// кости на гръбнака
var backA = new THREE.Bone(),
    backB = new THREE.Bone(),
    backC = new THREE.Bone(),
    backCA = new THREE.Bone(),
    backD = new THREE.Bone(); // фиктивна кост

// кости на врата и главата
var neck = new THREE.Bone(),
    head = new THREE.Bone();

// кости на едната ръка
var armA1 = new THREE.Bone(),
    armB1 = new THREE.Bone(),
    armC1 = new THREE.Bone(),
    armD1 = new THREE.Bone();

// кости на другата ръка
var armA2 = new THREE.Bone(),
    armB2 = new THREE.Bone(),
    armC2 = new THREE.Bone(),
    armD2 = new THREE.Bone();

// свързаност на костите
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

// позиция на костите
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

// показване на скелета
var helper = new THREE.SkeletonHelper(pelvis);
scene.add(helper, pelvis);

function animate() {
    var s = Math.sin(4 * t);

    legA1.rotation.z = THREE.Math.degToRad(220 + 40 * s);
    legB1.rotation.z = THREE.Math.degToRad(-80 - 80 * s);
    legC1.rotation.z = THREE.Math.degToRad(130 + 40 * s);

    legA2.rotation.z = THREE.Math.degToRad(220 + 40 * s);
    legB2.rotation.z = THREE.Math.degToRad(-80 - 80 * s);
    legC2.rotation.z = THREE.Math.degToRad(130 + 40 * s);


    pelvis.position.y = -20;
    pelvis.position.y += 20 * Math.cos(THREE.Math.degToRad(40 + 40 * s));
    pelvis.position.y += 15 * Math.cos(THREE.Math.degToRad(40 + 40 * s));

    // сгъване на колената
    /*
    // сгъване на лакти
    armA1.rotation.z = THREE.Math.degToRad(-135 + 45 * s);
    armA2.rotation.z = THREE.Math.degToRad(-135 + 45 * s);

    armA1.rotation.x = THREE.Math.degToRad(-25 + 25 * s);
    armA2.rotation.x = THREE.Math.degToRad(25 - 25 * s);

    armB1.rotation.x = THREE.Math.degToRad(-40 + 40 * s);
    armB2.rotation.x = THREE.Math.degToRad(40 - 40 * s);

    armC1.rotation.x = THREE.Math.degToRad(-15 + 15 * s);
    armC2.rotation.x = THREE.Math.degToRad(15 - 15 * s);*/
   /* var s = Math.sin(4 * t);

    legA1.rotation.z = THREE.Math.degToRad(220 + 40 * s);
    legB1.rotation.z = THREE.Math.degToRad(-80 - 80 * s);
    legC1.rotation.z = THREE.Math.degToRad(130 + 40 * s);

    legA2.rotation.z = THREE.Math.degToRad(220 + 40 * s);
    legB2.rotation.z = THREE.Math.degToRad(-80 - 80 * s);
    legC2.rotation.z = THREE.Math.degToRad(130 + 40 * s);

    // сгъване на колената
    pelvis.position.y = -20;
    pelvis.position.y += 20 * Math.cos(THREE.Math.degToRad(40 + 40 * s));
    pelvis.position.y += 15 * Math.cos(THREE.Math.degToRad(40 + 40 * s));

    // сгъване на лакти
    armA1.rotation.z = THREE.Math.degToRad(-135 + 45 * s);
    armA2.rotation.z = THREE.Math.degToRad(-135 + 45 * s);

    armA1.rotation.x = THREE.Math.degToRad(-25 + 25 * s);
    armA2.rotation.x = THREE.Math.degToRad(25 - 25 * s);

    armB1.rotation.x = THREE.Math.degToRad(-40 + 40 * s);
    armB2.rotation.x = THREE.Math.degToRad(40 - 40 * s);

    armC1.rotation.x = THREE.Math.degToRad(-15 + 15 * s);
    armC2.rotation.x = THREE.Math.degToRad(15 - 15 * s);
*/
    scene.rotation.y = t / 3;
}