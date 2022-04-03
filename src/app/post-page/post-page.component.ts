import {Component, OnInit} from '@angular/core';
import {Post} from "../shared/interfaces";
import {PostService} from "../shared/post.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.post$ = this._route.params.pipe(switchMap((params: Params) => {
      return this._postService.getById(params['id'])
    }))
  }

}
