import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
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
    public coilsForm;
    public sheetsForm;
    public seamlessForm;
    public squareForm;
    public anglesForm;
    public roundbarsForm;
    lastImage: string = null;
    public productImage: any = null;
    public productImageRef: any;
    public productImageURL: string = "/assets/img/noimage.png"
    public mrateTrue: number = null;
    public krateTrue: number = null;
    public typeOD: boolean = true;
    public allValid: boolean = false;
    public gradeList: FirebaseListObservable<any>;
    public selectedGrade: any;
    public selectedGradeItem: any;
    public compositiontxt:string;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public authService: AuthService, public actionSheetCtrl: ActionSheetController) {
        this.category = navParams.get("category");
        this.currentuser = firebase.auth().currentUser;
        //this.cattitle = this.category.title + " ";
        this.products = af.database.list('/products');
        this.userProducts = af.database.list('/users/' + this.currentuser.uid + '/products'); 
        this.productImageRef = firebase.storage().ref('/productImages/');
        this.gradeList = af.database.list('/grades');
        this.compositiontxt = null;
        //this.catDetails = this.af.database.object('productcategories/' + this.catid);
        this.coilsForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            finish: ['HR', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            weight: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            composition: ['', Validators.required],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            mtc: ['Available', Validators.required],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true',Validators.required]
            //mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            //companyname: ['', Validators.required],
            //email: ['', Validators.compose([Validators.required,
            //EmailValidator.isValid])],
            //password: ['', Validators.compose([Validators.minLength(6),
            //Validators.required])],

        });

        this.sheetsForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            finish: ['HR', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            weight: ['',],
            nos: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            composition: ['', Validators.required],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            mtc: ['Available', Validators.required],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]           

        });

        this.seamlessForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            composition: ['', Validators.required],
            type: ['OD', Validators.required],
            swg: ['',],
            mm: ['',],
            sch: ['',],
            finish:['Polished',],
            quantity: ['', Validators.required],
            unit: ['Kg', Validators.required],             
            mrate: ['',],
            krate: ['',],            
            origin: ['', Validators.required],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });

        this.squareForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            composition: ['', Validators.required],
            sizes: ['', Validators.required],
            thickness: ['', Validators.required],            
            finish: ['Polished', Validators.required],
            quantity: ['', Validators.required],
            unit: ['Kg', Validators.required],
            mrate: ['',],
            krate: ['',],
            origin: ['', Validators.required],
            brand: ['',],          
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });
           
    }

    replacer(key, value) {
        if (key == "Grade") return undefined;
        else if (key == "Other") return undefined;
        else if (value == "-") return undefined;
        else return value;
    }
    gradeSelected() {
       
            
        this.af.database.object('/grades/' + this.selectedGrade)
            .subscribe(
            (result) => {
                
                this.selectedGradeItem = result;
            });
        
        this.compositiontxt = JSON.stringify(this.selectedGradeItem, this.replacer);
        this.compositiontxt = this.compositiontxt.replace(/\"|{|}/g, "")
        //console.log(this.composition.replace(/\"|{|}/g, ""));
       
    }


  ionViewDidLoad() {
      console.log('ionViewDidLoad AddProductPage');
      console.log(this.currentuser.uid);
    }

  onTypeChange() {

      console.log(this.typeOD);
      console.log(this.seamlessForm.value.type);

      if (this.seamlessForm.value.type === "OD") {
          this.typeOD = true;
      }
      else {
          this.typeOD = false;
      }
      console.log(this.typeOD);

  }

  submitProduct(productForm) {

      if (!productForm.valid) {
          console.log("invalid");
      }
      else {        

          if (this.category.catid === "4a" || this.category.catid === "4b" || this.category.catid === "4c") {
              if (productForm.value.type === "OD") {
                  if ((productForm.value.swg == null && productForm.value.mm == null) || ((productForm.value.swg === "" && (productForm.value.mm === "" || productForm.value.mm === null)) || (productForm.value.mm === "" && (productForm.value.swg === "" || productForm.value.swg === null)))) {
                      console.log("Enter either thickness");
                    
                      this.allValid = false;

                  }
                  else {
                      this.allValid = true;
                  }

              }
              else {
                  if (productForm.value.sch == null || productForm.value.mm == null || productForm.value.sch === "" || productForm.value.mm === "") {
                      console.log("Enter both thickness");

                      this.allValid = false;

                  }
                  else {
                      this.allValid = true;
                  }

              }
            
          }
          if ((productForm.value.mrate == null && productForm.value.krate == null) || ((productForm.value.mrate === "" && (productForm.value.krate === "" || productForm.value.krate === null)) || (productForm.value.krate === "" && (productForm.value.mrate === "" || productForm.value.mrate === null)))) {
              console.log("Enter either price");
              this.allValid = false;

          }
          else {
              this.allValid = true;
          }
          if(this.allValid) {
              console.log( productForm.value);
              this.products.push( productForm.value).then(data => {


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
                          name: productForm.value.name,
                          grade: productForm.value.grade,
                          mrate: productForm.value.mrate,
                          krate: productForm.value.krate,
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
