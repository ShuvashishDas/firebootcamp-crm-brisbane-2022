import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Company } from '../../model/company';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]>; // $ is added after subscriptions as a convention
  companies: Company[] = [];

  constructor(private companyService: CompanyService) {
    this.getCompanies();
  }

  ngOnInit(): void {}

  getCompanies(): void {
    this.companies$ = this.companyService.getCompanies();
  }

  addCompany(): void {
    this.companies.push(<Company>{
      name: 'Test',
      phone: 6147,
      email: 'sd@yahoo.com',
    });
  }

  deleteCompany(companyId: number): void {
    this.companyService.deleteCompany(companyId);
  }
}
