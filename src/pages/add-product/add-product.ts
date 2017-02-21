import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import firebase from 'firebase';


/*
  Generated class for the AddProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html'
})
export class AddProductPage {
    public category: any;
    public catDetails: any;
    public currentuser: any;
    //public cattitle: string;
    products: FirebaseListObservable<any>;
    userProducts: FirebaseListObservable<any>;
    public productForm;
    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public authService: AuthService) {
        this.category = navParams.get("category");
        this.currentuser = firebase.auth().currentUser;
        //this.cattitle = this.category.title + " ";
        this.products = af.database.list('/products');
        this.userProducts = af.database.list('/users/' + this.currentuser.uid + '/products' ); 
        
        //this.catDetails = this.af.database.object('productcategories/' + this.catid);
        this.productForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            finish: ['', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            weight: ['', Validators.required],
            nos: ['', Validators.required],
            mrate: ['', Validators.required],
            krate: ['', Validators.required],
            composition: ['', Validators.required],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            uid: ['', Validators.required],
            //mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            //companyname: ['', Validators.required],
            //email: ['', Validators.compose([Validators.required,
            //EmailValidator.isValid])],
            //password: ['', Validators.compose([Validators.minLength(6),
            //Validators.required])],

        });
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad AddProductPage');
      console.log(this.currentuser.uid);
  }
  submitProduct() {

      
      console.log(this.productForm.value);
      this.products.push(this.productForm.value).then(data => {

          console.log(data.key);
          this.af.database.object('users/' + this.currentuser.uid + '/products/' + data.key).set(
              {

                  islive: true,
                  name: this.productForm.value.name,
                  grade: this.productForm.value.grade,
                  mrate: this.productForm.value.mrate,
                  krate: this.productForm.value.krate
              }



          ).then(info => { 

              console.log("success");
              this.navCtrl.pop();
              this.navCtrl.pop();

              })
      })

  }
}
