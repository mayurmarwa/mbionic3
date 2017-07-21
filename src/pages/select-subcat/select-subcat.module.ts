import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSubcatPage } from './select-subcat';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SelectSubcatPage,
    ],
    imports: [
        IonicPageModule.forChild(SelectSubcatPage),
        CustomIconsModule

    ],
    exports: [
        SelectSubcatPage
    ]
})
export class SelectSubcatPageModule { }
