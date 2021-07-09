import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/providers/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  timeout: any = null;
  isLoading: boolean = false;
    constructor(
      private router: Router,
      private service: ProductService
    ) { }

  ngOnInit() { }

  isEnableSearch(){
    if(window.location.href.includes('/cart')){
      return false;
    }
    return true
  }

  navigate(type) {
    this.router.navigateByUrl(`/${type}`);
  }

  setTimer(val: any) {
    let self = this;
    self.isLoading = true;
    val = val.trim();
    val = val.toLowerCase();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(function () {
      self.service.search.next({ value: val });
      self.isLoading = false;
    }, 1000);
  }
}
