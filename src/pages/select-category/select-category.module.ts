import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCategoryPage } from './select-category';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SelectCategoryPage,
    ],
    imports: [
        IonicPageModule.forChild(SelectCategoryPage),
        CustomIconsModule

    ],
    exports: [
        SelectCategoryPage
    ]
})
export class SelectCategoryPageModule { }
