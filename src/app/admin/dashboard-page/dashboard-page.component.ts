import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''

  constructor(
    private _postService: PostService,
    private _alert: AlertService
    ) { }


  ngOnInit(): void {
    this.pSub = this._postService.getAll().subscribe( posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub =  this._postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter( post => post.id !== id)
      this._alert.warning('Post has been deleted')
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
