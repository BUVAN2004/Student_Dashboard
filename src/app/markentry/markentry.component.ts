import { Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button'; 
import { HomeService, Student } from '../Services/Backend.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { fullstackmark } from '../Services/Backend.service';

@Component({
  selector: 'app-markentry',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './markentry.component.html',
  styleUrls: ['./markentry.component.css'],
})
export class MarkEntryComponent {
  faculty : any = {};
  students : Student[] = [] as any;
  data : fullstackmark = [] as any;
  stages : string[] = [] as any;
  marks : Number[] = [] as any;
  selectedStage : number | null = null;
  service: HomeService = inject(HomeService); 
  MatDialog: MatDialog = inject(MatDialog);
  
  // constructor(private service : HomeService){}
  ngOnInit(){
    const user = JSON.parse(sessionStorage.getItem('user')??'');
    this.faculty = user;
    this.service.getAllStudents().subscribe({
      next : (data) => {
        this.students = data.StudentData;
        console.log('Response:', data);
      },
      error : (error : any) => {
        console.error('Error:', error);
      }
    });
    this.service.getMarks().subscribe({
      next : (data) => {
        this.stages = data.fullstackmarks.stages.map((stage) => stage.stageName)
        this.data = data.fullstackmarks;
        console.log(data);
      }
    })

  }

  searchTerm: string = '';
  selectedStudent: Student | null  = null; // Allow null values
  
 get filterStudents() {
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.id.includes(this.searchTerm)
    );
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.resetMarks();
  }
  stageSelected  = signal(false);
  selectedParameters : fullstackmark['stages'][0]['parameters'] = [];
  @ViewChild("dialog") dialog !: TemplateRef <any>
  openDialog(i : number) {
    this.selectedStage = i;
    this.marks = new Array(this.data.stages[i].parameters.length).fill(0);
    const params = this.data.stages.find((stage) => stage.stageName === this.stages[i]);
    if(!params) return;
   
    this.stageSelected.set(true);
    this.selectedParameters = params.parameters;
  }

  collapsed = signal(false)

  width = computed(() => this.collapsed() ? '65px' : '225px')

  resetMarks() {
   this.marks = new Array(this.stages.length).fill(0);
  }

  calculateTotal(): number {
    return 0
  }

  submitMarks() {
    console.log('Marks submitted for:', this.selectedStudent);
    console.log('Marks:', this.marks);
    console.log('marks' , this.marks);
    console.log(this.selectedStudent?.id);
    console.log(this.selectedStage);
    if(this.selectedStage === null || this.selectedStudent === null) return;
    // if(!this.selectedStudent || !this.selectedStage) return;  
    this.service.postStudentMarks( this.selectedStudent.id, this.stages[this.selectedStage], this.marks ).subscribe((res) => {
        console.log(res);
        alert('Marks Submitted Successfully for ' + this.selectedStudent?.name);
        this.stageSelected.set(false);
    })
  }
}
