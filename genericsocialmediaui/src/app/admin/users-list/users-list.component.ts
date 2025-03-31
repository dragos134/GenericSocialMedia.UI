import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerDialogComponent } from 'src/app/common/progress-spinner-dialog/progress-spinner-dialog.component';
import { User } from 'src/app/models/User';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  dataSource = new MatTableDataSource<User>();

  ngAfterViewInit() {}
  displayedColumns: string[] = [
    'id',
    'email',
    'username',
    'city',
    'registeredAt',
    'subscription',
  ];

  constructor(
    private _userDataService: UserDataService,
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
    console.log('asd');
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> =
      this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });
    this._userDataService.getUsers().subscribe((data) => {
      this.dataSource.data = data;
      dialogRef.close();
    });
  }
}
