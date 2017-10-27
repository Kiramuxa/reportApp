import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReportTable } from '../../../model/reportTable.model';
import { Report } from '../../../model/report.model';
import { Order } from '../../../model/order.model';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.sass']
})
export class ReportDetailComponent implements OnChanges {

  @Input() report: Report;
  reportForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.createForm();
  }

  ngOnChanges() {
    this.reportForm.reset();
    this.setShiftReport(this.report);
  }

  createForm() {
    this.reportForm = this.builder.group({
      date: [ new Date(), Validators.required ],
      machine: [ '', Validators.required ],
      shiftOneOrders: this.builder.group({
        operator: [ '', Validators.required ],
        reportTable: this.builder.array([])
      }),
      shiftTwoOrders: this.builder.group({
        operator: [ '', Validators.required ],
        reportTable: this.builder.array([])
      })
    });
  }

  get reportTable1(): FormArray {
      return this.reportForm.get('shiftOneOrders.reportTable') as FormArray;
  }

  get reportTable2(): FormArray {
    return this.reportForm.get('shiftTwoOrders.reportTable') as FormArray;
  }

  addOneShiftOrder() {
    this.reportTable1.push(this.builder.group(new Order()));
  }

  addTwoShiftOrder() {
    this.reportTable2.push(this.builder.group(new Order()));
  }

  setShiftReport(report: Report) {
    const reportOrdersFGs1 = report.shiftOneOrders.orders.map(order => this.builder.group(order));
    console.log(reportOrdersFGs1);
    const reportOrdersFGs2 = report.shiftTwoOrders.orders.map(order => this.builder.group(order));

    const reportFormArray1 = this.builder.array(reportOrdersFGs1);
    const reportFormArray2 = this.builder.array(reportOrdersFGs2);

    this.reportForm.setControl('shiftOneOrders.reportTable', reportFormArray1);
    this.reportForm.setControl('shiftTwoOrders.reportTable', reportFormArray2);
  }

  removeOrder(reportTable: FormArray, index: number) {
    reportTable.removeAt(index);
  }
}
