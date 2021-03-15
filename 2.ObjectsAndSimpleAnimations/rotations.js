const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);


camera.position.set( 0, 0, 100 );
camera.lookAt( 10, 20, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var material = new THREE.MeshLambertMaterial();
			var geometryA = new THREE.BoxGeometry( 40, 3, 20 ); // правоъгълна форма
			var geometryC = new THREE.CylinderGeometry( 10, 10, 3, 32 ); // закръглена форма

			// плочка
			var plate = new THREE.Group();
			plate.scale.set( 1.5, 1.5, 1.5 );
			scene.add( plate );
			
			// правоъгълни парчета за плънка, еднакви са,
			// но едното е завъртяно на 90 градуса
			var plateA = new THREE.Mesh( geometryA, material );
			var plateB = new THREE.Mesh( geometryA, material );
			plateB.rotation.y = Math.PI/2;

			// четирите диска за четирите върха на плочката
			var plateC = new THREE.Mesh( geometryC, material );
			plateC.position.set( 10, 0, 10 );
			var plateD = new THREE.Mesh( geometryC, material );
			plateD.position.set( 10, 0, -10 );
			var plateE = new THREE.Mesh( geometryC, material );
			plateE.position.set( -10, 0, 10 );
			var plateF = new THREE.Mesh( geometryC, material );
			plateF.position.set( -10, 0, -10 );

			// сглобяваме всички 6 елемента в една плочка
			plate.add( plateA, plateB, plateC, plateD, plateE, plateF );
			
			function animate()
			{
				plate.rotation.set( t/2, t/3, t/4 );
			}

animate();