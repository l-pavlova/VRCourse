## VR Basics
- VR == Virtual Reality, digitally generated reality, creates a whole fake world
- AR == Augmented Reality, virutal reality put on top of a real reality(lol), e.g. snapchat filters
- MR == Mixed Reality, all in real time, still not there technologically
- XR == Extended reality, all of the above

# WebGL - access to the graphic processor
(from wiki) a cross-platform, royalty-free API used to create 3D graphics in a Web browser.
basically we need webgl to access graphics and so we just add WebGL.js for everything

# Three.js - cool library to visualise everything, here's an example on that

```
const scene = new THREE.Scene(); //create the scene
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //create the view point

const renderer = new THREE.WebGLRenderer(); //create the renderer, call renderer.render( scene, camera ); to view things
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```
after setting the scene, we draw different objects by creating them with material and then calling render again
```
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial({color:0x00ff00});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


camera.position.z = 5;
```
for animation we use requestAnimationFrame and use basically the speed provided by our graphic card
