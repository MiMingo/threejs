import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Color, Points, Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'app-canvas-host',
  imports: [],
  templateUrl: './canvas-host.component.html',
  styleUrl: './canvas-host.component.scss',
})
export class CanvasHostComponent implements AfterViewInit {
  @ViewChild('canvasRef') canvas!: ElementRef<HTMLCanvasElement>;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  constructor() {}

  ngAfterViewInit() {
    // this.canvas.nativeElement.width = window.innerWidth;
    // this.canvas.nativeElement.height = window.innerHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvas.nativeElement.width / this.canvas.nativeElement.height,
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas.nativeElement,
    });

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.onResize();

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 5);

    const points1 = this.getPointSphere(new Color('red'), new Vector3(0, 0, 0));
    const points2 = this.getPointSphere(
      new Color('blue'),
      new Vector3(0.2, 0, 0),
    );
    const points3 = this.getPointSphere(
      new Color('green'),
      new Vector3(-0.2, 0, 0),
    );
    this.scene.add(points1, points2, points3);
    this.scene.add(light);
    this.camera.position.z = 50;

    let t = 0;
    this.renderer.setAnimationLoop(() => {
      t += 0.01 % (2 * Math.PI);
      points1.rotation.x += 0.002;
      points1.rotation.y += 0.002;
      points2.rotation.x += 0.002;
      points2.rotation.y -= 0.003;
      points3.rotation.x += 0.002;
      points2.rotation.y += 0.0015;
      this.renderer.render(this.scene, this.camera);
    });
  }

  animate(): void {
    this.renderer.render(this.scene, this.camera);
  }

  onResize(): void {
    this.camera.aspect =
      this.canvas.nativeElement.clientWidth /
      this.canvas.nativeElement.clientHeight;
    this.renderer.setSize(
      this.canvas.nativeElement.clientWidth,
      this.canvas.nativeElement.clientHeight,
      false,
    );
    this.camera.updateProjectionMatrix();
  }

  getPointSphere(color: Color, offset: Vector3): Points {
    const geometry = new THREE.SphereGeometry(20);
    const material = new THREE.PointsMaterial({
      color,
      size: 5,
      sizeAttenuation: false,
    });
    const points = new THREE.Points(geometry, material);
    points.position.set(offset.x, offset.y, offset.z);
    return points;
  }
}
