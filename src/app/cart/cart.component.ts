import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/providers/product.service';
import { Product } from 'src/types/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  collection: Product[];
  constructor(
    private service: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.service.getCartItems().subscribe((res) => {
      this.collection = res;
    })
  }
}
