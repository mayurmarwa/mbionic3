import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricesPage } from './prices';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        PricesPage,
    ],
    imports: [
        IonicPageModule.forChild(PricesPage),
        CustomIconsModule

    ],
    exports: [
        PricesPage
    ]
})
export class PricesPageModule { }
