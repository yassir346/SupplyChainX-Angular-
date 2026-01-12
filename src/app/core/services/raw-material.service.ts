import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RawMaterialRequest, RawMaterialResponse} from '../../models/raw-material.model';

@Injectable({
  providedIn: 'root',
})
export class RawMaterialService {
  private apiUrl = 'http://localhost:8080/rawMaterial';

  constructor(private http: HttpClient) {}

  getAllMaterials(){
    return this.http.get<RawMaterialResponse[]>(this.apiUrl);
  }

  create(data :RawMaterialRequest){
    return this.http.post<RawMaterialResponse>(`${this.apiUrl}/add`, data);
  }

  delete(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
