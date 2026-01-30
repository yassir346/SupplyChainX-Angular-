import { createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import {CustomerState} from '../../../../models/customer.model';

export const initialState: CustomerState = {
  query: { page: 0, size: 10, sort: 'name,asc', search: '' },
  customers: [],
  selectedCustomer: null,
  totalElements: 0,
  totalPages: 0,
  loadingList: false,
  loadingDetail: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    error: error
  })),
  on(CustomerActions.loadCustomers, (state, { params }) => ({
    ...state,
    query: params,
    loadingList: true,
    error: null
  })),
  on(CustomerActions.loadCustomersSuccess, (state, { data }) => ({
    ...state,
    loadingList: false,
    customers: data.content,
    totalElements: data.totalElements,
    totalPages: data.totalPages
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    error: error
  }))
);
