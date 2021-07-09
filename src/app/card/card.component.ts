import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/providers/product.service';
import { Product } from 'src/types/product';
import Alert from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: Product;
  @Input() type: string;
  @Output() refresh = new EventEmitter<any>();
  constructor(
    private service: ProductService
  ) { }

  ngOnInit(): void { }

  getImage() {
    if(this.data.image) {
      return this.data.image;
    }
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7UVilRoRD5F7bi5TidbZBpLXbpAsQGXMtrWxPaYM8oDKS4OyiN3tbRjdh_OCB_BDMSYk&usqp=CAU'
  }

  addCart() {
    this.service.addCart(this.data.id).subscribe((res) => {
      Alert.fire({
        title: 'Success',
        icon: 'success',
        text: 'Product successfully added to cart',
        timer: 1500
      })
    },(e) => {
      if(((e || {}).error || {}).message == "Product is already in cart"){
        Alert.fire({
          title: 'Error',
          icon: 'error',
          text: 'Product is already in cart',
          timer: 1500
        })
      }
    })
  }

  removeCartItem() {
    this.service.removeCartProduct(this.data.cartid).subscribe((res) => {
      Alert.fire({
        title: 'Success',
        icon: 'success',
        text: 'Product successfully removed from cart',
        timer: 1500
      })
      this.refresh.emit(true);
    })
  }
}
