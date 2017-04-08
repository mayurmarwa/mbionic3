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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductData } from '../../providers/product-data';
/*
  Generated class for the EditProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EditProductPage = (function () {
    function EditProductPage(navCtrl, navParams, productData, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.productData = productData;
        this.alertCtrl = alertCtrl;
        this.myproduct = navParams.get("myproduct");
        this.productData = productData;
        this.productData.getProduct(this.myproduct.$key).first()
            .subscribe(function (product) {
            //loading.dismiss();
            // this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            _this.product = product;
        }, function (error) {
            //loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
    }
    EditProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditProductPage');
        console.log(this.myproduct.$key);
        this.product;
    };
    EditProductPage.prototype.updateName = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Product Name",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    value: this.product.name
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateName(_this.product.$key, data.name);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateGrade = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Grade",
            inputs: [
                {
                    name: 'grade',
                    placeholder: 'Grade',
                    value: this.product.gradeval
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateGrade(_this.product.$key, data.grade);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateFinish = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Finish",
            inputs: [
                {
                    name: 'finish',
                    placeholder: 'Finish',
                    value: this.product.finish
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateFinish(_this.product.$key, data.finish);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateThickness = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Thickness",
            inputs: [
                {
                    name: 'thickness',
                    placeholder: 'thickness',
                    value: this.product.thickness,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateThickness(_this.product.$key, data.thickness);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateWidth = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Width",
            inputs: [
                {
                    name: 'width',
                    placeholder: 'Width',
                    value: this.product.width,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateWidth(_this.product.$key, data.width);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateLength = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Length",
            inputs: [
                {
                    name: 'length',
                    placeholder: 'length',
                    value: this.product.length,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateLength(_this.product.$key, data.length);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateWeight = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Weight",
            inputs: [
                {
                    name: 'weight',
                    placeholder: 'weight',
                    value: this.product.weight,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateWeight(_this.product.$key, data.weight);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateNos = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Nos.",
            inputs: [
                {
                    name: 'nos',
                    placeholder: 'Quanitity',
                    value: this.product.nos,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateNos(_this.product.$key, data.nos);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateMrate = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Market Rate",
            inputs: [
                {
                    name: 'mrate',
                    placeholder: 'Market Rate',
                    value: this.product.mrate,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateMrate(_this.product.$key, data.mrate);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateKrate = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Kalamboli Rate",
            inputs: [
                {
                    name: 'krate',
                    placeholder: 'Kalamboli Rate',
                    value: this.product.krate,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateKrate(_this.product.$key, data.krate);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateComposition = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Composition",
            inputs: [
                {
                    name: 'composition',
                    placeholder: 'Composition',
                    value: this.product.composition
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateComposition(_this.product.$key, data.composition);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateOrigin = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Origin",
            inputs: [
                {
                    name: 'origin',
                    placeholder: 'Origin',
                    value: this.product.origin
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateOrigin(_this.product.$key, data.origin);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateBrand = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Brand",
            inputs: [
                {
                    name: 'brand',
                    placeholder: 'Brand',
                    value: this.product.brand
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateBrand(_this.product.$key, data.brand);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateCategory = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Category",
            inputs: [
                {
                    name: 'category',
                    placeholder: 'Category',
                    value: this.product.category
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.productData.updateCategory(_this.product.$key, data.category);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateSizes = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateSizes(_this.product.$key, data.sizes);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateType = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateType(_this.product.$key, data.type);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateSwg = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateSwg(_this.product.$key, data.swg);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateSch = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateSch(_this.product.$key, data.sch);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateMm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateMm(_this.product.$key, data.mm);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateQuantity = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateQuantity(_this.product.$key, data.quantity);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateUnit = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateUnit(_this.product.$key, data.unit);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateGuarantee = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateGuarantee(_this.product.$key, data.guarantee);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateQuality = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateQuality(_this.product.$key, data.quality);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updateMtc = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updateMtc(_this.product.$key, data.mtc);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.updatePtype = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.productData.updatePtype(_this.product.$key, data.ptype);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProductPage.prototype.confirmDelete = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Product?',
            message: 'Do you want to delete this product?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.productData.deleteProduct(_this.product.$key);
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    return EditProductPage;
}());
EditProductPage = __decorate([
    Component({
        selector: 'page-edit-product',
        templateUrl: 'edit-product.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ProductData, AlertController])
], EditProductPage);
export { EditProductPage };
//# sourceMappingURL=edit-product.js.map