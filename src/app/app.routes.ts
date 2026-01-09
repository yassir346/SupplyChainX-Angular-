import { Routes } from '@angular/router';

export const routes: Routes = [
  // Authentication
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },

  // Procurement Module (Approvisionnement)
  {
    path: 'procurement',
    children: [
      // { path: 'dashboard', loadComponent: () => import('./features/procurement/dashboard.component').then(m => m.DashboardComponent) },
      // { path: 'suppliers', loadComponent: () => import('./features/procurement/suppliers.component').then(m => m.SuppliersComponent) },
      { path: 'materials', loadComponent: () => import('./features/raw-material/raw-material.component').then(m => m.RawMaterialComponent) },
      // { path: 'orders', loadComponent: () => import('./features/procurement/orders.component').then(m => m.OrdersComponent) },
    ]
  },

  // Production Module
  // {
  //   path: 'production',
  //   children: [
  //     { path: 'dashboard', loadComponent: () => import('./features/production/dashboard.component').then(m => m.DashboardComponent) },
  //     { path: 'products', loadComponent: () => import('./features/production/products.component').then(m => m.ProductsComponent) },
  //     { path: 'orders', loadComponent: () => import('./features/production/orders.component').then(m => m.OrdersComponent) },
  //   ]
  // },
  //
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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
