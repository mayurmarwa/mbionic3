import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ProductData } from '../../providers/product-data';

/*
  Generated class for the SearchCategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()

@Component({
  selector: 'page-search-categories',
  templateUrl: 'search-categories.html'
})
export class SearchCategoriesPage {

    public startNumber: any;
    public endNumber: any;
    public end: boolean = false;
    public productList: any;
    public displayList: Array<any>;
    public backupList: any;
    public products: any;
    public arrkey: any;
    public keys: any;
    public oby: any;
    public title: any;
    public loadingPopup: any;
    private infiniteScroll: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public productData: ProductData, public af: AngularFire, public loadingCtrl: LoadingController) {

        
        this.productList = this.productData.products;
        this.backupList = this.productData.products;

        this.buildArray(this.productList);

       /** this.loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loadingPopup.present().then(() => {
            console.log(this.productList);
            this.buildArray(this.productList);
        });**/
        //this.category = navParams.get("category");
        
        //this.getProducts().then(data => { this.buildArray(data); this.loadingPopup.dismiss(); });

        //this.buildArray(this.productList);
        //console.log(this.productList);
    }

    doInfinite(infiniteScroll) {
        //console.log(this.startNumber);
        this.infiniteScroll = infiniteScroll;
        console.log(this.productList.length);
        if (this.productList.length > 20) {

            if (this.productList.length < 40) {
                for (let i = this.startNumber; i < this.productList.length; i++) {
                    this.displayList.push(this.productList[i]);
                    //this.displayList.push(i);


                }
            }
            else { 
            for (let i = this.startNumber; i < this.endNumber; i++) {
                this.displayList.push(this.productList[i]);
                //this.displayList.push(i);


                }
            }

            if (this.end) {
                infiniteScroll.enable(false);
            }
            else {
                this.startNumber = this.endNumber;
                if (this.endNumber + 20 > this.productList.length) {

                    this.endNumber = this.productList.length;
                    this.end = true;

                }
                else {
                    this.endNumber = this.endNumber + 20;

                }

            }
        }
        else {
            infiniteScroll.enable(false);
        }
            //console.log("start", this.startNumber);
            //console.log("i", i);
            

            infiniteScroll.complete();
        
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
            this.startNumber = 20;
            this.endNumber = 40;
            this.end = false;
            this.displayList = [];
            if (this.infiniteScroll) {
                this.infiniteScroll.enable(true);
            }
            /**let m = array.length, t, i;

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
            this.backupList = array;**/

            if (array.length < 20) {
                for (let i = 0; i < array.length; i++) {
                    this.displayList.push(array[i]);
                    //this.displayList.push(i);
                }
            }
            else{
            for (let i = 0; i < 20; i++) {
                this.displayList.push(array[i]);
                //this.displayList.push(i);
                }
            }

            //this.loadingPopup.dismiss().then(() => {
                resolve(true);
            //});
        });
    }
    initializeItems(): void {
        this.productList = this.backupList;
        this.buildArray(this.productList);
        
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
                //console.log(search);
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
        
        
            this.buildArray(this.productList);
        
        

    }

    openproductpage(product) {

        this.navCtrl.push('ProductPagePage', { product: product });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchCategoriesPage');
  }

}
