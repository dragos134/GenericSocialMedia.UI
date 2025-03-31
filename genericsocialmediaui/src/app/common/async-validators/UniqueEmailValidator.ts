import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private _userDataService: UserDataService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const nameRe: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmail = nameRe.test(control.value);
    if (!isEmail) return new Observable<null>;
    return this._userDataService.checkUserEmail(control.value).pipe(
      map((response) =>
        response.emailExists ? { uniqueEmail: true } : null
      ),
      catchError(() => of(null))
    );
  }
}
