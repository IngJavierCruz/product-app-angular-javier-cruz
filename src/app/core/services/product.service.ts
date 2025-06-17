import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
const host = 'https://fakestoreapi.com';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private url = `${host}/products`;

  constructor() {}

  getAll() : Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  add(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  update(product: Product): Observable<Product> {
    const url = `${this.url}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
