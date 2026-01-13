export interface SupplyOrderRequest {
  orderDate: string;
  supplierId: number;
  status: string;
  rawMaterials: RawMaterialQuantity[];
}

export interface RawMaterialQuantity {
  rawMaterialId: number;
  quantity: number;
}

export interface SupplyOrderResponse {
  id: number;
  date: string;
  status: string;
  supplier: { id: number; name: string; contact: string; rating: number };
  rawMaterialResponseList: { id: number; name: string; quantity: number }[];
}
