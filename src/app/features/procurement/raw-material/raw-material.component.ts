import {Component, OnInit, signal, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RawMaterialService} from '../../../core/services/raw-material.service';
import {RawMaterialRequest, RawMaterialResponse} from '../../../models/raw-material.model';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from '../../../core/services/supplier.service';

@Component({
  selector: 'app-raw-material',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './raw-material.component.html',
  styleUrl: './raw-material.component.css',
})
export class RawMaterialComponent implements OnInit{
    private materialService = inject(RawMaterialService);
    private supplierService = inject(SupplierService);
    private fb = inject(FormBuilder);

    materials = signal<RawMaterialResponse[]>([]);
    suppliers = signal<any[]>([]);
    selectedSupplierIds = signal<number[]>([]);

    materialForm = this.fb.group({
      name: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      stockMin: [0, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required]
    });

    ngOnInit(): void {
      this.loadMaterials();
      this.loadSuppliers();
    }

    loadMaterials(){
      this.materialService.getAllMaterials().subscribe(data => this.materials.set(data));
    }

    loadSuppliers() {
      this.supplierService.getAllSuppliers().subscribe(data => this.suppliers.set(data));
    }

    toggleSupplier(id: number) {
      this.selectedSupplierIds.update(ids =>
        ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
      );
    }

    onSubmit(){
      if(this.materialForm.valid){
        const requestData: RawMaterialRequest = {
          ...this.materialForm.value as any,
          supplierIds: this.selectedSupplierIds()
        };

        this.materialService.create(this.materialForm.value as RawMaterialRequest).subscribe({
          next: (newMaterial) => {
            this.materials.update(list => [...list, newMaterial]);
            this.materialForm.reset();
          },
          error: (err) => console.error('Forbidden or Error:', err)
        });
      }
    }

    onDelete(id: number){
      this.materialService.delete(id).subscribe(() => {
        this.materials.update(list => list.filter(m => m.id !== id));
      });
    }
}
