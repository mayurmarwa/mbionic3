import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProductPage } from './edit-product';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        EditProductPage,
    ],
    imports: [
        IonicPageModule.forChild(EditProductPage),
        CustomIconsModule

    ],
    exports: [
        EditProductPage
    ]
})
export class EditProductPageModule { }
