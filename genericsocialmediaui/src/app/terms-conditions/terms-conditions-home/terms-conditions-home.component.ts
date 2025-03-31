import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms-conditions-home',
  templateUrl: './terms-conditions-home.component.html',
  styleUrls: ['./terms-conditions-home.component.css'],
})
export class TermsConditionsHomeComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
