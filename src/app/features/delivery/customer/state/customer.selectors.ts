import { createFeatureSelector, createSelector } from '@ngrx/store';
import {CustomerState} from '../../../../models/customer.model';

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const selectAllCustomers = createSelector(selectCustomerState, (state) => state.customers);
export const selectIsLoading = createSelector(selectCustomerState, (state) => state.loadingList);

// This now returns the full CustomerSearchParams object (page, size, sort, search)
export const selectPagination = createSelector(selectCustomerState, (state) => state.query);

export const selectTotalElements = createSelector(selectCustomerState, (state) => state.totalElements);
export const selectTotalPages = createSelector(selectCustomerState, (state) => state.totalPages);
