var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
/*
  Generated class for the ProductData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ProductData = (function () {
    function ProductData(http, af, storage) {
        var _this = this;
        this.http = http;
        this.af = af;
        this.storage = storage;
        this.productList = firebase.database().ref('/products');
        this.requirementList = firebase.database().ref('/requirements');
        this.requirementList.on('value', function (memberList) {
            var members = [];
            var keys = [];
            memberList.forEach(function (country) {
                members.push(country.val());
                keys.push(country.key);
            });
            for (var i in members) {
                members[i].key = keys[i];
            }
            //this.buildRequirementArray(members);
            _this.requirements = members.reverse();
            console.log("requirements ready");
        });
        this.productList.on('value', function (countryList) {
            var countries = [];
            var keys = [];
            countryList.forEach(function (country) {
                countries.push(country.val());
                keys.push(country.key);
            });
            for (var i in countries) {
                countries[i].key = keys[i];
            }
            _this.buildArray(countries);
            //this.products = countries;
            //this.loadedlist = countries;
            //console.log("here", this.directory);
            //this.loadingPopup.dismiss();
        });
        this.currentUser = firebase.auth().currentUser;
        this.myProductList = firebase.database().ref('/users/' + this.currentUser.uid + '/products');
        this.recentList = firebase.database().ref('/users/' + this.currentUser.uid + '/recent');
        this.count = firebase.database().ref('/users/' + this.currentUser.uid + '/recent');
        this.count.once('value', function (snapshot) {
            console.log(snapshot);
            if (snapshot.numChildren() > 0) {
                snapshot.forEach(function (value) {
                    if (value.key === "count") {
                        _this.counter = value.val();
                        return;
                    }
                    _this.counter = 0;
                });
            }
            else {
                _this.recentList.set({
                    count: 0
                });
                _this.counter = 0;
            }
        });
        this.setUser();
    }
    ProductData.prototype.buildArray = function (array) {
        var _this = this;
        return new Promise(function (resolve) {
            var m = array.length, t, i;
            // While there remain elements to shuffle�
            while (m) {
                // Pick a remaining element�
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            _this.products = array;
            console.log("products ready");
        });
    };
    /**
      private buildRequirementArray(array) {
         return new Promise(resolve => {
             let m = array.length, t, i;
 
             // While there remain elements to shuffle�
             while (m) {
 
                 // Pick a remaining element�
                 i = Math.floor(Math.random() * m--);
 
                 // And swap it with the current element.
                 t = array[m];
                 array[m] = array[i];
                 array[i] = t;
             }
 
             this.requirements = array;
 
         });
     }**/
    ProductData.prototype.setUser = function () {
        var _this = this;
        this.storage.ready().then(function () {
            // set a key/value
            console.log("storage ready");
            _this.storage.set('currentuser', JSON.stringify(_this.currentUser)).then(function () {
                //this.currentprofile = user;
                console.log("storage set");
                //this.rootPage = TabsPage;
            })
                .catch(function (err) {
                return console.log(err);
            });
            //console.log(this.currentprofile);
            // Or to get a key/value pair
            // this.storage.get('currentuser').then((val) => {
            //     console.log('Current User', JSON.parse(val));
            //})
            //this.loading.dismiss().then(() => {
            //console.log(error);
            //});
        }).catch(function (err) {
            return console.log(err);
        });
    };
    ProductData.prototype.getProduct = function (key) {
        return this.af.database.object('products/' + key);
    };
    /**getProduct(key: any): any {
        console.log(key);
        return this.productList.child(key);
    }**/
    /**
    * This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
    * for the current user as the firstName & lastName properties.
    */
    ProductData.prototype.updateName = function (key, Name) {
        this.myProductList.child(key).update({
            name: Name
        });
        return this.productList.child(key).update({
            name: Name,
        });
    };
    ProductData.prototype.updateGrade = function (key, Grade) {
        this.myProductList.child(key).update({
            gradeval: Grade
        });
        this.productList.child(key).update({
            gradeval: Grade
        });
    };
    ProductData.prototype.updateFinish = function (key, Finish) {
        return this.productList.child(key).update({
            finish: Finish,
        });
    };
    ProductData.prototype.updateThickness = function (key, Thickness) {
        return this.productList.child(key).update({
            thickness: Thickness,
        });
    };
    ProductData.prototype.updateWidth = function (key, Width) {
        return this.productList.child(key).update({
            width: Width,
        });
    };
    ProductData.prototype.updateLength = function (key, Length) {
        return this.productList.child(key).update({
            length: Length,
        });
    };
    ProductData.prototype.updateWeight = function (key, Weight) {
        return this.productList.child(key).update({
            weight: Weight,
        });
    };
    ProductData.prototype.updateNos = function (key, Nos) {
        return this.productList.child(key).update({
            nos: Nos,
        });
    };
    ProductData.prototype.updateMrate = function (key, Mrate) {
        this.myProductList.child(key).update({
            mrate: Mrate
        });
        return this.productList.child(key).update({
            mrate: Mrate,
        });
    };
    ProductData.prototype.updateKrate = function (key, Krate) {
        this.myProductList.child(key).update({
            krate: Krate
        });
        return this.productList.child(key).update({
            krate: Krate,
        });
    };
    ProductData.prototype.updateComposition = function (key, Composition) {
        return this.productList.child(key).update({
            composition: Composition,
        });
    };
    ProductData.prototype.updateOrigin = function (key, Origin) {
        return this.productList.child(key).update({
            origin: Origin,
        });
    };
    ProductData.prototype.updateBrand = function (key, Brand) {
        return this.productList.child(key).update({
            brand: Brand,
        });
    };
    ProductData.prototype.updateCategory = function (key, Category) {
        return this.productList.child(key).update({
            pcategory: Category,
        });
    };
    ProductData.prototype.updatePtype = function (key, Ptype) {
        return this.productList.child(key).update({
            ptype: Ptype,
        });
    };
    ProductData.prototype.updateSizes = function (key, Sizes) {
        return this.productList.child(key).update({
            sizes: Sizes,
        });
    };
    ProductData.prototype.updateType = function (key, Type) {
        return this.productList.child(key).update({
            type: Type,
        });
    };
    ProductData.prototype.updateSwg = function (key, Swg) {
        return this.productList.child(key).update({
            swg: Swg,
        });
    };
    ProductData.prototype.updateSch = function (key, Sch) {
        return this.productList.child(key).update({
            sch: Sch,
        });
    };
    ProductData.prototype.updateMm = function (key, MM) {
        return this.productList.child(key).update({
            mm: MM,
        });
    };
    ProductData.prototype.updateQuantity = function (key, quantity) {
        return this.productList.child(key).update({
            quantity: quantity,
        });
    };
    ProductData.prototype.updateUnit = function (key, unit) {
        return this.productList.child(key).update({
            unit: unit,
        });
    };
    ProductData.prototype.updateGuarantee = function (key, guarantee) {
        return this.productList.child(key).update({
            guarantee: guarantee,
        });
    };
    ProductData.prototype.updateQuality = function (key, quality) {
        return this.productList.child(key).update({
            quality: quality,
        });
    };
    ProductData.prototype.updateMtc = function (key, mtc) {
        return this.productList.child(key).update({
            mtc: mtc,
        });
    };
    ProductData.prototype.deleteProduct = function (key) {
        this.productList.child(key).remove();
        this.myProductList.child(key).remove();
    };
    ProductData.prototype.deleteRequirement = function (key) {
        this.requirementList.child(key).remove();
    };
    ProductData.prototype.setRecent = function (product) {
        //if (this.count == 4) {
        //    this.counter = 0
        //}
        //else {
        //    this.counter = this.count + 1;
        //}
        if (this.counter == 3) {
            this.counter = 0;
        }
        else {
            this.counter = this.counter + 1;
        }
        this.recentList.child(this.counter).set({
            product: product
        });
        this.recentList.update({
            count: this.counter
        });
    };
    return ProductData;
}());
ProductData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AngularFire, Storage])
], ProductData);
export { ProductData };
//# sourceMappingURL=product-data.js.map