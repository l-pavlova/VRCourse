# Textures

- Equidistant, Equirectangular - equaly far 
- anisometry - not isometric : having unsymmetrical parts —used of crystals with three unequal axes.
- loaded with a texture loader: 
```
const boxTexture = new THREE.TextureLoader().load("textures/texture.jpg");
boxTexture.wrapS = THREE.RepeatWrapping;
boxTexture.wrapT = THREE.RepeatWrapping;
boxTexture.repeat.set(1, 1);

const material = new THREE.MeshBasicMaterial({
    map: boxTexture,
    side: THREE.DoubleSide
});

```

when we want to represent a 360 deg view, we actually create a cubic texture:

       ---------
       | top   |
 ------------------------------
| left | front | right | rear |   
 ------------------------------
       |bottom |
       ---------
The texture is actually six images positioned like so:
```
const textureCrystal = new THREE.CubeTextureLoader().load([
    'rainbow/posx.jpg', 'rainbow/negx.jpg',
    'rainbow/posy.jpg', 'rainbow/negy.jpg',
    'rainbow/posz.jpg', 'rainbow/negz.jpg']);
textureCrystal.mapping = THREE.CubeRefractionMapping;

const crystalMaterial = new THREE.MeshBasicMaterial({ color: "white", envMap: textureCrystal, refractionRatio: 0.95, side: THREE.DoubleSide });

```
