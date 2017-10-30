import { Operator } from './operator.model';
import { Order } from './order.model';
import { ReportTable } from './reportTable.model';

export class Report {
  constructor(
    public id?: number,
    public date = new Date(),
    public machine?: string,
    public shiftOneOrders?: ReportTable,
    public shiftTwoOrders?: ReportTable
  ) { }
}
