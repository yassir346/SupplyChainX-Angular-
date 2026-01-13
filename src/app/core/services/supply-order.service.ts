import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SupplyOrderRequest, SupplyOrderResponse} from '../../models/supply-order.model';

@Injectable({
  providedIn: 'root',
})
export class SupplyOrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/supply_order';

  getAll(): Observable<SupplyOrderResponse[]> {
    return this.http.get<SupplyOrderResponse[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<SupplyOrderResponse> {
    return this.http.get<SupplyOrderResponse>(`${this.apiUrl}/${id}`);
  }

  create(request: SupplyOrderRequest): Observable<SupplyOrderResponse> {
    return this.http.post<SupplyOrderResponse>(`${this.apiUrl}/add`, request);
  }

  updateStatus(id: number, status: string): Observable<SupplyOrderResponse> {
    return this.http.patch<SupplyOrderResponse>(`${this.apiUrl}/update/${id}`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
