import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AziendeComponent } from './aziende.component';

describe('AziendeComponent', () => {
  let component: AziendeComponent;
  let fixture: ComponentFixture<AziendeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AziendeComponent]
    });
    fixture = TestBed.createComponent(AziendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
