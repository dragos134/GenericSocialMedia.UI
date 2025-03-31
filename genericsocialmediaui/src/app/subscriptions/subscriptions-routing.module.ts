import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentCanceledComponent } from './payment-canceled/payment-canceled.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsPageComponent,
  },
  {
    path: 'cancel',
    component: PaymentCanceledComponent,
  },
  {
    path: 'success',
    component: PaymentSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
