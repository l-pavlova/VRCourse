# Animations

## Movement on a line
- one parameter needed, usually it's time
- Can be achieved in 3 ways:
- With a vector of the speed
𝑃 ⃗_(𝑖+1)=𝑃 ⃗_𝑖+𝑣 ⃗

- With a linear combination
𝑘∈[0,1]
𝑃=(1−𝑘)𝐴+𝑘𝐵

- With movement equation/ on a trajectory
𝑃(𝑡)={
    𝑥=𝑥(𝑡)
    𝑦=𝑦(𝑡)
    𝑧=𝑧(𝑡))
    } 
or 𝑃(𝑡)=𝑧(𝑥(𝑡),𝑦(𝑡))

## Tween.js
Some examples of using the library for animation
```
const tween = new TWEEN.Tween( object to animate here);
tween.to(3d vector to go to);
tween.start();//start the movement

var tween = new TWEEN.Tween( … )     
.to( q, 5000 )//second param is delay
.start();
Elastic.Out
Elastin.in //bounce effect on the movement;
var q = new THREE.Vector3(
    -20,  -30, -20
);
const tween1 = new TWEEN.Tween(ball.position).to(q, 3500).easing(TWEEN.Easing.Bounce.Out);
```

## dat.GUI
- useful for setting position 