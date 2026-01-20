import { createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import {CustomerState} from '../../../../models/customer.model';

export const initialState: {
  query: { page: number; size: number; sort: string; search: string };
  customers: any[];
  totalElements: number;
  totalPages: number;
  loadingList: boolean;
  error: null
} = {
  query: { page: 0, size: 10, sort: 'name,asc', search: '' },
  customers: [],
  totalElements: 0,
  totalPages: 0,
  loadingList: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state) => ({ ...state, loadingList: true })),
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
