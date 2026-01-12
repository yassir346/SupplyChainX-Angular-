import {Component, inject, OnInit, signal} from '@angular/core';
import {SupplierService} from '../../../core/services/supplier.service';
import {SupplierRequest, SupplierResponse} from '../../../models/supplier.model';
import {CommonModule} from '@angular/common';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-supplier',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css',
})
export class SupplierComponent implements OnInit{
  private supplierService = inject(SupplierService);
  private fb = inject(FormBuilder);
  public suppliers = signal<SupplierResponse[]>([]);

  supplierForm = this.fb.group({
    name: ['', Validators.required],
    contact: ['', [Validators.required]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
  })

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(){
    this.supplierService.getAllSuppliers().subscribe(data => this.suppliers.set(data));
  }

  onSubmit(){
    this.supplierService.create(this.supplierForm.value as SupplierRequest).subscribe({
      next: (newSupplier :SupplierResponse) => {
        this.suppliers.update(list => [...list, newSupplier]);
        this.supplierForm.reset({ rating: 5 });
      }
    })
  }

  onDelete(id: number) {
    this.supplierService.delete(id).subscribe(() => {
      this.suppliers.update(list => list.filter(s => s.id !== id));
    });
  }

}
