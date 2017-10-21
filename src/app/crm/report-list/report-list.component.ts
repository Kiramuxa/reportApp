import { Component, OnInit } from '@angular/core';
import { Report } from '../../model/report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.sass']
})
export class ReportListComponent implements OnInit {

  private reports: Report[] = [];
  private isActiveDateFilter = true;

  constructor() { }

  ngOnInit() {
  }

  activateDateFilter() {
    this.isActiveDateFilter = !this.isActiveDateFilter;
  }

}
