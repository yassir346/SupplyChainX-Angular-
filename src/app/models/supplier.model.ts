export interface SupplierRequest{
  name: string;
  contact: string;
  rating: number;
  rawMaterialList: { rawMaterialId: number }[];
}

export interface SupplierResponse extends SupplierRequest{
  id: number;
}

