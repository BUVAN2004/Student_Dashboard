import { Component , OnInit} from '@angular/core';
import { HomeService, UserStudent } from '../Services/Backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css'
})
export class PlacementComponent implements OnInit {
  companyData : UserStudent['companiesRegistered'] = [] as any;
  studentId : string = '';
  constructor(private service : HomeService) {}
  ngOnInit() : void {
    this.service.getStudentDetail().subscribe({
      next: (data) => {
        this.studentId = data.StudentData.id;
        this.companyData = data.StudentData.companiesRegistered;
        console.log('Response:', data);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });;
    console.log(this.companyData);
  }
  getOffer(companyData : any) : number {
    let offer = 0;
    for(let i = 0; i < companyData.length; i++) {
      if(companyData[i].status === 'Selected') {
        offer++;
      }
    }
    return offer;
  }
  getAttended(companyData : any) : number {
    let attend = 0;
    for(let i = 0; i < companyData.length; i++) {
      if(companyData[i].companyAttendedDate) {
        attend++;
      }
    }
    return attend;
  }
  getAverage(companyData : any) : number {
    let average = 0;
    for(let i = 0; i < companyData.length; i++) {
      if(companyData[i].roundsCleared) {
        average += companyData[i].roundsCleared;
      }
    }
    return average/companyData.length;
  }

  uploadFile(event : any) {
    const file = event.target.files[0];
    this.service.postResume(this.studentId, file).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }
  downloadResume(){
    if (this.studentId){
      this.service.getResume(this.studentId).subscribe((res) => {
        const blob = new Blob([res], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.click();
      });
    } else {
      console.log("Filename is required to download");
    }
  }
  
}
