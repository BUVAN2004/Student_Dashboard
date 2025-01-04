import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

interface login {
  message : string , 
  user : { 
    id: string,
    name: string,
    email: string,
    department: string,
    Designation: string,
    userType: string,
    hasAccess ?: boolean
   }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient , private route : Router) { }

  login(email : string , password : string){
    this.http.post<login>(environment.LOGIN_URL, {
      email,
      password
    }).subscribe({
      next: (data: login) => {
        console.log('Response:', data);
        if (data?.user?.userType) {
          sessionStorage.setItem('user', JSON.stringify(data.user));
          console.log(data);
    
          switch (data.user.userType) {
            case 'SuperAdmin':
              this.route.navigateByUrl('/admin/home');
              break;
            case 'Student':
              this.route.navigateByUrl('/main/dashboard');
              break;
            case 'Faculty':
              if(data.user.hasAccess){
                this.route.navigateByUrl('/admin/faculty');
              }else{
                this.route.navigateByUrl('/');
                alert("You have No Access to entry. Please contact your administrator");
              }
              break;
            default:
              alert('Invalid Credentials');
              this.route.navigateByUrl('');
          }
        } else {
          alert('Invalid response format');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
      }
    });
  }
}
