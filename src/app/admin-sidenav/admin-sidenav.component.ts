import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [
    MatToolbarModule, MatSidenavModule, MatIcon, RouterOutlet, MatNavList,
    CommonModule, RouterLink, MatListItem, MatIconButton, MatListItemIcon, RouterLinkActive, MatToolbar
  ],
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {
  userdetails: any = {};
  list: { name: string, path: string, icon: string }[] = [];

  collapsed = signal(false);
  width = computed(() => this.collapsed() ? '65px' : '240px');

  constructor(private router: Router) {}

  ngOnInit(): void {
    const details = sessionStorage.getItem('user');
    if (details) {
      this.userdetails = JSON.parse(details);

      // Set menu items based on user role
      if (this.userdetails.userType === 'Faculty') {
        this.list = [
          { name: 'Faculty Portal', path: 'faculty', icon: 'school' },
          { name: 'Student Details', path: 'student', icon: 'book' }
        ];
      } else if (this.userdetails.userType === 'SuperAdmin') {
        this.list = [
          { name: 'Admin Portal', path: 'home', icon: 'admin_panel_settings' },
          { name: 'Faculty Portal', path: 'faculty', icon: 'school' },
          { name: 'Student Details', path: 'student', icon: 'book' }
        ];
      }
    }
  }

  signout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
