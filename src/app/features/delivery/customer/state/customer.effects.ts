import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerActions } from './customer.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {CustomerService} from '../../../../core/services/customer.service';
import {Router} from '@angular/router';

@Injectable()
export class CustomerEffects {

  private actions$ = inject(Actions);
  private customerService = inject(CustomerService);
  private router = inject(Router)

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      // 1. Listen only for the 'Load Customers' action
      ofType(CustomerActions.loadCustomers),
      // 2. Switch to the Service call
      mergeMap(({ params }) =>
        this.customerService.getCustomers(params).pipe(
          // 3. If successful, dispatch 'Success' action with the data
          map(data => CustomerActions.loadCustomersSuccess({ data })),
          // 4. If error, dispatch 'Failure' action
          catchError(error => of(CustomerActions.loadCustomersFailure({ error })))
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(({ id }) =>
        this.customerService.deleteCustomer(id).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ id })),
          catchError(error => of(CustomerActions.deleteCustomerFailure({ error })))
        )
      )
    )
  );

  handleDeleteFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomerFailure),
      tap(({ error }) => {
        const message = error.status === 500 ?
          "Cannot delete customer with active orders!" :
          "An error occurred while deleting.";

        alert(message);
      })
    ), { dispatch: false }
  );

  createCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.createCustomer),
      mergeMap(({ customer }) =>
        this.customerService.createCustomer(customer).pipe(
          map(newCustomer => CustomerActions.createCustomerSuccess({ customer: newCustomer })),
          tap(() => this.router.navigate(['/delivery/customers'])), // Navigate back on success
          catchError(error => of(CustomerActions.createCustomerFailure({ error })))
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      mergeMap(({ id, customer }) =>
        this.customerService.updateCustomer(id, customer).pipe(
          map(updated => CustomerActions.updateCustomerSuccess({ customer: updated })),
          tap(() => this.router.navigate(['/delivery/customers'])),
          catchError(error => of(CustomerActions.updateCustomerFailure({ error })))
        )
      )
    )
  );
}
