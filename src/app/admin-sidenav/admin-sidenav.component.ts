import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [MatToolbarModule,MatSidenavModule,MatIcon,RouterOutlet,MatNavList,CommonModule,RouterLink,
    MatListItem,MatIconButton,MatListItemIcon,RouterLinkActive,MatToolbar
  ],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.css'
})
export class AdminSidenavComponent {

  
  userdetails:any = {};
  constructor( private router:Router){}
  ngOnInit():void{
    const details = sessionStorage.getItem('loggedInUser')
    if(details){
      this.userdetails = JSON.parse(details);
    }
  }
  ngAfterViewInit(){
    
    const img = document.getElementById("me");
    const items = document.getElementById('items')!;
    img?.addEventListener('click',function(){
      if(items?.style.display==='none'){
        items.style.display = 'flex';
      }
      else{
        items.style.display = 'none';
      }
    })
    window.addEventListener('click',function(event:Event){
      if(!((event.target as Element).matches('#me'))){
        const menu = document.getElementById('items')!;
        if(menu?.style.display==='flex'){
          menu.style.display = 'none';
        }
      }
    })
  }
  signout(){
    sessionStorage.removeItem('User');
    this.router.navigate(['/']).then(()=>window.location.reload())
  }
  imgerror(){
    console.log('Image ERror')
    if(this.userdetails.picture){
      const img = document.getElementById("me") as HTMLImageElement;
      img.src = this.userdetails.picture
    }
  }
  list = [
    {name:'Admin Portal',path:'ADMIN_PORTAL',icon:'admin_panel_settings'},
    {name:'Faculty Portal',path:'FACULT_YPORTAL',icon:'school'},
    {name:'Student Details',path:'VERFICATION',icon:'book'}
  ]

  collapsed = signal(false);

  width = computed(()=>this.collapsed()?'65px':'240px');

}
