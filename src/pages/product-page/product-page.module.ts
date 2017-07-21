import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPagePage } from './product-page';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        ProductPagePage,
    ],
    imports: [
        IonicPageModule.forChild(ProductPagePage),
        CustomIconsModule

    ],
    exports: [
        ProductPagePage
    ]
})
export class ProductPagePageModule { }
