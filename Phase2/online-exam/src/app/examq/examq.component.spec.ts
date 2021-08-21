import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamqComponent } from './examq.component';

describe('ExamqComponent', () => {
  let component: ExamqComponent;
  let fixture: ComponentFixture<ExamqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
