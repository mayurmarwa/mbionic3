import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'; 
import { AngularFire} from 'angularfire2';
import firebase from 'firebase';


/*
  Generated class for the ProductData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductData {

    productList: any;
    currentUser: any;
    myProductList: any;

    constructor(public http: Http, public af: AngularFire ) {
        this.productList = firebase.database().ref('/products');
        this.currentUser = firebase.auth().currentUser;
        this.myProductList = firebase.database().ref('/users/' + this.currentUser.uid + '/products');
  }
    getProduct(key: any): Observable<any> {
        return this.af.database.object('products/' + key);
    }
  /**getProduct(key: any): any {
      console.log(key);
      return this.productList.child(key);
  }**/

  /**
  * This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
  * for the current user as the firstName & lastName properties.
  */
    updateName(key: any, Name: string): any {

        this.myProductList.child(key).update({

            name: Name
        });
      return this.productList.child(key).update({
          name: Name,
          //lastName: lastName,
      });
  }
    updateGrade(key: any, Grade: string): any {

        this.myProductList.child(key).update({

            grade: Grade
        });
      return this.productList.child(key).update({
          grade: Grade,
          //lastName: lastName,
      });
  }
  updateFinish(key: any, Finish: string): any {
      return this.productList.child(key).update({
          finish: Finish,
          //lastName: lastName,
      });
  }
  updateThickness(key: any, Thickness: number): any {
      return this.productList.child(key).update({
          thickness: Thickness,
          //lastName: lastName,
      });
  }
  updateWidth(key: any, Width: number): any {
      return this.productList.child(key).update({
          width: Width,
          //lastName: lastName,
      });
  }
  updateLength(key: any, Length: number): any {
      return this.productList.child(key).update({
          length: Length,
          //lastName: lastName,
      });
  }
  updateWeight(key: any, Weight: number): any {
      return this.productList.child(key).update({
          weight: Weight,
          //lastName: lastName,
      });
  }
  updateNos(key: any, Nos: number): any {
      return this.productList.child(key).update({
          nos: Nos,
          //lastName: lastName,
      });
  }
  updateMrate(key: any, Mrate: number): any {

      this.myProductList.child(key).update({

          mrate: Mrate
      });

      return this.productList.child(key).update({
          mrate: Mrate,
          //lastName: lastName,
      });
  }
  updateKrate(key: any, Krate: number): any {
      this.myProductList.child(key).update({

          krate: Krate
      });

      return this.productList.child(key).update({
          krate: Krate,
          //lastName: lastName,
      });
  }
  updateComposition(key: any, Composition: string): any {
      return this.productList.child(key).update({
          composition: Composition,
          //lastName: lastName,
      });
  }
  updateOrigin(key: any, Origin: string): any {
      return this.productList.child(key).update({
          origin: Origin,
          //lastName: lastName,
      });
  }
  updateBrand(key: any, Brand: string): any {
      return this.productList.child(key).update({
          brand: Brand,
          //lastName: lastName,
      });
  } 

}
