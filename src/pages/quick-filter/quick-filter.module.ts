import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickFilterPage } from './quick-filter';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        QuickFilterPage,
    ],
    imports: [
        IonicPageModule.forChild(QuickFilterPage),
        CustomIconsModule

    ],
    exports: [
        QuickFilterPage
    ]
})
export class QuickFilterPageModule { }
