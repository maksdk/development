const container = document.body;

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.x =  0;
camera.position.y =  0;
camera.position.z = 600;


const render = new THREE.WebGLRenderer(); 


/* LINE */
const materialLine = new THREE.LineBasicMaterial({
   color: 0xFF0000,
   linewidth: 1
});

const lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0)); 
lineGeometry.vertices.push(new THREE.Vector3(0, 200, 0));
lineGeometry.vertices.push(new THREE.Vector3(30, 200, 0));

const line = new THREE.Line(lineGeometry, materialLine);
scene.add(line);
////////////


/*plane*/
const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

const materialGeom = new THREE.MainBasicMaterial({color: 0xEEE});
const plane = new THREE.Mash(geometry.materialGeom);
scene.add(plane);
///////////

render.setSize(window.innerWidth, window.innerHeight);

render.setPixelRatio( window.devicePixelRatio );
render.render(scene, camera);

container.appendChild(render.domElement);


