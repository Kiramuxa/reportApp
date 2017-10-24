import { Operator } from './operator.model';

export class ReportLine {
  innerID = '';
  productName = '';
  amountBot = 0;
  amountTop = 0;
}
export class Report {
  constructor(
    public id?: number,
    public date?: Date,
    public machine?: string,
    public operator?: Operator,
    public shiftOneOrders: ReportLine[] = [],
    public shiftTwoOrders: ReportLine[] = []
  ) { }
}
