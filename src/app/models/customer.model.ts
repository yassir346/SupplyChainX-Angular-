export interface Customer {
  id?: number;
  name: string;
  address: string;
  city: string;
  ordersCount?: number;
  hasActiveOrders?: boolean;
}

export interface CustomerSearchParams {
  page: number;
  size: number;
  sort: string;
  search: string;
}

export interface CustomerState {
  query: CustomerSearchParams;
  customers: Customer[];
  selectedCustomer: Customer | null;
  totalElements: number;
  totalPages: number;
  loadingList: boolean;
  loadingCreate: boolean;
  error: string | null;
}
