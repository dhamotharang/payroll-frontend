import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../admin/employee/employee';
import { EmployeeService } from '../admin/employee.service';
import { UtilitiesService } from '../services/utilities.service';
import { MatAutocompleteTrigger } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  title = 'payroll-system';

  employees: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'manage'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  subscription: Subscription;

  error = '';
  success = '';

  // Create de default constructor if possible.
  employee : any;//new Employee('', '', '', '', '', '', '', 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '');

  updateMode = false;

  constructor(private employeeService: EmployeeService,
              private utilitiesService: UtilitiesService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): any {
    this.employeeService.getAll().subscribe(
      (res: Employee[]) => {
        this.employees = new MatTableDataSource(res);
        this.employees.paginator = this.paginator;
        this.employees.sort = this.sort;
      }
    );
  }

  getEmployee(id): void {
    this.employeeService.getEmployee(id).subscribe(
      (res: Employee) => {
        this.employee = res;
      }
    );
  }

  encryptParams(EmpId, userId?): string{
    if (EmpId && userId) {
      return this.utilitiesService.Encrypt(userId + ' ' + EmpId);
    } else if (EmpId && !userId) {
      return this.utilitiesService.Encrypt(EmpId);
    } else return null;
  }

  getUserObject(empId, userId?){
    if (empId && userId) {
      let params = {empId:this.encryptParams(empId), userId:this.encryptParams(userId)};
      return params;
    } else if (empId && !userId) {
      let params = {empId:this.encryptParams(empId)};
      return params;
    }
  }
  
  applyFilter(filterValue: string) {
    this.employees.filter = filterValue.trim().toLowerCase();

    if (this.employees.paginator) {
      this.employees.paginator.firstPage();
    }
  }
}
