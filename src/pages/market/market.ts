import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { SearchCategoriesPage } from '../search-categories/search-categories';
import { PostBuyRequirementsPage } from '../post-buy-requirements/post-buy-requirements';
import { CategoryProductsPage } from '../category-products/category-products';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { SelectSubcatPage} from '../select-subcat/select-subcat';
import { Observable } from 'rxjs/Observable';
import { ProductData } from '../../providers/product-data';




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
    public viewall : boolean = false;

    constructor(public navCtrl: NavController, public productData: ProductData, public navParams: NavParams, public modalCtrl: ModalController, public af: AngularFire) {
	
	 //this.productList = af.database.list('/products',{query: {orderByChild: 'timestamp' }});
     
     //this.categories = af.database.list('/productcategories', { query: { orderByChild: 'catid' } });
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad MarketPage');
      
    }
  //ionViewDidEnter() {
  //    this.reverseList();
  //}

  //reverseList() {
   //   this.productList = this.af.database.list('/products', { query: { orderByChild: 'timestamp' } });
   //   this.productListRev = this.productList.map((arr) => { return arr.reverse(); });
 // }

  openproductpage(product) {

      this.navCtrl.push(ProductPagePage, {product: product});
  }

  opennotificationsPage(product) {

      this.navCtrl.push(NotificationsPage);
  }

  selectSub(catid) {
      this.navCtrl.push(SelectSubcatPage, { catid: catid });
  }

  categoryProducts(catid: string, title: string) {
      //console.log(category);
      this.navCtrl.push(CategoryProductsPage, { catid: catid, cattitle: title });
  }
  openNotificationsPage() {
      this.navCtrl.push(NotificationsPage);
  }
  openSearchPage() {
      this.navCtrl.push(SearchCategoriesPage);
  }
  openRequirementPage() {
      this.navCtrl.push(PostBuyRequirementsPage);
  }
}
