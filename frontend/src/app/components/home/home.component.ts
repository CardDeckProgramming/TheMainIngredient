import { Component, OnInit } from '@angular/core';

export interface Tile {
  text: string;
  cols: number;
  rows: number;
  img: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiles: Tile[] = [
    {text: '', cols: 2, rows: 4, img: 'assets/imgs/placeholder1.jpg'},
    {text: 'The Main Ingredient \n Your Personal Online Server', cols: 2, rows: 2, img: ''},
    {text: '', cols: 2, rows: 2, img: 'assets/imgs/placeholder3.jpg'},
    {text: '', cols: 4, rows: 2, img: 'assets/imgs/placeholder4.jpg'},
    {text: '', cols: 1, rows: 4, img: 'assets/imgs/placeholder6.jpg'},
    {text: '', cols: 2, rows: 2, img: 'assets/imgs/placeholder7.jpg'},
    {text: '', cols: 3, rows: 4, img: 'assets/imgs/placeholder5.jpg'},
    {text: '', cols: 2, rows: 2, img: 'assets/imgs/placeholder2.jpg'}
  ];

  constructor() { }

  ngOnInit() {
  }

}

