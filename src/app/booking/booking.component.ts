import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

export interface SlotSpace {
  position: number;
  floor: string;
  slot: string;
  price: string;
  vehicle: string;
}



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  displayedColumns: String[] = ['position', 'floor', 'slot' , 'price' , 'vehicle' ,'book'  ];
  dataSource ;
  bookingUrl;
  slotSpaces: SlotSpace[] = [
  ];
  constructor(private http: HttpClient , private router: ActivatedRoute) { }

  ngOnInit() {
     this.bookingUrl = this.router.snapshot.paramMap.get('vehicleType')
    .toLowerCase() === 'twowheeler' ? '/two-wheeler/slot' : '/four-wheeler/slot';
    
    this.http.get(this.bookingUrl).subscribe(
      (slot: any[]) => {
        this.buildDataSrc(slot);
      }
    )
  }

  updateVehicle(element) {
    let updateVehicle = '/update' + this.bookingUrl ;
    this.http.put(updateVehicle , element).subscribe((slots)=> 
    {
      this.buildDataSrc(slots);
      alert('Booked the slot');
    }
   );
  }

  buildDataSrc(slot) {
    this.slotSpaces = [];
    slot.forEach((element, index) => {
        if(element.isBooked !== false) {
            this.slotSpaces.push({
              position: index + 1 ,
              floor: element.floor,
              slot: element.slot,
              price: element.price,
              vehicle: ''
            });
        }
    }); 
    this.dataSource = new MatTableDataSource(this.slotSpaces);
  }

}
