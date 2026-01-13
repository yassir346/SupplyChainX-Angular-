import {Component, inject, OnInit, signal} from '@angular/core';
import {SupplierService} from '../../../core/services/supplier.service';
import {SupplierRequest, SupplierResponse} from '../../../models/supplier.model';
import {CommonModule} from '@angular/common';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {RawMaterialService} from '../../../core/services/raw-material.service';

@Component({
  selector: 'app-supplier',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css',
})
export class SupplierComponent implements OnInit{
  private supplierService = inject(SupplierService);
  private rawMaterialService = inject(RawMaterialService);

  private fb = inject(FormBuilder);
  public suppliers = signal<SupplierResponse[]>([]);
  availableMaterials = signal<any[]>([]);
  selectedMaterialIds = signal<number[]>([]);

  supplierForm = this.fb.group({
    name: ['', Validators.required],
    contact: ['', [Validators.required]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
  })

  ngOnInit(): void {
    this.loadSuppliers();
    this.rawMaterialService.getAllMaterials().subscribe(data => {
      this.availableMaterials.set(data);
    });
  }

  toggleMaterials(id: number){
    this.selectedMaterialIds.update(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  }

  loadSuppliers(){
    this.supplierService.getAllSuppliers().subscribe(data => this.suppliers.set(data));

  }

  onSubmit() {
    if (this.supplierForm.valid) {
      const requestPayload: SupplierRequest = {
        name: this.supplierForm.value.name!,
        contact: this.supplierForm.value.contact!,
        rating: this.supplierForm.value.rating!,
        rawMaterialList: this.selectedMaterialIds().map(id => ({
          rawMaterialId: id
        }))
      };

      this.supplierService.create(requestPayload).subscribe({
        next: (newSupplier: SupplierResponse) => {
          this.suppliers.update(list => [...list, newSupplier]);
          this.supplierForm.reset({ rating: 5 });
          this.selectedMaterialIds.set([]);
        },
        error: (err) => {
          console.error('Check your Java DTO mapping or Backend logs:', err);
        }
      });
    }
  }

  onDelete(id: number) {
    this.supplierService.delete(id).subscribe(() => {
      this.suppliers.update(list => list.filter(s => s.id !== id));
    });
  }

}
