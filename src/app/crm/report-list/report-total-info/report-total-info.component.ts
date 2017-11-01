import { Component, OnChanges , OnInit, Input } from '@angular/core';
import { Report, TotalInfo } from '../../../model/report.model';
import { Order } from '../../../model/order.model';

@Component({
  selector: 'app-report-total-info',
  templateUrl: './report-total-info.component.html',
  styleUrls: ['./report-total-info.component.sass']
})
export class ReportTotalInfoComponent implements OnChanges {
  @Input() report: Report;
  reportTotalInfo: TotalInfo[] = [];
  orders: Order[] = [];
  productTypes: string[];

  constructor() {
  }

  ngOnChanges() {
    this.orders = this.getOrders();
    this.productTypes = this.getProductTypes();
    this.reportTotalInfo = this.getReportTotalInfo();
  }

  getProductTypes() {
    const obj = new Object();
    this.orders.map( order => {
      obj[order.productName] = true;
    });
    return Object.keys(obj);
  }

  getOrders() {
    const arr1: Order[] = this.report.shiftOneOrders.orders;
    const arr2: Order[] = this.report.shiftTwoOrders.orders;
    return arr1.concat(arr2);
  }

  getReportTotalInfo() {
    const info: TotalInfo[] = [];
    this.productTypes.map( prodName => {
      const newLine: TotalInfo = {
        productName: prodName,
        topAmount: 0,
        botAmount: 0
      };
      this.orders.map( order => {
        if (order.productName === prodName) {
          newLine.botAmount += order.amountBot;
          newLine.topAmount += order.amountTop;
        }
      });
      info.push(newLine);
    });
    return info;
  }
}
