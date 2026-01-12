import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SupplierRequest, SupplierResponse} from '../../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'http://localhost:8080/supplier';
  private http = inject(HttpClient);

  getAllSuppliers(){
    return this.http.get<SupplierResponse[]>(`${this.apiUrl}/`);
  }

  create(supplierRequest: SupplierRequest){
    return this.http.post<SupplierResponse>(`${this.apiUrl}/add`, supplierRequest);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
