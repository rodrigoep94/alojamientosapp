import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver/src/FileSaver';
import { Helper } from '../../utils/helper';

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
    let logs: string[] = JSON.parse(localStorage.getItem("AlojamientosLog")) || [];
    logs = logs.map(str => { return str + "\r\n"});
    const filename = "Alojamientos-log-" + Helper.getLocaleDate(new Date()) + ".txt";
    const blob = new Blob(logs, { type: 'text/plain' });
    saveAs(blob, filename);
  }

}
