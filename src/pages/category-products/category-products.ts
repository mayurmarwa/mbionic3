import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CategoryProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category-products',
  templateUrl: 'category-products.html'
})
export class CategoryProductsPage {

    productList: FirebaseListObservable<any>;
    productListRev: Observable<any>;
    category: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

        this.category = navParams.get("category");
        this.productList = af.database.list('/products', { query: { orderByChild: "catid", equalTo: this.category.catid } } ); 
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryProductsPage');
  }
  openproductpage(product) {

      this.navCtrl.push(ProductPagePage, { product: product });
  }
}
