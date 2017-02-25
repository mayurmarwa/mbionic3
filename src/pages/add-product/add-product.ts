import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
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
    lastImage: string = null;
    public productImage: any = null;
    public productImageRef: any;
    public productImageURL: string = "/assets/img/noimage.png"
    public mrateTrue: number = null;
    public krateTrue: number = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public authService: AuthService, public actionSheetCtrl: ActionSheetController) {
        this.category = navParams.get("category");
        this.currentuser = firebase.auth().currentUser;
        //this.cattitle = this.category.title + " ";
        this.products = af.database.list('/products');
        this.userProducts = af.database.list('/users/' + this.currentuser.uid + '/products'); 
        this.productImageRef = firebase.storage().ref('/productImages/');
        
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
            mrate: ['',],
            krate: ['',],
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

      if (!this.productForm.valid) {
          console.log("invalid");
      }
      else {        
     
          if ((this.productForm.value.mrate == null && this.productForm.value.krate == null) || ((this.productForm.value.mrate === "" && (this.productForm.value.krate === "" || this.productForm.value.krate === null)) || (this.productForm.value.krate === "" && (this.productForm.value.mrate === "" || this.productForm.value.mrate === null)) )) {
              console.log("Enter either price");

          }
          else {
              console.log(this.productForm.value);
              this.products.push(this.productForm.value).then(data => {


                  if (this.productImage != null) {
                      this.productImageRef.child(data.key).child('productImage.png')
                          .putString(this.productImage, 'base64', { contentType: 'image/png' })
                          .then((savedPicture) => {
                              /**this.eventList.child(eventId).child('guestList').child(newGuest.key)
                                  .child('profilePicture')
                                  .set(savedPicture.downloadURL);**/
                              this.productImageURL = savedPicture.downloadURL;
                          });
                  }
                  this.af.database.object('products/' + data.key).update(
                      {
                          islive: true,
                          productImage: this.productImageURL
                      }
                  )
                  this.af.database.object('users/' + this.currentuser.uid + '/products/' + data.key).set(
                      {

                          islive: true,
                          name: this.productForm.value.name,
                          grade: this.productForm.value.grade,
                          mrate: this.productForm.value.mrate,
                          krate: this.productForm.value.krate,
                          productImage: this.productImageURL
                      }



                  ).then(info => {

                      console.log("success");
                      this.navCtrl.pop();
                      this.navCtrl.pop();

                  })
              })
          }
      }
  }

  public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
          title: 'Select Image Source',
          buttons: [
              {
                  text: 'Load from Library',
                  handler: () => {
                      //this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                      this.getPicture();
                  }
              },
              {
                  text: 'Use Camera',
                  handler: () => {
                      //this.takePicture(Camera.PictureSourceType.CAMERA);
                      this.takePicture();
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel'
              }
          ]
      });
      actionSheet.present();
  }

  takePicture() {
      Camera.getPicture({
          quality: 95,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          //console.log(this.productImage);
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }

  getPicture() {
      Camera.getPicture({
          quality: 95,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          //console.log(this.productImage);
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }
}
