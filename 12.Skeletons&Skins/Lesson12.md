# Skeletons (dum dum duuum)

Skeletons have ready classes in three.js
```

let legA1 = new THREE.Bone(), //first bone
    legB1 = new THREE.Bone(),
    legC1 = new THREE.Bone(), //step
    legD1 = new THREE.Bone(); // this one is not actually displayed, it's used to show where the step ends



legA1.add(legB1); //all bones are attached to each other like a robot(see 5.)
legB1.add(legC1);
legC1.add(legD1);


legA1.position.y = -2; //leg a is basically moved from the center of the screen this amount,
legA1.position.z = 5;
legB1.position.y = 20; //all the others' position is relative to their parent, (20+y of the parent)
legC1.position.y = 15;
legD1.position.y = 5;


var helper = new THREE.SkeletonHelper(legA1); //skeleton helpers are used just to visualize the skeletons, to it is added the root bone only 
scene.add(helper, legA1);


```

# Skin and skinning(means putting on skin not ripping it off)

SkinnedMesh
- a mesh of polygons, getting deformed according to the skeleton's pose

```
const material = new THREE.MeshPhongMaterial({
    color: '#4287f5', 
    skinning: true, //skinning should be set to true
})

geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));//geometry's indexes should be also set otherwise nada 
geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4)); 

const mesh = new THREE.SkinnedMesh(geometry,material);
const skeleton = new THREE.Skeleton(bones);

// see example from THREE.Skeleton

const rootBone = skeleton.bones[0];
mesh.add(rootBone);

// bind the skeleton to the mesh

mesh.bind(skeleton);
```
each skin control point can be connected to different count of bones (1 to 4). if it's connected to more than one, when a bone moves, the new skin control point position is intepolated between all the points based on the bones connected.
on skinIndices - 0,*,*,* //bones from the array we use with the bones
on skinWeights - 1, 0, 0, 0 //weights with wich said bone controls the skin, in this one, first bone is 100% the controlling one, values are between 0 and 1

# Morphing
So for morphing what we have going for us is 2 base shapes and then setting the material atttributes to true
```
const material = new THREE.MeshPhongMaterial({
            color: '#4287f5', skinning: true,
            morphTargets: true,
            morphNormals: true// slo light doesnt mess up
})

```


```
//this code will morph teh object into a sphre, setting a new point for each control point of the geometry
function setMorphing(geometry) {
    const ballPositions = [],
        ballNormals = [],
        pos = geometry.getAttribute('position'),
        nor = geometry.getAttribute('normal'),
        vec = new THREE.Vector3(); 

    for (var i = 0; i < pos.count; i++) {

        vec.set(pos.getX(i), pos.getY(i), pos.getZ(i));
        vec.setLength(50 * Math.pow(3 / 4 / Math.PI, 1 / 3));
        ballPositions.push(vec.x, vec.y, vec.z);
        vec.setLength(1);
        ballNormals.push(vec.x, vec.y, vec.z);
    }

    geometry.morphAttributes.position = [
        new THREE.Float32BufferAttribute(ballPositions, 3)
    ]
    geometry.morphAttributes.normal = [
        new THREE.Float32BufferAttribute(ballNormals, 3)
    ]
}
```