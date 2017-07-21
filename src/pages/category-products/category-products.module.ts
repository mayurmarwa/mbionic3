import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryProductsPage } from './category-products';
import { CustomIconsModule } from 'ionic2-custom-icons';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
    declarations: [
        CategoryProductsPage,
        
    ],
    imports: [
        IonicPageModule.forChild(CategoryProductsPage),
        CustomIconsModule,
        PipesModule

    ],
    exports: [
        CategoryProductsPage
    ]
})
export class CategoryProductsPageModule { }
