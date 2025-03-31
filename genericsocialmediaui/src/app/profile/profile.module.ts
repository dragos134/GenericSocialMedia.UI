import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchbarComponent } from '../common/searchbar/searchbar.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { AddTextComponent } from './add-text/add-text.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../common/footer/footer.component';

@NgModule({
  declarations: [
    ProfileHomeComponent,
    UserProfileComponent,
    SendMessageComponent,
    AddPhotoComponent,
    AddTextComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    SearchbarComponent,
    FooterComponent,
  ],
})
export class ProfileModule {}
