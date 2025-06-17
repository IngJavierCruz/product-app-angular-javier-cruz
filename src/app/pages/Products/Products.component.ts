import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { COLUMNS } from './Config';
import { Product } from '../../core/models/Product';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  imports: [MatTableModule, MatPaginatorModule],
  styleUrls: ['./Products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private productService = inject(ProductService);
  subscription = new Subscription();
  columns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProducts() {
    this.subscription.add(
      this.productService.getAll().subscribe({
        next: (products: Product[]) => {
          this.dataSource.data = products;
        },
        error: (e: any) => {
          console.error(e);
        },
      })
    );
  }
}
