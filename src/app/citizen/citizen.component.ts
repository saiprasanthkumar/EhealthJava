import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Citizen {
  name: string;
  identificationNumber: string;
  occupation: string;
  cityName: string;
}
@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})
export class CitizenComponent implements OnInit {

  name = '';
  cityname = '';
  identificationNumber = '';
  occupation = '';


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  addCitizen() {
    this.http.post('/add/citizen' , {
      cityname: this.cityname,
      name: this.name,
      identificationNumber: this.identificationNumber,
      occupation: this.occupation
    }).subscribe((citizen) => this.addCitizenResponse(citizen),
            (err) => alert (err.error.message)
            );
  }

  addCitizenResponse (citizen) {
    
  }

}
