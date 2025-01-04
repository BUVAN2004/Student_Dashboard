import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Faculty, HomeService, fullstackmark } from '../Services/Backend.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatTableModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatCardModule, MatToolbarModule, MatDividerModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  admin : any = {};
  faculties: Faculty[] = [] as any;
  marks : fullstackmark = {} as any;

  constructor(private service : HomeService,public MatDialog : MatDialog){}
  ngOnInit(){
    this.service.getMarks().subscribe({
      next : (data) => {
        this.marks = data.fullstackmarks;
        console.log(this.marks);
      }
    })
    this.admin = JSON.parse(sessionStorage.getItem('user')??'');
    this.service.getAllFaculties().subscribe({
      next : (data) => {
        this.faculties = data.facultyData;
        console.log('Response:', data);
      },
      error : (error : any) => {
        console.error('Error:', error);
      }
    });
 }
  placementUpdate = {
    title: '',
    message: '',
    attachments: [] as File[]
  };

  searchTerm: string = '';

  onFileChange(event: any) {
    this.placementUpdate.attachments = Array.from(event.target.files);
  }

  sendPlacementUpdate() {
    console.log('Placement Update:', this.placementUpdate);
    alert('Placement update sent!');
    this.placementUpdate = { title: '', message: '', attachments: [] };
  }

  toggleAccess(facultyData : Faculty) {
    this.service.postFacultyAccess(facultyData).subscribe({
      next : (data) => {
        console.log('Response:', data);
      },
      error : (error : any) => {
        console.error('Error:', error);
      }
    });
    console.log(facultyData);
  }

  get filteredFaculties() {
    return this.faculties.filter(faculty =>
      faculty.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  @ViewChild ("dialog") dialog !: TemplateRef <any>
  openDialog(): void {
    this.MatDialog.open(this.dialog, {
      data: this.marks,
      width: '90vw', 
      height: 'auto', 
      maxWidth: '100vw', // Optional: Prevents dialog from being constrained to default max width
      maxHeight: '100vh', // Optional: Prevents dialog from being constrained to default max height
      // panelClass: 'custom-dialog-container' // Optional: Add a custom class for more control
    });
  }

  // Add a new stage
  addStage(): void {
    this.marks.stages.push({
      stageName: '',
      description: '',
      parameters: []
    });
  }

  // Remove a stage
  removeStage(stageIndex: number): void {
    if (stageIndex > -1) {
      this.marks.stages.splice(stageIndex, 1);
    }
  }

  // Add a new parameter to a stage
  addParameter(stageIndex: number): void {
    this.marks.stages[stageIndex].parameters.push({
      parameterName: '',
      maxMark: 0
    });
  }

  // Remove a parameter from a stage
  removeParameter(stageIndex: number, paramIndex: number): void {
    if (paramIndex > -1) {
      this.marks.stages[stageIndex].parameters.splice(paramIndex, 1);
    }
  }

  OnPost(){
    this.service.putUpdateMarks(this.marks).subscribe((res) => {
        console.log('Marks Data sent successfully');
    })
  }
  
}