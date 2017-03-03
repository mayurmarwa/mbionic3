var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import firebase from 'firebase';
import { MyProductsPage } from '../my-products/my-products';
/*
  Generated class for the AddProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AddProductPage = (function () {
    function AddProductPage(navCtrl, navParams, af, formBuilder, authService, actionSheetCtrl, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.lastImage = null;
        this.productImageURL = "/assets/img/noimage.png";
        this.mrateTrue = null;
        this.krateTrue = null;
        this.typeOD = true;
        this.allValid = false;
        this.priceValid = false;
        this.imageValid = false;
        this.category = navParams.get("category");
        this.currentuser = firebase.auth().currentUser;
        //this.cattitle = this.category.title + " ";
        this.products = af.database.list('/products');
        this.userProducts = af.database.list('/users/' + this.currentuser.uid + '/products');
        this.productImageRef = firebase.storage().ref('/productImages/');
        this.gradeList = af.database.list('/grades');
        this.compositiontxt = null;
        this.gradeval = "test";
        //this.catDetails = this.af.database.object('productcategories/' + this.catid);
        this.coilsForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            finish: ['HR', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            weight: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            composition: ['',],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            mtc: ['Available', Validators.required],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]
            //mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            //companyname: ['', Validators.required],
            //email: ['', Validators.compose([Validators.required,
            //EmailValidator.isValid])],
            //password: ['', Validators.compose([Validators.minLength(6),
            //Validators.required])],
        });
        this.sheetsForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            finish: ['HR', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            weight: ['',],
            nos: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            composition: ['',],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            mtc: ['Available', Validators.required],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]
        });
        this.seamlessForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['',],
            type: ['OD', Validators.required],
            swg: ['',],
            mm: ['',],
            sch: ['',],
            finish: ['Polished',],
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
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['',],
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
        this.flatsForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            quality: ['Original', Validators.required],
            composition: ['', Validators.required],
            thickness: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['Mtrs', Validators.required],
            mrate: ['',],
            krate: ['',],
            origin: ['',],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]
        });
        this.anglesForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['', Validators.required],
            sizes: ['', Validators.required],
            thickness: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['Mtrs', Validators.required],
            length: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            origin: ['',],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]
        });
        this.roundbarsForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['',],
            pcategory: ['Black', Validators.required],
            guarantee: ['Yes', Validators.required],
            sizes: ['', Validators.required],
            thickness: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['Mtrs', Validators.required],
            length: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            origin: ['',],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]
        });
        this.deadForm = formBuilder.group({
            name: ['', Validators.required],
            details: ['', Validators.required],
            quantity: ['',],
            unit: ['Kg',],
            mrate: ['',],
            krate: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]
        });
    }
    AddProductPage.prototype.showConfirm = function (productForm) {
        var _this = this;
        if (!productForm.valid) {
            var alert_1 = this.alertCtrl.create({
                title: 'Invalid Entries!',
                subTitle: 'Please fill all required entries',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            if (this.productImage == null) {
                var alert_2 = this.alertCtrl.create({
                    title: 'Add Image!',
                    subTitle: 'Please add an image for your product',
                    buttons: ['OK']
                });
                alert_2.present();
                this.imageValid = true;
            }
            else {
                this.imageValid = true;
            }
            if (this.category.catid != "9a" && this.category.catid != "9b" && this.category.catid != "9c1" && this.category.catid != "9c2" && this.category.catid != "9c3" && this.category.catid != "9c4" && this.category.catid != "9d") {
                productForm.value.ptype = null;
            }
            if (this.category.catid === "8c1" || this.category.catid === "8c2" || this.category.catid === "8c3" || this.category.catid === "8c4" || this.category.catid === "8d" || this.category.catid === "8a" || this.category.catid === "8b" || this.category.catid === "9c1" || this.category.catid === "9c2" || this.category.catid === "9c3" || this.category.catid === "9c4" || this.category.catid === "9d" || this.category.catid === "9a" || this.category.catid === "9b") {
                productForm.value.gradeval = productForm.value.grade;
            }
            if (this.category.catid === '4a' || this.category.catid === '4c' || this.category.catid === '8c1' || this.category.catid === '9c1' || this.category.catid === '8c3' || this.category.catid === '9c3') {
                productForm.value.finish = null;
            }
            if (this.category.catid === "4a" || this.category.catid === "4b" || this.category.catid === "4c" || this.category.catid === "8c1" || this.category.catid === "8c2" || this.category.catid === "8c3" || this.category.catid === "9c1" || this.category.catid === "9c2" || this.category.catid === "9c3") {
                if (productForm.value.type === "OD") {
                    productForm.value.sch = null;
                    if ((productForm.value.swg == null && productForm.value.mm == null) || ((productForm.value.swg === "" && (productForm.value.mm === "" || productForm.value.mm === null)) || (productForm.value.mm === "" && (productForm.value.swg === "" || productForm.value.swg === null)))) {
                        this.allValid = false;
                        var alert_3 = this.alertCtrl.create({
                            title: 'Enter Thickness!',
                            subTitle: 'Enter values for either SWG or MM or both',
                            buttons: ['OK']
                        });
                        alert_3.present();
                    }
                    else {
                        this.allValid = true;
                    }
                }
                else {
                    productForm.value.swg = null;
                    productForm.value.finish = null;
                    if (productForm.value.sch == null || productForm.value.mm == null || productForm.value.sch === "" || productForm.value.mm === "") {
                        this.allValid = false;
                        var alert_4 = this.alertCtrl.create({
                            title: 'Enter Thickness!',
                            subTitle: 'Enter values for SCH and MM',
                            buttons: ['OK']
                        });
                        alert_4.present();
                    }
                    else {
                        this.allValid = true;
                    }
                }
            }
            else if (this.category.catid === 3) {
                if (productForm.value.weight == null || productForm.value.weight === "") {
                    this.allValid = false;
                    var alert_5 = this.alertCtrl.create({
                        title: 'Enter Weight!',
                        subTitle: 'Enter values for weight',
                        buttons: ['OK']
                    });
                    alert_5.present();
                }
                else {
                    this.allValid = true;
                }
            }
            else {
                this.allValid = true;
            }
            if ((productForm.value.mrate == null && productForm.value.krate == null) || ((productForm.value.mrate === "" && (productForm.value.krate === "" || productForm.value.krate === null)) || (productForm.value.krate === "" && (productForm.value.mrate === "" || productForm.value.mrate === null)))) {
                this.priceValid = false;
                var alert_6 = this.alertCtrl.create({
                    title: 'Enter Price',
                    subTitle: 'Enter either Market Rate or Kalamboli rate or both ',
                    buttons: ['OK']
                });
                alert_6.present();
            }
            else {
                this.priceValid = true;
            }
            if (this.allValid && this.priceValid && this.imageValid) {
                var confirm_1 = this.alertCtrl.create({
                    title: 'Submit Product?',
                    message: 'Do you want to post this product to the market?',
                    buttons: [
                        {
                            text: 'No',
                        },
                        {
                            text: 'Agree',
                            handler: function () {
                                _this.submitProduct(productForm);
                            }
                        }
                    ]
                });
                confirm_1.present();
            }
        }
    };
    AddProductPage.prototype.replacer = function (key, value) {
        if (key == "Grade")
            return undefined;
        else if (key == "Other")
            return undefined;
        else if (value == "-")
            return undefined;
        else
            return value;
    };
    AddProductPage.prototype.gradeSelected = function () {
        var _this = this;
        this.af.database.object('/grades/' + this.selectedGrade)
            .subscribe(function (result) {
            _this.selectedGradeItem = result;
        });
        this.compositiontxt = JSON.stringify(this.selectedGradeItem, this.replacer);
        this.compositiontxt = this.compositiontxt.replace(/\"|{|}/g, "");
        this.gradeval = this.selectedGradeItem.Grade;
        //console.log(this.composition.replace(/\"|{|}/g, ""));
    };
    AddProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddProductPage');
        //console.log(this.currentuser.uid);
    };
    AddProductPage.prototype.onTypeChange = function () {
        //console.log(this.typeOD);
        //console.log(this.seamlessForm.value.type);
        if (this.seamlessForm.value.type === "OD") {
            this.typeOD = true;
        }
        else {
            this.typeOD = false;
        }
        console.log(this.typeOD);
    };
    AddProductPage.prototype.submitProduct = function (productForm) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Submitting, Please Wait...'
        });
        if (this.allValid && this.priceValid && this.imageValid) {
            console.log(productForm.value);
            this.products.push(productForm.value).then(function (data) {
                if (_this.productImage != null) {
                    _this.productImageRef.child(data.key).child('productImage.png')
                        .putString(_this.productImage, 'base64', { contentType: 'image/png' })
                        .then(function (savedPicture) {
                        /**this.eventList.child(eventId).child('guestList').child(newGuest.key)
                            .child('profilePicture')
                            .set(savedPicture.downloadURL);**/
                        _this.productImageURL = savedPicture.downloadURL;
                        _this.af.database.object('products/' + data.key).update({
                            islive: true,
                            timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                            productImage: _this.productImageURL
                        });
                        if (_this.category.catid === 10) {
                            _this.af.database.object('users/' + _this.currentuser.uid + '/products/' + data.key).set({
                                islive: true,
                                timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                                name: productForm.value.name,
                                mrate: productForm.value.mrate,
                                krate: productForm.value.krate,
                                productImage: _this.productImageURL
                            }).then(function (info) {
                                //console.log("success");
                                _this.loading.present();
                                setTimeout(function () {
                                    _this.navCtrl.popToRoot({ animate: false });
                                    _this.navCtrl.push(MyProductsPage, { animate: false });
                                    //this.navCtrl.pop({ animate: false });
                                }, 1000);
                                setTimeout(function () {
                                    _this.loading.dismiss();
                                }, 3000);
                            });
                        }
                        else {
                            _this.af.database.object('users/' + _this.currentuser.uid + '/products/' + data.key).set({
                                islive: true,
                                timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                                name: productForm.value.name,
                                grade: productForm.value.grade,
                                mrate: productForm.value.mrate,
                                krate: productForm.value.krate,
                                productImage: _this.productImageURL
                            }).then(function (info) {
                                //console.log("success");
                                _this.loading.present();
                                setTimeout(function () {
                                    _this.navCtrl.popToRoot({ animate: false });
                                    _this.navCtrl.push(MyProductsPage, { animate: false });
                                }, 1000);
                                setTimeout(function () {
                                    _this.loading.dismiss();
                                }, 3000);
                            });
                        }
                    });
                }
                else {
                    _this.af.database.object('products/' + data.key).update({
                        islive: true,
                        timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                        productImage: _this.productImageURL
                    });
                    if (_this.category.catid === 10) {
                        _this.af.database.object('users/' + _this.currentuser.uid + '/products/' + data.key).set({
                            islive: true,
                            timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                            name: productForm.value.name,
                            mrate: productForm.value.mrate,
                            krate: productForm.value.krate,
                            productImage: _this.productImageURL
                        }).then(function (info) {
                            //console.log("success");
                            _this.loading.present();
                            setTimeout(function () {
                                _this.navCtrl.popToRoot({ animate: false });
                                _this.navCtrl.push(MyProductsPage, { animate: false });
                                //this.navCtrl.pop({ animate: false });
                            }, 1000);
                            setTimeout(function () {
                                _this.loading.dismiss();
                            }, 3000);
                        });
                    }
                    else {
                        _this.af.database.object('users/' + _this.currentuser.uid + '/products/' + data.key).set({
                            islive: true,
                            timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                            name: productForm.value.name,
                            grade: productForm.value.grade,
                            mrate: productForm.value.mrate,
                            krate: productForm.value.krate,
                            productImage: _this.productImageURL
                        }).then(function (info) {
                            //console.log("success");
                            _this.loading.present();
                            setTimeout(function () {
                                _this.navCtrl.popToRoot({ animate: false });
                                _this.navCtrl.push(MyProductsPage, { animate: false });
                            }, 1000);
                            setTimeout(function () {
                                _this.loading.dismiss();
                            }, 3000);
                        });
                    }
                }
            });
        }
    };
    AddProductPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        //this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                        _this.getPicture();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        //this.takePicture(Camera.PictureSourceType.CAMERA);
                        _this.takePicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    AddProductPage.prototype.takePicture = function () {
        var _this = this;
        Camera.getPicture({
            quality: 95,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            _this.productImage = imageData;
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    AddProductPage.prototype.getPicture = function () {
        var _this = this;
        Camera.getPicture({
            quality: 95,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            _this.productImage = imageData;
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    return AddProductPage;
}());
AddProductPage = __decorate([
    Component({
        selector: 'page-add-product',
        templateUrl: 'add-product.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, FormBuilder, AuthService, ActionSheetController, AlertController, LoadingController])
], AddProductPage);
export { AddProductPage };
//# sourceMappingURL=add-product.js.map