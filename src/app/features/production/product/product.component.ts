import {Component, inject, OnInit, signal} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../core/services/product.service';
import {RawMaterialService} from '../../../core/services/raw-material.service';
import {ProductRequest, ProductResponse} from '../../../models/product.model';

@Component({
  selector: 'app-product',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit{
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private rawMaterialService = inject(RawMaterialService);

  products = signal<ProductResponse[]>([]);
  availableMaterials = signal<any[]>([]);

  productForm = this.fb.group({
    name: ['', Validators.required],
    productionTime: [0, [Validators.required, Validators.min(1)]],
    cost: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    billOfMaterialRequestList: this.fb.array([]) // This is our BOM list
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getAll().subscribe(res => this.products.set(res));
    this.rawMaterialService.getAllMaterials().subscribe(res => this.availableMaterials.set(res));
  }

  // Helper to access the FormArray
  get bomArray() {
    return this.productForm.controls['billOfMaterialRequestList'] as FormArray;
  }

  addMaterialRow() {
    const row = this.fb.group({
      rawMaterialId: [null, Validators.required],
      quantityPerProduct: [1, [Validators.required, Validators.min(1)]]
    });
    this.bomArray.push(row);
  }

  removeMaterialRow(index: number) {
    this.bomArray.removeAt(index);
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.create(this.productForm.value as ProductRequest).subscribe({
        next: (newProd) => {
          this.products.update(list => [...list, newProd]);
          this.productForm.reset({
            productionTime: 0,
            cost: 0,
            stock: 0
          });
          this.bomArray.clear();
        }
      });
    }
  }

  onDelete(id: number){
    this.productService.delete(id).subscribe(() => {
      this.products.update(list => list.filter(p => p.id !== id))
    })
  }
}
