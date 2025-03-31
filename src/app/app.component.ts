import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CanvasHostComponent} from './canvas-host/canvas-host.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CanvasHostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'threejs';
}
