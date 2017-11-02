import { Component, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Machine } from '../../model/machine.model';
import { ReportRepository } from '../../model/report.repository';
import { Report } from '../../model/report.model';
import { Operator } from '../../model/operator.model';
import { ReportTable } from '../../model/reportTable.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.sass']
})
export class ReportListComponent implements OnChanges {
          reports: Report[] = [];
   selectedReport: Report;
   dateFilterForm: FormGroup;
  dateFilterStart: Date;
    dateFilterEnd: Date;
   creatingReport= false;
         machines: Machine[];
        operators: Operator[];
      showDetails: boolean;

  constructor(private repo: ReportRepository,
              private fb: FormBuilder) {

    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate() - 1);
    const dateEnd = new Date();
    dateEnd.setDate(dateStart.getDate());
    this.dateFilterStart = dateStart;
    this.dateFilterEnd = dateEnd;

    this.createForm();
    this.dateFilterChange();

    this.getReports();
    repo.getMachines().subscribe( machines => this.machines = machines);
    repo.getOperators().subscribe( operators => this.operators = operators);
  }

  ngOnChanges() {
    this.dateFilterForm.setValue({
      dateFilterStart: this.dateFilterStart,
      dateFilterEnd: this.dateFilterEnd
    });
    this.getReports();
  }

  onChangedReportOfArray() {
    this.getReports();
  }

  selectReport(report: Report) {
    this.selectedReport = report;
    this.showDetails = false;
  }

  createReport() {
    this.creatingReport = true;
    const report: Report = new Report(

    );
    report.date = new Date();
    report.machine = new Machine();
    report.shiftOneOrders = new ReportTable();
    report.shiftOneOrders.operator = new Operator();
    report.shiftOneOrders.orders = [];
    report.shiftTwoOrders = new ReportTable();
    report.shiftTwoOrders.operator = new Operator();
    report.shiftTwoOrders.orders = [];
    this.selectedReport = report;
    this.showDetails = true;
  }

  createForm() {
    this.dateFilterForm = this.fb.group({
      dateFilterStart: new Date(),
      dateFilterEnd: new Date()
    });
  }

  getReports() {
    this.repo.getReports().subscribe( data => {
      this.reports = data.filter( (report) => {
        const date = new Date(report.date);
        return this.compareDates(date, this.dateFilterStart) >= 0 &&
               this.compareDates(date, this.dateFilterEnd) <= 0;
      });
    });
  }

  dateFilterChange() {
    const dateStartControl = this.dateFilterForm.get('dateFilterStart');
    const dateEndControl = this.dateFilterForm.get('dateFilterEnd');
    dateStartControl.valueChanges.forEach( (value: Date) => {
      this.dateFilterStart = new Date(value);
      this.getReports();
    });
    dateEndControl.valueChanges.forEach( (value: Date) => {
      this.dateFilterEnd = new Date(value);
      this.getReports();
    });
  }

  compareDates(date1: Date, date2: Date) {
    const date1Date = date1.getDate();
    const date1Month = date1.getMonth();
    const date1Year = date1.getFullYear();

    const date2Date = date2.getDate();
    const date2Month = date2.getMonth();
    const date2Year = date2.getFullYear();

    if (date1Year > date2Year) {
      return 1;
    } else if (date1Year < date2Year) {
      return -1;
    } else if (date1Month > date2Month) {
      return 1;
    } else if (date1Month < date2Month) {
      return -1;
    } else if (date1Date > date2Date) {
      return 1;
    } else if (date1Date < date2Date) {
      return -1;
    } else {
      return 0;
    }
  }

  displayDetails() {
    this.showDetails = true;
  }
}
