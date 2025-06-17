import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/Products/Products.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
		path: '',
		pathMatch: 'full',
		redirectTo: 'app'
	},
	{
		path: '**',
		redirectTo: 'app'
	}
];
