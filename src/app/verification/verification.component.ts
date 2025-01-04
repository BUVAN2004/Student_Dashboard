import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeService, Student } from '../Services/Backend.service';
import { inject } from '@angular/core';

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
    MatPaginatorModule
  ],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  students: Student[] = []; // Array to hold fetched student data
  dataSource = new MatTableDataSource<Student>([]); // Initialize with empty array

  searchTerm: string = '';
  minRank: number = 0;
  maxRank: number = 100;

  service = inject(HomeService);

  ngOnInit(): void {
    // Fetching students from service
    this.service.getAllStudents().subscribe({
      next: (data: { message: string; StudentData: Student[] }) => {
        this.students = data.StudentData //.sort((a, b) => a.placementRank - b.placementRank); // Assign fetched data to students array
        this.dataSource = new MatTableDataSource(this.students); // Update DataSource
        this.dataSource.paginator = this.paginator; // Attach paginator after data fetch
      },
      error: (err) => {
        console.error('Error fetching student data:', err);
      },
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }  
  searchByRegNo(): void {
    console.log('Search Term:', this.searchTerm); // Log search term
  
    if (this.searchTerm.trim()) {
      const searchTermLower = this.searchTerm.trim().toLowerCase();
      this.dataSource.data = this.students.filter((student) =>
        student.id.toLowerCase().includes(searchTermLower)
      );
    } else {
      console.warn('Search term is empty or invalid.');
      this.dataSource.data = this.students;
    }
  
    console.log('Filtered Data:', this.dataSource.data); // Log filtered data
    this.dataSource.paginator?.firstPage(); // Reset paginator to first page
  }
  

  filterByRanking(): void {
    // Filter by rank range
    this.dataSource.data = this.students.filter(
      (student) =>
        (student.placementRank ?? Infinity) >= this.minRank &&
        (student.placementRank ?? -Infinity) <= this.maxRank
    );
    this.dataSource.paginator?.firstPage(); // Reset paginator to first page
  }
}
