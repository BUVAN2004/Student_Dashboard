import { Component, OnInit } from '@angular/core';
import { HomeService, UserStudent , placement} from '../Services/Backend.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UpperCasePipe, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  student: UserStudent = {} as any;
  showWelcomeMessage = true;
  placementUpdates : placement[] = [] as any;

  constructor(private service : HomeService){
    this.placementUpdates.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }
  ngOnInit() {
   this.service.getStudentDetail().subscribe({
    next: (data) => {
      this.student =  data.StudentData;
      console.log('Response:', data);
    },
    error: (error: any) => {
      console.error('Error:', error);
    }
  });;
  this.service.getPlacementUpdates().subscribe({
    next: (data) => {
      this.placementUpdates = data.placementUpdates;
      console.log('Response:', data.placementUpdates);
    },
    error: (error: any) => {
      console.error('Error:', error);
    }
  });;
  }

}
