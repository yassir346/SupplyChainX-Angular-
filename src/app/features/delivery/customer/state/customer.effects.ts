import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerActions } from './customer.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class CustomerEffects {
  private actions$ = inject(Actions);
  private customerApi = inject(CustomerApi);

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(({ params }) =>
        this.customerApi.getCustomersPaged(params).pipe(
          map(data => CustomerActions.loadCustomersSuccess({ data })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error })))
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(({ id }) =>
        this.customerApi.delete(id).pipe(
          map(() => CustomerActions.loadCustomers({ params: { page: 0, size: 10, sort: 'name,asc', search: '' } })),
          catchError(error => of(CustomerActions.deleteCustomerFailure({ error })))
        )
      )
    )
  );
}
