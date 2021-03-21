## Materials, Lights and Cameras

# Materials
Materials describe the appearance of objects. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.

- LineBasicMaterial( parameters : Object )//color
A material for drawing wireframe-style geometries.
- LineDashedMaterial( parameters : Object )
A material for drawing wireframe-style geometries with dashed lines.
- MeshBasicMaterial(parameters: Object)
A material with no lighting, lightweight
- MeshDepthMaterial( parameters : Object )
A material for drawing geometry by depth. Depth is based off of the camera near and far plane. White is nearest, black is farthest.
- MeshLambertMaterial(parametes: Object)
A material for non-shiny surfaces, without specular highlights.
Lambert material uses cos(alpha) where alpha is the angle between the ray of falling and the normal vector of the plane
- MeshPhongMaterial( parameters : Object )
A material for shiny surfaces with specular highlights.
phong is shinier than lambert it calculates based on normal of every point and then interpolation and then cos()
- MeshToonMaterial( parameters : Object)
A material implementing toon shading.(it kinda cool, ngl)
- MeshNormalMaterial( parameters : Object) 
A material that maps the normal vectors to RGB colors. (Kinda the coolest)

If we want to have a matte object we usually use MeshLambertMaterial. If we need to achieve shininess we use Phong material and pass as a param shininess, like so 
```
const phongMaterial = new THREE.MeshPhongMaterial({
	color: 0x4287f5,
	shininess: 50//can be more or less shiny depending on what we want to achieve
})
```
we can also define the opacity and transparancy:
```
const phongMaterial = new THREE.MeshPhongMaterial({
color: 'red',
	side: THREE.DoubleSide,//so that its double sided
	depthWrite: false,
	transparent: true, //so that its transparent
	opacity: 0.3,//with level of transparency 
	shininess: 200
})
```

# Lights
- PointLight
*color and intensity are the main params
A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.
- DirectionalLight
A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. The common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel.
- SpotLight
This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.
- HemisphereLight
A light source positioned directly above the scene, with color fading from the sky color to the ground color.
- AmbientLight
This light globally illuminates all objects in the scene equally.
This light cannot be used to cast shadows as it does not have a direction.

Lights can be rotated also like so:
```
const light = new THREE.PointLight('green');
scene.add(light);
const s = new THREE.Spherical(0,0,0);
s.set( 150, -1.5*t+2, Math.sin(t+1) );
light2.position.setFromSpherical( s );

```
Shadows can be added with
```
renderer.shadowMap.enabled = true;//enabling shadowing
			
//setting cam position to be a little up
camera.position.set( 0, 50, 150 );
camera.lookAt( teapot.position );

light.position.set( 0, 200, 0 );
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;//setting shadow size
			
light.castShadow = true;
teapot.castShadow = true;
ground.receiveShadow = true;

```

It is also possible for objects to emit light, not with external source but from object material props like so:
```
var material = new THREE.MeshPhongMaterial( {
	color:'white',
	shininess: 200,
	side: THREE.DoubleSide,
	emissive: new THREE.Color().setHSL( 3*i/16, 1, 0.5 ),
	emissiveIntensity: 0.5
} );
```