import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/Products/Products.component';
import { HomeComponent } from './pages/Home/Home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		path: '**',
		redirectTo: 'home'
	}
];
