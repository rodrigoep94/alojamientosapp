import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  descargarLog(){
    let logs = JSON.parse(localStorage.getItem("AlojamientosLog")) || [];
    console.log(logs);
  }

}
