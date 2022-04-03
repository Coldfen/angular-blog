import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServices} from "../../services/auth.services";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private _auth: AuthServices
  ) { }

  get auth() {
    return this._auth
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault()
    this._auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
