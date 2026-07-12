import * as THREE from 'three';
import { animate } from 'animejs';
import 'animejs/adapters/three';

const canvas = document.querySelector<HTMLCanvasElement>('.experience-three');
const host = document.querySelector<HTMLElement>('.experience-path');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && host && !reduceMotion && window.innerWidth > 650) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-8, 8, 3.7, -3.7, 0.1, 100);
    camera.position.set(0, 4.5, 12);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffe7b5, 0x174c32, 2.5));
    const sun = new THREE.DirectionalLight(0xffb04f, 3.2);
    sun.position.set(-4, 7, 8);
    scene.add(sun);

    const points = [
      new THREE.Vector3(-7.3, -2.25, 0), new THREE.Vector3(-5.6, 1.35, .3),
      new THREE.Vector3(-2.9, 1.85, -.2), new THREE.Vector3(-.7, -1.75, .15),
      new THREE.Vector3(2.25, -1.6, -.15), new THREE.Vector3(4.2, 1.75, .3),
      new THREE.Vector3(7.1, -1.1, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', .42);
    const path = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 140, .095, 10, false),
      new THREE.MeshStandardMaterial({ color: 0xc8752c, roughness: .72, metalness: .08 })
    );
    scene.add(path);

    const stationTimes = [.08, .34, .61, .88];
    const markers = stationTimes.map((time, index) => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(.31, .39, .16, 24), new THREE.MeshStandardMaterial({ color: 0x174c32, roughness: .58 }));
      const orb = new THREE.Mesh(new THREE.SphereGeometry(.2, 24, 16), new THREE.MeshStandardMaterial({ color: index % 2 ? 0xf3a13f : 0xd94b24, emissive: 0x6b210c, emissiveIntensity: .32 }));
      orb.position.y = .31;
      group.add(base, orb);
      group.position.copy(curve.getPointAt(time));
      group.position.z += .18;
      scene.add(group);
      return group;
    });

    const walker = new THREE.Group();
    const dark = new THREE.MeshStandardMaterial({ color: 0x123f2a, roughness: .65 });
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(.18, .62, 6, 12), dark);
    torso.position.y = .75;
    const head = new THREE.Mesh(new THREE.SphereGeometry(.2, 20, 14), dark);
    head.position.y = 1.42;
    const makeLimb = (x: number, y: number, length: number) => {
      const limb = new THREE.Mesh(new THREE.CapsuleGeometry(.07, length, 4, 8), dark);
      limb.position.set(x, y, 0); return limb;
    };
    const leftLeg = makeLimb(-.12, .18, .55), rightLeg = makeLimb(.12, .18, .55);
    const leftArm = makeLimb(-.29, .79, .45), rightArm = makeLimb(.29, .79, .45);
    walker.add(torso, head, leftLeg, rightLeg, leftArm, rightArm);
    walker.scale.setScalar(.7);
    scene.add(walker);

    markers.forEach((marker, index) => {
      const baseY = marker.position.y;
      animate(marker, { scale: [.9, 1.14], y: [baseY, baseY + .12], duration: 1700, delay: index * 180, loop: true, alternate: true, ease: 'inOutSine' });
    });
    animate(leftLeg, { rotateZ: [-.42, .42], duration: 620, loop: true, alternate: true, ease: 'inOutSine' });
    animate(rightLeg, { rotateZ: [.42, -.42], duration: 620, loop: true, alternate: true, ease: 'inOutSine' });
    animate(leftArm, { rotateZ: [.35, -.35], duration: 620, loop: true, alternate: true, ease: 'inOutSine' });
    animate(rightArm, { rotateZ: [-.35, .35], duration: 620, loop: true, alternate: true, ease: 'inOutSine' });

    const updateSize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.left = -8; camera.right = 8; camera.top = 8 * height / width; camera.bottom = -8 * height / width;
      camera.updateProjectionMatrix();
    };
    let scrollProgress = 0;
    const updateScroll = () => {
      const rect = host.getBoundingClientRect();
      scrollProgress = Math.min(1, Math.max(0, (innerHeight * .78 - rect.top) / (rect.height + innerHeight * .6)));
      const point = curve.getPointAt(scrollProgress);
      const tangent = curve.getTangentAt(Math.min(.999, scrollProgress));
      walker.position.copy(point).add(new THREE.Vector3(0, .16, .28));
      walker.rotation.z = Math.atan2(tangent.y, tangent.x) - Math.PI / 2;
    };
    const render = () => { renderer.render(scene, camera); requestAnimationFrame(render); };
    updateSize(); updateScroll(); render();
    host.classList.add('three-ready');
    window.addEventListener('resize', updateSize);
    window.addEventListener('scroll', updateScroll, { passive: true });
  } catch { canvas.remove(); }
}
