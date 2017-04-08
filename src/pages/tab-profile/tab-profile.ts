import { AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { AuthService } from '../../providers/auth.service';
import { ProfileData } from '../../providers/profile-data';
import firebase from 'firebase';


@Component({
  selector: 'page-tab-profile',
  templateUrl: 'tab-profile.html'
})
export class TabProfilePage {
  user: {displayName?: string, email?: string, photoURL?: string} = {};
  public userProfile: any;
  public currentuser: any;
  public productImage: string;
  public sub1: any;
  public sub2: any;


  constructor(
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public profileData: ProfileData,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,    
    private camera: Camera
      
  ) {
      this.user.photoURL = 'assets/img/noimage.png';
      this.profileData = profileData;
      this.currentuser = firebase.auth().currentUser;

     

      if (this.currentuser){
         this.sub1 = this.authService.getFullProfile(this.currentuser.uid)
              .subscribe(user => {
                  //loading.dismiss();
                  // this.user.displayName = user.displayName;
                  //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                  //this.user.photoURL = user.photoURL || this.user.photoURL;
                  this.userProfile = user;
              }, (error) => {
                  //loading.dismiss();
                  console.log('Error: ' + JSON.stringify(error));
              });

          this.sub2 = this.authService.currentUser
              .subscribe(user => {
                  //loading.dismiss();
                  this.user.displayName = user.displayName;
                  this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                  this.user.photoURL = user.photoURL || this.user.photoURL;
              }, (error) => {
                  //loading.dismiss();
                  console.log('Error: ' + JSON.stringify(error));
              });
      }

      
     /** this.profileData.getUserProfile().on('value', (data) => {
          this.userProfile = data.val();
          alert(this.userProfile);
          //this.birthDate = this.userProfile.birthDate;
      });**/
  }

  ionViewDidLoad() {
      let loading = this.loadingCtrl.create({
          content: 'Updating...'
      });

      loading.present();

      setTimeout(() => {
          loading.dismiss();
      }, 1500);

  }

    ionViewDidLeave() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }
  

  updateName() {
      let alert = this.alertCtrl.create({
          message: "Your name",
          inputs: [
              {
                  name: 'name',
                  placeholder: 'Your name',
                  value: this.userProfile.name
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
                      this.profileData.updateName(data.name);
                  }
              }
          ]
      });
      alert.present();
  }

  updateMobile() {
      let alert = this.alertCtrl.create({
          message: "Mobile No. (+91)",
          inputs: [
              {
                  name: 'mobile',
                  placeholder: 'Mobile No.',
                  type: 'number',
                  value: this.userProfile.mobile
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
                      this.profileData.updateMobile(data.mobile);
                  }
              }
          ]
      });
      alert.present();
  }
  updateLandLine() {
      let alert = this.alertCtrl.create({
          message: "Enter Land Line No.",
          inputs: [
              {
                  name: 'landline',
                  placeholder: 'Enter Land Line No. with STD code',
                  type: 'number',
                  value: this.userProfile.landline
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
                      this.profileData.updateLandLine(data.landline);
                  }
              }
          ]
      });
      alert.present();
  }

  updateAddress() {
      let alert = this.alertCtrl.create({
          message: "Company Address",
          inputs: [
              {
                  name: 'address',
                  placeholder: 'Address',
                  value: this.userProfile.address
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
                      this.profileData.updateAddress(data.address);
                  }
              }
          ]
      });
      alert.present();
  }


  updateCompanyName() {
      let alert = this.alertCtrl.create({
          message: "Your Company Name",
          inputs: [
              {
                  name: 'companyname',
                  placeholder: 'Your Company Name',
                  value: this.userProfile.companyname
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
                      this.profileData.updateCompanyName(data.companyname);
                  }
              }
          ]
      });
      alert.present();
  }

  updateCompanyProfile() {
      let alert = this.alertCtrl.create({
          message: "Company Profile",
          inputs: [
              {
                  name: 'companyprofile',
                  placeholder: 'Company Profile',
                  value: this.userProfile.companyprofile
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
                      this.profileData.updateCompanyProfile(data.companyprofile);
                  }
              }
          ]
      });
      alert.present();
  }
      

  updateExcise() {
      let alert = this.alertCtrl.create({
          message: "Excise Details",
          inputs: [
              {
                  name: 'excise',
                  placeholder: 'ECC/Exc. Reg.Nos',
                  value: this.userProfile.excise
              },
              {
                  name: 'comsn',
                  placeholder: 'Commissionerate',
                  value: this.userProfile.comsn
              },
              {
                  name: 'range',
                  placeholder: 'Range',
                  value: this.userProfile.range
              },
              {
                  name: 'division',
                  placeholder: 'Division',
                  value: this.userProfile.division
              },
              {
                  name: 'vat',
                  placeholder: 'VAT TIN',
                  value: this.userProfile.vat
              },
              {
                  name: 'pan',
                  placeholder: 'PAN No. (optional)',
                  value: this.userProfile.pan
              }
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
                      //console.log(data);
                      this.checkExcise(data);
                  }
              }
          ]
      });
      alert.present();
  }

  checkExcise(data) {
      if (data.excise === '' || data.excise === null || data.comsn === '' || data.comsn == null || data.range === '' || data.range == null || data.division === '' || data.division === null || data.vat === '' || data.vat === null) {
          let alert = this.alertCtrl.create({
              title: 'Invalid Entries!',
              subTitle: 'Please fill all required entries',
              buttons: ['OK']
          });
          alert.present();
      }
      else {
          this.profileData.updateExcise(data);
      }
      
  }




  updateEmail() {
      let alert = this.alertCtrl.create({
          inputs: [
              {
                  name: 'newEmail',
                  placeholder: 'Your new email',
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updateEmail(data.newEmail);
                  }
              }
          ]
      });
      alert.present();
  }

  updatePassword() {
      let alert = this.alertCtrl.create({
          inputs: [
              {
                  name: 'newPassword',
                  placeholder: 'Your new password',
                  type: 'password'
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updatePassword(data.newPassword);
                  }
              }
          ]
      });
      alert.present();
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
      this.camera.getPicture({
          quality: 95,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: this.camera.EncodingType.PNG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          this.profileData.updateImage(this.productImage);
          //this.productPreview = "data:image/jpeg;base64," + imageData;
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }

  getPicture() {
      this.camera.getPicture({
          quality: 95,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: false,
          encodingType: this.camera.EncodingType.PNG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          this.profileData.updateImage(this.productImage);
          //this.productPreview = "data:image/jpeg;base64," + imageData;
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }
}
