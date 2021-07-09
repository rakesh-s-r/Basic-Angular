import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/providers/product.service';
import { Product } from 'src/types/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  collection: Product[];
  constructor(
    private service: ProductService
  ) { }

  ngOnInit() {
    this.service.observeSearchItem().subscribe((res) => {
      if (res) {
        this.getSearchedProduct(res.value);
      }
    })
    this.service.getProducts().subscribe((res) => {
      this.collection = res;
    })
  }

  getSearchedProduct(value) {
    this.service.searchProduct(value).subscribe((res) => {
      this.collection = res;
    })
  }
}
