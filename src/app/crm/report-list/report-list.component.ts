import { Component, OnInit } from '@angular/core';
import { Machine } from '../../model/machine.model';
import { ReportRepository } from '../../model/report.repository';
import { Report } from '../../model/report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.sass']
})
export class ReportListComponent implements OnInit {
  reports: Report[];
  selectedReport: Report;

  constructor(private repo: ReportRepository) {
    repo.getReports().subscribe( report => this.reports = report );
  }

  ngOnInit() {

  }

  selectReport(report: Report) {
    this.selectedReport = report;
  }

}
