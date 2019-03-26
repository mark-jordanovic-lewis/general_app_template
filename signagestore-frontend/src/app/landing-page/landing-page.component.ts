import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service'
import { ProductService } from '../product.service'
import { IndexProduct, ShowProduct } from '../product';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  products: IndexProduct[];
  selected: boolean;
  product: ShowProduct;

  constructor(
    private messageService: MessageService,
    private productService: ProductService
  ) { this.log("landing page up"); }

  ngOnInit(): void {
    this.productService
        .products()
        .subscribe(products => this.products = products);
  }

  view(product_id): void {
    this.productService
        .product(product_id)
        .subscribe(selection => {
          this.product = selection
          this.selected = true
        });
  }

  deselect(): void {
    this.selected = false;
  }

  purchase(product_id): void {
    this.productService
        .purchase(product_id)
        .subscribe(
          purchaseMessage => {
            this.log(purchaseMessage.message)
            this.view(product_id);
          },
          err => this.log(`Could not purchase item#${product_id}`)
        )
  }

  private log(message: string): void {
    this.messageService.add(`LandingPageComponent: ${message}`);
  }
}
