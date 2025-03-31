import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { SubscriptionRoutingModule } from './subscriptions-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCanceledComponent } from './payment-canceled/payment-canceled.component';
import { FooterComponent } from '../common/footer/footer.component';

@NgModule({
  declarations: [
    SubscriptionsPageComponent,
    PaymentSuccessComponent,
    PaymentCanceledComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    FooterComponent,
  ],
})
export class SubscriptionsModule {}
