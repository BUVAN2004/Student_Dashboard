import { Component, OnInit } from '@angular/core';
import { HomeService, UserStudent } from '../Services/Backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pslevel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pslevel.component.html',
  styleUrl: './pslevel.component.css'
})
export class PslevelComponent implements OnInit {
  psskill : UserStudent["psSkill"] = [] as any;

  constructor(private service : HomeService){}
  ngOnInit() {
       this.service.getStudentDetail().subscribe({
        next: (data) => {
          this.psskill = data.StudentData.psSkill;
          console.log('Response:', data.StudentData.psSkill);
        },
        error: (error: any) => {
          console.error('Error:', error);
        }
      });;
  }

}
