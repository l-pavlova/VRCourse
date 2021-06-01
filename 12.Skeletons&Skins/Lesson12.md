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
const mesh = new THREE.SkinnedMesh( geometry, material );
const skeleton = new THREE.Skeleton( bones );

// see example from THREE.Skeleton

const rootBone = skeleton.bones[ 0 ];
mesh.add( rootBone );

// bind the skeleton to the mesh

mesh.bind( skeleton );
```
each skin control point can be connected to different count of bones (1 to 4). if it's connected to more than one, when a bone moves, the new skin control point position is intepolated between all the points based on the bones connected.
on skinIndices - 0,*,*,* //bones from the array we use with the bones
on skinWeights - 1, 0, 0, 0 //weights with wich said bone controls the skin, in this one, first bone is 100% the controlling one, values are between 0 and 1

# Morphing
