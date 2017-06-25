import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';




/**
 * Generated class for the AddBulkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-bulk',
  templateUrl: 'add-bulk.html',
})
export class AddBulkPage {

    public productImage: string;
    public productPreview: string;
    public bulkuploads: any;
    public upload: any;
    public currentuser: any;
    public productImageRef: any;
    public productImageURL: any;
    public firebaseupload: any;
    public uploadstatus: any;
    public uploading: boolean = false;
    


  constructor(public navCtrl: NavController,public af: AngularFire, public navParams: NavParams, public toastCtrl: ToastController,public actionSheetCtrl: ActionSheetController, private camera: Camera) {
          
          this.upload = [];
          this.bulkuploads = af.database.list('/bulkuploads');
          this.currentuser = firebase.auth().currentUser;
          this.upload.uid  = this.currentuser.uid;
          this.productImageRef = firebase.storage().ref('/bulkProductImages/');



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBulkPage');
  }

    public presentActionSheet() {

                this.uploading = false;

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
          quality: 75,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: this.camera.EncodingType.PNG,
          //targetWidth: 500,
          //targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          this.productPreview = "data:image/png;base64," + imageData;

          this.uploadImage(this.productImage);
          //let toast = this.toastCtrl.create({
          //    message: 'Image will be uploaded shortly',
          //    duration: 2000,
          //    position: 'middle'
         // });
          //toast.present();
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }

  getPicture() {
      this.camera.getPicture({
          quality: 75,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: false,
          encodingType: this.camera.EncodingType.PNG,
          //targetWidth: 500,
          //targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          this.productPreview = "data:image/png;base64," + imageData;

          this.uploadImage(this.productImage);

      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }


    uploadImage(productImage){

        this.uploading = true;
    


    this.bulkuploads.push( this.upload ).then(data => {


        this.firebaseupload =   this.productImageRef.child(data.key).child('productImage.png').putString(productImage, 'base64', { contentType: 'image/png' });

        this.firebaseupload.on('state_changed', (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.uploadstatus = 'Upload is ' + progress + '% done';
                switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, (error) => {
                // Handle unsuccessful uploads
            }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...

                this.productImageURL = this.firebaseupload.snapshot.downloadURL;
                              this.af.database.object('bulkuploads/' + data.key).update(
                                  {
                                      unread: true,
                                      timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                                      productImage: this.productImageURL
                                  }
                              )
               let toast = this.toastCtrl.create({
              message: 'Image uploaded. Products will be added to your account by our team shortly',
              duration: 3500,
              position: 'middle'
          });
          toast.present();
           
        });
    });
    }
}
