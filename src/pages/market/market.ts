import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { CategoryProductsPage } from '../category-products/category-products';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { Observable } from 'rxjs/Observable';



/*
  Generated class for the Market page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-market',
  templateUrl: 'market.html'
})
export class MarketPage {

    productList: FirebaseListObservable<any>;
    productListRev: Observable<any>;
    categories: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public af: AngularFire) {
	
	 this.productList = af.database.list('/products',{query: {orderByChild: 'timestamp' }});
     
     this.categories = af.database.list('/productcategories', { query: { orderByChild: 'catid' } });
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad MarketPage');
      this.reverseList();
    }

  reverseList() {
      this.productListRev = this.productList.map((arr) => { return arr.reverse(); });
  }

  openproductpage(product) {

      this.navCtrl.push(ProductPagePage, {product: product});
  }

  opennotificationsPage(product) {

      this.navCtrl.push(NotificationsPage);
  }

  categoryProducts(category) {
      console.log(category);
      this.navCtrl.push(CategoryProductsPage, { category: category });
  }

}
