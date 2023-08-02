import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedRoutingModule } from './fixed-routing.module';
import { FixedComponent } from './fixed.component';


@NgModule({
  declarations: [
    FixedComponent
  ],
  imports: [
    CommonModule,
    FixedRoutingModule
  ]
})
export class FixedModule { }
