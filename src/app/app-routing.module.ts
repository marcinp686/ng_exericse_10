import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileUploadComponentComponent } from './components/file-upload-component/file-upload-component.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'file-upload', component: FileUploadComponentComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
