// For sending data to the Backend
export interface BomRequest {
  rawMaterialId: number;
  quantityPerProduct: number;
}

export interface ProductRequest {
  name: string;
  productionTime: number;
  cost: number;
  stock: number;
  billOfMaterialRequestList: BomRequest[];
}

export interface BomResponse {
  billOfMaterialId: number;
  productName: string;
  productStock: number;
  rawMaterialName: string;
  rawMaterialStock: number;
  quantityTypePerProduct: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  productionTime: number;
  cost: number;
  stock: number;
  billOfMaterialResponseList: BomResponse[];
}
