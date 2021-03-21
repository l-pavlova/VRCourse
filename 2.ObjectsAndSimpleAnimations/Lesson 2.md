## Objects and shapes

### Animation speed - it's measured in fps(frames per second)
- 24 fps in cinema
- 30 fps for computer graphics
- 60 fps for fast paced

When it's in browser its the tact frequency of screen refresh

stats.js measures spreed by frames per second and miliseconds per frame

### Geometries:
initialized like: 

```const geom = new THREE.BoxGeometry(1,1,1);```

- BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer) 
- SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
- CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
- TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
- RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
- PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)//2d variation of box geometry, doesnt have a front and back side

### Moving different objects together
To move different objects together when we create a Mesh for them we add them to a group object like so:

```
const material = new THREE.MeshLambertMaterial({ color: 0x48a605 });//create a lambert material, more on materials in lesson 3
const body = new THREE.Mesh(geom, material);
const group = new THREE.Group();
scene.add(group);
group.add(body);
```
First we set the position like so, can be set individually or for all in the group:
body.position.set(0,0,10);//sets xyz coordinates in the three dimensional space
Then, we do not set the rotation of the elements one by one but of the whole group:

 ``` group.rotation.set(0, MATH.PI/2, 0); ```
