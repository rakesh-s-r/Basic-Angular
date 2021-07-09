import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from '../types/product'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serverUrl: string = environment.serverUrl;
  public search = new Subject<any>();
  constructor(
    public http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.serverUrl}/get-products`);
  }

  addCart(id) {
    return this.http.post<Product>(`${this.serverUrl}/add-cart/${id}`, undefined);
  }

  getCartItems() {
    return this.http.get<Product[]>(`${this.serverUrl}/get-cart-items`);
  }

  removeCartProduct(id) {
    return this.http.delete(`${this.serverUrl}/delete-cart-item/${id}`);
  }

  observeSearchItem() {
    return this.search.asObservable();
  }

  searchProduct(value) {
    return this.http.get<Product[]>(`${this.serverUrl}/get-searched-product?searchText=${value}`);
  }
}
