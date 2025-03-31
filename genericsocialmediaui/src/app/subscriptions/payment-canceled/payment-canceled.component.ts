import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-canceled',
  templateUrl: './payment-canceled.component.html',
  styleUrls: ['./payment-canceled.component.css'],
})
export class PaymentCanceledComponent implements OnInit {
  constructor(private _router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['profile']);
    }, 4000);
  }
}
