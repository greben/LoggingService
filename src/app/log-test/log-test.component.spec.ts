import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTestComponent } from './log-test.component';

describe('LogTestComponent', () => {
  let component: LogTestComponent;
  let fixture: ComponentFixture<LogTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
