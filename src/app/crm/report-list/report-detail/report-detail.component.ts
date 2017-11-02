import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ReportTable } from '../../../model/reportTable.model';
import { Report } from '../../../model/report.model';
import { Order } from '../../../model/order.model';
import { Machine } from '../../../model/machine.model';
import { Operator } from '../../../model/operator.model';
import { ReportRepository } from '../../../model/report.repository';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.sass']
})
export class ReportDetailComponent implements OnChanges {

  @Input() report: Report;
  @Input() machines: Machine[];
  @Input() operators: Operator[];
  @Input() creatingReport: boolean;
  @Input() showDetails: boolean;
  reportForm: FormGroup;
  firstShiftDisplay = false;
  secondShiftDisplay = false;
  @Output() onChangedReportOfArray = new EventEmitter<boolean>();

  constructor(private builder: FormBuilder,
              private repo: ReportRepository) {
    this.createForm();
  }

  ngOnChanges() {
    this.showDetails = false;
    this.setShiftReport();
    this.reportForm.patchValue({
      id: this.report.id,
      date: this.report.date,
      machine: this.report.machine
    });
    this.shiftOneOrders.patchValue({
      operator1: this.report.shiftOneOrders.operator,
    });
    this.shiftTwoOrders.patchValue({
      operator2: this.report.shiftTwoOrders.operator
    });
  }

  createForm() {
    this.reportForm = this.builder.group({
      id: 0,
      date: [ new Date(), Validators.required ],
      machine: '',
      shiftOneOrders: this.builder.group({
        operator1: '',
        reportTable1: this.builder.array([])
      }),
      shiftTwoOrders: this.builder.group({
        operator2: '',
        reportTable2: this.builder.array([])
      })
    });
  }

  get date(): FormControl {
    return this.reportForm.get('date') as FormControl;
  }

  get reportTable1(): FormArray {
      return this.reportForm.get('shiftOneOrders.reportTable1') as FormArray;
  }

  get reportTable2(): FormArray {
    return this.reportForm.get('shiftTwoOrders.reportTable2') as FormArray;
  }

  get shiftOneOrders(): FormGroup {
    return this.reportForm.get('shiftOneOrders') as FormGroup;
  }

  get shiftTwoOrders(): FormGroup {
    return this.reportForm.get('shiftTwoOrders') as FormGroup;
  }

  addOneShiftOrder() {
    this.reportTable1.push(this.builder.group(new Order()));
  }

  addTwoShiftOrder() {
    this.reportTable2.push(this.builder.group(new Order()));
  }

  setShiftReport() {
    const reportOrdersFGs1 = this.report.shiftOneOrders.orders
      .map(order => this.builder.group(order));
    const reportOrdersFGs2 = this.report.shiftTwoOrders.orders
      .map(order => this.builder.group(order));

    const reportFormArray1 = this.builder.array(reportOrdersFGs1);
    const reportFormArray2 = this.builder.array(reportOrdersFGs2);

    this.shiftOneOrders.setControl('reportTable1', reportFormArray1);
    this.shiftTwoOrders.setControl('reportTable2', reportFormArray2);
  }

  removeOrder(reportTable: FormArray, index: number) {
    reportTable.removeAt(index);
  }

  compareFn(c1: Machine, c2: Machine): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareOperator1(c1: Operator, c2: Operator): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareOperator2(c1: Operator, c2: Operator): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  resetForm() {
    this.ngOnChanges();
  }

  toggleSecondShiftDisplay() {
    this.secondShiftDisplay = !this.secondShiftDisplay;
  }

  toggleFirstShiftDisplay() {
    this.firstShiftDisplay = !this.firstShiftDisplay;
  }

  onSubmit() {
    this.report = this.prepareSaveReport();
    if (!this.creatingReport) {
      this.repo.updateReport(this.report)
               .subscribe( () => {
                 setTimeout(() => {
                  this.onChangedReportOfArray.emit();
                 }, 1);
                });
    } else {
      this.repo.createReport(this.report)
      .subscribe( () => {
        setTimeout(() => {
         this.onChangedReportOfArray.emit();
         console.log('сотрудник добавлен!');
        }, 1);
       });
    }
  }

  prepareSaveReport(): Report {
    const formModel = this.reportForm.value;
    const shiftOneOrdersDeepCopy: ReportTable = {
      operator: formModel.shiftOneOrders.operator1 as Operator,
      orders: formModel.shiftOneOrders.reportTable1.map((order: Order) =>
        Object.assign({}, order))
    };
    const shiftTwoOrdersDeepCopy: ReportTable = {
      operator: formModel.shiftTwoOrders.operator2 as Operator,
      orders: formModel.shiftTwoOrders.reportTable2.map((order: Order) =>
        Object.assign({}, order))
    };
    const saveReport: Report = {
      id: formModel.id as number,
      date: formModel.date as Date,
      machine: formModel.machine as Machine,
      shiftOneOrders: shiftOneOrdersDeepCopy,
      shiftTwoOrders: shiftTwoOrdersDeepCopy
    };
    return saveReport;
  }

  deleteReport() {
    this.repo.deleteReport(this.report)
    .subscribe( () => {
      setTimeout(() => {
       this.onChangedReportOfArray.emit();
       console.log('сотрудник удален!');
      }, 1);
     });
  }
}
