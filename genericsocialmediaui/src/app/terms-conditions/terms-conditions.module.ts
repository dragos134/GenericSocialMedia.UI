import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsHomeComponent } from './terms-conditions-home/terms-conditions-home.component';
import { TermsConditionsRoutingModule } from './terms-conditions-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TermsConditionsHomeComponent],
  imports: [
    CommonModule,
    TermsConditionsRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class TermsConditionsModule {}
