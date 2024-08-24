import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Student {
  RegNo: string;
  Name: string;
  Dept: string;
  rank: number;
  DeptRank: number;
  Score: number;
}

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  students: Student[] = Array.from({ length: 100 }, (_, index) => {
    const score = Math.floor(Math.random() * 100); 
    const department = ['EC', 'IT', 'CS', 'CI', 'TX']; // Department short names
    const deptIndex = index % 5;
    const regNo = `7376221${department[deptIndex]}${(index + 1).toString().padStart(3, '0')}`;

    return {
      RegNo: regNo,
      Name: `Student ${index + 1}`,
      Dept: ['B.E Electronics and Communication Engineering', 'B.Tech Information Technology', 'B.E Computer Science Engineering',
            'B.E Civil Engineering', 'B.Tech Textile Engineering'][deptIndex],
      rank: 0, 
      DeptRank: 0, 
      Score: score
    };
  });

  dataSource = new MatTableDataSource(this.students);

  searchTerm: string = '';
  minRank: number = 0;
  maxRank: number = 100;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.calculateRanks(); 
  }

  calculateRanks(): void {
 
    this.students.sort((a, b) => b.Score - a.Score);
    this.students.forEach((student, index) => {
      student.rank = index + 1; 
    });

    
    const deptWiseStudents = this.students.reduce((acc, student) => {
      acc[student.Dept] = acc[student.Dept] || [];
      acc[student.Dept].push(student);
      return acc;
    }, {} as Record<string, Student[]>);

    for (const dept in deptWiseStudents) {
      deptWiseStudents[dept].sort((a, b) => b.Score - a.Score); // Sort by score descending
      deptWiseStudents[dept].forEach((student, index) => {
        student.DeptRank = index + 1; // Department rank
      });
    }
  }

  searchByRegNo(): void {
    const searchTermParts = this.searchTerm.split('_');
    if (searchTermParts.length === 3) {
      const searchRegNo = parseInt(searchTermParts[2], 10);
      if (!isNaN(searchRegNo)) {
        this.dataSource.data = this.students.filter(
          (student) => student.RegNo.endsWith(`_${searchRegNo}`)
        );
      } else {
        this.dataSource.data = this.students;
      }
    } else {
      this.dataSource.data = this.students;
    }
    this.dataSource.paginator?.firstPage(); // Reset to the first page after search
  }

  filterByRanking(): void {
    this.dataSource.data = this.students.filter(
      (student) =>
        student.rank >= this.minRank && student.rank <= this.maxRank
    );
    this.dataSource.paginator?.firstPage(); // Reset to the first page after filtering
  }
}