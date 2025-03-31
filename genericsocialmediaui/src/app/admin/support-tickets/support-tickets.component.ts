import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerDialogComponent } from 'src/app/common/progress-spinner-dialog/progress-spinner-dialog.component';
import { Ticket } from 'src/app/models/Ticket';
import { User } from 'src/app/models/User';
import { TicketsServiceService } from 'src/app/services/tickets-service.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrl: './support-tickets.component.css',
})
export class SupportTicketsComponent {
  dataSource = new MatTableDataSource<Ticket>();

  ngAfterViewInit() {}
  displayedColumns: string[] = [
    'id',
    'email',
    'fullName',
    'message',
    'createdAt',
  ];

  constructor(
    private _ticketService: TicketsServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshGrid();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshGrid() {
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> =
      this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });
    this._ticketService.getTickets().subscribe((data) => {
      this.dataSource.data = data;
      dialogRef.close();
    });
  }
}
