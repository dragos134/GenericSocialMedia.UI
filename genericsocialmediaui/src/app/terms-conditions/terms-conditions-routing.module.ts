import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsConditionsHomeComponent } from './terms-conditions-home/terms-conditions-home.component';

const routes: Routes = [
  {
    path: '',
    component: TermsConditionsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsConditionsRoutingModule {}
