import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyService } from './service/company.service';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Brissy is awesome';
  isProduction = environment.production;

  companyCount$: Observable<number> = of(0);
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyCount$ = this.companyService
      .getCompanies()
      .pipe(map((companies) => companies.length));
  }
}
