import {Component, inject, signal} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplyOrderService} from '../../../core/services/supply-order.service';
import {SupplierService} from '../../../core/services/supplier.service';
import {RawMaterialService} from '../../../core/services/raw-material.service';

@Component({
  selector: 'app-supply-order',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './supply-order.component.html',
  styleUrl: './supply-order.component.css',
})
export class SupplyOrderComponent {
  private fb = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  private orderService = inject(SupplyOrderService);
  private rawMaterialService = inject(RawMaterialService);

  suppliers = signal<any[]>([]);
  orders = signal<any[]>([]);
  rawMaterialsList = signal<any[]>([]);

  orderForm = this.fb.group({
    supplierId: [null as number | null, Validators.required],
    orderDate: [new Date().toISOString().split('T')[0], Validators.required],
    rawMaterials: this.fb.array([]) // Dynamic list
  });

  ngOnInit() {
    this.supplierService.getAllSuppliers().subscribe(data => this.suppliers.set(data));
    this.loadOrders();
    this.rawMaterialService.getAllMaterials().subscribe(data => {
      this.rawMaterialsList.set(data);
    });
  }

  get rawMaterialsFormArray() {
    return this.orderForm.controls['rawMaterials'] as FormArray;
  }

  addMaterial() {
    const materialGroup = this.fb.group({
      rawMaterialId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.rawMaterialsFormArray.push(materialGroup);
  }

  removeMaterial(index: number) {
    this.rawMaterialsFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.orderService.create(this.orderForm.value as any).subscribe({
        next: (newOrder) => {
          this.orders.update(prev => [newOrder, ...prev]);
          this.orderForm.reset({ orderDate: new Date().toISOString().split('T')[0] });
          this.rawMaterialsFormArray.clear();
        }
      });
    }
  }

  loadOrders() {
    this.orderService.getAll().subscribe(data => this.orders.set(data));
  }
}
