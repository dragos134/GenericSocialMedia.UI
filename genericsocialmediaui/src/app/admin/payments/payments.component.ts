import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompletedPayment } from 'src/app/models/CompletedPayment';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor(private _paymentsService: PaymentsService) {}
  ngOnInit(): void {
    this.refreshGrid();
  }
  dataSource = new MatTableDataSource<CompletedPayment>();
  displayedColumns: string[] = [
    'Id',
    'Email',
    'Username',
    'Subscription',
    'Date',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshGrid() {
    this._paymentsService
      .getSuccessfulPayments()
      .subscribe((response: CompletedPayment[]) => {
        this.dataSource.data = response;
      });
  }
}
