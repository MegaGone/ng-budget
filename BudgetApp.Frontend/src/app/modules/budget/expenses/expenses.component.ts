import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

}
