import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyMobilePage } from './verify-mobile';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        VerifyMobilePage,
    ],
    imports: [
        IonicPageModule.forChild(VerifyMobilePage),
        CustomIconsModule

    ],
    exports: [
        VerifyMobilePage
    ]
})
export class VerifyMobilePageModule { }
