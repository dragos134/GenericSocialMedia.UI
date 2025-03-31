import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.css'],
})
export class SubscriptionsPageComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private _subService: SubscriptionsService
  ) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  subscriptionsData: Subscription[] | undefined | null;

  loadSubscriptions() {
    this._subService.getSubscriptions().subscribe({
      next: (response) => {
        this.subscriptionsData = response;
      },
      error: (err) => {},
    });
  }

  getStripeLink() {
    return `${environment.apiUrl}/create-checkout-session`;
  }
}
