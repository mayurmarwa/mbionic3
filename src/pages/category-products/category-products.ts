import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { FilterOptionsPage } from '../filter-options/filter-options';
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

    public productList: any;
    public productListRev: Observable<any>;
    public products: any;
    public category: any;
    public catid: any;
    public arrkey: any;
    public keys: any;
    public oby: any;
    public sortType: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public alertCtrl: AlertController, public modalCtrl: ModalController) {

        //this.category = navParams.get("category");
        this.catid = navParams.get("catid");
        this.getProducts().then(data => {this.buildArray(data) });
        
        //this.buildArray(this.productList);
            //console.log(this.productList);
    }

    getProducts() {
        return new Promise(resolve => {
        this.products = this.af.database.list('/products', {
            query: {
                orderByChild: "catid",
                equalTo: this.catid
            }, preserveSnapshot: true
        }).subscribe(snapshots => {
            this.productList = [];
            this.keys = [];
            snapshots.forEach(snapshot => {
                this.arrkey = this.productList.push(snapshot.val());
                this.keys.push(snapshot.key);
                //console.log(snapshot.key);
            });
            for (var i in this.productList) {
                this.productList[i].key = this.keys[i];
            } 
            resolve(this.productList);   
            // console.log(random);
            //if (random == 1) {
            //   this.buildArray(this.productList);
            // }

        })
       
        
        });
        
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad CategoryProductsPage');
      console.log(this.catid);
  }
  openproductpage(product) {

      this.navCtrl.push(ProductPagePage, { product: product });
  }

  sortList(val: any) {
      this.getProducts().then(() => {
          if (val == 1) {
              this.oby = 'mrate';
              this.filterRateList('mrate');
          }
          else if (val == 2) {
              this.oby = '-mrate';
              this.filterRateList('mrate');
          }
          else if (val == 3) {
              this.oby = 'krate';
              this.filterRateList('krate');
          }
          else if (val == 4) {
              this.oby = '-krate';
              this.filterRateList('krate');
          }
          else if (val == 5) {
              this.oby = '-timestamp';
          }
          else if (val == 6) {
              this.oby = 'timestamp';
          } 

      });

         
      
  }

  sortAlert() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Select Sorting Option');

      alert.addInput({
          type: 'radio',
          label: 'Market Rate (Low to High)',
          value: '1',
          //checked: true
      });

      alert.addInput({
          type: 'radio',
          label: 'Market Rate (High to Low)',
          value: '2'
      });

      alert.addInput({
          type: 'radio',
          label: 'Kalamboli Rate (Low to High)',
          value: '3',
          //checked: true
      });

      alert.addInput({
          type: 'radio',
          label: 'Kalamboli Rate (High to Low)',
          value: '4'
      });

      alert.addInput({
          type: 'radio',
          label: 'Newest First',
          value: '5',
          //checked: true
      });

      alert.addInput({
          type: 'radio',
          label: 'Oldest First',
          value: '6'
      });      

      alert.addButton('Cancel');
      alert.addButton({
          text: 'Sort',
          handler: data => {
              //console.log('Sort data:', data);
              this.sortList(data);
              //this.testCheckboxOpen = false;
              //this.testCheckboxResult = data;
          }
      });
      alert.present();
  }


  filterRateList(filter: string) {
      //console.log(filter);
      //console.log(this.productList);
      this.productList = this.productList.filter(item => {
          //console.log(item);
          return item[filter];
      });
  }

  private buildArray(array) {
      return new Promise(resolve => {
          let m = array.length, t, i;

          // While there remain elements to shuffle…
          while (m) {

              // Pick a remaining element…
              i = Math.floor(Math.random() * m--);

              // And swap it with the current element.
              t = array[m];
              array[m] = array[i];
              array[i] = t;
          }

          this.productList = array;
          resolve(true);
      });
  }

  showFilter() {
      let showFilter = this.modalCtrl.create(FilterOptionsPage);

      showFilter.present();
      showFilter.onDidDismiss(data => { //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
          console.log("Data =>", data) //This will log the form entered by user in add modal.
      })
  }

}
