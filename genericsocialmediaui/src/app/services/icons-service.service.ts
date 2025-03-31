import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const THUMBUP_ICON = '';

@Injectable({
  providedIn: 'root',
})
export class IconsServiceService {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {}
}
