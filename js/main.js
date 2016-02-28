var scene, camera, renderer;
init();
animate();

function init() {
    scene = new THREE.Scene();
    var WIDTH = 800//window.innerWidth*7/10,
        HEIGHT = 800//window.innerHeight/2;
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xffffff, 0);
    document.getElementById("view").appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.set(50, 150, 100);
    scene.add(camera);
    /*window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });
*/
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('models/gen/example.dae', function(collada) {
        var dae = collada.scene;
        var skin = collada.skins[0];
        dae.position.set(0, 0, 0); //x,z,y- if you think in blender dimensions ;)
        dae.scale.set(1.5, 1.5, 1.5);
        scene.add(dae);
    });
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
