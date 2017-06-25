import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBulkPage } from './add-bulk';


@NgModule({
  declarations: [
    AddBulkPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBulkPage),
    
  ],
  exports: [
    AddBulkPage
  ]
})
export class AddBulkPageModule {}
