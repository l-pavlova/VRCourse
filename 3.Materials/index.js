vaxInit();

const material = new THREE.MeshLambertMaterial({
	color: 0x4287f5,
	linewidth: 1,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
});
//lambert material uses cos(alpha) where alpha is the angle between the ray of falling and the normal vector of the plane

const lineMaterial = new THREE.LineDashedMaterial({
	color: 0x4287f5,
})

const phongMaterial = new THREE.MeshPhongMaterial({
	color: 0x4287f5,
	shininess: 50//can be more or less shiny depending on what we want to achieve
})//phong is shinier than lambert it calculates based on normal of every point and then interpolation and then cos()

const dodge = new THREE.DodecahedronGeometry(6, 2);//second arg, detail with value more than 6 literally breaks renderer, 2-3 is enough
const mesh = new THREE.Mesh(dodge, material);

//scene.add(mesh);

const teaGeom = new THREE.TeapotGeometry(10, 10);

const teapot = new THREE.Mesh(teaGeom, material);
const teapotLined = new THREE.Mesh(teaGeom, lineMaterial);
const teapotPhonged = new THREE.Mesh(teaGeom, phongMaterial);
//scene.add(teapot);
//scene.add(teapotLined);
//scene.add(teapotPhonged);

const bMaterial = new THREE.MeshPhongMaterial({
	color: 'cornflowerblue',
	side: THREE.DoubleSide, // предни и задни стени
	depthWrite: false,
	transparent: true,	// прозрачен материал
	opacity: 0.6,		// степен на прозрачност 40%
	shininess: 200
});

const teapotA = new THREE.Mesh(teaGeom, bMaterial);

const rMaterial = new THREE.MeshPhongMaterial({
	color: 'red',
	side: THREE.DoubleSide,
	depthWrite: false,
	transparent: true,
	opacity: 0.3,
	shininess: 200
});
//const teapotB = new THREE.Mesh(teaGeom, rMaterial);
//teapotB.scale.set(0.5, 0.5, 0.5);
//scene.add(teapotA, teapotB);


const normMaterial = new THREE.MeshNormalMaterial({
	color: 'black'//doesn't really matter really, it's all rainbow colored
})

const normalTea = new THREE.Mesh(teaGeom, material);
scene.add(normalTea);



const light1 = new THREE.PointLight(0xff0000, 1, 100);
light1.position.set(50, 50, 50);

light.color = new THREE.Color('red');
const light2 = new THREE.PointLight('green');
const light3 = new THREE.PointLight('blue');
scene.add(light2, light3);
//light = light1;
scene.add(light1);
const s = new THREE.Spherical(0,0,0);//Spherical coordinates with Spherical class and position method .setFromSpherical

			
function animate() {
	//mesh.rotation.set(0, t / 3, 0);
	//teapot.position.set(30, 0, 0);
	//teapot.rotation.set(0, t / 3, t / 2);
	//teapotLined.rotation.set(0, t / 3, t/2);
	//teapotPhonged.rotation.set(0, t / 3, t / 2);
	//normalTea.rotation.set(0, t / 3, 0);
	/*s.set( 150, 1.2*t+1, 2*Math.sin(t) );
				light.position.setFromSpherical( s );
				
				s.set( 150, -1.5*t+2, Math.sin(t+1) );
				light2.position.setFromSpherical( s );
				
				s.set( 150, 1.7*t+3, Math.sin(t-1) );
				light3.position.setFromSpherical( s );*/
	//teapotA.rotation.set( 1.2*Math.sin(t), t, 1.2*Math.cos(t/2) );
	//teapotB.rotation.set( 1.2*Math.sin(t), -t, 1.2*Math.cos(t/2) );
}