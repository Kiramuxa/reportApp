import { Operator } from './operator.model';
import { Order } from './order.model';
import { ReportTable } from './reportTable.model';
import { Machine } from './machine.model';

export class Report {
    id: number;
    date = new Date();
    machine?: Machine;
    shiftOneOrders?: ReportTable;
    shiftTwoOrders?: ReportTable;
}
export class TotalInfo {
    productName: string;
    topAmount: number;
    botAmount: number;
}
