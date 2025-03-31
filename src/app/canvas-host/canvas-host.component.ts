import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-canvas-host',
  imports: [],
  templateUrl: './canvas-host.component.html',
  styleUrl: './canvas-host.component.scss',
})
export class CanvasHostComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: HTMLCanvasElement;
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  constructor() {}

  ngAfterViewInit() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvas.width / this.canvas.height,
      0.1,
      5,
    );
  }
}
