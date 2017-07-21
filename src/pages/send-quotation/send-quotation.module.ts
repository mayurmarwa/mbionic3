import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendQuotationPage } from './send-quotation';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SendQuotationPage,
    ],
    imports: [
        IonicPageModule.forChild(SendQuotationPage),
        CustomIconsModule

    ],
    exports: [
        SendQuotationPage
    ]
})
export class SendQuotationPageModule { }
