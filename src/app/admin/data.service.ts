import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

//////////////////////////////////////////////// open
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Costcentre } from './costcentre/costcentre';
import { Department } from './department/department';
import { Position } from './position/position';
import { PayrollPeriod } from './payrollPeriod/payrollPeriod';
import { Deduction } from './deduction/deduction';
import { Employee } from './employee/employee';
//////////////////////////////////////////////// close

@Injectable({
    providedIn: 'root'
})
export class DataService {

  baseUrl = environment.baseUrl;

  employeeUrl = this.baseUrl + '/employees';
  employee: Employee;
  employees: Employee[];

  costcentreUrl = this.baseUrl + '/costcentres';
  costcentre: Costcentre;
  costcentres: Costcentre[];

  departmentUrl = this.baseUrl + '/departments';
  department: Department;
  departments: Department[];

  positionUrl = this.baseUrl + '/positions';
  position: Position;
  positions: Position[];

  payrollPeriodUrl = this.baseUrl + '/payrollPeriod';
  payrollPeriod: PayrollPeriod;
  payrollPeriods: PayrollPeriod[];

  deductionUrl = this.baseUrl + '/deduction';
  deduction: Deduction;
  deductions: Deduction[];

  constructor(private http: HttpClient) { }//

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeeUrl}/`).pipe(
      map((res) => {
        this.employees = res;
        return this.employees;
    }));
  }

  getAllCostcentres(): Observable<Costcentre[]> {

    return this.http.get<Costcentre[]>(`${this.costcentreUrl}/`).pipe(
      map((res) => {
        this.costcentres = res;
        return this.costcentres;
    }));
  }

  getAllDepartments(): Observable<Department[]> {

    return this.http.get<Department[]>(`${this.departmentUrl}/`).pipe(
      map((res) => {
        this.departments = res;
        return this.departments;
    }));
  }

  getAllPositions(): Observable<Position[]> {

    return this.http.get<Position[]>(`${this.positionUrl}/`).pipe(
      map((res) => {
        // alert('Positions serv: ' + JSON.stringify(res));
        this.positions = res;
        return this.positions;
    }));
  }

  getAllPayrollPeriods(): Observable<PayrollPeriod[]> {

    return this.http.get<PayrollPeriod[]>(`${this.payrollPeriodUrl}/`).pipe(
      map((res) => {
        this.payrollPeriods = res;
        return this.payrollPeriods;
    }));
  }

  getAllDeductions(): Observable<Deduction[]> { // REMOVE METHOD AS IT HAS BEEN MOVED TO DATA SERVICE INSTEAD

    return this.http.get<Deduction[]>(`${this.deductionUrl}/`).pipe(
      map((res) => {
        this.deductions = res;
        return this.deductions;
    }));
  }

}
