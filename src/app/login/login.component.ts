import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../Services/login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email : string | null = null;
  password : string | null = null;
  service : LoginService = inject(LoginService);
 submit () {
  if(!this.email || !this.password) 
      alert('Please Enter Your Credential');
  else {
    this.service.login(this.email,this.password);
  }
 }
}
