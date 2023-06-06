import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IComplessiComponent } from './i-complessi.component';

describe('IComplessiComponent', () => {
  let component: IComplessiComponent;
  let fixture: ComponentFixture<IComplessiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IComplessiComponent]
    });
    fixture = TestBed.createComponent(IComplessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
