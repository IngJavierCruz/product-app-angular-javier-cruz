import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private productService = inject(ProductService);
  protected title = 'product-app-angular-javier-cruz';

  constructor() {}

  ngOnInit() {
    // this.productService.getAll()
    // .subscribe(x => console.log(x))
  }
}
