
   // once everything is loaded, we run our Three.js stuff.
   	Physijs.scripts.worker = 'libs/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
    function init() {

        var stats = initStats();
		var letterOnY= 17;
		var letterOnX= -15;
		var letterOnZ= -20;
		loadSounds();
        
        var scene = new THREE.Scene();
		//////////////////////////////////////////////////////////////////////////////////////////////////////
		//var scene = new Physijs.Scene();
		//scene.setGravity(new THREE.Vector3( 0, 0, -30 ));

        explode.play();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
		
		
		
        
        var planeGeometry = new THREE.PlaneGeometry(5000, 20, 1, 1);
        var planeMaterial = createCustomMaterialFromGLSLCode('fragment1');
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
       

	    plane.receiveShadow = true;
        plane.rotation.x = -Math.PI/2;//-0.5 * Math.PI;
		plane.rotation.z = 0.79*Math.PI/3;
		plane.rotation.y = -0.0001*Math.PI/2;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
		
		var axes = new THREE.AxisHelper(40);
        plane.add(axes);

        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.x = 5;
        cube.position.y = 7;				;
        cube.position.z = 2;

        // add the cube to the scene
        plane.add(cube);
			var cubeObstacle = [];
		for(var i = 0;i < 20; i++){
			var cubeGeometry = new THREE.BoxGeometry(4, (4+i/3), 4);
			var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
			cubeObstacle[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cubeObstacle[i].castShadow = true;

			// position the cube
			cubeObstacle[i].position.x = i*i/2*i*5;
			cubeObstacle[i].position.y = i+2-3;				;
			cubeObstacle[i].position.z = 2;

			// add the cube to the scene
			plane.add(cubeObstacle[i]);
			
		}

        var sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
        var sphereMaterial = createCustomMaterialFromGLSLCode('fragment2');
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.x = 20;
        sphere.position.y = 0;
        sphere.position.z = 2;
		sphere.rotation.y =0.5;
		sphere.rotation.z =0.5;
        sphere.castShadow = true;

        // add the sphere to the scene
        scene.add(sphere);
		//plane.add(sphere);
		var sphereObstacle = [];
		for(var i = 0; i < 30; i++){
			var sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
			var sphereMaterial = createCustomMaterialFromGLSLCode('fragment3');
			sphereObstacle[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);

			// position the sphere
			sphereObstacle[i].position.x = i*i*20;
			sphereObstacle[i].position.y = i+2-10;
			sphereObstacle[i].position.z = 2;
			sphereObstacle[i].castShadow = true;

			// add the sphere to the scene
			//scene.add(sphere);
			plane.add(sphereObstacle[i]);
		}
	
		var sphereGeometry = new THREE.SphereGeometry(1.5, 20, 20);
        var sphereMaterial = createCustomMaterialFromGLSLCode('fragment6');
        var sphereO = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphereO.position.x = letterOnX + 10.9;
        sphereO.position.y = letterOnY;
        sphereO.position.z = letterOnZ + 11;
		
        sphereO.castShadow = true;

        // add the sphere to the scene
        scene.add(sphereO);

        // position and point the camera to the center of the scene
        camera.position.x = -35;
        camera.position.y = 18;
        camera.position.z = 40;
        camera.lookAt(scene.position);

        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(renderer.domElement);

        // call the render function
        var bounce = 0;
		var letterBounce =0;
        renderScene();
		printName();
		printGameName();
		
		var explode, one, two, three, four, five;
	function loadSounds()
	{
		explode = new Audio("sounds/bounce.mp3");
		one = new Audio("sounds/1.mp3");
		two = new Audio("sounds/2.mp3");
		three = new Audio("sounds/3.mp3");
		four = new Audio("sounds/4.mp3");
		five = new Audio("sounds/5.mp3");
	}
	
	
	var nameIdObject = null;
	var gameNameObject = null;
	function printName()
	{
		if( nameIdObject != null )
		{
			scene.remove( nameIdObject );
		}
		
		var nameString = "By: Jose Ghersy" ;
		
		var nameIdObjectGeometry = new THREE.TextGeometry( nameString,
		{
			size: 2,
			height: 2,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var nameIdObjectMaterial = createCustomMaterialFromGLSLCode('fragment4');
		
		nameIdObject = new THREE.Mesh( nameIdObjectGeometry, nameIdObjectMaterial );
		nameIdObject.position.x = 15;
		nameIdObject.position.y = -23;
		nameIdObject.position.z = 20;
		nameIdObject.rotation.x = -Math.PI/2.1;// Math.PI / 2;
		nameIdObject.rotation.y = -Math.PI/3.1;//- Math.PI / 2;
		nameIdObject.rotation.z = -Math.PI/3.3;
		
		scene.add( nameIdObject );
	}
		function printGameName()
	{
		if( gameNameObject != null )
		{
			scene.remove( gameNameObject );
		}
		
		var gameNameString = "The B  uncing Ball" ;
		
		var gameNameObjectGeometry = new THREE.TextGeometry( gameNameString,
		{
			size: 4,
			height: 2,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var gameNameObjectMaterial = new THREE.MeshLambertMaterial({color:0x9999FF});
		
		gameNameObject = new THREE.Mesh( gameNameObjectGeometry, gameNameObjectMaterial );
		gameNameObject.position.x = letterOnX;
		gameNameObject.position.y = letterOnY;
		gameNameObject.position.z = letterOnZ;
		gameNameObject.rotation.x = 0;// Math.PI / 2;
		gameNameObject.rotation.y = -Math.PI/4;//- Math.PI / 2;
		

		
		scene.add( gameNameObject );
	}
	
        function renderScene() {
            stats.update();
            cube.rotation.z += 0.02;


            // bounce the sphere up and down
            bounce += 0.04;
			letterBounce += 0.08;
			//sphere.rotation.z += 0.250;
			sphere.rotation.x -= 0.25;
			//sphere.rotation.y -= 0.5;
			
			
			var leftToRight= 2.5;
			var jumpPower = 10;
			if( Key.isDown(Key.D) && leftToRight ==2.5  )
			{
				leftToRight+=2.5;
			
			}
			if( Key.isDown(Key.A) && leftToRight == 2.5 )
			{
				leftToRight-=2.5;
			
			}
			if( Key.isDown(Key.W) && jumpPower==10 )
			{
				jumpPower+=5;
			
			}
			if( Key.isDown(Key.S) && jumpPower==10 )
			{
				jumpPower-=5;
			
			}
			
			for(var i = 0; i<30; i++){
				if(i<5){
					sphereObstacle[i].rotation.z -= 0.19;
					sphereObstacle[i].rotation.y -= 0.25;
					sphereObstacle[i].position.x -= 0.9;
				}
				else if(i<15){
					sphereObstacle[i].rotation.z -= 0.19;
					sphereObstacle[i].rotation.y -= 0.25;
					sphereObstacle[i].position.x -= 1.5
					sphereObstacle[i].position.y -= 0.008
					sphereObstacle[i].position.z += 0.008
				}
				else
					sphereObstacle[i].rotation.z -= 0.19;
					sphereObstacle[i].rotation.y -= 0.25;
					sphereObstacle[i].position.x -= 1.5
					sphereObstacle[i].position.y -= 0.004
					sphereObstacle[i].position.z += 0.00419
			}
			
			for(var i = 0; i<20; i++){
				if(i<6){
					cubeObstacle[i].rotation.z -= 0.19;
					cubeObstacle[i].rotation.y += 0.45;
					cubeObstacle[i].position.x -= 0.9;
				}
				else if(i>=6&&i<=10){
					//cubeObstacle[i].rotation.z -= 0.19;
					cubeObstacle[i].rotation.y -= 0.65;
					cubeObstacle[i].position.x -= 1.3
					cubeObstacle[i].position.y += 0.00055
					cubeObstacle[i].position.z += 0.0001
				}
				else{
					cubeObstacle[i].rotation.y -= 0.65;
					cubeObstacle[i].position.x -= 3.3
					cubeObstacle[i].position.y -= 0.00495
					cubeObstacle[i].position.z += 0.0001
				}
			}
			
			
			
			sphere.position.x = -25+leftToRight;//+ ( 10 * (Math.sin(bounce)));
			sphere.position.y = 5+ ( jumpPower * Math.abs(Math.sin(bounce)));
			sphere.position.z = 23+leftToRight;//+ ( 10 * Math.abs(Math.cos(bounce)));
			cube.position.x -=0.6;
			
			
			
			sphereO.position.y = letterOnY+1 + ( 2 * Math.abs(Math.sin(letterBounce)));
			sphereO.rotation.x += 0.1;
			sphereO.rotation.y += 0.1;
			sphereO.rotation.z += 0.3;
			plane.position.x -=0.2;
			plane.position.z +=0.21739;
			

            // render using requestAnimationFrame
            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
        }

        function initStats() {

            var stats = new Stats();

            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
        }
    }
    window.onload = init;
