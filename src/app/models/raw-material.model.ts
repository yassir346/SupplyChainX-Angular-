export interface RawMaterialRequest {
  name: string;
  stock: number;
  stockMin: number;
  unit: string;
  supplierIds: number[];
}

export interface RawMaterialResponse extends RawMaterialRequest {
  id: number;
  supplierNames: string[];
}
