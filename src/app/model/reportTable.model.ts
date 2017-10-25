import { Operator } from './operator.model';
import { Order } from './order.model';

export class ReportTable {
  operator: Operator;
  orders?: Order[];
}
