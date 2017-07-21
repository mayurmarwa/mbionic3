import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductData } from '../../providers/product-data';

/*
  Generated class for the EditProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html'
})
export class EditProductPage {

    public myproduct: any;
    public product: any;
    public sub1: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public productData: ProductData, public alertCtrl: AlertController) {

        this.myproduct = navParams.get("myproduct");
        this.productData = productData;

        this.sub1 = this.productData.getProduct(this.myproduct.key)
            .subscribe(product => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.product = product;
            }, (error) => {
                //loading.dismiss();
                console.log('Error: ' + JSON.stringify(error));
            });
        console.log(this.myproduct.key);
          
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad EditProductPage');
     
    }
  ionViewDidLeave() {
      this.sub1.unsubscribe();
  }

  updateName() {
      let alert = this.alertCtrl.create({
          message: "Product Name",
          inputs: [
              {
                  name: 'name',
                  placeholder: 'Name',
                  value: this.product.name
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateName(this.myproduct.key,data.name);
                  }
              }
          ]
      });
      alert.present();
  }
  updateGrade() {
      let alert = this.alertCtrl.create({
          message: "Grade",
          inputs: [
              {
                  name: 'grade',
                  placeholder: 'Grade',
                  value: this.product.gradeval
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateGrade(this.myproduct.key, data.grade);
                  }
              }
          ]
      });
      alert.present();
  }

  updateFinish() {
      let alert = this.alertCtrl.create({
          message: "Finish",
          inputs: [
              {
                  name: 'finish',
                  placeholder: 'Finish',
                  value: this.product.finish
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateFinish(this.myproduct.key, data.finish);
                  }
              }
          ]
      });
      alert.present();
  }

  updateThickness() {
      let alert = this.alertCtrl.create({
          message: "Thickness",
          inputs: [
              {
                  name: 'thickness',
                  placeholder: 'thickness',
                  value: this.product.thickness,
                  type: 'number'
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateThickness(this.myproduct.key, data.thickness);
                  }
              }
          ]
      });
      alert.present();
  }

  updateWidth() {
      let alert = this.alertCtrl.create({
          message: "Width",
          inputs: [
              {
                  name: 'width',
                  placeholder: 'Width',
                  value: this.product.width,
                  type: 'number'
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateWidth(this.myproduct.key, data.width);
                  }
              }
          ]
      });
      alert.present();
  }

  updateLength() {
      let alert = this.alertCtrl.create({
          message: "Length",
          inputs: [
              {
                  name: 'length',
                  placeholder: 'length',
                  value: this.product.length,
                  type: 'number'
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateLength(this.myproduct.key, data.length);
                  }
              }
          ]
      });
      alert.present();
  }

  updateWeight() {
      let alert = this.alertCtrl.create({
          message: "Weight",
          inputs: [
              {
                  name: 'weight',
                  placeholder: 'weight',
                  value: this.product.weight,
                  type: 'number'
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateWeight(this.myproduct.key, data.weight);
                  }
              }
          ]
      });
      alert.present();
  }

  updateNos() {
      let alert = this.alertCtrl.create({
          message: "Nos.",
          inputs: [
              {
                  name: 'nos',
                  placeholder: 'Quanitity',
                  value: this.product.nos,
                  type: 'number'
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateNos(this.myproduct.key, data.nos);
                  }
              }
          ]
      });
      alert.present();
  }

  updateMrate() {
      let alert = this.alertCtrl.create({
          message: "Market Rate",
          inputs: [
              {
                  name: 'mrate',
                  placeholder: 'Market Rate',
                  value: this.product.mrate,
                  type: 'number'
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateMrate(this.myproduct.key, data.mrate);
                  }
              }
          ]
      });
      alert.present();
  }

  updateKrate() {
      let alert = this.alertCtrl.create({
          message: "Kalamboli Rate",
          inputs: [
              {
                  name: 'krate',
                  placeholder: 'Kalamboli Rate',
                  value: this.product.krate,
                  type: 'number'
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateKrate(this.myproduct.key, data.krate);
                  }
              }
          ]
      });
      alert.present();
  }

  updateComposition() {
      let alert = this.alertCtrl.create({
          message: "Composition",
          inputs: [
              {
                  name: 'composition',
                  placeholder: 'Composition',
                  value: this.product.composition                 
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateComposition(this.myproduct.key, data.composition);
                  }
              }
          ]
      });
      alert.present();
  }

  updateOrigin() {
      let alert = this.alertCtrl.create({
          message: "Origin",
          inputs: [
              {
                  name: 'origin',
                  placeholder: 'Origin',
                  value: this.product.origin
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateOrigin(this.myproduct.key, data.origin);
                  }
              }
          ]
      });
      alert.present();
  }

  updateBrand() {
      let alert = this.alertCtrl.create({
          message: "Brand",
          inputs: [
              {
                  name: 'brand',
                  placeholder: 'Brand',
                  value: this.product.brand
                  
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateBrand(this.myproduct.key, data.brand);
                  }
              }
          ]
      });
      alert.present();
  }

  updateCategory() {
      let alert = this.alertCtrl.create({
          message: "Category",
          inputs: [
              {
                  name: 'category',
                  placeholder: 'Category',
                  value: this.product.category

              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateCategory(this.myproduct.key, data.category);
                  }
              }
          ]
      });
      alert.present();
  }

  updateSizes() {
      let alert = this.alertCtrl.create({
          message: "Sizes",
          inputs: [
              {
                  name: 'sizes',
                  placeholder: 'Sizes',
                  value: this.product.sizes

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateSizes(this.myproduct.key, data.sizes);
                  }
              }
          ]
      });
      alert.present();
  }

  updateType() {
      let alert = this.alertCtrl.create({
          message: "Type",
          inputs: [
              {
                  name: 'type',
                  placeholder: 'Type',
                  value: this.product.type

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateType(this.myproduct.key, data.type);
                  }
              }
          ]
      });
      alert.present();
  }

  updateSwg() {
      let alert = this.alertCtrl.create({
          message: "SWG",
          inputs: [
              {
                  name: 'swg',
                  placeholder: 'SWG',
                  value: this.product.swg

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateSwg(this.myproduct.key, data.swg);
                  }
              }
          ]
      });
      alert.present();
  }

  updateSch() {
      let alert = this.alertCtrl.create({
          message: "SCH",
          inputs: [
              {
                  name: 'sch',
                  placeholder: 'SCH',
                  value: this.product.sch

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateSch(this.myproduct.key, data.sch);
                  }
              }
          ]
      });
      alert.present();
  }

  updateMm() {
      let alert = this.alertCtrl.create({
          message: "MM",
          inputs: [
              {
                  name: 'mm',
                  placeholder: 'MM',
                  value: this.product.mm

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateMm(this.myproduct.key, data.mm);
                  }
              }
          ]
      });
      alert.present();
  }

  updateQuantity() {
      let alert = this.alertCtrl.create({
          message: "Quantity",
          inputs: [
              {
                  name: 'quantity',
                  placeholder: 'Quantity',
                  value: this.product.quantity

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateQuantity(this.myproduct.key, data.quantity);
                  }
              }
          ]
      });
      alert.present();
  }

  updateUnit() {
      let alert = this.alertCtrl.create({
          message: "Unit",
          inputs: [
              {
                  name: 'unit',
                  placeholder: 'Unit',
                  value: this.product.unit

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateUnit(this.myproduct.key, data.unit);
                  }
              }
          ]
      });
      alert.present();
  }

  updateGuarantee() {
      let alert = this.alertCtrl.create({
          message: "Guarantee",
          inputs: [
              {
                  name: 'guarantee',
                  placeholder: 'Ultra Guarantee',
                  value: this.product.guarantee

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateGuarantee(this.myproduct.key, data.guarantee);
                  }
              }
          ]
      });
      alert.present();
  }

  updateQuality() {
      let alert = this.alertCtrl.create({
          message: "Quality",
          inputs: [
              {
                  name: 'quality',
                  placeholder: 'Ultra Quality',
                  value: this.product.quality

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateQuality(this.myproduct.key, data.quality);
                  }
              }
          ]
      });
      alert.present();
  }

  updateMtc() {
      let alert = this.alertCtrl.create({
          message: "Mtc",
          inputs: [
              {
                  name: 'mtc',
                  placeholder: 'MTC',
                  value: this.product.mtc

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updateMtc(this.myproduct.key, data.mtc);
                  }
              }
          ]
      });
      alert.present();
  }

  updatePtype() {
      let alert = this.alertCtrl.create({
          message: "Product Type",
          inputs: [
              {
                  name: 'ptype',
                  placeholder: 'Product Type',
                  value: this.product.ptype

              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.productData.updatePtype(this.myproduct.key, data.ptype);
                  }
              }
          ]
      });
      alert.present();
  }


  confirmDelete() {
      let alert = this.alertCtrl.create({
          title: 'Delete Product?',
          message: 'Do you want to delete this product?',      
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Confirm',
                  handler: data => {
                      this.productData.deleteProduct(this.myproduct.key);
                      this.navCtrl.pop();
                  }
              }
          ]
      });
      alert.present();
  }
}
