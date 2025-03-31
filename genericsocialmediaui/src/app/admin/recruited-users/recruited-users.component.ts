import { formatDate } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RecruitedUser } from 'src/app/models/RecruitedUser';
import { MessageService } from 'src/app/services/message.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { firstValueFrom } from 'rxjs';
import { UniqueEmailValidator } from 'src/app/common/async-validators/UniqueEmailValidator';

@Component({
  selector: 'app-recruited-users',
  templateUrl: './recruited-users.component.html',
  styleUrls: ['./recruited-users.component.css'],
})
export class RecruitedUsersComponent {
  isAddingUser = false;
  emailFormControl = new FormControl('', {
    asyncValidators: [
      this._userEmailValidator.validate.bind(this._userEmailValidator),
    ],
    updateOn: 'change',
  });
  displayedColumns: string[] = [
    'id',
    'email',
    'createdAt',
    'createdBy',
    'isRegistered',
    'actions',
  ];

  dataSource = new MatTableDataSource<RecruitedUser>();

  ngAfterViewInit() {}
  @ViewChild(MatTable) table: MatTable<RecruitedUser> | undefined;
  constructor(
    private _userDataService: UserDataService,
    private _messageService: MessageService,
    public dialog: MatDialog,
    private _userEmailValidator: UniqueEmailValidator
  ) {}

  ngOnInit(): void {
    this.refreshGrid();
  }

  addItem(): void {
    this.isAddingUser = true;
    this._userDataService
      .addRecruitedUser(this.emailFormControl.value as string)
      .subscribe({
        next: (response) => {
          console.log('success');
          this.emailFormControl.setValue('');
          this.dataSource.data.push(response);
          this.table?.renderRows();
        },
        error: (err) => {
          this.isAddingUser = false;
          console.log(err);
        },
        complete: () => {
          this.isAddingUser = false;
        },
      });
  }

  editItem(item: RecruitedUser): void {
    this.openEditUserDialog(item);
    console.log('Edit item:', item);
  }

  deleteItem(itemId: number): void {
    console.log('deleting user');
    this.openDeleteUserDialog(itemId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditUserDialog(item: RecruitedUser) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user: item },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result: RecruitedUser) => {
      if (result === undefined) return;
      const index = this.dataSource.data.findIndex((x) => x.id == result.id);
      this.dataSource.data[index].email = result.email;
      this.dataSource.data[index].firstName = result.firstName;
      this.dataSource.data[index].lastName = result.lastName;
      this.dataSource.data[index].subscriptionId = result.subscriptionId;
    });
  }

  openDeleteUserDialog(itemId: number) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { userId: itemId },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (!result) return;

      const index = this.dataSource.data.findIndex((x) => x.id == itemId);
      console.log(index);
      if (index > -1) {
        // only splice array when item is found
        this.dataSource.data.splice(index, 1); // 2nd parameter means remove one item only
      }
    });
  }

  refreshGrid() {
    this._userDataService.getRecruitedUsers().subscribe((recruitedUsers) => {
      this.dataSource.data = recruitedUsers;
    });
  }
}
