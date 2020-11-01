import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Post } from '../shared/Interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$: Observable<Post>;
  login;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.login = JSON.parse(localStorage.getItem('user')).login;
    }
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.authService.getPostById(params['id']);
      })
    );
  }

  deletePost(id) {
    this.authService.deletePost(id).subscribe((data) => {
      if (!data.success) {
        this._flashMessagesService.show("Post not deleted!", {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else {
        this._flashMessagesService.show("Post deleted!", {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/']);
      }
    });
  }
}
