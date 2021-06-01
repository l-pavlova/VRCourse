vaxInit();
//test elipsoid for the human skin morphing lol. test succesful
let geom = new THREE.SphereGeometry(10, 20, 20).scale(1, 2, 1);
var material = new THREE.MeshBasicMaterial({color: 'black'});
let mesh = new THREE.Mesh(geom, material);
scene.add(mesh);