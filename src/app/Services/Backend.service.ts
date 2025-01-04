
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

export interface Faculty {
    id:  string,
    name:  string, 
    email:  string, 
    department:  string,
    Designation:  string ,
    hasAccess : boolean
}
export interface Student{
  id : string,
  name : string,
  department : string,
  score : number,
  deptRank : number,
  placementRank : number
}
export interface UserStudent extends Student{
  currentPlacementFa: number;
  cummulativeFa: number;
  attendance: number;
  placementType: string;
  yearOfStudy: string;

  placementAttendance: number;
  batch: string;
  placementRank: number;
  deptRank: number;
  score: number;

  companiesRegistered: {
    companyName: string;
    companyRegisteredDate: Date;
    companyAttendedDate: Date;
    roundsCleared: number;
    status: string;
  }[];

  psSkill: {
    language: string;
    completedStatus: {
      level: number;
      attempts: number;
      clearedDate: Date;
    }[];
  }[];
}
export interface placement{
  title : string;
  description : string;
  link : string;
  startDate : Date;
  endDate : Date;
}
export interface fullstackmark{
  title: string,
  stages: {
        stageName: string,
        description : string,
        parameters: {
            parameterName: string,
            maxMark: Number,
        }[]
    }[]
}


@Injectable({
    providedIn : 'root'
})
export class HomeService {
  private studentData : UserStudent = {} as any;
  getpsData(){
    const data = JSON.parse(sessionStorage.getItem('user')??'');
    let psSkill;
    this.http.get<{message : string , StudentData: UserStudent}>(environment.STUDENT_PAGE_URL +'/'+data.id).subscribe({
      next: (data) => {
        psSkill = data.StudentData.psSkill;
        this.studentData = data.StudentData; // Correctly accessing StudentData from the response
        console.log('Response:', data);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
    return psSkill;
  }
  getCompanyData(){
    const data = JSON.parse(sessionStorage.getItem('user')??'');
    const student = this.http.get<{message : string , StudentData: UserStudent}>(environment.STUDENT_PAGE_URL +'/'+data.id).subscribe({
      next: (data) => {
        this.studentData = data.StudentData; // Correctly accessing StudentData from the response
        console.log('Response:', data);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
    console.log(this.studentData)
    return this.studentData.companiesRegistered;
  }
  constructor(private http: HttpClient) { }

  //Admin Page
  getAllFaculties(){
    return this.http.get<{message : string , facultyData: Faculty[]}>(environment.ADMIN_PAGE_URL)
  }
  postFacultyAccess(facultyData : Faculty){
    const body = {id : facultyData.id , hasAccess : facultyData.hasAccess};
    return this.http.put<{message : string}>(environment.ADMIN_PAGE_FACULTY_ACCESS_URL,facultyData)
  }
  //Faculty Page
  getAllStudents(){
    return this.http.get<{message : string , StudentData: Student[]}>(environment.FACULTY_PAGE_URL)
  }

  //Dashboard Page
  getStudentDetail(){
    const data = JSON.parse(sessionStorage.getItem('user')??'');
    return this.http.get<{message : string , StudentData: UserStudent}>(environment.STUDENT_PAGE_URL +'/'+data.id)
  }

  //Placement Data
  getPlacementUpdates(){
    return this.http.get<{message : string , placementUpdates: placement[]}>(environment.PLACEMENT_UPDATES_URL)
  }

  getMarks(){
    return this.http.get<{message :string, fullstackmarks : fullstackmark}>(environment.FULL_STACK_MARK_URL)
  }

  putUpdateMarks(marks : fullstackmark){
    return this.http.put<{message : string, fullstackmarks : fullstackmark}>(environment.FULL_STACK_MARK_UPDATE_URL,marks)
  }

  postStudentMarks(id : string, stage : string, marks : Number[]){
    console.log(id, stage, marks);
    return this.http.post<{message : string}>(environment.STUDENT_MARK_ENTRY_URL + '/' + id, {stageName : stage, marks : marks})
  }

  postResume(id : string, resume : File){
    const fileData = new FormData()
    fileData.append('file' , resume)
    return this.http.post<{message : string}>(environment.UPLOAD_RESUME_URL + '/' + id, fileData)
  }
  getResume(id : string){
    return this.http.get(environment.DOWNLOAD_RESUME_URL + '/' + id,  {responseType: 'blob'})
  }
}