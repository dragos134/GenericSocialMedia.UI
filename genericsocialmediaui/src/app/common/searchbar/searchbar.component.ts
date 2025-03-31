import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { UserProfile } from 'src/app/models/UserProfile';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { UserDataService } from 'src/app/services/user-data.service';
import { ChatUser } from 'src/app/models/ChatUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
  ],
})
export class SearchbarComponent {
  constructor(
    private _userDataService: UserDataService,
    private eRef: ElementRef,
    private route: Router
  ) {}
  public result: ChatUser[] = [];
  searchText: string = '';

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.onSearchInput(this.searchText);
    } else {
      this.result = [];
    }
  }

  onSearchInput(text: string): void {
    this.searchText = text;
    if (this.searchText.length < 3) {
      this.result = [];
      return;
    }
    this._userDataService.searchUsers(this.searchText).subscribe((response) => {
      this.result = response;
    });
  }

  isSearching() {
    return this.searchText != '';
  }

  getUserPhotoUrl(photoId: string) {
    return `${environment.blobStorageUrl}${photoId}`;
  }

  onSearchItemClick(username: string) {
    console.log(username);
    this.route.navigate([`/profile/${username}`]);
  }
}
