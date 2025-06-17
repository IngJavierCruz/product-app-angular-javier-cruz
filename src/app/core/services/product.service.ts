import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
const host = "https://fakestoreurl.com";

@Injectable({providedIn: "root"})
export class ProductService {
  private http = inject(HttpClient);
  private url = `${host}/products`;

  constructor() {}

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  add(product: any) {
    return this.http.post(this.url, product);
  }

  update(product: any) {
    const url = `${this.url}/${product.id}`;
    return this.http.put(url, product);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}