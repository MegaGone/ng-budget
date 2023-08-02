import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedComponent } from './fixed.component';

const routes: Routes = [
  {
    path: "",
    component: FixedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedRoutingModule { }
