import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { Company } from '../model/company';
import { TagContentType } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  //API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';
  API_BASE = environment.API_BASE;
  companies$ = new BehaviorSubject<Company[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
    // return this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
    //   tap((companies) => {
    //     console.log('Logging from service: count #' + companies.length);
    //   }),
    //   catchError((e) => this.errorHandler<Company[]>(e)),
    //   finalize(() => console.log('Completed'))
    // );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError((e) => this.errorHandler<Company>(e)));
  }

  deleteCompany(companyId: any): void {
    this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError((e) => this.errorHandler<Company>(e)))
      .subscribe((companies) => this.loadCompanies());
  }

  addCompany(company: Company): void {
    this.httpClient
      .post<Company>(`${this.API_BASE}/company/`, company, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .pipe(
        delay(5000),
        catchError((e) => this.errorHandler<Company>(e))
      )
      .subscribe((companies) => this.loadCompanies());
  }

  updateCompany(company: Company): void {
    this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .pipe(catchError((e) => this.errorHandler<Company>(e)))
      .subscribe((companies) => this.loadCompanies());
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('Error occured: ' + error);
    return new Observable<T>();
  }

  private loadCompanies(): void {
    this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap((companies) => {
          console.log('Logging from service: count #' + companies.length);
        }),
        catchError((e) => this.errorHandler<Company[]>(e)),
        finalize(() => console.log('Completed'))
      )
      .subscribe((companies) => this.companies$.next(companies));
  }

  // getCompanies(): Company[] {
  //   return [
  //     { name: 'Jean Company', email: 'jean@acme.com', phone: 1234567890 },
  //     { name: 'Luke Company', email: 'luke@acme.com', phone: 2345678901 },
  //     { name: 'Matt Company', email: 'matt@acme.com', phone: 3456789012 },
  //   ];
  // }
}
