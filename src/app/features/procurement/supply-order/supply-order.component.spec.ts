import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyOrderComponent } from './supply-order.component';

describe('SupplyOrderComponent', () => {
  let component: SupplyOrderComponent;
  let fixture: ComponentFixture<SupplyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplyOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyOrderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
