import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// MODULES
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
// SERVICES
import { ProductService } from '@services/product.service';
import { SweetAlertService } from '@services/sweet-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
// MODELS
import { Product } from '@models/Product';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-Product',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "wrapper-dialog",
  },
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  private productService = inject(ProductService);
  private spinnerService = inject(NgxSpinnerService);
  private alertService = inject(SweetAlertService);
  private dialogRef = inject(MatDialogRef<ProductComponent>);
  private data = inject(MAT_DIALOG_DATA);
  form!: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit() {
    this.data && this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  loadData() {
    this.form.patchValue(this.data);
  }

  closeDialog(product?: Product) {
    this.dialogRef.close(product);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      if (this.data) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    } else {
      this.alertService.showAlertWarning('Completa los campos requeridos');
    }
  }

  createProduct() {
    const data = this.form.getRawValue();
    this.spinnerService.show();
    this.subscription.add(
      this.productService.add(data)
      .subscribe({
        next: (product: Product) => {
          this.alertService.showSuccess('Producto creado');
          this.closeDialog(product);
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

  updateProduct() {
    const data = this.form.getRawValue();
    this.spinnerService.show();
    this.subscription.add(
      this.productService.update(data)
      .subscribe({
        next: (product: Product) => {
          this.alertService.showSuccess('Producto actualizado');
          this.closeDialog(product);
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
