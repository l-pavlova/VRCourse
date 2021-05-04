# Stereo

## Perception
- 3 channels of perception: binocular, monocular, waveocular, all adding up to one another to create smooth perception
- stereopsis - discrepancy in the images from the two retina(it happens cause eyes have a few centimeters apart), central and peripheral
- convergence - turning both eyes to the same spot
- paralax - change in the image caused by a different view point
## Anaglyph images - images from close view points, each in its own color
- via color filters the two eyes pass 2 slightly different images to the brain and it composes a 3D image

## Depth of field
- distance from the view point
- it's calculated with the projection
- it has range(max difference between depths) and sensitivity(min difference between depths), each pixel has its own depth

## Z-buffer 
- each pixel has a depth between 0 and 1
- furthest point has 0, nearest has 1
- pixels are drawn on top of each other when rendering multiple layers only if the new layer has a Z new > Z old
- Z-fighting is when it's not very clear which pixel should be drawn when they have close Z-buffer values
- MeshDepthMaterial uses the depth for the color data instead of color and texture

## Anaglyph graphics
- Cameras - PerspectiveCamera and OrthoGraphicCamera both use single point of view (pov)
- Stereo Camera is simulating 2 eye pov.(a pair of cameras)
- an example can be seen in graveyard folder

## Paralax graphics
- uses the class StereoEffect.js, again displays two objects one for left eye and one for the right


