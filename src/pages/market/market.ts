import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';


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

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public af: AngularFire) {
	
	 this.productList = af.database.list('/products',{query: {orderByChild: 'mrate'}});
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketPage');
  }

  openproductpage(product) {

      this.navCtrl.push(ProductPagePage, {product: product});
  }

}
