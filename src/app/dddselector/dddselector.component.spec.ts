import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DddselectorComponent } from './dddselector.component';

describe('DddselectorComponent', () => {
  let component: DddselectorComponent;
  let fixture: ComponentFixture<DddselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DddselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DddselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
