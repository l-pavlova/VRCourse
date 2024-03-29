/**
 * FMI VR/AR/XR Library
 * 2020-05-09
 * v 0.002
 *
 * vaxInit()	инициализира на моно режим и поддържа
 *				анимационен цикъл с animate()
 *
 * animate()	потребителска функция, която генерира нов
 *				кадър; извиква се автоматично
 *
 * t			променлива за изминалото време (в секунди)
 *				от стартирането на vax.js
 *
 * pillar(center, material) създава пилон с връх center,
 *              материал и стигащ до y=0
 */

var renderer, scene, camera, light, stats, clock, t, animate;

function vaxInit()
{
	if ( !THREE.WEBGL.isWebGLAvailable() )
		alert( THREE.WEBGL.getWebGLErrorMessage() );
	
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	document.body.appendChild( renderer.domElement );
	document.body.style.margin = 0;
	document.body.style.overflow = 'hidden';
	
	//stats = new Stats();
	//document.body.appendChild( stats.dom );
	
	scene = new THREE.Scene();
	scene.background = new THREE.Color('white');

	clock = new THREE.Clock(true);
	
	camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000 );
	camera.position.set(0,0,100);
	camera.lookAt(new THREE.Vector3(0,0,0));
	
	light = new THREE.PointLight();
	light.position.set(0,150,300);
	scene.add( light );
	
	window.addEventListener( 'resize', onWindowResize, false );
	onWindowResize();
	
	renderer.setAnimationLoop( frame );
}

function onWindowResize( event )
{
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight, true );
}			

function frame( )
{
	t = clock.getElapsedTime();

	if (animate) animate();
	
	//stats.update();
	
	renderer.render( scene, camera );
}

function pillar(center, material)
{
	var height = center.y;
	center = new THREE.Vector3(center.x,0,center.z);
	
	var spline = new THREE.QuadraticBezierCurve( 
		new THREE.Vector3(Math.max(1+height/1.5,10),0,0),
		new THREE.Vector3(-3,0,0),
		new THREE.Vector3(4,height-4,0)
		);
	var points = [];
	for ( var i = 0; i <= 32; i ++ )
	{
		var p = spline.getPoint(i/32);
		points.push( new THREE.Vector2(p.x,p.y) );
	}

	var spline = new THREE.CubicBezierCurve( 
		new THREE.Vector3(4,height-4,0),
		new THREE.Vector3(4+6*4/(height-4),height,0),
		new THREE.Vector3(6,height+5,0),
		new THREE.Vector3(0.01,height+5,0) );
	for ( var i = 0+1; i <= 10; i ++ )
	{
		var p = spline.getPoint(i/10);
		points.push( new THREE.Vector2(p.x,p.y) );
	}

	var pillar = new THREE.Mesh(
		new THREE.LatheBufferGeometry(points,20),
		material
	);
	pillar.castShadow = true;
	pillar.receiveShadow = true;
	pillar.position.copy( center );	
	
	return pillar;
}