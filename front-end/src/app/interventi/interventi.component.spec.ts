import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventiComponent } from './interventi.component';

describe('InterventiComponent', () => {
  let component: InterventiComponent;
  let fixture: ComponentFixture<InterventiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterventiComponent]
    });
    fixture = TestBed.createComponent(InterventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
