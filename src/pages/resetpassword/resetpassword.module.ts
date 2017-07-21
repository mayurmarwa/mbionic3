import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetpasswordPage } from './resetpassword';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        ResetpasswordPage,
    ],
    imports: [
        IonicPageModule.forChild(ResetpasswordPage),
        CustomIconsModule

    ],
    exports: [
        ResetpasswordPage
    ]
})
export class ResetpasswordPageModule { }
