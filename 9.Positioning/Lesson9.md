# Positioning
## VR/AR zone
- have a further reach than just the screen
- upon movement of the screen the thing becomes visible
- Orientation: DOF(degrees of freedom) - desirably 3, rotation by 3 directives
- Position: DOF(degrees of freedom) - desirably 3, momvement by 3 directives
- With interactive devices each can have 6 or more DOF

## Types of positioning
- Absolute: fixed according to a global coordinate system(e.g. earth), shared between all objects in the virtual scene
- Relative: each object has its own virtual scene, the orientation and the movement in one of them, doesn't affect the rest

## Sensors
- Accelerometer - acceleration on all three axes
- Gyroscope - rotation in space
- Magnetic sensor - orientation to the magnetic field
- Barometer - atmospheric pressure and altitude

## GPS(Global Positioning System)
- navigation via a system of satellites
- to access geolocation use the navigator object
```
 if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition( geoSuccess );
	} else	{
    //location not supported
	}
function geoSuccess(position) {
    //coords can be accessed like:
    position.coords.longitude
    position.coords.latitude
    position.coords.accuracy

    position.heading;//shows direction
}
```
if it's not working, the user didn't give consent for accessing his location or javascript is disabled with a <noscript> tag or god knows what really

## Orientation
- sees how it's rotated in space, doesnt show exact location, depends on the coordinates system(global and local)
- global CS - its according to the earth X+ is colinear to the equator, points east, Y+ points north pole, Y- south. Z is perpenticular to the earth's surface
- local cs - connected to the mobile device. X is right. Y is up, Z is forward, pointing the user
- The orientation of the device is its rotation, defined by the diff between the local and global CS, measured with the angle betw. the local and global axes x, y, x
- DeviceOrientation event - fires on orientation change, triggered by accelerometer and gyroscope. Acccuracy is not bigger than 0.1 deg.
- Th: Each rotation in space can be described as a sequence of 3 rotations around perpendicular axes

```
window.addEventListener( "deviceorientation", deviceOrientation, true);

			// функция, която показва данните на ориентацията
			function deviceOrientation(event) {
				document.getElementById('alpha').innerHTML = event.alpha;//.toFixed(1);
				document.getElementById('beta').innerHTML = event.beta;//.toFixed(1);
				document.getElementById('gamma').innerHTML = event.gamma;//.toFixed(1);
				document.getElementById('absolute').innerHTML = event.absolute;//.toFixed(1);
			}
```

## Device movement
- DeviceMotion event - connected to the accelerometer
```
window.addEventListener( "devicemotion", deviceMotion, true);

			function format( x ) {
				if( x === null ) return 'null';
				return x.toFixed(1);
			}
			
			function xyz( v ) {
				return 'X='+format(v.x)+' Y='+format(v.y)+' Z='+format(v.z);
			}
			
			// функция, която показва данните на движението
			function deviceMotion(event) {
				console.log(event);
	
				document.getElementById('acceleration1').innerHTML = xyz( event.acceleration );
				document.getElementById('acceleration2').innerHTML = xyz( event.accelerationIncludingGravity );
			}
```
- snippets here from The VR/AR course lectures

