var scene, camera, renderer;
init();
animate();

var SPEED = 0.01;
var dae;
var leftRotate = true;
var count = 0;

function init() {
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xffffff, 0);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.set(200, 150, 100);
    scene.add(camera);
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('models/gen/example.dae', function(collada) {
        dae = collada.scene;
        var skin = collada.skins[0];
        dae.position.set(0, 0, 0); //x,z,y- if you think in blender dimensions ;)
        dae.scale.set(10, 10, 10);
        dae.rotation.y += 4.25;
        scene.add(dae);
    });
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Set rotation change interval
    setInterval(function(){ 
        if (leftRotate) {
            if ((count % 4 == 0) || (count % 4 == 2)) {
                leftRotate = false;
            }
        } else {
            if ((count % 4 == 1) || (count % 4 == 3)) {
                leftRotate = true;
            }
        }
        count++;
    }, 3000);
}

function animate() {
    requestAnimationFrame(animate);
    rotatePose();
    renderer.render(scene, camera);
    controls.update();
}

function rotatePose() {
    if (dae != undefined) {
        if (leftRotate) {
            dae.rotation.y -= SPEED * 2;
        } else {
            dae.rotation.y += SPEED * 2;
        }
    }
}
