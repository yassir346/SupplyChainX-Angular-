export interface RawMaterialRequest {
  name: string;
  stock: number;
  stockMin: number;
  unit: string;
}

export interface RawMaterialResponse extends RawMaterialRequest {
  id: number; // Assuming your backend returns an ID
}
