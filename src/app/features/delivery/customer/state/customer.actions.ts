import { createActionGroup, props, emptyProps } from '@ngrx/store';
import {CustomerSearchParams} from '../../../../models/customer.model';

export const CustomerActions = createActionGroup({
  source: 'Customer Module',
  events: {
    'Load Customers': props<{ params: CustomerSearchParams }>(),
    'Load Customers Success': props<{ data: any }>(),
    'Load Customers Failure': props<{ error: any }>(),

    'Delete Customer': props<{ id: number }>(),
    'Delete Customer Success': props<{ id: number }>(),
    'Delete Customer Failure': props<{ error: any }>(),

    'Set Search Params': props<{ params: Partial<CustomerSearchParams> }>(),
  }
});
