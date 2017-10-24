import { Injectable } from '@angular/core';
import { Report } from './report.model';
import { Order } from './order.model';
import { Operator } from './operator.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportRepository {
  private baseUrl = 'http://localhost:3000';

  constructor( private http: Http ) {
  }

  getReports(): Observable<Report[]> {
    return this.http.get(this.baseUrl + '/reports')
      .map((res: Response) => res.json() as Report[]);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(this.baseUrl + '/orders')
      .map((res: Response) => res.json() as Order[]);
  }

  getOperators(): Observable<Operator[]> {
    return this.http.get(this.baseUrl + '/employees')
      .map((res: Response) => res.json() as Operator[]);
  }
}
