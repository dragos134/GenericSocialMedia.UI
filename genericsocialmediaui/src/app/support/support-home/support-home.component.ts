import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsServiceService } from 'src/app/services/tickets-service.service';

@Component({
  selector: 'app-support-home',
  templateUrl: './support-home.component.html',
  styleUrls: ['./support-home.component.css'],
})
export class SupportHomeComponent {
  supportForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });
  isMessageSent: boolean = false;
  constructor(private _ticketService: TicketsServiceService) {}
  submitTicket() {
    this._ticketService.createTicket(this.supportForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.isMessageSent = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
