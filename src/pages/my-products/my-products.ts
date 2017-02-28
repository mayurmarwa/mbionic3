import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SelectCategoryPage } from '../select-category/select-category';
import { EditProductPage } from '../edit-product/edit-product';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MyProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html'
})
export class MyProductsPage {

    myproducts: FirebaseListObservable<any>;
    currentuser: any;
    productListRev: Observable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

        this.currentuser = firebase.auth().currentUser;
        this.myproducts = af.database.list('/users/' + this.currentuser.uid + '/products/', { query: { orderByChild: 'timestamp' } });
        this.productListRev = this.myproducts.map((arr) => { return arr.reverse(); });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }
  detailpage(myproduct) {

      this.navCtrl.push(EditProductPage, { myproduct: myproduct });
  }
  selectcat() {

      this.navCtrl.push(SelectCategoryPage);
  }

}
