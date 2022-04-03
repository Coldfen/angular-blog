import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthServices} from "../shared/services/auth.services";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private _form!: FormGroup
  private _submitted = false
  private _message: string
  get submitted() {
    return this._submitted
  }

  get form(): FormGroup {
    return this._form
  }

  get message() {
    return this._message
  }

  constructor(
    private _auth: AuthServices,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  get auth() {
    return this._auth
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this._message = 'Please enter data'
      } else  if (params['authFailed']) {
        this._message = 'Session has expired. Login again'
      }
    })

    this._form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if (this._form.invalid) {
      return
    }
    this._submitted = true
    const user: User = {
      email: this._form.value.email,
      password: this._form.value.password
    }
  this._auth.login(user).subscribe(() => {
    this._form.reset()
    this._router.navigate(['/admin', 'dashboard'])
    this._submitted = false
  }, () => {
    this._submitted = false
    })
  }
}
