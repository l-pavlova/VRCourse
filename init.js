
function init(scene, camera, renderer) {
   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    
    
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 10, 20, 0);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    renderer.render(scene, camera);
}