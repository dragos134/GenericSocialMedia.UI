import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/Payment';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css'],
})
export class AllPaymentsComponent implements OnInit {
  constructor(private _paymentsService: PaymentsService) {}
  ngOnInit(): void {
    this.refreshGrid();
  }
  dataSource = new MatTableDataSource<Payment>();

  displayedColumns: string[] = [
    'Id',
    'Email',
    'Subscription',
    'Message',
    'Status',
    'Date',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshGrid() {
    this._paymentsService.getPayments().subscribe((response: Payment[]) => {
      this.dataSource.data = response;
    });
  }
}
