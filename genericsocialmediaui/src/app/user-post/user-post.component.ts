import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
})
export class UserPostComponent implements OnInit {
  @Input() username = '';
  @Input() postTime = new Date();
  @Input() imgSrc = '';
  ngOnInit(): void {}
}
