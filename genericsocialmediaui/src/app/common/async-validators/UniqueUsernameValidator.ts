import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private _userDataService: UserDataService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this._userDataService.checkUsername(control.value).pipe(
      map((response) =>
        response.usernameExists ? { uniqueUsername: true } : null
      ),
      catchError(() => of(null))
    );
  }
}
