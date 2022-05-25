import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Company } from '../../model/company';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTableComponent implements OnInit {
  @Input() companies: Company[];
  @Output() deleteCompanyClicked: EventEmitter<number> = new EventEmitter();

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}

  deleteCompany(companyId: number): void {
    this.deleteCompanyClicked.emit(companyId);
  }

  logChanges(): void {
    console.log('Something changed!!!');
  }
}
