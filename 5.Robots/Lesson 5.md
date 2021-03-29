# Robots.

## Side note on how movement works:
- Position.set.z sets objects positions in radians. 1 radian being around 57deg. So to make a full rotation an object would go from 0 to 6 and sth. 
If we want to animate in a fixed scope, we use Math.cos(t) or Math.sin(t) where t is passed time passed as radian value to the sine. Those values are set between -1 and 1 and
if we want further reach we just mutliply with a coefficient k, e.g k*Math.cos(t)

``` t = clock.getElapsedTime(); //returns seconds passed since page load, good parameter when animating ```

## Nested objects
- group object, all accept part of the others' properties. The outer object is the main object, parent, the others are children
- object has one parent at most 
- one parent can have many children
- all connected elements can be represented as a tree structure 
- Nesting makes animation easier, all children move only with moving parent
- Parent child relationship can be used for creating robots

## Degrees of freedom (dum dum duuuum)
- Minimal count of independent params to describe a movement
- The bigger the DOF, the more complicated the movement
DOF = 0 - static object
DOF = 1 = line movement, straight or curve
DOF = 2 - plane movement
DOF = 3 - 3 dimensional movement, 
DOF > 3 - crates more complicated movements in the same dimensions
When usin the basic transformations(translation, rotation and zoom on XYZ) a DOF = 9 is achieved.
A DOF of a system is the sum of DOFs of its individial elements with non dependend parameters.
Not always the dimensions of the reachable plane matches the DOF.

## Building robots
- Element - visible part of the robot, connected with parent/child/other elements
- Scharnier - invisible part, the joint basically. Can achieve up to 3 DOF
- Movement: direct(pointing exact position at all times) or through interpolation(setting only the main positions and interpolating the rest from them, controls speed easier, saves describing the movement)

## Gimbal lock - having DOFs repeat themselves. avoided with movement with quaternions //.set(0,1,0,0)





