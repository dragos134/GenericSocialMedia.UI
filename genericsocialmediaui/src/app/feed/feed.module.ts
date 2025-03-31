import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedHomeComponent } from './feed-home/feed-home.component';
import { FeedRoutingModule } from './feed-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchbarComponent } from '../common/searchbar/searchbar.component';

@NgModule({
  declarations: [FeedHomeComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    SearchbarComponent,
  ],
})
export class FeedModule {}
