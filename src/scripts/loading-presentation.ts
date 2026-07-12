import * as THREE from 'three';
import { animate, stagger } from 'animejs';
import 'animejs/adapters/three';

const loader = document.querySelector<HTMLElement>('.loading-presentation');
const canvas = document.querySelector<HTMLCanvasElement>('.loading-canvas');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (loader && canvas && !reduced) {
  document.documentElement.classList.add('intro-active');
  let renderer: THREE.WebGLRenderer | undefined;
  let frame = 0;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5c37e, .075);
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, .1, 100);
    camera.position.set(0, 2.1, 9.5);
    scene.add(new THREE.AmbientLight(0xffe5b2, 2.2));
    const light = new THREE.PointLight(0xff7a20, 18, 28);
    light.position.set(0, 2.5, 3);
    scene.add(light);

    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.15, 48, 32), new THREE.MeshBasicMaterial({ color: 0xf47b20 }));
    sun.position.set(0, 1.65, -1.6); scene.add(sun);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(1.65, 40, 28), new THREE.MeshBasicMaterial({ color: 0xffb44d, transparent: true, opacity: .18, side: THREE.BackSide }));
    halo.position.copy(sun.position); scene.add(halo);
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-.15, -4.2, 4), new THREE.Vector3(-1.8, -2.2, 2),
      new THREE.Vector3(1.5, -.7, .3), new THREE.Vector3(-.5, .4, -1.1),
    ]);
    const trail = new THREE.Mesh(new THREE.TubeGeometry(curve, 100, .14, 10), new THREE.MeshStandardMaterial({ color: 0xf8dfad, roughness: .85 }));
    scene.add(trail);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), new THREE.MeshStandardMaterial({ color: 0x143f29, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -2.4; ground.position.z = -1; scene.add(ground);

    const butterflies = [-2.7, 2.5, -1.8].map((x, index) => {
      const group = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({ color: index === 1 ? 0xe04b1e : 0xf39a25, side: THREE.DoubleSide });
      const wing = new THREE.Shape(); wing.moveTo(0, 0); wing.quadraticCurveTo(.65, .5, .85, -.05); wing.quadraticCurveTo(.45, -.45, 0, 0);
      const geometry = new THREE.ShapeGeometry(wing);
      const left = new THREE.Mesh(geometry, material), right = new THREE.Mesh(geometry, material);
      right.scale.x = -1; group.add(left, right);
      group.position.set(x, 1.1 + index * .55, -.2 - index);
      group.scale.setScalar(.42); scene.add(group); return group;
    });
    animate(sun, { scale: [.72, 1], duration: 1800, ease: 'out(3)' });
    animate(halo, { scale: [.85, 1.25], opacity: [.08, .23], duration: 1900, loop: true, alternate: true, ease: 'inOutSine' });
    butterflies.forEach((butterfly, index) => {
      const baseY = butterfly.position.y;
      animate(butterfly, { y: [baseY - .12, baseY + .16], rotateZ: [-.1, .14], duration: 900, delay: index * 130, loop: true, alternate: true, ease: 'inOutSine' });
    });
    const resize = () => { if (!renderer) return; renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
    const render = () => { renderer?.render(scene, camera); frame = requestAnimationFrame(render); };
    resize(); render(); window.addEventListener('resize', resize);
  } catch { canvas.style.display = 'none'; }

  animate('.loading-brand > *', { opacity: [0, 1], y: [24, 0], duration: 850, delay: stagger(130, { start: 350 }), ease: 'out(3)' });
  animate('.loading-progress span', { width: ['0%', '100%'], duration: 4450, ease: 'inOut(2)' });
  const close = () => {
    animate(loader, { opacity: [1, 0], scale: [1, 1.025], duration: 650, ease: 'in(2)', onComplete: () => { cancelAnimationFrame(frame); loader.remove(); document.documentElement.classList.remove('intro-active'); } });
  };
  const timer = window.setTimeout(close, 4850);
  loader.querySelector('.loading-skip')?.addEventListener('click', () => { clearTimeout(timer); close(); });
} else if (loader) {
  loader.remove();
}
