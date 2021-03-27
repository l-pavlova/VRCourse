
		sceneInit();
		sceneObjects();

		// k пилона в кръг
		var k = 8; // брой пилони
		var positions = [];
		var pillars = [];
		var vectors = [];
        var tweens = [];
		for (var i = 0; i < k; i++) {

           
            
			positions[i] = new THREE.Vector3().setFromSphericalCoords(80, Math.PI / 2, 2 * Math.PI * i / k);
			positions[i].y = 10 + 40 * Math.random();
			vectors[i] = positions[i];
     
            const q = new THREE.Vector3(vectors[i].x, vectors[i].y-30, vectors[i].z);
			pillars[i] = pillar(vectors[i], ground.material);
			pillars[i].name = i;
            const tween = new TWEEN.Tween(pillars[i].position).to(q, 1000);
            tweens[i+1] = tween;
                      
			scene.add(pillars[i]);
		}
		
		// Изчисляване на движението
		var n = 40; // брой стъпки
		var v = new THREE.Vector3(); // вектор на движението
		var frame = 0; // номер на кадър

		function animate() {
			// на всеки n кадъра започва движение от нов към следващ
			var i, j;
		  //console.log(vectors[0]);
			//let smallPilar = pillar(q, ground.material);
			//	smallPilar.name = "curr";
			let removed; 
			if (frame % n == 0) {
				// новото движение е от пилон i към пилон j
				i = Math.floor(frame / n) % k;
				j = (i + 1) % k;
				console.log(vectors[i]);
				if(i != 0)
                {tweens[i].start();}
                TWEEN.update();
                object.position.copy(positions[i]);
				
				v.subVectors(positions[j], positions[i]).divideScalar(n);
			}
			else
			{ 
				object.position.add(v);
			}
			frame++;
			// въртене на сцената и на обекта
			object.rotation.y -= 0.1;
			scene.rotation.y += 0.002;
		}

		function removeEntity(object) {
			var selectedObject = scene.getObjectByName(object.name);
			scene.remove(selectedObject);
			//animate();
		}