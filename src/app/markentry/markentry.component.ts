import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';

interface Faculty {
  name: string;
  id: string;
  department: string;
  designation: string;
}

interface Student {
  name: string;
  rollNo: string;
}

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
    MatIcon, 
    RouterLink, 
    MatCardContent, 
    MatCard
  ],
  templateUrl: './markentry.component.html',
  styleUrls: ['./markentry.component.css'],
})
export class MarkEntryComponent {
  faculty: Faculty = {
    name: 'John Doe',
    id: 'F12345',
    department: 'Computer Science',
    designation: 'Professor',
  };

  students: Student[] = [
    { name: 'Arjun Kumar', rollNo: 'CSE101' },
    { name: 'Bhavani Rani', rollNo: 'ECE102' },
    { name: 'Chandra Mohan', rollNo: 'ME103' },
    { name: 'Divya Nair', rollNo: 'CSE104' },
    { name: 'Eshwaran Ramesh', rollNo: 'EEE105' },
    { name: 'Fathima Banu', rollNo: 'CSE106' },
    { name: 'Ganesh Kumar', rollNo: 'CIV107' },
    { name: 'Hema Malini', rollNo: 'IT108' },
    { name: 'Ishaan Raj', rollNo: 'CSE109' },
    { name: 'Jaya Lakshmi', rollNo: 'ECE110' },
    { name: 'Karthik Subramanian', rollNo: 'ME111' },
    { name: 'Lakshmi Narayan', rollNo: 'EEE112' },
    { name: 'Manikandan Selvam', rollNo: 'CSE113' },
    { name: 'Nandhini Ravi', rollNo: 'CIV114' },
    { name: 'Oviya Prakash', rollNo: 'IT115' },
    { name: 'Pranav Venkatesh', rollNo: 'CSE116' },
    { name: 'Ravi Shankar', rollNo: 'ECE117' },
    { name: 'Sangeetha Ramesh', rollNo: 'ME118' },
    { name: 'Tharun Kumar', rollNo: 'EEE119' },
    { name: 'Usha Devi', rollNo: 'CSE120' },
    { name: 'Vikram Raj', rollNo: 'CIV121' },
    { name: 'Yashwanth Kumar', rollNo: 'IT122' },
    { name: 'Zara Khan', rollNo: 'CSE123' },
    { name: 'Ananya Iyer', rollNo: 'ECE124' },
    { name: 'Bharath Kumar', rollNo: 'ME125' },
    { name: 'Chitra Devi', rollNo: 'EEE126' },
    { name: 'Dinesh Kumar', rollNo: 'CSE127' },
    { name: 'Eshwari Rani', rollNo: 'CIV128' },
    { name: 'Feroz Khan', rollNo: 'IT129' },
    { name: 'Gokul Raj', rollNo: 'CSE130' },
    { name: 'Harini Mohan', rollNo: 'ECE131' },
    { name: 'Indira Gandhi', rollNo: 'ME132' },
    { name: 'Jayesh Kumar', rollNo: 'EEE133' },
    { name: 'Kavitha Rani', rollNo: 'CSE134' },
    { name: 'Lakshmanan', rollNo: 'CIV135' },
    { name: 'Mohan Raj', rollNo: 'IT136' },
    { name: 'Nithya Sundaram', rollNo: 'CSE137' },
    { name: 'Omar Farooq', rollNo: 'ECE138' },
    { name: 'Pavithra Kannan', rollNo: 'ME139' },
    { name: 'Qadir Ali', rollNo: 'EEE140' },
    { name: 'Ravi Kumar', rollNo: 'CSE141' },
    { name: 'Srinivasan', rollNo: 'CIV142' },
    { name: 'Thirumurugan', rollNo: 'IT143' },
    { name: 'Uday Kumar', rollNo: 'CSE144' },
    { name: 'Vani Ramesh', rollNo: 'ECE145' },
    { name: 'Vishnu Prasad', rollNo: 'ME146' },
    { name: 'Yogesh Kumar', rollNo: 'EEE147' },
    { name: 'Zainab Fatima', rollNo: 'CSE148' },
    { name: 'Aadhav Selvam', rollNo: 'CIV149' },
    { name: 'Bhavani Selvam', rollNo: 'IT150' },
];

  filteredStudents: Student[] = [];
  searchTerm: string = '';
  selectedStudent: Student | null = null;
  marks: { [key: string]: number | null } = {}; // Allow null values
  subjects: string[] = ['UI/UX', 'DOCUMENT', 'PRESENTATION', 'VIVA', 'WORK FLOW'];

  constructor() {
    this.filteredStudents = this.students;
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.rollNo.includes(this.searchTerm)
    );
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.resetMarks();
  }

  collapsed = signal(false)

  width = computed(() => this.collapsed() ? '65px' : '225px')

  resetMarks() {
    this.subjects.forEach(subject => {
      this.marks[subject] = 0; 
    });
  }

  calculateTotal(): number {
    return this.subjects.reduce((total, subject) => total + (this.marks[subject] || 0), 0);
  }

  submitMarks() {
    console.log('Marks submitted for:', this.selectedStudent);
    console.log('Marks:', this.marks);
    this.selectedStudent = null;
  }
}
