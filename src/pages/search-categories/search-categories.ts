import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
/*
  Generated class for the SearchCategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-categories',
  templateUrl: 'search-categories.html'
})
export class SearchCategoriesPage {

    public productList: any;
    public backupList: any;
    public products: any;
    public arrkey: any;
    public keys: any;
    public oby: any;
    public title: any;
    public loadingPopup: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public loadingCtrl: LoadingController) {

        this.loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loadingPopup.present();


        //this.category = navParams.get("category");
        
        this.getProducts().then(data => { this.buildArray(data); this.loadingPopup.dismiss(); });

        //this.buildArray(this.productList);
        //console.log(this.productList);
    }



    getProducts() {
        return new Promise(resolve => {
            this.products = this.af.database.list('/products', { preserveSnapshot: true }).first().subscribe(snapshots => {
                this.productList = [];
                this.keys = [];
                snapshots.forEach(snapshot => {
                    this.arrkey = this.productList.push(snapshot.val());
                    this.keys.push(snapshot.key);
                    //console.log(snapshot.key);
                }, (error) => {
                    //loading.dismiss();
                    console.log('Error: ' + JSON.stringify(error));
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
            this.backupList = array;
            
            resolve(true);
        });
    }
    initializeItems(): void {
        this.productList = this.backupList;
    }
    getItems(searchbar) {
        // Reset items back to all of the items
        this.initializeItems();

        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;


        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }

        this.productList = this.productList.filter((v) => {
            if (v.name && v.ptype && q) {
                let search = v.name + ' ' + v.ptype;
                let search2 = v.ptype + ' ' + v.name;
                console.log(search);
                if (search.toLowerCase().indexOf(q.toLowerCase()) > -1 || search2.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
            else if (v.name && v.gradeval && q) {
                let search = v.name + ' ' + v.gradeval;
                let search2 = v.gradeval + ' ' + v.name;
                if (search.toLowerCase().indexOf(q.toLowerCase()) > -1 || search2.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
            else {
                if (v.name && q) {

                    if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                        return true;
                    }
                    return false;
                }
            }
        });
        

        console.log(q, this.productList.length);

    }

    openproductpage(product) {

        this.navCtrl.push(ProductPagePage, { product: product });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchCategoriesPage');
  }

}
