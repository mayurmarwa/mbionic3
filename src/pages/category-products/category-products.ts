import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { FilterOptionsPage } from '../filter-options/filter-options';
import { ProductData } from '../../providers/product-data';

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

    public displayList: Array<any>;
    public startNumber: any;
    public endNumber: any;
    public end: boolean = false;
    public productList: any;
    public backupList: any;
    public productListRev: any;
    public products: any;
    public category: any;
    public catid: any;
    public arrkey: any;
    public keys: any;
    public oby: any;
    public sortType: any;
    public title: any;
    public loadingPopup: any;
    private infiniteScroll: any

    constructor(public navCtrl: NavController, public navParams: NavParams, public productData: ProductData, public af: AngularFire, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

        this.loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        
        

        //this.category = navParams.get("category");
        this.catid = navParams.get("catid");
        this.title = navParams.get("cattitle");
       
        //this.loadingPopup.present().then(() => {
            this.getProducts().then(data => { this.buildArray(data) });
        //});
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
        /**this.products = this.af.database.list('/products', {
            query: {
                orderByChild: "catid",
                equalTo: this.catid
            }, preserveSnapshot: true
        }).first().subscribe(snapshots => {
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
            } **/
            this.productList = this.productData.products.filter(item => {
                //console.log(item);
                return (item['catid'] === this.catid)
            });
            this.backupList = this.productData.products.filter(item => {
                //console.log(item);
                return (item['catid'] === this.catid)
            });
            

            resolve(this.productList);   
            // console.log(random);
            //if (random == 1) {
            //   this.buildArray(this.productList);
            // }

        //})
       
        
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

      this.buildArray(this.productList);
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
          else {
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
  showFilter() {
      let showFilter = this.modalCtrl.create(FilterOptionsPage, {catid : this.catid});

      showFilter.present();
      showFilter.onDidDismiss(data => { //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
           //This will log the form entered by user in add modal.
          if (data) {
              this.filterList(data);
          }
      })
  }

  filterList(data: any) {
      //console.log("Data =>", JSON.stringify(data))
      this.initializeItems();

      if (data.grade && data.gradeval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['gradeval'] === data.gradeval )
          });

      }


      if (data.finish && data.finishval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['finish'] === data.finishval)
          });

      }

      if (data.alloy && data.selectedAlloy) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['ptype'] === data.selectedAlloy )
          });

      }

      if (data.type && data.selectedType) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['type'] === data.selectedType )
          });

      }

      if (data.subcat && data.subcatval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['subcat'] === data.subcatval )
          });

      }

      if (data.sch && data.schval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['sch'] === data.schval)
          });

      }

      if (data.swg && data.swgval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['swg'] >= data.swgval.lower && item['swg'] <= data.swgval.upper)
          });

      }

      if (data.mm && data.mmval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['mm'] >= (data.mmval.lower) && item['mm'] <= (data.mmval.upper))
          });

      }

      if (data.weight && data.weightval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['weight'] >= data.weightval.lower && item['weight'] <= data.weightval.upper)
          });
      }

      if (data.lgth && data.lgthval) {
          this.productList = this.productList.filter(item => {
              return (item["length"] >= (data.lgthval.lower/100) && item["length"] <= (data.lgthval.upper/100))
          });
      }

      if (data.lgth2 && data.lgth2val) {
          this.productList = this.productList.filter(item => {
              return (item["length"] >= data.lgth2val.lower && item["length"] <= data.lgth2val.upper)
          });
      }

      if (data.wdth && data.wdthval) {
          this.productList = this.productList.filter(item => {
              //console.log(item);
              return (item['width'] >= data.wdthval.lower && item['width'] <= data.wdthval.upper)
          });
      }

      if (data.thickness && data.thicknessval) {
          this.productList = this.productList.filter(item => {
              console.log(data.thicknessval);
              return (item['thickness'] >= data.thicknessval.lower && item['thickness'] <= data.thicknessval.upper)
          });
      }

      console.log(this.productList.length);


      this.buildArray(this.productList);


  }

}
