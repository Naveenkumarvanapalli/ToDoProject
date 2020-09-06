import { Component } from '@angular/core';
import { Accounts } from "./auth/accounts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODOLIST';
  constructor() {}
}
