const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);


camera.position.set( 0, 0, 100 );
camera.lookAt( 10, 20, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(5,5,5);
const geometryInner = new THREE.PlaneGeometry(1,1,5);

const material = new THREE.MeshBasicMaterial({color:0xfff000, side: THREE.DoubleSide});
const material1 = new THREE.MeshBasicMaterial({color:0xff000, side: THREE.DoubleSide});

const plane = new THREE.Mesh(geometry, material);
const plane1 = new THREE.Mesh(geometryInner, material1);

renderer.render(scene, camera);

scene.add(plane);
//scene.add(plane1);
camera.position.z = 15;
const animate = () => {
    requestAnimationFrame(animate);
    plane.rotation.x +=0.01;
    plane.rotation.y +=0.02;
    plane1.rotation.x +=0.01;
    
    renderer.render(scene, camera);
}

animate();