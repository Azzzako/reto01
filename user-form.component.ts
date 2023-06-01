import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  firstName: string;
  lastName: string;
  email: string;

  constructor(private http: HttpClient) {}

  submitForm() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };

    this.http.post('http://localhost:3000/api/users', user)
      .subscribe(
        (response) => {
          console.log('User created successfully:', response);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
  }
}
