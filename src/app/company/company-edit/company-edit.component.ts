import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Company } from '../../model/company';
import { CompanyService } from '../../service/company.service';

@UntilDestroy()
@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit {
  companyId: number | null;
  isNewCompany = false;

  formGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    checkPhone: [false],
    phone: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // ngOnChanges(changes: SimpleChange): void {}

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['id'] as number;
    this.isNewCompany = !this.companyId;

    if (!this.isNewCompany)
      this.companyService
        .getCompany(this.companyId)
        .subscribe((company) => this.formGroup.patchValue(company));

    this.formGroup
      .get('checkPhone')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) {
          this.formGroup.get('phone').setValidators(Validators.required);
        } else {
          this.formGroup.get('phone').removeValidators(Validators.required);
        }
        this.formGroup.get('phone').updateValueAndValidity();
      });
  }

  saveCompany(): void {
    const { valid, value } = this.formGroup;
    if (valid) {
      if (this.isNewCompany) this.addCompany(value);
      else this.updateCompany(value);
    }
  }

  updateCompany(value: Company): void {
    const company = <Company>{
      ...value,
      id: this.companyId,
    };
    this.companyService.updateCompany(company);
    //   .subscribe((company) => {
    //   console.log('updated: ' + company.id);
    //   this.router.navigate(['company/list']);
    // });
    this.router.navigate(['company/list']);
  }

  addCompany(value: Company): void {
    this.companyService.addCompany(value);
    // .subscribe(() => this.router.navigate(['company/list']));
    this.router.navigate(['company/list']);
  }
}
