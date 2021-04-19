# Physics modeling
- It's all about modeling physical occurrences that make the objects' behaviour more realistic.
- The most obvious occurrences are the ones being modeled: Gravitation, inertia, elasticity, friction, entropy and others
- The contact between objects is essential
- A whole new world gets modeled with the objects and their physical properties 

# Physijs
- Basically a wrapper over Three.js with Ammo.js's abilities, documentation kind of hard to find
- Uses a different process to simulate physics
- To run examples a local server is needed
- Example zero: Ball falling.
```
var geometry = new THREE.SphereBufferGeometry( 8 );
var material = Physijs.createMaterial( new THREE.MeshPhongMaterial({color:'hotpink'}) );
var ball = new Physijs.SphereMesh( geometry, material );
scene.add( ball );//scene is created with scene = new Physijs.Scene();


//physical constraints can be added
var constraint = new Physijs.HingeConstraint(
				door, //contrained object
				null,//object constraining it if none, the scene does that
				new THREE.Vector3( 0, 30, 0 ),
				new THREE.Vector3( 0, 1, 0 )
			);
            
scene.add(constraint);

function animate()
{
    scene.simulate();
}

```

