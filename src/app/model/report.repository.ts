import { Injectable } from '@angular/core';
import { Report } from './report.model';
import { Order } from './order.model';
import { Operator } from './operator.model';
import { Machine } from './machine.model';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';

import { PROTOCOL, SERVER_URL } from '../constants/globalConfig';

@Injectable()
export class ReportRepository {
  private baseUrl = `${PROTOCOL}://${SERVER_URL}`;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor( private http: Http ) {
  }

  getReports(): Observable<Report[]> {
    return this.http.get(this.baseUrl + '/reports')
      .map((res: Response) => res.json() as Report[]);
  }

  updateReport(report: Report) {
    const oldReport = this.getReports().map(data => {
      data.find(r => r.id === report.id );
    });
    const newReport = Object.assign(oldReport, report);
    return this.http
        .put(this.baseUrl + '/reports/' + report.id,
             JSON.stringify(newReport),
             { headers: this.headers });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(this.baseUrl + '/orders')
      .map((res: Response) => res.json() as Order[]);
  }

  getOperators(): Observable<Operator[]> {
    return this.http.get(this.baseUrl + '/employees')
      .map((res: Response) => res.json() as Operator[]);
  }

  getMachines(): Observable<Machine[]> {
    return this.http.get(this.baseUrl + '/machines')
      .map((res: Response) => res.json() as Machine[]);
  }
}
