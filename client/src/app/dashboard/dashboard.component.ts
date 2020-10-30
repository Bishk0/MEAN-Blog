import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title: string;
  category: string;
  photo: string;
  text: string;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createPost() {
    const post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem('user')).login,
      date: new Date(),
    };

    if (!post.category) {
      this._flashMessagesService.show('Select a category', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!post.title) {
      this._flashMessagesService.show('Enter title', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!post.photo) {
      this._flashMessagesService.show('Insert a photo', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!post.text) {
      this._flashMessagesService.show('Enter text', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    
  }
}
