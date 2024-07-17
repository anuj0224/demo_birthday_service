import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, HttpClientModule]
})
export class AppComponent implements OnInit {
  employeeArray: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.userService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.employeeArray = data;
    });
  }
}
