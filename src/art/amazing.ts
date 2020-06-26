import {
    PerspectiveCamera,
    Scene,
    DataTexture,
    BoxBufferGeometry,
    Mesh,
    WebGLRenderer,
    RGBFormat,
    RepeatWrapping,
    Color,
    MeshBasicMaterial,
} from 'three';
import { Maze } from './life-like';
let maze: Maze | undefined = undefined;
export function amazing(width: number, height: number, widthSeed: number, heightSeed: number): void {
    document.body.classList.add('center-container');

    if (!maze) {
        maze = new Maze(width, height, widthSeed, heightSeed);
    }
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 800;
    const scene = new Scene();
    scene.background = new Color(0, 0, 0);
    const texture = new DataTexture(maze.buffer, width, height, RGBFormat);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const geometry = new BoxBufferGeometry(400, 400, 400);
    const material = new MeshBasicMaterial({ map: texture });
    const mesh = new Mesh(geometry, material);

    scene.add(mesh);

    document.body.appendChild(renderer.domElement);

    function renderStep(): void {
        material.map.dispose();
        material.map = new DataTexture(maze.buffer, width, height, RGBFormat);
    }

    function animate() {
        requestAnimationFrame(animate);
        maze.step();
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        renderStep();
        renderer.render(scene, camera);
    }

    animate();
}
