import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnquiriesPage } from './enquiries';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        EnquiriesPage,
    ],
    imports: [
        IonicPageModule.forChild(EnquiriesPage),
        CustomIconsModule

    ],
    exports: [
        EnquiriesPage
    ]
})
export class EnquiriesPageModule { }
