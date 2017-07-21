import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductPage } from './add-product';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        AddProductPage,
    ],
    imports: [
        IonicPageModule.forChild(AddProductPage),
        CustomIconsModule

    ],
    exports: [
        AddProductPage
    ]
})
export class AddProductPageModule { }
