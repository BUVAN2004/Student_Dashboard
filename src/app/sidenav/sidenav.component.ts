import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import{MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,}from '@angular/material/sidenav'
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ MatSidenav,MatSidenavContainer,MatSidenavContent,
    RouterLink,RouterOutlet,NgFor,MatNavList,MatListItem,RouterLinkActive,
    MatToolbar,MatIcon
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

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
    {name:'HOME',path:'dashboard'},
    {name:'PS-LEVELS',path:'pslevel'},
    {name:'PLACEMENT',path:'placement'}
  ]
}
