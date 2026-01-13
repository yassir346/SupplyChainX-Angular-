import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guards';
import {SupplyOrderComponent} from './features/procurement/supply-order/supply-order.component';

export const routes: Routes = [
  // Authentication
  { path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },

  // Procurement Module (Approvisionnement)
  {
    path: 'procurement',
    canActivate: [authGuard],
    children: [
      // { path: 'dashboard', loadComponent: () => import('./features/procurement/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'suppliers', loadComponent: () => import('./features/procurement/supplier/supplier.component').then(m => m.SupplierComponent) },
      { path: 'materials', loadComponent: () => import('./features/procurement/raw-material/raw-material.component').then(m => m.RawMaterialComponent) },
      { path: 'orders', loadComponent: () => import('./features/procurement/supply-order/supply-order.component').then(m => m.SupplyOrderComponent) },
    ]
  },

  // Production Module
  {
    path: 'production',
    children: [
  //     { path: 'dashboard', loadComponent: () => import('./features/production/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'products', loadComponent: () => import('./features/production/product/product.component').then(m => m.ProductComponent) },
  //     { path: 'orders', loadComponent: () => import('./features/production/orders.component').then(m => m.OrdersComponent) },
    ]
  },

  // // Delivery Module (Livraison)
  // {
  //   path: 'delivery',
  //   children: [
  //     { path: 'dashboard', loadComponent: () => import('./features/delivery/dashboard.component').then(m => m.DashboardComponent) },
  //     { path: 'customers', loadComponent: () => import('./features/delivery/customers.component').then(m => m.CustomersComponent) },
  //     { path: 'orders', loadComponent: () => import('./features/delivery/orders.component').then(m => m.OrdersComponent) },
  //     { path: 'deliveries', loadComponent: () => import('./features/delivery/deliveries.component').then(m => m.DeliveriesComponent) },
  //   ]
  // },
  //
  // // Admin Module
  // {
  //   path: 'admin',
  //   children: [
  //     { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard.component').then(m => m.DashboardComponent) },
  //     { path: 'users', loadComponent: () => import('./features/admin/users.component').then(m => m.UsersComponent) },
  //   ]
  // },
  //
  // Default redirect
  { path: 'home', loadComponent: () => import('./features/home-page/home-page')
      .then(m => m.HomePage)},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
