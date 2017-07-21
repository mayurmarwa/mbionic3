import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProductsPage } from './my-products';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        MyProductsPage,
    ],
    imports: [
        IonicPageModule.forChild(MyProductsPage),
        CustomIconsModule

    ],
    exports: [
        MyProductsPage
    ]
})
export class MyProductsPageModule { }
