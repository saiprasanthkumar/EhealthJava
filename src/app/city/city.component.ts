import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
interface city {
  name: string;
  about: string;
  area: string;
  airportCount: number;
  citizen: Citizen[];
}

interface Citizen {
   name: string;
   identificationNumber: string;
   occupation: string;
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  displayedColumns: string[] = ['name', 'about', 'area' , 'airportCount' ];
  dataSource = [];
  name = '';
  area = '';
  airportno = ''; 
  about = '';

  constructor(public userService: UserService,private http: HttpClient) { }

  ngOnInit() {
   
    this.http.get('/view/cities').subscribe((data) => this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  }

  responseSuccess(data) {
    this.dataSource  = data;
   
  }

  createCity() {
    if(this.name === '') {
      alert('Please enter the city name');
      return;
    }
    this.http.post('/add/cities' , {
      name: this.name,
      about: this.about,
      area: this.area,
      airportCount: this.airportno
    }).subscribe((cityData) => this.cityCreated(cityData),
            (err) => alert (err.error.message)
            );
  }

  cityCreated(cityData) {
    this.dataSource = cityData;
    this.name = '';
    this.area = '';
    this.about = '';
    this.airportno = '';
  }

}
