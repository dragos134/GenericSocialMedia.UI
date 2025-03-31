import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../common/footer/footer.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMessageComponent } from './edit-message/edit-message.component';

@NgModule({
  declarations: [ChatComponent, ChatHomeComponent, EditMessageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatBadgeModule,
    FooterComponent,
  ],
})
export class ChatModule {}
