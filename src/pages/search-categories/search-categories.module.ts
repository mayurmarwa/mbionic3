import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCategoriesPage } from './search-categories';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SearchCategoriesPage,
    ],
    imports: [
        IonicPageModule.forChild(SearchCategoriesPage),
        CustomIconsModule

    ],
    exports: [
        SearchCategoriesPage
    ]
})
export class SearchCategoriesPageModule { }
