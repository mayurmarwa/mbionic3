import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRequirementsPage } from './my-requirements';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        MyRequirementsPage,
    ],
    imports: [
        IonicPageModule.forChild(MyRequirementsPage),
        CustomIconsModule

    ],
    exports: [
        MyRequirementsPage
    ]
})
export class MyRequirementsPageModule { }
