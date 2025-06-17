import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// MODELS
import { Product } from '../../core/models/Product';
// MODULES
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
// SERVICES
import { ProductService } from '@services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
// OTHERS
import { COLUMNS } from './COLUMNS';
import { SweetAlertService } from '@services/sweet-alert.service';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  styleUrls: ['./Products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private productService = inject(ProductService);
  private spinnerService = inject(NgxSpinnerService);
  private alertService = inject(SweetAlertService);
  subscription = new Subscription();
  columns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
	isFirstLoadingData = true;

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

  showMessageEmpty() {
		return !this.isFirstLoadingData && this.dataSource.data.length === 0;
	}

  getProducts() {
    this.spinnerService.show();
    this.subscription.add(
      this.productService.getAll().subscribe({
        next: (products: Product[]) => {
          this.dataSource.data = products;
        },
        error: (e: any) => {
          console.error(e);
          this.alertService.showError(e.message)
        },
      })
      .add(() => {
        this.spinnerService.hide();
        this.isFirstLoadingData = false;
      })
    );
  }

  editProduct(product: Product){}

  async confirmRemoveProduct(product: Product) {
    const firstNameProduct = product.title.split(' ')[0];
    const text = `¿Eliminar el producto ${firstNameProduct}?`;
    if (await this.alertService.showDeleteConfirmationAlert({text})) {
      this.removeProduct(product);
    }
  }

  removeProduct(product: Product) {
    this.spinnerService.show();
    this.subscription.add(
      this.productService.remove(product.id!)
      .subscribe({
        next: () => {
          this.alertService.showSuccess('Producto eliminado')
          const newData = this.dataSource.data.filter(x => x.id !== product.id!);
          this.dataSource.data = newData;
        },
        error: (e: any) => {
          console.error(e);
          this.alertService.showError(e.message)
        },
      })
      .add(() => {
        this.spinnerService.hide();
      })
    );
  }
}
