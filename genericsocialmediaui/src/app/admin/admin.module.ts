import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecruitedUsersComponent } from './recruited-users/recruited-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PaymentsComponent } from './payments/payments.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpamComponent } from './spam/spam.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';

@NgModule({
  declarations: [
    UsersListComponent,
    RecruitedUsersComponent,
    AdminHomeComponent,
    PaymentsComponent,
    AllPaymentsComponent,
    DashboardComponent,
    SpamComponent,
    SupportTicketsComponent,
    EditUserComponent,
    DeleteUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class AdminModule {}
