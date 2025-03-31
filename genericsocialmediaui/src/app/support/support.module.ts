import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportHomeComponent } from './support-home/support-home.component';
import { SupportRoutingModule } from './support-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SupportHomeComponent],
  imports: [
    CommonModule,
    SupportRoutingModule,

    //
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SupportModule {}
