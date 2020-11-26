import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardId = '';
  amount = '';

  constructor() { }

  ngOnInit() {
  }

  pay() {
    this.cardId = '';
    this.amount = '';
    alert('your payment is success');
  }

}
