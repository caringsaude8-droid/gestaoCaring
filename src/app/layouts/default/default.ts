import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './default.html',
  styleUrl: './default.css',
})
export class Default {

}
