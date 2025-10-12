import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

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

    this.onResize();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 5);
    this.scene.add(cube);
    this.scene.add(light);
    this.camera.position.z = 5;

    this.renderer.setAnimationLoop(() => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
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
}
