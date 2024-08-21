import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
