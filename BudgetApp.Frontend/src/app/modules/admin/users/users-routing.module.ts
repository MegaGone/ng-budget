import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path    : "",
    children: [
      { path: "", component: UsersComponent },
      { path: "**", redirectTo: "" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
