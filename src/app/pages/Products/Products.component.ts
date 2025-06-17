import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { COLUMNS } from './Config';
import { Product } from '../../core/models/Product';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  imports: [
    MatTableModule, MatPaginatorModule
  ],
  styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit {
  columns: string[] = COLUMNS;
  dataSource: Product[] = [];
  constructor() { }

  ngOnInit() {
  }

}
