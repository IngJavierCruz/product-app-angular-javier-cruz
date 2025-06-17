import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  imports: [RouterModule],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  private router = inject(Router)
  constructor() { }

  ngOnInit() {
  }

  navigateToProduct() {
    this.router.navigate(['products'])
  }

}
