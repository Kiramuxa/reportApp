import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTotalInfoComponent } from './report-total-info.component';

describe('ReportTotalInfoComponent', () => {
  let component: ReportTotalInfoComponent;
  let fixture: ComponentFixture<ReportTotalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTotalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTotalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
