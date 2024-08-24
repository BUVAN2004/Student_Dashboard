import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

interface Faculty {
  id: number; // 3-digit ID
  name: string;
  department: string; // Engineering-related departments
  deptShortName: string; // Short form of the department name
  hasAccess: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatTableModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  admin = {
    name: 'Admin',
    role: 'Super Admin'
  };

  faculties: Faculty[] = [
    { id: 101, name: 'Arun Kumar', department: 'Computer Science and Engineering', deptShortName: 'CSE', hasAccess: false },
    { id: 102, name: 'Priya Ramesh', department: 'Electronics and Communication Engineering', deptShortName: 'ECE', hasAccess: false },
    { id: 103, name: 'Karthik Vijay', department: 'Information Technology', deptShortName: 'IT', hasAccess: false },
    { id: 104, name: 'Meena Srinivasan', department: 'Electrical and Electronics Engineering', deptShortName: 'EEE', hasAccess: false },
    { id: 105, name: 'Raj Mohan', department: 'Mechanical Engineering', deptShortName: 'MECH', hasAccess: false },
    { id: 106, name: 'Asha Lakshmi', department: 'Mechatronics Engineering', deptShortName: 'MECH', hasAccess: false },
    { id: 107, name: 'Dinesh Kumar', department: 'Biotechnology', deptShortName: 'Biotech', hasAccess: false },
    { id: 108, name: 'Nisha Ramachandran', department: 'Biomedical Engineering', deptShortName: 'BME', hasAccess: false },
    { id: 109, name: 'Sanjay Krishnan', department: 'Textile Engineering', deptShortName: 'Textile', hasAccess: false },
    { id: 110, name: 'Pooja Chandran', department: 'Fashion Technology', deptShortName: 'Fashion', hasAccess: false },
    { id: 111, name: 'Ramesh Kumar', department: 'Information Science Engineering', deptShortName: 'ISE', hasAccess: false },
    { id: 112, name: 'Anjali Gupta', department: 'Computer Science and Business Systems', deptShortName: 'CSBS', hasAccess: false },
    { id: 113, name: 'Vikram Singh', department: 'Computer Science and Design', deptShortName: 'CSD', hasAccess: false },
    { id: 114, name: 'Neha Sharma', department: 'Civil Engineering', deptShortName: 'Civil', hasAccess: false },
    { id: 115, name: 'Suresh Babu', department: 'Agricultural Engineering', deptShortName: 'Agri', hasAccess: false }
];

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

  toggleAccess(faculty: Faculty) {
    faculty.hasAccess = !faculty.hasAccess;
  }

  get filteredFaculties() {
    return this.faculties.filter(faculty =>
      faculty.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}