import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  post: Post
  submitted = false
  uSub: Subscription

  constructor(
    private _route: ActivatedRoute,
    private _postsService: PostService,
    private _alert: AlertService
  ) { }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.uSub =  this._postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
        this.submitted = false
      this._alert.success('Post has ben updated')
    })
  }

  ngOnInit(): void {
    this._route.params.pipe(switchMap((params: Params) => {
      return this._postsService.getById(params['id'])
    })
  ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if(this.uSub) {
      this.uSub.unsubscribe()
    }
  }

}
